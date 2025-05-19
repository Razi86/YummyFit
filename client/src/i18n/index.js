import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./en.json";
import translationTR from "./tr.json";
import translationES from "./es.json";
import translationFR from "./fr.json";
import translationDE from "./de.json";
import translationIT from "./it.json";
import translationZH from "./zh.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    tr: {
      translation: translationTR,
    },
    es: {
      translation: translationES,
    },
    fr: {
      translation: translationFR,
    },
    de: {
      translation: translationDE,
    },
    it: {
      translation: translationIT,
    },
    zh: {
      translation: translationZH,
    },
  },
  lng: "en", 
  fallbackLng: "en", 
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;