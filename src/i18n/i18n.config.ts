import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, tr, fr, esp, ar, de, hi, zh } from ".";

const resources = {
  en: {
    translation: en,
  },

  tr: {
    translation: tr,
  },
  fr: {
    translation: fr,
  },
  esp: {
    translation: esp,
  },
  ar: {
    translations: ar,
  },
  de: {
    translations: de,
  },

  hi: {
    translations: hi,
  },
  zh: {
    translations: zh,
  },
};

i18next.use(initReactI18next).init({
  debug: true,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18next;
