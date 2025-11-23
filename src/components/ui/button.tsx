import { cn } from "@/lib/utils"
import { useScrollTo } from "../actionts/scrollToRegister"
import { motion } from "motion/react"

export function Button({ color, size = 'sm', children, className, onClick }: { className?: string, color?: string, size?: "lg" | "sm", children: string, onClick?: () => void }) {
  const scrollTo = useScrollTo();
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: .6, duration: .6, ease: "easeOut" }}
    >
      <button
        type="button"
        onClick={() => {
          if (onClick) onClick()
          else scrollTo('speakers-registration')
        }}
        className={cn(
          "font-bold font-sans uppercase rounded-full cursor-pointer",
          color === "red" ? "bg-primary text-white shadow-[0_0_35px_0_rgba(117,11,43,0.6)]" : "bg-white text-primary shadow-[0_0_35px_0_rgba(255,255,255,0.6)]",
          size === "sm" ? "px-6 lg:px-10 py-2.5 lg:py-3" : "px-10 py-2.5 lg:py-2.5 text-[25px]",
          className
        )}>
        <p className={cn("leading-[1.2] lg:leading-none text-[12px] lg:text-[20px] cursor-pointer hover:underline",
          size === "lg" && "text-[14px]"
        )}>{children}</p>
      </button>
    </motion.div>
  )
}
