/**
 * Breakbar minigame — a GW2-style defiance bar easter egg.
 *
 * Vanilla JS, no build step. Import this file as an ES module (in a bundler
 * or directly via <script type="module">) and call `init(rootElement)`. It
 * renders its own trigger + game UI into the given element and returns
 * `{ destroy }` to tear everything down again.
 *
 * The only external dependency is canvas-confetti (bare specifier — resolved
 * by the bundler in the site build; standalone use via test.html resolves it
 * through an import map instead, so this still needs no build step there).
 */

import confetti from "canvas-confetti"

import { PROFESSIONS } from "./skills-data.js"

/** Tunable balance values. Per-skill damage/cooldown lives in skills-data.js. */
export const CONFIG = {
  bar: {
    max: 1000,
    regenPerSecond: 40,
  },
  timerSeconds: 15,
}

const FIXED_DT = 1 / 60
// Caps catch-up ticks after e.g. a backgrounded tab so the sim never spirals.
const MAX_CATCHUP_TICKS = 10

function sampleWithoutReplacement(array, count) {
  const copy = array.slice()
  const result = []
  for (let i = 0; i < count && copy.length > 0; i++) {
    const index = Math.floor(Math.random() * copy.length)
    result.push(copy[index])
    copy.splice(index, 1)
  }
  return result
}

/** Rolls a random profession and 5 of its real CC skills. */
export function pickRandomLoadout() {
  const professionNames = Object.keys(PROFESSIONS)
  const profession = professionNames[Math.floor(Math.random() * professionNames.length)]
  const skills = sampleWithoutReplacement(PROFESSIONS[profession], 5)
  return { profession, skills }
}

function createInitialState(skills) {
  return {
    status: "idle", // idle | running | success | fail
    skills,
    barCurrent: CONFIG.bar.max,
    timeRemaining: CONFIG.timerSeconds,
    cooldowns: skills.map(() => 0),
    dotRemaining: 0,
    activeDotIndex: null,
  }
}

/**
 * Pure simulation step. Advances `state` by exactly `dt` seconds and applies
 * any queued skill activations. Does not read the DOM or wall-clock time, so
 * it produces identical results regardless of display refresh rate.
 */
export function tick(state, dt, inputs) {
  if (state.status !== "running") return state

  const cooldowns = state.cooldowns.map((c) => Math.max(0, c - dt))
  let barCurrent = state.barCurrent
  let dotRemaining = Math.max(0, state.dotRemaining - dt)
  let activeDotIndex = dotRemaining > 0 ? state.activeDotIndex : null

  const activations = (inputs && inputs.activations) || []
  for (const index of activations) {
    const skill = state.skills[index]
    if (!skill || cooldowns[index] > 0) continue
    cooldowns[index] = skill.cooldown
    if (skill.type === "dot") {
      dotRemaining = skill.duration
      activeDotIndex = index
    } else {
      barCurrent -= skill.damage
    }
  }

  if (activeDotIndex != null && dotRemaining > 0) {
    const dotSkill = state.skills[activeDotIndex]
    barCurrent -= (dotSkill.damage / dotSkill.duration) * dt
  }

  if (barCurrent > 0) {
    barCurrent = Math.min(CONFIG.bar.max, barCurrent + CONFIG.bar.regenPerSecond * dt)
  }

  const timeRemaining = Math.max(0, state.timeRemaining - dt)

  let status = state.status
  if (barCurrent <= 0) {
    barCurrent = 0
    status = "success"
  } else if (timeRemaining <= 0) {
    status = "fail"
    barCurrent = CONFIG.bar.max // the defiance bar recovers when time runs out
  }

  return { status, skills: state.skills, barCurrent, timeRemaining, cooldowns, dotRemaining, activeDotIndex }
}

