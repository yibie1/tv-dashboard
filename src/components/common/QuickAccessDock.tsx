import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { useFocusAnimation } from '../../hooks/useFocusAnimation';
import { Animated } from 'react-native';
import { Fonts } from '../../hooks/useFonts';

const QUICK_ITEMS = [
  { icon: '▶', label: 'YouTube', color: '#FF0000' },
  { icon: '📻', label: 'BBC', color: '#BB1919' },
  { icon: '✝', label: 'ቤተ ክርስቲያን', color: Colors.gold },
  { icon: '♪', label: 'ሬዲዮ', color: Colors.emeraldLight },
  { icon: '+', label: 'ተጨማሪ', color: Colors.textMuted },
];

function DockItem({ item }: { item: typeof QUICK_ITEMS[0] }) {
  const { scale, glowOpacity, onFocus, onBlur } = useFocusAnimation(1.12);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.dockItem}
        onFocus={onFocus}
        onBlur={onBlur}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.dockGlow, { opacity: glowOpacity, backgroundColor: `${item.color}30` }]} />
        <View style={[styles.dockIconBg, { borderColor: `${item.color}60` }]}>
          <Text style={[styles.dockIcon, { color: item.color }]}>{item.icon}</Text>
        </View>
        <Text style={styles.dockLabel}>{item.label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export function QuickAccessDock() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>ፈጣን ተደራሽነት</Text>
      <View style={styles.row}>
        {QUICK_ITEMS.map((item, i) => (
          <DockItem key={i} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: Fonts.text,
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  dockItem: {
    alignItems: 'center',
    gap: 6,
    position: 'relative',
  },
  dockGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.full,
  },
  dockIconBg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dockIcon: {
    fontSize: 22,
  },
  dockLabel: {
    fontSize: 10,
    fontFamily: Fonts.text,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
