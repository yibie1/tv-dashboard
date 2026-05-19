import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnalogClock } from './AnalogClock';
import { useClock } from '../../hooks/useClock';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Fonts } from '../../hooks/useFonts';

export function ClockWidget() {
  const { hours, minutes, seconds, addisTime, londonTime, dubaiTime } = useClock();

  const clocks = [
    { label: 'አዲስ አበባ', time: addisTime, color: Colors.gold },
    { label: 'ለንደን', time: londonTime, color: Colors.emeraldLight },
    { label: 'ዱባይ', time: dubaiTime, color: Colors.warmOrange },
  ];

  return (
    <LinearGradient
      colors={['rgba(20,14,4,0.92)', 'rgba(10,10,10,0.95)']}
      style={styles.container}
    >
      <Text style={styles.title}>የዓለም ሰዓት</Text>
      <View style={styles.clocksRow}>
        {clocks.map((c, i) => (
          <View key={i} style={styles.clockItem}>
            <AnalogClock
              size={68}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              color={c.color}
            />
            <Text style={[styles.timeLabel, { color: c.color }]}>{c.time}</Text>
            <Text style={styles.cityLabel}>{c.label}</Text>
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
  },
  title: {
    fontSize: 12,
    color: Colors.gold,
    fontFamily: Fonts.text,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  clocksRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  clockItem: {
    alignItems: 'center',
    gap: 4,
  },
  timeLabel: {
    fontSize: 12,
    fontFamily: Fonts.clock,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cityLabel: {
    fontSize: 10,
    fontFamily: Fonts.text,
    color: Colors.textMuted,
  },
});
