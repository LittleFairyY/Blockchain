import i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

export enum I18nLanguages {
  Chinese = 'zh',
  English = 'en',
  JP = 'JP',
  KP = 'KP',
}

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    resources: {
      zh: { translation: require('./translations/zh.json').translations },
      en: { translation: require('./translations/en.json').translations },
      JP: { translation: require('./translations/JP.json').translations },
      KP: { translation: require('./translations/KP.json').translations },
    },
    fallbackLng: 'en',
    ns: ['translations'],
    debug: process.env.NODE_ENV !== 'production',
    react: {
      wait: true,
    },
  });

export default i18n;
