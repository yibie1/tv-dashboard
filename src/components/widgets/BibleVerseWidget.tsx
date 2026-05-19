import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Fonts } from '../../hooks/useFonts';

const DAILY_VERSE = {
  text: '"እናንተ ብርሃን ናችሁ፤ ብርሃናችሁ ይብራ፤ ሰዎችም መልካም ሥራችሁን አይተው በሰማያት ያለውን አባታችሁን ያከብሩ።"',
  reference: 'ማቴዎስ 5:16',
};

export function BibleVerseWidget() {
  return (
    <LinearGradient
      colors={['rgba(10,20,10,0.92)', 'rgba(10,10,10,0.95)']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.crossIcon}>☩</Text>
        <Text style={styles.title}>ዕለታዊ ቃለ እግዚአብሔር</Text>
      </View>
      <Text style={styles.verseText}>{DAILY_VERSE.text}</Text>
      <Text style={styles.reference}>{DAILY_VERSE.reference}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.emeraldGlow,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  crossIcon: {
    fontSize: 16,
    color: Colors.gold,
  },
  title: {
    fontSize: 12,
    fontFamily: Fonts.text,
    color: Colors.gold,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  verseText: {
    fontSize: 13,
    fontFamily: Fonts.text,
    color: Colors.textSecondary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  reference: {
    fontSize: 12,
    fontFamily: Fonts.text,
    color: Colors.emeraldLight,
    fontWeight: '700',
    marginTop: Spacing.sm,
  },
});
