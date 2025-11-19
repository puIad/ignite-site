import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";
import { Label, TextArea } from "./input";
import {
  fieldsErrors,
  formStore,
  getFieldUtils,
  type FullSchema,
  type SchemaPartThree,
} from "./schema";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <div className="text-[10px] lg:text-[14px] italic text-red-500 mt-0.5 lg:mt-1">
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </div>
  );
}

export function FormThree() {
  const setPartThree = formStore((state) => state.setPartThree);
  const setStep = formStore((state) => state.setStep);
  const lang = formStore((state) => state.lang);
  const partOne = formStore((state) => state.partOne);
  const partTwo = formStore((state) => state.partTwo);
  const [submssion, setSubmission] = useState<"pending" | "success" | "failure">("pending");
  const [customErrors, setCustomErrors] = useState<Map<string, string>>(new Map())
  const [loading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      duo_talk_preference: "no_solo",
      partner_name_and_relationship: "",
      interview_preference: "online",
      additional_info: "",
    },
    onSubmit: async ({ value }) => {

      if (value.duo_talk_preference === "yes_with_partner") {
        if (value.partner_name_and_relationship.length < 5) {
          setCustomErrors(prev => {
            const newMap = new Map(prev)
            newMap.set('partner_name_and_relationship',
              fieldsErrors.tooShort(5, 'partner_name_and_relationship', lang) ?? "")
            return newMap
          })
          return;
        }
      }

      const partThreeData: SchemaPartThree = {
        duo_talk_preference: value.duo_talk_preference as
          | "yes_with_partner"
          | "no_solo"
          | "no_but_open",
        partner_name_and_relationship: value.partner_name_and_relationship,
        interview_preference: value.interview_preference as
          | "online"
          | "in_person",
        additional_info: value.additional_info,
      };

      setPartThree(partThreeData);

      const fullData: FullSchema = {
        ...partOne,
        ...partTwo,
        ...partThreeData,
      };

      console.log('all the data : ', fullData)

      try {
        setIsLoading(true)
        const res = await fetch("https://ignite-backend-el33.onrender.com/api/participants/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fullData),
        });
        if (res.ok) {
          setSubmission('success')
        }

        if (!res.ok) {
          setSubmission('failure')
        }
        const result = await res.json()
        console.log('reponse from the api', result)
        setIsLoading(false)
      } catch (error) {
        console.error("Submission error:", error);
        setIsLoading(false)
      }
    },
  });

  const { next, step, getLabel, getPlaceholder } = getFieldUtils(lang);

  if (submssion === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
        <div className="flex justify-center gap-2 mb-5 lg:mb-10">
          <p className="text-[24px] lg:text-[65px] text-primary font-display">
            Success!
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            className="h-30"
            src="/images/tick.svg" />
          <h2 className="text-[20px] lg:text-[40px] font-bold text-primary">
            {lang === "AR"
              ? "تم إرسال طلبك بنجاح!"
              : lang === "FR"
                ? "Votre demande a été envoyée avec succès!"
                : "Your registration has been submitted successfully!"}
          </h2>
          <p className="text-[14px] lg:text-[20px] text-primary/80">
            {lang === "AR"
              ? "شكراً لك على التسجيل. سنتواصل معك قريباً."
              : lang === "FR"
                ? "Merci pour votre inscription. Nous vous contacterons bientôt."
                : "Thank you for registering. We'll be in touch soon."}
          </p>
        </div>
      </div>
    );
  } else if (submssion === 'failure') {

    return (
      <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
        <div className="flex justify-center gap-2 mb-5 lg:mb-10">
          <p className="text-[24px] lg:text-[65px] text-red-600 font-display">
            Failed
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4">
          <img
            className="h-30"
            src="/images/error.svg"
          />
          <h2 className="text-[20px] lg:text-[40px] font-bold text-red-600">
            {lang === "AR"
              ? "فشل في إرسال الطلب"
              : lang === "FR"
                ? "Échec de l’envoi de la demande"
                : "Failed to submit your request"}
          </h2>

          <p className="text-[14px] lg:text-[20px] text-red-600/80">
            {lang === "AR"
              ? "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى."
              : lang === "FR"
                ? "Une erreur est survenue lors du traitement. Veuillez réessayer."
                : "An error occurred while processing your request. Please try again."}
          </p>
        </div>
      </div>
    );

  }

  return (
    <div>
      <div className="flex justify-start gap-2 lg:mb-10">
        <p className="text-[24px] lg:text-[65px] text-primary font-display">
          {step}
        </p>
        <p className="text-[14px] lg:text-[35px] text-primary">3/3</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex justify-center"
      >
        <div>
          <div className="flex flex-col gap-x-20 gap-y-4 w-[320px] lg:h-[820px] lg:w-[850px] px-3">
            <form.Field
              name="duo_talk_preference"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? fieldsErrors.required("duo_talk_preference", lang)
                    : undefined,
              }}
              children={(field) => {
                return (
                  <div>
                    <Label>{getLabel("duo_talk_preference")}</Label>
                    <RadioGroup
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      className="flex flex-col gap-3 lg:gap-2 text-[14px] lg:text-[16px]"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          onClick={(e) =>
                            field.handleChange(
                              e.currentTarget.value as
                              | "yes_with_partner"
                              | "no_solo"
                              | "no_but_open",
                            )
                          }
                          value="yes_with_partner"
                          id="option-yes-with-partner"
                        />
                        <p>Yes, I already have a partner to do the talk with.</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          onClick={(e) =>
                            field.handleChange(
                              e.currentTarget.value as
                              | "yes_with_partner"
                              | "no_solo"
                              | "no_but_open",
                            )
                          }
                          value="no_solo"
                          id="option-no-solo"
                        />
                        <p>No, I will lead the talk on my own.</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          onClick={(e) =>
                            field.handleChange(
                              e.currentTarget.value as
                              | "yes_with_partner"
                              | "no_solo"
                              | "no_but_open",
                            )
                          }
                          value="no_but_open"
                          id="option-no-but-open"
                        />
                        <p>
                          No, but I am open to pairing with someone whose topic
                          aligns with mine.
                        </p>
                      </div>
                    </RadioGroup>

                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />
            <form.Subscribe
              selector={(state) => state.values.duo_talk_preference}
              children={(duo_talk_preference) => {
                if (duo_talk_preference !== "yes_with_partner") return <></>;
                return (
                  <form.Field
                    name="partner_name_and_relationship"
                    children={(field) => {
                      return (
                        <div>
                          <Label>{getLabel("partner_name_and_relationship")}</Label>
                          <TextArea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            placeholder={getPlaceholder("partner_name_and_relationship")}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          {customErrors.get('partner_name_and_relationship') &&
                            <p
                              className="text-[10px] lg:text-[14px] italic text-red-500 mt-0.5 lg:mt-1"
                            >{customErrors.get('partner_name_and_relationship')}</p>}
                          <FieldInfo field={field} />
                        </div>
                      );
                    }}
                  />
                );
              }}
            />

            <form.Field
              name="interview_preference"
              children={(field) => {
                return (
                  <div>
                    <Label>{getLabel("interview_preference")}</Label>
                    <RadioGroup
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      className="flex flex-row gap-6  text-[14px] lg:text-[16px]"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          onClick={(e) =>
                            field.handleChange(
                              e.currentTarget.value as "online" | "in_person",
                            )
                          }
                          value="online"
                          id="option-online"
                        />
                        <p>Online</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          onClick={(e) =>
                            field.handleChange(
                              e.currentTarget.value as "online" | "in_person",
                            )
                          }
                          value="in_person"
                          id="option-in-person"
                        />
                        <p>In Person</p>
                      </div>
                    </RadioGroup>

                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />

            <form.Field
              name="additional_info"
              children={(field) => {
                return (
                  <div>
                    <Label>{getLabel("additional_info")}</Label>
                    <TextArea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder={getPlaceholder("additional_info")}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-10">
            <button
              className="text-[14px] lg:text-[16px] px-4 py-2.75 lg:px-10 lg:py-3 rounded-xl lg:rounded-2xl text-bold bg-primary/5 border-primary/30 border flex gap-4 items-center text-primary font-bold uppercase"
              onClick={() => setStep(0)}
            >
              Go Back
              <div className="rotate-180">
                <Arrow fill="#750B2B" />
              </div>
            </button>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  className="text-[14px] lg:text-[16px] text-white font-bold px-4 py-3 lg:px-10 lg:py-3 rounded-xl lg:rounded-2xl text-bold bg-primary flex gap-4 items-center text-whitefont-bold uppercase disabled:opacity-20 disabled:bg-primary/20"
                  type="submit"
                  disabled={!canSubmit}
                >
                  {loading ? "Sending..." : <><p>{next}</p> <Arrow /></>}
                </button>
              )}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

function Arrow({ className, fill }: { className?: string; fill?: string }) {
  return (
    <svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill={fill ?? "white"}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("scale-125", className)}
    >
      <path
        d="M2.46721 4.1121L0 8.22412L9.86885 4.1121L0.411201 7.24074e-05L2.46721 4.1121Z"
        fill={fill ?? "white"}
      />
    </svg>
  );
}


