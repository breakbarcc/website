import { useLanguage } from "@/lib/i18n"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="mt-20 pt-6 border-t border-line flex flex-wrap gap-4 items-center justify-between text-[13px] text-text-faintest">
      <div>{t("footerLeft")}</div>
      <div className="font-mono text-[11.5px] tracking-[0.08em]">breakbar.cc</div>
    </footer>
  )
}
