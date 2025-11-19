import { TimeLocationTag } from "../ui/time-location-tag";

export function FooterSection() {
  return (
    <div className="w-screen min-h-screen px-8 py-8 lg:px-20 lg:py-8 flex flex-col justify-between bg-white">
      <div>
        <div className="flex flex-col items-start gap-2">
          <TimeLocationTag />
          <p className="font-display uppercase text-primary text-[30px] lg:text-[60px]">Who are we</p>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center mt-4 lg:mt-10 gap-6 lg:gap-20">
          <img src="/logos/vic-black.svg" className="w-[117px] h-[47px] lg:w-[213px] lg:h-[86px]" />

          <div className="h-[250px] w-px bg-black hidden lg:inline" />
          <div className="w-[250px] h-px bg-black lg:hidden" />

          <div className="flex flex-col gap-2 lg:gap-4">
            <p className="text-[18px] lg:text-[40px] font-display text-black">VISION & INOVATION CLUB</p>
            <p className="text-[10px] lg:text-[20px] text-black lg:max-w-[650px]">
              {`
A scientific club founded in 2014 at the National Polytechnic School of Algiers under the supervision of the scientific and cultural association “EL–MAARIFA”, which aims to foster creativity, communication, and innovation among students.
             `}
            </p>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 mt-4 lg:mt-10">
              <p className="uppercase text-[12px] lg:text-[22px]"> <span className="font-display text-[20px] lg:text-[35px] mr-2">+15</span> major event</p>
              <div className="w-[100px] h-px bg-black lg:hidden" />
              <p className="uppercase text-[12px] lg:text-[22px]"> <span className="font-display text-[20px] lg:text-[35px] mr-2">+200</span>active members</p>
              <div className="w-[100px] h-px bg-black lg:hidden" />
              <p className="uppercase text-[12px] lg:text-[22px]"> <span className="font-display text-[20px] lg:text-[35px] mr-2">+15</span>alumni</p>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full">
        <div className="h-px w-full bg-black lg:mb-4" />
        <div className="w-full flex justify-between lg:justify-start gap-20 mb-8 mt-4 lg:mt-0 lg:mb-12">
          <div className="flex flex-col gap-1 lg:gap-2 uppercase text-black font-bold text-[7px] lg:text-[12px]">
            <p className="">NATIONAL POLYTECHNIC SCHOOL</p>
            <p className="">vic@g.enp.edu.dz</p>
          </div>
          <div className="flex flex-col gap-1 lg:gap-2 uppercase text-black font-bold text-[7px] lg:text-[12px]">
            <p className="">WHAT IS IGNITE</p>
            <p className="">PREVIOUS EDITIONS</p>
            <p className="">SPEAKERS FORM</p>
            <p className="">ABOUT US</p>
          </div>
          <div className="flex flex-col gap-1 lg:gap-2 uppercase text-black font-bold text-[7px] lg:text-[12px]">
            <p className="">FACEBOOK</p>
            <p className="">INSTAGRAM</p>
            <p className="">LINKEDIN</p>
            <p className="">TIK TOK</p>
          </div>
        </div>
        <img src="/red-ignite.svg" className="w-full mt-auto" />
      </div>
    </div>
  )

}
