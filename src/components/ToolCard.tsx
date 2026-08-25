import { useTranslation } from "react-i18next"

import type { Tool } from "@/data/tools"
import { cn } from "@/lib/utils"

export function ToolCard({ tool }: Readonly<{ tool: Tool }>) {
  const { t } = useTranslation()

  return (
    <a
      href={tool.href}
      className={cn(
        "block bg-surface border border-line rounded-xl overflow-hidden text-inherit transition-[border-color,transform] duration-150 ease-out",
        "hover:border-line-hover hover:-translate-y-0.5",
        tool.soon && "opacity-60 pointer-events-none",
      )}
    >
      <div className="relative aspect-[16/10] bg-base bg-[repeating-linear-gradient(135deg,#171b21_0_8px,#111418_8px_16px)] border-b border-line flex items-center justify-center overflow-hidden">
        {tool.image ? (
          <img
            src={tool.image}
            alt={tool.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-faint/70">
            {t(`tools.${tool.key}.shot`)}
          </div>
        )}
        {tool.soon && (
          <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.12em] uppercase text-warn border border-warn-line bg-warn-bg px-2 py-1 rounded">
            {t("common.soonLabel")}
          </div>
        )}
      </div>
      <div className="px-[22px] pt-5 pb-[22px] flex flex-col gap-2">
        <div className="font-display font-medium text-[19px] tracking-[-0.01em] text-text">
          {tool.name}
        </div>
        <div className="text-[14.5px] leading-[1.55] text-text-muted text-pretty">
          {t(`tools.${tool.key}.desc`)}
        </div>
        <div className="mt-2 font-mono text-[11.5px] tracking-[0.06em] text-signal">
          {tool.soon ? t("common.inProgressLabel") : t("common.openLabel")}
        </div>
      </div>
    </a>
  )
}
