import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { useCallback } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';

import en from './locales/en';
import it from './locales/it';
import { getStoredLanguage, setStoredLanguage } from './storage';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from './types';

export * from './types';
export { useTranslation };

export const defaultLanguage: SupportedLanguage = 'it';

export const resources = {
  it: { translation: it },
  en: { translation: en },
} as const;

export function getDeviceLanguage(): SupportedLanguage {
  try {
    const locales = Localization.getLocales();
    const primary = locales[0]?.languageCode;
    if (
      primary &&
      (SUPPORTED_LANGUAGES as readonly string[]).includes(primary)
    ) {
      return primary as SupportedLanguage;
    }
  } catch (err) {
    console.warn('[i18n] Failed to read device locale:', err);
  }
  return defaultLanguage;
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export async function initLanguage(): Promise<SupportedLanguage> {
  const saved = await getStoredLanguage();
  if (saved && saved !== i18n.language) {
    await i18n.changeLanguage(saved);
    return saved;
  }
  return (i18n.language as SupportedLanguage) || defaultLanguage;
}

export async function changeLanguage(lang: SupportedLanguage): Promise<void> {
  await setStoredLanguage(lang);
  await i18n.changeLanguage(lang);
}

export function useAppLanguage() {
  const { t, i18n: i18nInstance } = useTranslation();
  const currentLanguage =
    (i18nInstance.language as SupportedLanguage) || defaultLanguage;

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    return changeLanguage(lang);
  }, []);

  return {
    t,
    currentLanguage,
    setLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isItalian: currentLanguage === 'it',
    isEnglish: currentLanguage === 'en',
  };
}

export default i18n;
