import { cn } from "@/lib/utils"

export function Wordmark({ size = "sm" }: { size?: "sm" | "lg" }) {
  const big = size === "lg"

  return (
    <div className="inline-flex flex-col items-stretch gap-[5px]">
      <div
        className={cn(
          "font-display font-bold tracking-[-0.01em] leading-none text-text",
          big ? "text-[26px] tracking-[-0.03em]" : "text-[19px]",
        )}
      >
        breakbar<span className="text-text-faint">.cc</span>
      </div>
      <div className={cn("flex gap-[2px]", big && "gap-[3px]")}>
        <div className={cn("flex-[3] bg-signal", big ? "h-[6px] rounded-[1px]" : "h-[3px]")} />
        <div
          className={cn(
            "flex-[1.4] bg-signal opacity-45",
            big ? "h-[6px] rounded-[1px]" : "h-[3px]",
          )}
        />
        <div className={cn("flex-[2] bg-line", big ? "h-[6px] rounded-[1px]" : "h-[3px]")} />
      </div>
    </div>
  )
}
