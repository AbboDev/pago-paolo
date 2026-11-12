import 'i18next';
import type it from './locales/it';

export const SUPPORTED_LANGUAGES = ['it', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export type TranslationResource = typeof it;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: TranslationResource;
    };
  }
}
