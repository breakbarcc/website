import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import type { ReactNode } from "react"

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  const { t } = useTranslation()

  return (
    <section className="pt-24 pb-16 max-w-[720px]">
      <h1 className="font-display font-bold text-[40px] leading-[1.1] tracking-[-0.02em] text-text m-0 mb-8">
        {title}
      </h1>
      <div className="flex flex-col gap-8 text-[15px] leading-[1.65] text-text-muted">
        {children}
      </div>
      <Link
        to="/"
        className="inline-block mt-12 font-mono text-[12px] tracking-[0.06em] text-signal hover:text-signal-hover"
      >
        {t("common.backHome")}
      </Link>
    </section>
  )
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display font-medium text-[17px] tracking-[-0.01em] text-text mb-2">
        {heading}
      </h2>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}
