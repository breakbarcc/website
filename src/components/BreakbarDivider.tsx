import { useEffect, useRef } from "react"

import { init } from "@/breakbar-game/breakbar.js"
import "@/breakbar-game/breakbar.css"

/** Divider between the hero and the tool grid; doubles as the breakbar easter egg trigger. */
export function BreakbarDivider() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return

    const game = init(rootRef.current)
    return () => game.destroy()
  }, [])

  return <div ref={rootRef} />
}
