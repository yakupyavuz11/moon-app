import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, tr } from ".";

const resources = {
  en: {
    translation: en,
  },

  tr: {
    translation: tr,
  },
}

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