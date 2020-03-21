import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {reactI18nextModule} from 'react-i18next';

import translationEN from './locales/en/content.json';
import translationJA from './locales/ja/content.json';

// the translations
const resources = {
  en: {
  translation: translationEN
},
ja: {
  translation: translationJA
}
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(reactI18nextModule)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
