import { useLanguage } from "@/lib/i18n"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="pt-24 pb-16 max-w-[720px]">
      <div className="font-mono text-xs tracking-[0.14em] uppercase text-signal mb-5">
        {t("kicker")}
      </div>
      <h1 className="font-display font-bold text-[56px] leading-[1.05] tracking-[-0.03em] text-text m-0 mb-5 text-balance">
        {t("heroTitle")}
      </h1>
      <p className="text-lg leading-[1.6] text-text-muted m-0 text-pretty">{t("heroText")}</p>
    </section>
  )
}
