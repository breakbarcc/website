import { useTranslation } from "react-i18next"

import { legalInfo } from "@/data/legalInfo"
import { LegalPage, LegalSection } from "@/components/LegalPage"
import { useSeo } from "@/lib/useSeo"

export function Impressum() {
  const { t } = useTranslation()

  useSeo({
    title: t("seo.impressum.title"),
    description: t("legal.impressum.subtitle"),
    path: "/impressum",
    noindex: true,
  })

  return (
    <LegalPage title={t("legal.impressum.title")}>
      <p className="font-mono text-xs tracking-[0.1em] uppercase text-text-faint -mt-6">
        {t("legal.impressum.subtitle")}
      </p>

      <LegalSection heading={legalInfo.name}>
        <p>{legalInfo.street}</p>
        <p>{legalInfo.city}</p>
      </LegalSection>

      <LegalSection heading={t("legal.impressum.sectionContact")}>
        <p>
          {t("legal.impressum.labelEmail")}: {legalInfo.email}
        </p>
        <p>
          {t("legal.impressum.labelSecondaryContact")}:{" "}
          <a
            href={legalInfo.secondaryContact}
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal hover:text-signal-hover underline"
          >
            Discord
          </a>
        </p>
      </LegalSection>

      <LegalSection heading={t("legal.impressum.sectionResponsible")}>
        <p>{t("legal.impressum.responsibleText")}</p>
      </LegalSection>

      <LegalSection heading={t("legal.impressum.sectionDisclaimer")}>
        <p>{t("legal.impressum.disclaimerText")}</p>
      </LegalSection>

      <LegalSection heading={t("legal.impressum.sectionDisputeResolution")}>
        <p>{t("legal.impressum.disputeResolutionText")}</p>
      </LegalSection>
    </LegalPage>
  )
}
