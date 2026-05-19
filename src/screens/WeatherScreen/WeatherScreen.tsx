import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { useClock } from '../../hooks/useClock';
import { Fonts } from '../../hooks/useFonts';

const HOURLY = [
  { time: '06:00', icon: '🌅', temp: 16 },
  { time: '09:00', icon: '☀', temp: 19 },
  { time: '12:00', icon: '☀', temp: 23 },
  { time: '15:00', icon: '⛅', temp: 22 },
  { time: '18:00', icon: '🌥', temp: 20 },
  { time: '21:00', icon: '🌙', temp: 17 },
];

const WEEKLY = [
  { day: 'ሰኞ', icon: '☀', high: 24, low: 15 },
  { day: 'ማክሰኞ', icon: '⛅', high: 22, low: 14 },
  { day: 'ረቡዕ', icon: '🌧', high: 19, low: 13 },
  { day: 'ሐሙስ', icon: '⛅', high: 21, low: 14 },
  { day: 'ዓርብ', icon: '☀', high: 25, low: 16 },
  { day: 'ቅዳሜ', icon: '☀', high: 26, low: 17 },
  { day: 'እሑድ', icon: '⛅', high: 23, low: 15 },
];

export function WeatherScreen() {
  const { timeString } = useClock();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>የአየር ሁኔታ</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero weather card */}
        <LinearGradient
          colors={['rgba(10,30,20,0.95)', 'rgba(10,10,10,0.98)']}
          style={styles.heroCard}
        >
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.cityName}>አዲስ አበባ</Text>
              <Text style={styles.countryName}>ኢትዮጵያ</Text>
              <Text style={styles.currentTime}>{timeString}</Text>
            </View>
            <Text style={styles.heroIcon}>⛅</Text>
          </View>
          <Text style={styles.heroTemp}>22°C</Text>
          <Text style={styles.heroCondition}>ከፊል ደመናማ</Text>
          <View style={styles.heroDetails}>
            {[
              { label: 'እርጥበት', value: '65%', icon: '💧' },
              { label: 'ነፋስ', value: '12 km/h', icon: '💨' },
              { label: 'ዝናብ', value: '20%', icon: '🌧' },
              { label: 'UV', value: '5', icon: '☀' },
            ].map((d) => (
              <View key={d.label} style={styles.detailItem}>
                <Text style={styles.detailIcon}>{d.icon}</Text>
                <Text style={styles.detailValue}>{d.value}</Text>
                <Text style={styles.detailLabel}>{d.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Hourly forecast */}
        <Text style={styles.sectionTitle}>የሰዓት ትንበያ</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
          {HOURLY.map((h) => (
            <View key={h.time} style={styles.hourlyCard}>
              <Text style={styles.hourlyTime}>{h.time}</Text>
              <Text style={styles.hourlyIcon}>{h.icon}</Text>
              <Text style={styles.hourlyTemp}>{h.temp}°</Text>
            </View>
          ))}
        </ScrollView>

        {/* Weekly forecast */}
        <Text style={styles.sectionTitle}>ሳምንታዊ ትንበያ</Text>
        {WEEKLY.map((w) => (
          <View key={w.day} style={styles.weeklyRow}>
            <Text style={styles.weeklyDay}>{w.day}</Text>
            <Text style={styles.weeklyIcon}>{w.icon}</Text>
            <View style={styles.weeklyTemps}>
              <Text style={styles.weeklyHigh}>{w.high}°</Text>
              <Text style={styles.weeklyLow}>{w.low}°</Text>
            </View>
          </View>
        ))}

        {/* Sunrise/Sunset */}
        <LinearGradient
          colors={['rgba(200,90,0,0.15)', 'rgba(10,10,10,0.9)']}
          style={styles.sunCard}
        >
          <View style={styles.sunRow}>
            <View style={styles.sunItem}>
              <Text style={styles.sunIcon}>🌅</Text>
              <Text style={styles.sunLabel}>ፀሐይ መውጣት</Text>
              <Text style={styles.sunTime}>06:12 AM</Text>
            </View>
            <View style={styles.sunDivider} />
            <View style={styles.sunItem}>
              <Text style={styles.sunIcon}>🌇</Text>
              <Text style={styles.sunLabel}>ፀሐይ መጥለቅ</Text>
              <Text style={styles.sunTime}>06:48 PM</Text>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary, padding: Spacing.lg },
  pageTitle: { ...Typography.sectionTitle, fontSize: 28, marginBottom: Spacing.lg },
  heroCard: {
    borderRadius: BorderRadius.xl, padding: Spacing.xl,
    borderWidth: 1, borderColor: Colors.borderGlass, marginBottom: Spacing.lg,
  },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  cityName: { fontSize: 24, fontWeight: '700', fontFamily: Fonts.text, color: Colors.textPrimary },
  countryName: { fontSize: 14, fontFamily: Fonts.text, color: Colors.textMuted },
  currentTime: { fontSize: 12, fontFamily: Fonts.clock, color: Colors.textMuted, marginTop: 4 },
  heroIcon: { fontSize: 64 },
  heroTemp: { fontSize: 72, fontFamily: Fonts.clock, color: Colors.textPrimary, letterSpacing: -2 },
  heroCondition: { fontSize: 18, color: Colors.textSecondary, marginBottom: Spacing.lg },
  heroDetails: { flexDirection: 'row', justifyContent: 'space-between' },
  detailItem: { alignItems: 'center', gap: 4 },
  detailIcon: { fontSize: 20 },
  detailValue: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  detailLabel: { fontSize: 10, color: Colors.textMuted },
  sectionTitle: { ...Typography.sectionTitle, fontSize: 13, marginBottom: Spacing.md, marginTop: Spacing.md },
  hourlyScroll: { marginBottom: Spacing.md },
  hourlyCard: {
    alignItems: 'center', gap: Spacing.sm,
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    backgroundColor: Colors.bgCard, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.borderGlass, marginRight: Spacing.sm,
  },
  hourlyTime: { fontSize: 11, fontFamily: Fonts.clock, color: Colors.textMuted },
  hourlyIcon: { fontSize: 24 },
  hourlyTemp: { fontSize: 16, fontFamily: Fonts.clock, fontWeight: '700', color: Colors.textPrimary },
  weeklyRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.borderGlass,
  },
  weeklyDay: { flex: 1, fontSize: 15, fontFamily: Fonts.text, color: Colors.textPrimary, fontWeight: '600' },
  weeklyIcon: { fontSize: 24, marginHorizontal: Spacing.lg },
  weeklyTemps: { flexDirection: 'row', gap: Spacing.md },
  weeklyHigh: { fontSize: 15, fontFamily: Fonts.clock, fontWeight: '700', color: Colors.textPrimary },
  weeklyLow: { fontSize: 15, fontFamily: Fonts.clock, color: Colors.textMuted },
  sunCard: {
    borderRadius: BorderRadius.lg, padding: Spacing.lg,
    borderWidth: 1, borderColor: Colors.borderGlass, marginTop: Spacing.lg,
  },
  sunRow: { flexDirection: 'row', alignItems: 'center' },
  sunItem: { flex: 1, alignItems: 'center', gap: 4 },
  sunIcon: { fontSize: 32 },
  sunLabel: { fontSize: 12, color: Colors.textMuted },
  sunTime: { fontSize: 18, fontFamily: Fonts.clock, fontWeight: '700', color: Colors.warmOrange },
  sunDivider: { width: 1, height: 60, backgroundColor: Colors.borderGlass },
});
