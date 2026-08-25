import { useTranslation } from "react-i18next"

import { tools } from "@/data/tools"
import { ToolCard } from "@/components/ToolCard"

export function ToolGrid() {
  const { t } = useTranslation()

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="font-mono text-xs tracking-[0.14em] uppercase text-text-faint">
          {t("common.gridLabel")}
        </div>
        <div className="flex-1 h-px bg-line" />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
        {tools.map((tool) => (
          <ToolCard key={tool.key} tool={tool} />
        ))}
      </div>
    </div>
  )
}
