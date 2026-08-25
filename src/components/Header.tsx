import { useLanguage } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Wordmark } from "@/components/Wordmark"

export function Header() {
  const { lang, setLang } = useLanguage()

  const btnClass = (on: boolean) =>
    cn(
      "font-mono text-[11px] tracking-[0.08em] px-3 py-1.5 rounded-full border-none cursor-pointer transition-colors",
      on ? "bg-signal text-base" : "bg-transparent text-text-faint hover:text-text-muted",
    )

  return (
    <header className="flex items-center justify-between gap-6 pt-7">
      <Wordmark />
      <div className="flex gap-0.5 p-[3px] border border-line rounded-full">
        <button onClick={() => setLang("de")} className={btnClass(lang === "de")}>
          DE
        </button>
        <button onClick={() => setLang("en")} className={btnClass(lang === "en")}>
          EN
        </button>
      </div>
    </header>
  )
}
