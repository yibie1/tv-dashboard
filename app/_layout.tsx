import { Stack } from 'expo-router';
import { Colors } from '../src/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.bgPrimary },
        animation: 'fade',
      }}
    />
  );
}
