import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/utils"
import { Wordmark } from "@/components/Wordmark"

export function Header() {
  const { i18n } = useTranslation()

  const btnClass = (on: boolean) =>
    cn(
      "font-mono text-[11px] tracking-[0.08em] px-3 py-1.5 rounded-full border-none cursor-pointer transition-colors",
      on ? "bg-signal text-base" : "bg-transparent text-text-faint hover:text-text-muted",
    )

  return (
    <header className="flex items-center justify-between gap-6 pt-7">
      <Link to="/">
        <Wordmark />
      </Link>
      <div className="flex gap-0.5 p-[3px] border border-line rounded-full">
        <button
          onClick={() => i18n.changeLanguage("de")}
          className={btnClass(i18n.resolvedLanguage === "de")}
        >
          DE
        </button>
        <button
          onClick={() => i18n.changeLanguage("en")}
          className={btnClass(i18n.resolvedLanguage === "en")}
        >
          EN
        </button>
      </div>
    </header>
  )
}
