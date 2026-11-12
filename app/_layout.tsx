import '../global.css';

import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { initLanguage } from '@/lib/i18n';
import { NAV_THEME } from '@/lib/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  useEffect(() => {
    initLanguage();
  }, []);

  return (
    <ThemeProvider value={NAV_THEME[colorScheme]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack />
      <PortalHost />
    </ThemeProvider>
  );
}
