import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAppLanguage } from '@/lib/i18n';

export default function Index() {
  const { t, currentLanguage, setLanguage } = useAppLanguage();

  const toggleLanguage = () => {
    const nextLanguage = currentLanguage === 'it' ? 'en' : 'it';
    setLanguage(nextLanguage);
  };

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background p-6">
      <Text className="text-3xl font-extrabold text-foreground">
        {t('home.title')}
      </Text>
      <Text className="text-center text-base text-muted-foreground">
        {t('home.subtitle')}
      </Text>
      <Text className="text-center text-sm text-muted-foreground">
        {t('home.editPrompt')}
      </Text>
      <Button onPress={toggleLanguage} className="mt-4">
        <Text>
          {t('common.switchTo', {
            lang: currentLanguage === 'it' ? 'English' : 'Italiano',
          })}
        </Text>
      </Button>
      <Text className="text-xs text-muted-foreground">
        {t('common.currentLanguage', {
          lang: currentLanguage === 'it' ? 'Italiano' : 'English',
        })}
      </Text>
    </View>
  );
}
