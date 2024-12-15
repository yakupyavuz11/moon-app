import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import tr from './locales/tr.json';

const resources = { // list of languages
  en,
  tr,
};

i18n.use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'en', // Varsayılan dil İngilizce olarak ayarlanmış
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
