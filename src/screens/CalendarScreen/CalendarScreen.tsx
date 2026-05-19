import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { toEthiopian, ETH_MONTHS, ETH_DAYS, getEthiopianHolidays } from '../../utils/ethiopianCalendar';
import { Fonts } from '../../hooks/useFonts';

const FASTING_DAYS = [1, 4, 12, 17, 25];
const HOLIDAY_DAYS = [1, 17, 29];

function CalendarGrid({ month, year }: { month: number; year: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const daysInMonth = month === 13 ? 5 : 30;
  const today = toEthiopian(new Date());

  return (
    <View style={styles.grid}>
      {ETH_DAYS.map((d) => (
        <View key={d} style={styles.dayHeader}>
          <Text style={styles.dayHeaderText}>{d.slice(0, 2)}</Text>
        </View>
      ))}
      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
        const isFasting = FASTING_DAYS.includes(day);
        const isHoliday = HOLIDAY_DAYS.includes(day);
        const isSelected = selected === day;
        const isToday = day === today.day && month === today.month && year === today.year;
        return (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayCell,
              isToday && styles.dayCellToday,
              isSelected && !isToday && styles.dayCellSelected,
              isHoliday && !isToday && styles.dayCellHoliday,
            ]}
            onPress={() => setSelected(day)}
          >
            <Text style={[
              styles.dayCellText,
              isToday && styles.dayCellTextToday,
              isHoliday && !isToday && styles.dayCellTextHoliday,
            ]}>
              {day}
            </Text>
            {isFasting && <View style={styles.fastingDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function CalendarScreen() {
  const today = toEthiopian(new Date());
  const [viewMonth, setViewMonth] = useState(today.month);
  const [viewYear, setViewYear] = useState(today.year);
  const holidays = getEthiopianHolidays();

  const prevMonth = () => {
    if (viewMonth === 1) { setViewMonth(13); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 13) { setViewMonth(1); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>ቀን መቁጠሪያ</Text>
      <View style={styles.layout}>
        <View style={styles.calendarPanel}>
          <LinearGradient
            colors={['rgba(20,14,4,0.95)', 'rgba(10,10,10,0.98)']}
            style={styles.calendarCard}
          >
            <View style={styles.monthNav}>
              <TouchableOpacity style={styles.navBtn} onPress={prevMonth}>
                <Text style={styles.navBtnText}>‹</Text>
              </TouchableOpacity>
              <View style={styles.monthInfo}>
                <Text style={styles.monthName}>{ETH_MONTHS[viewMonth - 1]}</Text>
                <Text style={styles.yearText}>{viewYear} ዓ.ም.</Text>
              </View>
              <TouchableOpacity style={styles.navBtn} onPress={nextMonth}>
                <Text style={styles.navBtnText}>›</Text>
              </TouchableOpacity>
            </View>
            <CalendarGrid month={viewMonth} year={viewYear} />
            <View style={styles.legend}>
              {[
                { color: Colors.gold, label: 'ዛሬ' },
                { color: Colors.crimson, label: 'በዓል' },
                { color: Colors.emerald, label: 'ጾም' },
              ].map((l) => (
                <View key={l.label} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: l.color }]} />
                  <Text style={styles.legendText}>{l.label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        <View style={styles.infoPanel}>
          <LinearGradient
            colors={['rgba(212,160,23,0.15)', 'rgba(10,10,10,0.9)']}
            style={styles.todayCard}
          >
            <Text style={styles.todayLabel}>ዛሬ</Text>
            <Text style={styles.todayDate}>{today.formatted}</Text>
            <Text style={styles.todayGregorian}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              })}
            </Text>
            <Text style={styles.todayDay}>{today.dayName}</Text>
          </LinearGradient>

          <Text style={styles.holidaysTitle}>ዓመታዊ በዓላት</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {holidays.map((h, i) => (
              <View key={i} style={styles.holidayRow}>
                <View style={styles.holidayDot} />
                <View>
                  <Text style={styles.holidayName}>{h.name}</Text>
                  <Text style={styles.holidayDate}>{ETH_MONTHS[h.month - 1]} {h.day}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary, padding: Spacing.lg },
  pageTitle: { ...Typography.sectionTitle, fontSize: 28, marginBottom: Spacing.lg },
  layout: { flex: 1, flexDirection: 'row', gap: Spacing.lg },
  calendarPanel: { flex: 1 },
  calendarCard: {
    borderRadius: BorderRadius.xl, padding: Spacing.lg,
    borderWidth: 1, borderColor: Colors.goldBorder,
  },
  monthNav: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: Spacing.lg,
  },
  navBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(212,160,23,0.1)',
    borderWidth: 1, borderColor: Colors.goldBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  navBtnText: { fontSize: 22, fontFamily: Fonts.text, color: Colors.gold },
  monthInfo: { alignItems: 'center' },
  monthName: { fontSize: 26, fontFamily: Fonts.text, fontWeight: '700', color: Colors.gold },
  yearText: { fontSize: 13, fontFamily: Fonts.clock, color: Colors.textMuted, marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  dayHeader: { width: '13%', alignItems: 'center', paddingVertical: Spacing.xs },
  dayHeaderText: { fontSize: 11, fontFamily: Fonts.text, color: Colors.textMuted, fontWeight: '700' },
  dayCell: {
    width: '13%', aspectRatio: 1,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: BorderRadius.sm, position: 'relative',
  },
  dayCellToday: { backgroundColor: Colors.gold },
  dayCellSelected: {
    backgroundColor: 'rgba(212,160,23,0.2)',
    borderWidth: 1, borderColor: Colors.goldBorder,
  },
  dayCellHoliday: { backgroundColor: 'rgba(139,26,26,0.2)' },
  dayCellText: { fontSize: 14, fontFamily: Fonts.clock, color: Colors.textSecondary, fontWeight: '500' },
  dayCellTextToday: { color: Colors.bgPrimary, fontWeight: '700' },
  dayCellTextHoliday: { color: Colors.crimson },
  fastingDot: {
    position: 'absolute', bottom: 2,
    width: 4, height: 4, borderRadius: 2,
    backgroundColor: Colors.emerald,
  },
  legend: { flexDirection: 'row', gap: Spacing.lg, marginTop: Spacing.lg, justifyContent: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, fontFamily: Fonts.text, color: Colors.textMuted },
  infoPanel: { width: 280 },
  todayCard: {
    borderRadius: BorderRadius.lg, padding: Spacing.lg,
    borderWidth: 1, borderColor: Colors.goldBorder, marginBottom: Spacing.lg,
  },
  todayLabel: { fontSize: 11, fontFamily: Fonts.text, color: Colors.gold, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  todayDate: { fontSize: 22, fontFamily: Fonts.text, fontWeight: '700', color: Colors.textPrimary, marginTop: Spacing.sm },
  todayGregorian: { fontSize: 12, fontFamily: Fonts.text, color: Colors.textMuted, marginTop: 4 },
  todayDay: { fontSize: 16, fontFamily: Fonts.text, color: Colors.gold, fontWeight: '600', marginTop: Spacing.sm },
  holidaysTitle: { ...Typography.sectionTitle, fontSize: 13, marginBottom: Spacing.md },
  holidayRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1, borderBottomColor: Colors.borderGlass,
  },
  holidayDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.gold },
  holidayName: { fontSize: 14, fontFamily: Fonts.text, color: Colors.textPrimary, fontWeight: '600' },
  holidayDate: { fontSize: 11, fontFamily: Fonts.text, color: Colors.textMuted, marginTop: 2 },
});
