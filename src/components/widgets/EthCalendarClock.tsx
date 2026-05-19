import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnalogClock } from './AnalogClock';
import { useClock } from '../../hooks/useClock';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Fonts } from '../../hooks/useFonts';
import { ETH_MONTHS, ETH_NUMBERS } from '../../utils/ethiopianCalendar';

// Mini calendar grid — shows current Ethiopian month
function MiniCalendar({ month, year, today }: { month: number; year: number; today: number }) {
  const days = month === 13 ? 5 : 30;
  // Ethiopian week starts on Sunday (same as Gregorian)
  // We show a compact 5-column grid of days
  const cells = Array.from({ length: days }, (_, i) => i + 1);

  return (
    <View style={cal.grid}>
      {cells.map((d) => (
        <View key={d} style={[cal.cell, d === today && cal.cellToday]}>
          <Text style={[cal.cellText, d === today && cal.cellTextToday]}>
            {ETH_NUMBERS[d] ?? d}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function EthCalendarClock() {
  const { hours, minutes, seconds, ethiopianDate } = useClock();

  return (
    <LinearGradient
      colors={['rgba(20,14,4,0.95)', 'rgba(10,10,10,0.98)']}
      style={styles.container}
    >
      {/* Top: Ge'ez analog clock */}
      <View style={styles.clockRow}>
        <AnalogClock
          size={110}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          color={Colors.gold}
          showGeez
        />
        <View style={styles.clockInfo}>
          <Text style={styles.dayName}>{ethiopianDate.dayName}</Text>
          <Text style={styles.ethDate}>{ethiopianDate.formatted}</Text>
          <View style={styles.monthBadge}>
            <Text style={styles.monthName}>{ETH_MONTHS[ethiopianDate.month - 1]}</Text>
            <Text style={styles.yearText}>{ethiopianDate.year} ዓ.ም.</Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Mini calendar */}
      <Text style={styles.calTitle}>
        {ETH_MONTHS[ethiopianDate.month - 1]} {ethiopianDate.year}
      </Text>
      <MiniCalendar
        month={ethiopianDate.month}
        year={ethiopianDate.year}
        today={ethiopianDate.day}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
  },
  clockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  clockInfo: { flex: 1, gap: 4 },
  dayName: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: Colors.gold,
    fontWeight: '700',
  },
  ethDate: {
    fontSize: 13,
    fontFamily: Fonts.text,
    color: Colors.textPrimary,
  },
  monthBadge: {
    backgroundColor: 'rgba(212,160,23,0.12)',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  monthName: {
    fontSize: 12,
    fontFamily: Fonts.text,
    color: Colors.gold,
    fontWeight: '700',
  },
  yearText: {
    fontSize: 10,
    fontFamily: Fonts.text,
    color: Colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderGlass,
    marginVertical: Spacing.sm,
  },
  calTitle: {
    fontSize: 11,
    fontFamily: Fonts.text,
    color: Colors.gold,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: Spacing.xs,
  },
});

const cal = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  cell: {
    width: 22,
    height: 22,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  cellToday: {
    backgroundColor: Colors.gold,
  },
  cellText: {
    fontSize: 9,
    fontFamily: Fonts.text,
    color: Colors.textMuted,
  },
  cellTextToday: {
    color: Colors.bgPrimary,
    fontWeight: '700',
  },
});
