import { cn } from "@/lib/utils";

export function Navbar({ className }: { className?: string }) {
  return (
    <div>
      <div className={cn("gap-[120px] text-white justify-center hidden lg:flex", className)}>
        <p className="font-bold text-[14px] uppercase">what is ignite</p>
        <p className="font-bold text-[14px] uppercase">previous editions</p>
        <p className="font-bold text-[14px] uppercase">speakers form</p>
        <p className="font-bold text-[14px] uppercase">about us</p>
      </div>
      <div className="lg:hidden">
        <div className="flex flex-col gap-1.5">
          <div className="bg-white h-0.5 w-[25px]" />
          <div className="bg-white h-0.5 w-[25px]" />
          <div className="bg-white h-0.5 w-[25px]" />
        </div>
      </div>
    </div>
  )
}
