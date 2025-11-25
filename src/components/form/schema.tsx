import { create } from "zustand";

type Fields =
  | "email"
  | "first_name"
  | "last_name"
  | "phone"
  | "how_heard"
  | "which_lang"
  | "anything_toknow";

export const fieldsData = {
  email: {
    label: {
      EN: "Email Adress",
      AR: "البريد الإلكتروني",
      FR: "Adresse Email",
    },
    placeholder: {
      EN: "Enter your email address",
      AR: "أدخل عنوان بريدك الإلكتروني",
      FR: "Entrez votre adresse email",
    },
  },
  first_name: {
    label: {
      EN: "First Name",
      AR: "الاسم",
      FR: "Prénom",
    },
    placeholder: {
      EN: "Enter your first name",
      AR: "أدخل اسمك",
      FR: "Entrez votre prénom",
    },
  },
  last_name: {
    label: {
      EN: "Family Name",
      AR: "اللقب",
      FR: "Nom",
    },
    placeholder: {
      EN: "Enter your family name",
      AR: "أدخل لقبك",
      FR: "Entrez votre nom",
    },
  },
  phone: {
    label: {
      EN: "Phone number",
      AR: "رقم الهاتف",
      FR: "Numéro de téléphone",
    },
    placeholder: {
      EN: "Enter your phone number",
      AR: "أدخل رقم هاتفك",
      FR: "Entrez votre numéro de téléphone",
    },
  },
  how_heard: {
    label: {
      EN: "How did you hear about Ignite® Algiers?",
      AR: 'كيف سمعت ب"Ignite® Algiers"؟',
      FR: "Comment avez-vous entendu parler d'Ignite® Algiers?",
    },
    placeholder: {
      EN: "",
      AR: "",
      FR: "",
    },
  },
  which_lang: {
    label: {
      EN: "Which languages would you like to see the speeches in?",
      AR: "أي لغة",
      FR: "Quelle langue",
    },
    placeholder: {
      EN: "Select your language",
      AR: "اختر لغتك",
      FR: "Sélectionnez votre langue",
    },
  },
  anything_toknow: {
    label: {
      EN: "Is there anything you would like to know or ask about the event?",
      AR: "أي شيء يجب معرفته",
      FR: "Quelque chose à savoir",
    },
    placeholder: {
      EN: "",
      AR: "",
      FR: "",
    },
  },
} as const;

export function formatError(str: string): string {
  return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export const fieldsErrors = {
  required: (fieldName: string, lang: Lang) => {
    // prefer localized field label when available
    const l = lang ?? "EN";
    const label = (fieldsData as any)[fieldName]?.label?.[l] ?? formatError(fieldName);
    switch (lang) {
      case "EN":
        return `${label} is required`;
      case "FR":
        return `${label} est requis`;
      case "AR":
        return `${label} مطلوب`;
    }
  },
  invalid: (fieldName: string, lang: Lang) => {
    const l = lang ?? "EN";
    const label = (fieldsData as any)[fieldName]?.label?.[l] ?? formatError(fieldName);
    switch (lang) {
      case "EN":
        return `invalid ${label}`;
      case "FR":
        return `${label} invalide`;
      case "AR":
        return `غير صالح ${label}`;
    }
  },
  tooShort: (min: number, fieldName: string, lang: Lang) => {
    const l = lang ?? "EN";
    const label = (fieldsData as any)[fieldName]?.label?.[l] ?? formatError(fieldName);
    switch (lang) {
      case "EN":
        return `${label} should be at least ${min} characters`;
      case "FR":
        return `${label} doit contenir au moins ${min} caractères`;
      case "AR":
        return `${label} يجب أن تكون على الأقل ${min} أحرف`;
    }
  },
} as const;

export const uiTexts = {
  EN: {
    chooseLanguage: "Choose a Language",
    nextStep: "Next Step",
    goBack: "Go Back",
    speakersRegistration: "Speakers Registration",
    yes: "Yes",
    no: "No",
    online: "Online",
    inPerson: "In Person",
    sending: "Sending...",
    submit: "Submit",
    submitAnother: "Submit another Form",
  },
  FR: {
    chooseLanguage: "Choisissez une langue",
    nextStep: "Étape suivante",
    goBack: "Retour",
    speakersRegistration: "Inscription des Speakers",
    yes: "Oui",
    no: "Non",
    online: "En ligne",
    inPerson: "En personne",
    sending: "Envoi...",
    submit: "Soumettre",
    submitAnother: "Soumettre un autre formulaire",
  },
  AR: {
    chooseLanguage: "اختر اللغة",
    nextStep: "الخطوة التالية",
    goBack: "العودة",
    speakersRegistration: "تسجيل المتحدثين",
    yes: "نعم",
    no: "لا",
    online: "عبر الانترنت",
    inPerson: "حضوري",
    sending: "جاري الإرسال...",
    submit: "إرسال",
    submitAnother: "إرسال نموذج آخر",
  },
} as const;

export const getFieldUtils = (lang: Lang) => {
  if (!lang) lang = "EN";
  const a = {
    email: {
      label: fieldsData["email"].label[lang],
      placeholder: fieldsData["email"].placeholder[lang],
    },
    first_name: {
      label: fieldsData["first_name"].label[lang],
      placeholder: fieldsData["first_name"].placeholder[lang],
    },
    last_name: {
      label: fieldsData["last_name"].label[lang],
      placeholder: fieldsData["last_name"].placeholder[lang],
    },
    phone: {
      label: fieldsData["phone"].label[lang],
      placeholder: fieldsData["phone"].placeholder[lang],
    },
    how_heard: {
      label: fieldsData["how_heard"].label[lang],
      placeholder: fieldsData["how_heard"].placeholder[lang],
    },
    which_lang: {
      label: fieldsData["which_lang"].label[lang],
      placeholder: fieldsData["which_lang"].placeholder[lang],
    },
    anything_toknow: {
      label: fieldsData["anything_toknow"].label[lang],
      placeholder: fieldsData["anything_toknow"].placeholder[lang],
    },
  } as const;

  let step = ""
  if (lang === "EN") step = 'Step'
  else if (lang === "FR") step = 'Étape'
  else if (lang === "AR") step = 'الخطوة'

  let next = ""
  if (lang === "EN") next = 'Next Step'
  else if (lang === "FR") next = 'Étape suivante'
  else if (lang === "AR") next = 'الخطوة التالية'


  const getLabel = (fieldName: Fields) => a[fieldName].label;
  const getPlaceholder = (fieldName: Fields) => a[fieldName].placeholder;

  return { getLabel, getPlaceholder, next, step };
};

export type SchemaPartOne = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  how_heard: string;
  which_lang: "EN" | "AR" | "FR";
  anything_toknow?: string;
};

type Step = 0 | 1 | 2 | 3;
type Lang = "AR" | "FR" | "EN" | null;

type FormStore = {
  lang: Lang;
  step: Step;
  partOne: SchemaPartOne;
  buysOnline: boolean,
  setPartOne: (data: SchemaPartOne) => void;
  setStep: (n: Step) => void;
  setLang: (lang: Lang) => void;
};

export const formStore = create<FormStore>((set) => ({
  step: 2,
  lang: null,
  buysOnline: false,
  partOne: {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    how_heard: "",
    which_lang: "EN",
    anything_toknow: "",
  },
  setPartOne: (data: SchemaPartOne) => set({ partOne: data }),
  setStep: (n) => set({ step: n }),
  setLang: (lang) => set({ lang }),
}));
