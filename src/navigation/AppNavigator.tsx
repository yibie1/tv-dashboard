import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, AppState } from 'react-native';
import { Sidebar } from '../components/sidebar/Sidebar';
import { AmbientMode } from '../components/ambient/AmbientMode';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { MusicScreen } from '../screens/MusicScreen/MusicScreen';
import { BibleScreen } from '../screens/BibleScreen/BibleScreen';
import { NewsScreen } from '../screens/NewsScreen/NewsScreen';
import { SettingsScreen } from '../screens/SettingsScreen/SettingsScreen';
import { VideoScreen } from '../screens/VideoScreen/VideoScreen';
import { CalendarScreen } from '../screens/CalendarScreen/CalendarScreen';
import { RadioScreen } from '../screens/RadioScreen/RadioScreen';
import { WeatherScreen } from '../screens/WeatherScreen/WeatherScreen';
import { useAppStore } from '../store/appStore';
import { Colors } from '../theme';

// Auto-trigger ambient mode after 3 minutes of inactivity
const AMBIENT_TIMEOUT_MS = 3 * 60 * 1000;

function ActiveScreen() {
  const { activeNav } = useAppStore();
  switch (activeNav) {
    case 'home':     return <HomeScreen />;
    case 'music':    return <MusicScreen />;
    case 'bible':    return <BibleScreen />;
    case 'news':     return <NewsScreen />;
    case 'settings': return <SettingsScreen />;
    case 'video':    return <VideoScreen />;
    case 'calendar': return <CalendarScreen />;
    case 'radio':    return <RadioScreen />;
    case 'weather':  return <WeatherScreen />;
    default:         return <HomeScreen />;
  }
}

export function AppNavigator() {
  const { isAmbientMode, setAmbientMode } = useAppStore();
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (isAmbientMode) setAmbientMode(false);
    inactivityTimer.current = setTimeout(() => setAmbientMode(true), AMBIENT_TIMEOUT_MS);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  return (
    <View style={styles.root} onTouchStart={resetTimer}>
      <Sidebar />
      <View style={styles.content}>
        <ActiveScreen />
      </View>
      {isAmbientMode && <AmbientMode />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.bgPrimary,
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
});
