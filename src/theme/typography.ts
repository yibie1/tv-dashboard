import { StyleSheet } from 'react-native';
import { Colors } from './colors';
import { Fonts } from '../hooks/useFonts';

export const Typography = StyleSheet.create({
  // Display / Hero
  heroTitle: {
    fontFamily: Fonts.text,
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 1.2,
    lineHeight: 42,
  },
  heroSubtitle: {
    fontFamily: Fonts.text,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },

  // Section headings
  sectionTitle: {
    fontFamily: Fonts.text,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  sectionSubtitle: {
    fontFamily: Fonts.text,
    fontSize: 14,
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },

  // Card text
  cardTitle: {
    fontFamily: Fonts.text,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  cardSubtitle: {
    fontFamily: Fonts.text,
    fontSize: 12,
    color: Colors.textSecondary,
  },

  // Amharic / Ethiopian text
  amharicLarge: {
    fontFamily: Fonts.text,
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 44,
  },
  amharicMedium: {
    fontFamily: Fonts.text,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 30,
  },
  amharicSmall: {
    fontFamily: Fonts.text,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  // Sidebar
  sidebarLabel: {
    fontFamily: Fonts.text,
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  sidebarLabelActive: {
    fontFamily: Fonts.text,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.gold,
    letterSpacing: 0.5,
  },

  // Widget
  widgetValue: {
    fontFamily: Fonts.text,
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  widgetLabel: {
    fontFamily: Fonts.text,
    fontSize: 11,
    color: Colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  // Time — uses clock font
  timeDisplay: {
    fontFamily: Fonts.clock,
    fontSize: 36,
    color: Colors.textPrimary,
    letterSpacing: 2,
  },
  dateDisplay: {
    fontFamily: Fonts.text,
    fontSize: 14,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
});
