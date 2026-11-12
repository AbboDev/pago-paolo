import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from './types';

const LANGUAGE_STORAGE_KEY = 'user_preferred_language';

export async function getStoredLanguage(): Promise<SupportedLanguage | null> {
  try {
    let raw: string | null = null;
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') {
        raw = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      }
    } else {
      raw = await SecureStore.getItemAsync(LANGUAGE_STORAGE_KEY);
    }
    if (raw && (SUPPORTED_LANGUAGES as readonly string[]).includes(raw)) {
      return raw as SupportedLanguage;
    }
  } catch (error) {
    console.warn('[i18n] Failed to load stored language:', error);
  }
  return null;
}

export async function setStoredLanguage(
  lang: SupportedLanguage
): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      }
    } else {
      await SecureStore.setItemAsync(LANGUAGE_STORAGE_KEY, lang);
    }
  } catch (error) {
    console.warn('[i18n] Failed to persist language:', error);
  }
}
