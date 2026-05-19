import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from '../src/navigation/AppNavigator';
import { Colors } from '../src/theme';
import { useAppInit } from '../src/hooks/useAppInit';
import { useAppFonts } from '../src/hooks/useFonts';

function AppRoot() {
  const { fontsLoaded } = useAppFonts();
  useAppInit();

  // Wait for fonts before rendering — avoids flash of unstyled text
  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.gold} size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" hidden />
        <AppNavigator />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default AppRoot;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  safe: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  loading: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
