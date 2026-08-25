import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="mt-20 pt-6 border-t border-line flex flex-wrap gap-4 items-center justify-between text-[13px] text-text-faintest">
      <div>{t("common.footerLeft")}</div>
      <div className="flex gap-5 items-center font-mono text-[11.5px] tracking-[0.08em]">
        <Link to="/impressum" className="text-text-faintest hover:text-text-muted">
          {t("common.footerImpressum")}
        </Link>
        <Link to="/datenschutz" className="text-text-faintest hover:text-text-muted">
          {t("common.footerDatenschutz")}
        </Link>
        <span>breakbar.cc</span>
      </div>
    </footer>
  )
}
