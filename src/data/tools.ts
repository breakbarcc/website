import type { Lang } from "@/lib/i18n"

export interface Tool {
  key: string
  href: string
  name: string
  de: string
  en: string
  shotDe: string
  shotEn: string
  soon?: boolean
}

export const tools: Tool[] = [
  {
    key: "fractal",
    href: "https://fractal.breakbar.cc/",
    name: "Fractal God Rechner",
    de: 'Sagt dir, wie viele Tage du bei deiner aktuellen Routine noch bis zum Titel „Fractal God" brauchst.',
    en: 'Tells you how many days your current routine still needs until the "Fractal God" title.',
    shotDe: "Screenshot: Rechner",
    shotEn: "Screenshot: calculator",
  },
  {
    key: "legendary",
    href: "https://legendary.breakbar.cc/",
    name: "Legendary Mystic Forge",
    de: "Alle Zutaten für dein Legendary an einem Ort, statt sich durch fünf Wiki-Tabs zu klicken.",
    en: "Every ingredient for your legendary in one place instead of five wiki tabs.",
    shotDe: "Screenshot: Rezeptbaum",
    shotEn: "Screenshot: recipe tree",
  },
  {
    key: "voidlog",
    href: "https://voidlog.breakbar.cc/",
    name: "Voidlog",
    de: "Ladet eure Logs hoch und seht auf einen Blick, wie weit die Gruppe im Encounter kommt und ob sich der Trend bewegt.",
    en: "Upload your logs and see at a glance how far the group gets in an encounter and whether the trend is moving.",
    shotDe: "Screenshot: Projektübersicht",
    shotEn: "Screenshot: project overview",
    soon: true,
  },
  // {
  //   key: "raids",
  //   href: "#",
  //   soon: true,
  //   name: "Raid Tutorials",
  //   de: "Erklärungen zu Raids und anderem Endgame-Content — kurz gehalten, ohne 40-Minuten-Video.",
  //   en: "Explanations for raids and other endgame content, kept short, no 40-minute video.",
  //   shotDe: "Screenshot: Tutorial-Seite",
  //   shotEn: "Screenshot: tutorial page",
  // },
]

export function toolDesc(tool: Tool, lang: Lang) {
  return lang === "de" ? tool.de : tool.en
}

export function toolShot(tool: Tool, lang: Lang) {
  return lang === "de" ? tool.shotDe : tool.shotEn
}
