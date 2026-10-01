import { useTranslation } from "react-i18next"

import { legalInfo } from "@/data/legalInfo"
import { LegalPage, LegalSection } from "@/components/LegalPage"
import { useSeo } from "@/lib/useSeo"

export function Datenschutz() {
  const { t } = useTranslation()

  useSeo({
    title: t("seo.datenschutz.title"),
    description: t("legal.datenschutz.intro"),
    path: "/datenschutz",
    noindex: true,
  })

  return (
    <LegalPage title={t("legal.datenschutz.title")}>
      <p>{t("legal.datenschutz.intro")}</p>

      <LegalSection heading={t("legal.datenschutz.sectionResponsible")}>
        <p>{t("legal.datenschutz.responsibleText")}</p>
        <p>{legalInfo.name}</p>
        <p>{legalInfo.street}</p>
        <p>{legalInfo.city}</p>
        <p>{legalInfo.email}</p>
      </LegalSection>

      <LegalSection heading={t("legal.datenschutz.sectionHosting")}>
        <p>{t("legal.datenschutz.hostingText")}</p>
        <p>{legalInfo.hostingProvider}</p>
      </LegalSection>

      <LegalSection heading={t("legal.datenschutz.sectionCookies")}>
        <p>{t("legal.datenschutz.cookiesText")}</p>
      </LegalSection>

      <LegalSection heading={t("legal.datenschutz.sectionAnalytics")}>
        <p>{t("legal.datenschutz.analyticsText")}</p>
      </LegalSection>

      <LegalSection heading={t("legal.datenschutz.sectionAi")}>
        <p>{t("legal.datenschutz.aiText")}</p>
      </LegalSection>

      <LegalSection heading={t("legal.datenschutz.sectionRights")}>
        <p>{t("legal.datenschutz.rightsText")}</p>
      </LegalSection>
    </LegalPage>
  )
}
