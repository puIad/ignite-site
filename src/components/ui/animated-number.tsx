import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

export function AnimatedNumber({ duration, children, className }: { duration?: number, children: string, className?: string }) {
  const number = Number(children)
  if (isNaN(number)) return <p>NaN</p>
  const count = useMotionValue(0)
  const rounded = useTransform(() => Math.round(count.get()))
  useEffect(() => {
    const controls = animate(count, number, { duration: duration ?? 2, ease: "easeInOut" })
    return () => controls.stop()
  }, [])
  return <motion.pre
    className={className ?? ""}>{rounded}</motion.pre>
}
