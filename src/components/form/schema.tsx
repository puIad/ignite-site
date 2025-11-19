import { create } from "zustand";

type Fields =
  | "email"
  | "first_name"
  | "last_name"
  | "phone"
  | "discord_username"
  | "date_of_birth"
  | "wilaya"
  | "is_student"
  | "university"
  | "degree_and_major"
  | "occupation"
  | "knowledge_about_ignite"
  | "motivation"
  | "how_heard"
  | "has_public_speaking_experience"
  | "public_speaking_experience"
  | "presentation_language"
  | "talk_category"
  | "presentation_theme"
  | "theme_elaboration"
  | "duo_talk_preference"
  | "partner_name_and_relationship"
  | "interview_preference"
  | "additional_info";

export const fieldsData = {
  email: {
    label: {
      EN: "Email",
      AR: "البريد الإلكتروني",
      FR: "Email",
    },
    placeholder: {
      EN: "Enter your email address",
      AR: "أدخل عنوان بريدك الإلكتروني",
      FR: "Entrez votre adresse email",
    },
  },
  first_name: {
    label: {
      EN: "First name",
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
      EN: "Family name",
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
  discord_username: {
    label: {
      EN: "Discord Username",
      AR: "اسم مستخدم Discord",
      FR: "Nom d'utilisateur Discord",
    },
    placeholder: {
      EN: "Enter your Discord username",
      AR: "أدخل اسم مستخدم Discord",
      FR: "Entrez votre nom d'utilisateur Discord",
    },
  },
  date_of_birth: {
    label: {
      EN: "Date of birth",
      AR: "تاريخ الميلاد",
      FR: "Date de naissance",
    },
    placeholder: {
      EN: "Select your date of birth",
      AR: "اختر تاريخ ميلادك",
      FR: "Sélectionnez votre date de naissance",
    },
  },
  wilaya: {
    label: {
      EN: "Wilaya",
      AR: "الولاية",
      FR: "Wilaya",
    },
    placeholder: {
      EN: "Select your wilaya",
      AR: "اختر ولايتك",
      FR: "Sélectionnez votre wilaya",
    },
  },
  is_student: {
    label: {
      EN: "Are you a student ?",
      AR: "هل أنت طالب؟",
      FR: "Etes vous un(e) étudiant(e) ?",
    },
    placeholder: {
      EN: "",
      AR: "",
      FR: "",
    },
  },
  university: {
    label: {
      EN: "University",
      AR: "ما هي جامعتك/ مدرستك؟",
      FR: "Quelle est votre Université / Ecole ?",
    },
    placeholder: {
      EN: "Enter your university name",
      AR: "أدخل اسم جامعتك أو مدرستك",
      FR: "Entrez le nom de votre université ou école",
    },
  },
  degree_and_major: {
    label: {
      EN: "Degree and Major",
      AR: "السنة والتخصص",
      FR: "Année et spécialité ?",
    },
    placeholder: {
      EN: "Enter your degree and major",
      AR: "أدخل سنتك وتخصصك",
      FR: "Entrez votre année et spécialité",
    },
  },
  occupation: {
    label: {
      EN: "Occupation",
      AR: "ماذا تمتهن ؟",
      FR: "Quelle est votre occupation ?",
    },
    placeholder: {
      EN: "Enter your occupation",
      AR: "أدخل مهنتك",
      FR: "Entrez votre occupation",
    },
  },
  knowledge_about_ignite: {
    label: {
      EN: "What do you know about Ignite Talks?",
      AR: '؟"Ignite Talks" ما الذي تعرفه عن',
      FR: "Que connaissez-vous à propos d'Ignite Talks ?",
    },
    placeholder: {
      EN: "Tell us what you know about Ignite Talks",
      AR: "أخبرنا بما تعرفه عن Ignite Talks",
      FR: "Dites-nous ce que vous savez sur Ignite Talks",
    },
  },
  motivation: {
    label: {
      EN: "What motivated you to be a speaker at Ignite Algiers?",
      AR: "ما الذي دفعك للمشاركة في هذا الحدث؟",
      FR: "Qu'est-ce qui vous a motivé à être un speaker dans Ignite Algiers ?",
    },
    placeholder: {
      EN: "Tell us what motivated you",
      AR: "أخبرنا بما دفعك للمشاركة",
      FR: "Dites-nous ce qui vous a motivé",
    },
  },
  how_heard: {
    label: {
      EN: "How did you hear about Ignite Algiers?",
      AR: '؟"Ignite Algiers" من اين عرفت عن',
      FR: "Comment avez-vous entendu parler d'Ignite Algiers ?",
    },
    placeholder: {
      EN: "",
      AR: "",
      FR: "",
    },
  },
  has_public_speaking_experience: {
    label: {
      EN: "Have you ever participated in a public speaking event, or given a talk in front of the public?",
      AR: "هل شاركت سابقا في هذا النوع من التظاهرات، أو ألقيت محاضرة أمام العامة ؟",
      FR: "Avez-vous déjà participé à un évènement de public speaking, ou donné une conférence devant un public ?",
    },
    placeholder: {
      EN: "",
      AR: "",
      FR: "",
    },
  },
  public_speaking_experience: {
    label: {
      EN: "tell us about your experience",
      AR: "اذا كانت الاجابة بنعم, اطلعنا عن تجاربك السابقة",
      FR: "Décrivez votre expérience brièvement",
    },
    placeholder: {
      EN: "Describe your experience",
      AR: "اوصف تجاربك السابقة",
      FR: "Décrivez votre expérience",
    },
  },
  presentation_language: {
    label: {
      EN: "What language will the presentation be in?",
      AR: "ما هي اللغة التي ستقدم بها عرضك؟",
      FR: "Dans quelle langue sera-t-elle votre présentation ?",
    },
    placeholder: {
      EN: "Select your preferred presentation language",
      AR: "اختر لغة العرض",
      FR: "Sélectionnez votre langue de présentation",
    },
  },
  talk_category: {
    label: {
      EN: "Which category best describes the theme of your talk?",
      AR: "ما هي الفئة التي تصف موضوع حديثك بشكل أفضل؟",
      FR: "Quelle catégorie décrit le thème de votre talk ?",
    },
    placeholder: {
      EN: "Select the category for your talk",
      AR: "اختر فئة حديثك",
      FR: "Sélectionnez la catégorie de votre talk",
    },
  },
  presentation_theme: {
    label: {
      EN: "What is the theme of your presentation?",
      AR: "ماهو الموضوع الذي اخترته ؟",
      FR: "Quel est le thème de votre présentation ?",
    },
    placeholder: {
      EN: "Enter the theme of your presentation",
      AR: "أدخل موضوع عرضك",
      FR: "Entrez le thème de votre présentation",
    },
  },
  theme_elaboration: {
    label: {
      EN: "Could you elaborate the content (the theme) of your presentation?",
      AR: "هل يمكنك توضيح محتوى (موضوع) العرض الخاص بك ؟",
      FR: "Pourriez-vous développer le contenu (le thème) de votre présentation ?",
    },
    placeholder: {
      EN: "Elaborate on your presentation theme",
      AR: "وضح محتوى عرضك",
      FR: "Développez le contenu de votre présentation",
    },
  },
  duo_talk_preference: {
    label: {
      EN: "Are you considering doing a duo talk",
      AR: "هل تفكر في إلقاء المحاضرة بالتعاون مع شخص آخر؟",
      FR: "Envisagez-vous de faire une présentation en duo ?",
    },
    placeholder: {
      EN: "",
      AR: "",
      FR: "",
    },
  },
  partner_name_and_relationship: {
    label: {
      EN: "If yes, what is the name of this partner and what type of relationship do you have?",
      AR: "إذا كانت الإجابة بنعم، فما هو اسم هذا الشريك وماهي صلة القرابة بينكما ؟",
      FR: "Si oui, quel est le nom de ce partenaire et quel type de relation avez-vous ?",
    },
    placeholder: {
      EN: "Enter your partner's name and your relationship",
      AR: "أدخل اسم شريكك وعلاقتك",
      FR: "Entrez le nom de votre partenaire et votre relation",
    },
  },
  interview_preference: {
    label: {
      EN: "If accepted, you will choose to take your interview",
      AR: "إذا تم قبولك، سوف تختار إجراء المقابلة الخاصة بك",
      FR: "Dans le cas où vous seriez accepté(e), vous choisiriez passer votre entretien",
    },
    placeholder: {
      EN: "",
      AR: "",
      FR: "",
    },
  },
  additional_info: {
    label: {
      EN: "Anything to add",
      AR: "أي شيء آخر",
      FR: "Autre chose à ajouter ?",
    },
    placeholder: {
      EN: "Any additional information you'd like to share",
      AR: "أي معلومات إضافية ترغب في مشاركتها",
      FR: "Toute information supplémentaire",
    },
  },
} as const;

export function formatError(str: string): string {
  return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export const fieldsErrors = {
  required: (fieldName: string, lang: Lang) => {
    fieldName = formatError(fieldName);
    switch (lang) {
      case "EN":
        return `${fieldName} is required`;
      case "FR":
        return `${fieldName} is required`;
      case "AR":
        return `${fieldName} is required`;
    }
  },
  invalid: (fieldName: string, lang: Lang) => {
    fieldName = formatError(fieldName);
    switch (lang) {
      case "EN":
        return `invalid ${fieldName}`;
      case "FR":
        return `invalid ${fieldName}`;
      case "AR":
        return `${fieldName} is required`;
    }
  },
  tooShort: (min: number, fieldName: string, lang: Lang) => {
    fieldName = formatError(fieldName);
    switch (lang) {
      case "EN":
        return `${fieldName} should be at least ${min} characters`;
      case "FR":
        return `${fieldName} should be at least ${min} characters`;
      case "AR":
        return `${fieldName} should be at least ${min} characters`;
    }
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
    discord_username: {
      label: fieldsData["discord_username"].label[lang],
      placeholder: fieldsData["discord_username"].placeholder[lang],
    },
    date_of_birth: {
      label: fieldsData["date_of_birth"].label[lang],
      placeholder: fieldsData["date_of_birth"].placeholder[lang],
    },
    wilaya: {
      label: fieldsData["wilaya"].label[lang],
      placeholder: fieldsData["wilaya"].placeholder[lang],
    },
    is_student: {
      label: fieldsData["is_student"].label[lang],
      placeholder: fieldsData["is_student"].placeholder[lang],
    },
    university: {
      label: fieldsData["university"].label[lang],
      placeholder: fieldsData["university"].placeholder[lang],
    },
    degree_and_major: {
      label: fieldsData["degree_and_major"].label[lang],
      placeholder: fieldsData["degree_and_major"].placeholder[lang],
    },
    occupation: {
      label: fieldsData["occupation"].label[lang],
      placeholder: fieldsData["occupation"].placeholder[lang],
    },
    knowledge_about_ignite: {
      label: fieldsData["knowledge_about_ignite"].label[lang],
      placeholder: fieldsData["knowledge_about_ignite"].placeholder[lang],
    },
    motivation: {
      label: fieldsData["motivation"].label[lang],
      placeholder: fieldsData["motivation"].placeholder[lang],
    },
    how_heard: {
      label: fieldsData["how_heard"].label[lang],
      placeholder: fieldsData["how_heard"].placeholder[lang],
    },
    has_public_speaking_experience: {
      label: fieldsData["has_public_speaking_experience"].label[lang],
      placeholder:
        fieldsData["has_public_speaking_experience"].placeholder[lang],
    },
    public_speaking_experience: {
      label: fieldsData["public_speaking_experience"].label[lang],
      placeholder: fieldsData["public_speaking_experience"].placeholder[lang],
    },
    presentation_language: {
      label: fieldsData["presentation_language"].label[lang],
      placeholder: fieldsData["presentation_language"].placeholder[lang],
    },
    talk_category: {
      label: fieldsData["talk_category"].label[lang],
      placeholder: fieldsData["talk_category"].placeholder[lang],
    },
    presentation_theme: {
      label: fieldsData["presentation_theme"].label[lang],
      placeholder: fieldsData["presentation_theme"].placeholder[lang],
    },
    theme_elaboration: {
      label: fieldsData["theme_elaboration"].label[lang],
      placeholder: fieldsData["theme_elaboration"].placeholder[lang],
    },
    duo_talk_preference: {
      label: fieldsData["duo_talk_preference"].label[lang],
      placeholder: fieldsData["duo_talk_preference"].placeholder[lang],
    },
    partner_name_and_relationship: {
      label: fieldsData["partner_name_and_relationship"].label[lang],
      placeholder:
        fieldsData["partner_name_and_relationship"].placeholder[lang],
    },
    interview_preference: {
      label: fieldsData["interview_preference"].label[lang],
      placeholder: fieldsData["interview_preference"].placeholder[lang],
    },
    additional_info: {
      label: fieldsData["additional_info"].label[lang],
      placeholder: fieldsData["additional_info"].placeholder[lang],
    },
  } as const;

  let step = ""
  if (lang === "EN") step = 'step'
  else if (lang === "FR") step = 'Etape'
  else if (lang === "AR") step = 'خطوة'

  let next = ""
  if (lang === "EN") next = 'Next Step'
  else if (lang === "FR") step = 'Etape Suivante'
  else if (lang === "AR") step = 'الخطوة التالية'


  const getLabel = (fieldName: Fields) => a[fieldName].label;
  const getPlaceholder = (fieldName: Fields) => a[fieldName].placeholder;

  return { getLabel, getPlaceholder, next, step };
};

export type SchemaPartOne = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;

  discord_username: string;
  date_of_birth: string;

  wilaya: string;

  is_student: "yes" | "no";

  university?: string;
  degree_and_major?: string;
  occupation?: string;
};


export type SchemaPartTwo = {
  knowledge_about_ignite: string;
  motivation: string;

  how_heard: "social_media" | "friend" | "other";

  has_public_speaking_experience: "yes" | "no";
  public_speaking_experience?: string;

  presentation_language: string;

  talk_category: string;
  presentation_theme: string;
  theme_elaboration: string;
};

export type SchemaPartThree = {
  duo_talk_preference: "yes_with_partner" | "no_solo" | "no_but_open";
  partner_name_and_relationship?: string;
  interview_preference: "online" | "in_person";
  additional_info?: string;
};

export type FullSchema = SchemaPartOne & SchemaPartTwo & SchemaPartThree

type Step = 0 | 1 | 2 | 3;
type Lang = "AR" | "FR" | "EN" | null;

type FormStore = {
  lang: Lang;
  step: Step;
  partOne: SchemaPartOne;
  partTwo: SchemaPartTwo;
  partThree: SchemaPartThree;
  setPartOne: (data: SchemaPartOne) => void;
  setPartTwo: (data: SchemaPartTwo) => void;
  setPartThree: (data: SchemaPartThree) => void;
  setStep: (n: Step) => void;
  setLang: (lang: Lang) => void;
};

export const formStore = create<FormStore>((set) => ({
  step: 0,
  lang: null,
  partOne: {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    discord_username: "",
    date_of_birth: "",
    wilaya: "",
    is_student: "no",
    university: undefined,
    degree_and_major: undefined,
    occupation: undefined,
  },
  partTwo: {
    knowledge_about_ignite: "",
    motivation: "",
    how_heard: "social_media",
    has_public_speaking_experience: "no",
    public_speaking_experience: undefined,
    presentation_language: "",
    talk_category: "",
    presentation_theme: "",
    theme_elaboration: "",
  },
  partThree: {
    duo_talk_preference: "no_solo",
    partner_name_and_relationship: undefined,
    interview_preference: "online",
    additional_info: undefined,
  },
  setPartOne: (data: SchemaPartOne) => set({ partOne: data }),
  setPartTwo: (data: SchemaPartTwo) => set({ partTwo: data }),
  setPartThree: (data: SchemaPartThree) => set({ partThree: data }),
  setStep: (n) => set({ step: n }),
  setLang: (lang) => set({ lang }),
}));
