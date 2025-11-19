export function Logos({ color = "white" }: { color?: "black" | "white" }) {
  return (
    <div className="flex gap-4 lg:gap-8 justify-center">
      <img className="h-[30px] w-[42px] lg:w-[77px] lg:h-[55px]" src={`/logos/ignite-${color}.svg`} />
      <img className="w-[68px] h-[27.5px] lg:w-[125.37px] lg:h-[51px]" src={`/logos/vic-${color}.svg`} />
    </div>
  )
}
