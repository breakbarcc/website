import { useTranslation } from "react-i18next"

import { Hero } from "@/components/Hero"
import { ToolGrid } from "@/components/ToolGrid"
import { BreakbarDivider } from "@/components/BreakbarDivider"
import { useSeo } from "@/lib/useSeo"

export function Home() {
  const { t } = useTranslation()

  useSeo({
    title: t("seo.home.title"),
    description: t("seo.home.description"),
    path: "/",
  })

  return (
    <>
      <Hero />
      <BreakbarDivider />
      <ToolGrid />
    </>
  )
}
