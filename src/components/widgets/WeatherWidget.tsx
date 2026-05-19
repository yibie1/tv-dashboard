import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { useAppStore } from '../../store/appStore';
import { Fonts } from '../../hooks/useFonts';

const FORECAST = [
  { day: 'ሰ', icon: '☀', temp: 23 },
  { day: 'ማ', icon: '⛅', temp: 21 },
  { day: 'ረ', icon: '⛅', temp: 22 },
  { day: 'ሐ', icon: '🌧', temp: 20 },
  { day: 'ዓ', icon: '☀', temp: 24 },
];

export function WeatherWidget() {
  const { weather } = useAppStore();

  return (
    <LinearGradient
      colors={['rgba(10,20,14,0.92)', 'rgba(10,10,10,0.95)']}
      style={styles.container}
    >
      <Text style={styles.title}>የአየር ሁኔታ ትንበያ</Text>

      {/* Main temp */}
      <View style={styles.mainRow}>
        <View>
          <Text style={styles.temp}>{weather?.temp}°C</Text>
          <Text style={styles.city}>{weather?.city}</Text>
          <Text style={styles.condition}>{weather?.condition}</Text>
        </View>
        <Text style={styles.mainIcon}>⛅</Text>
      </View>

      {/* Forecast row */}
      <View style={styles.forecastRow}>
        {FORECAST.map((f, i) => (
          <View key={i} style={styles.forecastItem}>
            <Text style={styles.forecastDay}>{f.day}</Text>
            <Text style={styles.forecastIcon}>{f.icon}</Text>
            <Text style={styles.forecastTemp}>{f.temp}°</Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderGlass,
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontFamily: Fonts.text,
    color: Colors.emeraldLight,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  temp: {
    fontSize: 36,
    fontFamily: Fonts.clock,
    color: Colors.textPrimary,
    letterSpacing: 1,
  },
  city: {
    fontSize: 13,
    fontFamily: Fonts.text,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  condition: {
    fontSize: 11,
    fontFamily: Fonts.text,
    color: Colors.textMuted,
  },
  mainIcon: {
    fontSize: 40,
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.borderGlass,
    paddingTop: Spacing.sm,
  },
  forecastItem: {
    alignItems: 'center',
    gap: 2,
  },
  forecastDay: {
    fontSize: 11,
    fontFamily: Fonts.text,
    color: Colors.textMuted,
  },
  forecastIcon: {
    fontSize: 16,
  },
  forecastTemp: {
    fontSize: 12,
    fontFamily: Fonts.clock,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
