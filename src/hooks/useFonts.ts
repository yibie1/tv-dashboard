import * as ExpoFont from 'expo-font';

export function useAppFonts() {
  const [fontsLoaded, fontError] = ExpoFont.useFonts({
    AppText: require('../../assets/fonts/text.ttf'),
    AppClock: require('../../assets/fonts/clock.ttf'),
  });

  return { fontsLoaded, fontError };
}

// Font family name constants — import these wherever you need them
export const Fonts = {
  text: 'AppText',
  clock: 'AppClock',
} as const;