/** Mounts the minigame into `rootElement`. Returns `{ destroy }`. */
export function init(rootElement) {
  if (!rootElement) throw new Error("breakbar: init(rootElement) requires an element")

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  rootElement.innerHTML = ""
  rootElement.classList.add("bb-root")
  if (reducedMotion) rootElement.classList.add("bb-reduced-motion")

  const trigger = document.createElement("button")
  trigger.type = "button"
  trigger.className = "bb-trigger"
  trigger.setAttribute("aria-expanded", "false")
  trigger.innerHTML = `
    <span class="bb-trigger-line" aria-hidden="true"></span>
    <span class="bb-trigger-label">// DEFIANCE BAR</span>
    <span class="bb-trigger-line" aria-hidden="true"></span>
  `

  const panel = document.createElement("div")
  panel.className = "bb-panel"
  panel.hidden = true
  panel.innerHTML = `
    <div class="bb-header">
      <div class="bb-header-info">
        <span class="bb-profession" data-role="profession"></span>
        <span class="bb-timer" data-role="timer"></span>
      </div>
      <button type="button" class="bb-close" data-role="close" aria-label="Close">Esc ×</button>
    </div>
    <div class="bb-bar-track">
      <div class="bb-bar-fill" data-role="bar-fill"></div>
      <div class="bb-bar-label" data-role="bar-label"></div>
    </div>
    <div class="bb-skills" data-role="skills"></div>
    <div class="bb-status" data-role="status" hidden>
      <div class="bb-status-text" data-role="status-text"></div>
      <button type="button" class="bb-again" data-role="again">Play Again</button>
    </div>
  `

  rootElement.appendChild(trigger)
  rootElement.appendChild(panel)

  const barFill = panel.querySelector('[data-role="bar-fill"]')
  const barLabel = panel.querySelector('[data-role="bar-label"]')
  const timerEl = panel.querySelector('[data-role="timer"]')
  const professionEl = panel.querySelector('[data-role="profession"]')
  const skillsEl = panel.querySelector('[data-role="skills"]')
  const statusEl = panel.querySelector('[data-role="status"]')
  const statusTextEl = panel.querySelector('[data-role="status-text"]')
  const againBtn = panel.querySelector('[data-role="again"]')
  const closeBtn = panel.querySelector('[data-role="close"]')

  let state = null
  let skillButtons = []
  let pendingActivations = []
  let confettiFired = false
  let open = false
  let rafId = null
  let accumulator = 0
  let lastFrameTime = 0

  function buildSkillButtons(skills) {
    skillsEl.innerHTML = ""
    skillButtons = skills.map((skill, index) => {
      const isDot = skill.type === "dot"

      const btn = document.createElement("button")
      btn.type = "button"
      btn.className = "bb-skill"
      btn.dataset.index = String(index)
      const label = skill.source ? `${skill.name} — ${skill.source}` : skill.name
      btn.title = isDot ? `${label} (ticks over ${skill.duration}s)` : label

      const key = document.createElement("span")
      key.className = "bb-skill-key"
      key.textContent = String(index + 1)

      if (isDot) {
        const dotBadge = document.createElement("span")
        dotBadge.className = "bb-skill-dot-badge"
        dotBadge.textContent = "⏱"
        btn.appendChild(dotBadge)
      }

      const icon = document.createElement("img")
      icon.className = "bb-skill-icon"
      icon.src = skill.icon
      icon.alt = skill.name
      // If the render service can't be reached, fall back to just the text label.
      icon.addEventListener("error", () => {
        icon.remove()
        btn.classList.add("bb-skill--no-icon")
      })

      const name = document.createElement("span")
      name.className = "bb-skill-name"
      name.textContent = skill.name

      const cd = document.createElement("span")
      cd.className = "bb-skill-cd"
      cd.dataset.role = "cd"

      btn.append(key, icon, name, cd)
      skillsEl.appendChild(btn)
      return btn
    })
  }

  function queueActivation(index) {
    if (state.status !== "running") return
    pendingActivations.push(index)
  }

  function fireConfetti() {
    if (reducedMotion) return

    const styles = getComputedStyle(rootElement)
    const readColor = (name, fallback) => styles.getPropertyValue(name).trim() || fallback
    const rect = panel.getBoundingClientRect()

    confetti({
      particleCount: 120,
      spread: 90,
      startVelocity: 45,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: [
        readColor("--bb-signal", "#5fe3d0"),
        readColor("--bb-signal-hover", "#8af0e2"),
        readColor("--bb-warn", "#e0b062"),
        readColor("--bb-text", "#f2f5f9"),
      ],
    })
  }

  function render() {
    const pct = state.barCurrent / CONFIG.bar.max
    barFill.style.transform = `scaleX(${pct})`
    barLabel.textContent = `${Math.ceil(state.barCurrent)} / ${CONFIG.bar.max}`
    timerEl.textContent = `${state.timeRemaining.toFixed(1)}s`

    skillButtons.forEach((btn, index) => {
      const cd = state.cooldowns[index]
      const onCooldown = cd > 0
      const isDotActive = state.activeDotIndex === index && state.dotRemaining > 0

      btn.disabled = onCooldown || state.status !== "running"
      btn.classList.toggle("is-cooldown", onCooldown)
      btn.classList.toggle("is-active", isDotActive)

      const cdEl = btn.querySelector('[data-role="cd"]')
      if (isDotActive) {
        cdEl.textContent = state.dotRemaining.toFixed(1)
      } else if (onCooldown) {
        cdEl.textContent = cd.toFixed(1)
      } else {
        cdEl.textContent = ""
      }
    })

    const finished = state.status === "success" || state.status === "fail"
    statusEl.hidden = !finished
    panel.classList.toggle("is-success", state.status === "success")
    panel.classList.toggle("is-fail", state.status === "fail")
    statusTextEl.textContent =
      state.status === "success" ? "DEFIANCE BAR BROKEN" : state.status === "fail" ? "BAR NOT BROKEN IN TIME" : ""

    if (state.status === "success" && !confettiFired) {
      confettiFired = true
      fireConfetti()
    }
  }

  function loop(now) {
    if (!open) return
    if (!lastFrameTime) lastFrameTime = now
    let frameDt = (now - lastFrameTime) / 1000
    lastFrameTime = now
    if (frameDt > 0.25) frameDt = 0.25 // clamp large gaps, e.g. backgrounded tab

    accumulator += frameDt

    let ticks = 0
    while (accumulator >= FIXED_DT && ticks < MAX_CATCHUP_TICKS) {
      const inputs = { activations: pendingActivations }
      pendingActivations = []
      state = tick(state, FIXED_DT, inputs)
      accumulator -= FIXED_DT
      ticks += 1
      if (state.status !== "running") break
    }

    render()

    rafId = state.status === "running" ? requestAnimationFrame(loop) : null
  }

  function startLoop() {
    lastFrameTime = 0
    accumulator = 0
    if (rafId == null) rafId = requestAnimationFrame(loop)
  }

  function startGame() {
    const { profession, skills } = pickRandomLoadout()
    professionEl.textContent = profession
    buildSkillButtons(skills)
    state = createInitialState(skills)
    state.status = "running"
    pendingActivations = []
    confettiFired = false
    render()
    startLoop()
  }

  function openPanel() {
    open = true
    trigger.setAttribute("aria-expanded", "true")
    panel.hidden = false
    startGame()
  }

  function closePanel() {
    open = false
    trigger.setAttribute("aria-expanded", "false")
    panel.hidden = true
    if (rafId != null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  function isTypingTarget(el) {
    if (!el) return false
    const tag = el.tagName
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable
  }

  function onKeydown(event) {
    if (!open) return
    if (isTypingTarget(event.target)) return

    if (event.key === "Escape") {
      closePanel()
      return
    }

    const num = Number(event.key)
    if (Number.isInteger(num) && num >= 1 && num <= 5) {
      queueActivation(num - 1)
    }
  }

  function onTriggerClick() {
    if (!open) openPanel()
  }

  function onSkillsClick(event) {
    const btn = event.target.closest(".bb-skill")
    if (!btn || btn.disabled) return
    queueActivation(Number(btn.dataset.index))
  }

  function onAgainClick() {
    startGame()
  }

  trigger.addEventListener("click", onTriggerClick)
  closeBtn.addEventListener("click", closePanel)
  againBtn.addEventListener("click", onAgainClick)
  skillsEl.addEventListener("click", onSkillsClick)
  document.addEventListener("keydown", onKeydown)

  return {
    destroy() {
      closePanel()
      document.removeEventListener("keydown", onKeydown)
      trigger.removeEventListener("click", onTriggerClick)
      closeBtn.removeEventListener("click", closePanel)
      againBtn.removeEventListener("click", onAgainClick)
      skillsEl.removeEventListener("click", onSkillsClick)
      rootElement.innerHTML = ""
      rootElement.classList.remove("bb-root", "bb-reduced-motion")
    },
  }
}
