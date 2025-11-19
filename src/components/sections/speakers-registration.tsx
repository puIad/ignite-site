import { FormOne } from "../form/form-1";
import { FormTwo } from "../form/form-2";
import { FormThree } from "../form/form-3";
import { LangChoser } from "../form/lang-choser";
import { formStore } from "../form/schema";
import { Logos } from "../ui/logos";
import { TimeLocationTag } from "../ui/time-location-tag";

export function SpeakersRegistration() {
  const lang = formStore((state) => state.lang);
  const step = formStore((state) => state.step);
  const setStep = formStore((state) => state.setStep);
  if (!lang) setStep(0);
  //if (step !== 1) setStep(1)
  return (
    <div className="relative w-full min-h-screen" id={"speakers-registration"}>
      <img
        src="/images/noisy-red-mobile.webp"
        className="absolute lg:hidden h-full object-cover  top-0 left-0 -z-10"
      />
      <img
        src="/images/noisy-red-desktop.webp"
        className="absolute hidden h-full object-cover top-0 left-0 lg:inline -z-10"
      />

      <div className="w-full px-3 py-4 lg:px-20 lg:py-12 min-h-screen flex flex-col justify-between">
        {/* content  */}

        {/* <RegistrationForm /> */}

        <div className="h-full flex flex-col items-center lg:justify-between gap-6 lg:gap-10">
          <p className="text-[25px] lg:text-[65px] font-display text-primary text-center mt-10 lg:mt-0">
            SPEAKERS REGISTRATION
          </p>

          <div className="bg-primary/4 border-primary/40 border py-10 lg:py-20 backdrop-blur-3xl w-full lg:w-[1200px] xl:w-[1400px] flex justify-center">
            {step === 0 && <LangChoser />}
            {step === 1 && <FormOne />}
            {step === 2 && <FormTwo />}
            {step === 3 && <FormThree />}
          </div>
        </div>

        <div className="w-full flex justify-between lg:justify-between items-end mt-16">
          <TimeLocationTag />
          <Logos color="black" />
        </div>
      </div>
    </div>
  );
}
