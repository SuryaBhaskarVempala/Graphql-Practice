import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "title": "Dashboard",
        "users": "Users List",
        "stats": "Statistics",
        "lang_english": "English",
        "lang_arabic": "Arabic",
        "name" : "name"
      },
    },
    ar: {
      translation: {
        "title": "لوحة التحكم",
        "users": "قائمة المستخدمين",
        "stats": "إحصائيات",
        "lang_english": "الإنجليزية",
        "lang_arabic": "العربية",
        "name" : "الاسم"
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
