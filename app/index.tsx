import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background p-4">
      <Text className="text-xl font-bold">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Button>
        <Text>Button</Text>
      </Button>
    </View>
  );
}
