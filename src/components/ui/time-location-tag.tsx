import { cn } from "@/lib/utils"

export function TimeLocationTag({ className }: { className?: string }) {
  return (
    <p className={cn("text-black font-bold text-center text-[10px] lg:text-[16px]", className)}>
      {/* [9:00 AM, 21 OCT] X [OPERA D’ALGER] */}
    </p>
  )
}
