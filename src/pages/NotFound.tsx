import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export function NotFound() {
  const { t } = useTranslation()

  return (
    <section className="pt-24 pb-16 max-w-[720px]">
      <h1 className="font-display font-bold text-[40px] leading-[1.1] tracking-[-0.02em] text-text m-0 mb-4">
        404
      </h1>
      <p className="text-text-muted mb-8">{t("common.notFound")}</p>
      <Link
        to="/"
        className="inline-block font-mono text-[12px] tracking-[0.06em] text-signal hover:text-signal-hover"
      >
        {t("common.backHome")}
      </Link>
    </section>
  )
}
