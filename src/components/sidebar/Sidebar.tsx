import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore, NavItem } from '../../store/appStore';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { useFocusAnimation } from '../../hooks/useFocusAnimation';
import { Fonts } from '../../hooks/useFonts';

// Collapsed width shows only icons; expanded shows icons + labels
const COLLAPSED_WIDTH = 60;
const EXPANDED_WIDTH = 220;

interface NavItemDef {
  id: NavItem;
  icon: string;
  label: string;
  amharic: string;
}

const NAV_ITEMS: NavItemDef[] = [
  { id: 'home',     icon: '⌂',  label: 'Home',     amharic: 'ቤት' },
  { id: 'calendar', icon: '📅', label: 'Calendar', amharic: 'ቀን መቁጠሪያ' },
  { id: 'music',    icon: '♪',  label: 'Music',    amharic: 'ሙዚቃ' },
  { id: 'radio',    icon: '📻', label: 'Radio',    amharic: 'ራዲዮ' },
  { id: 'video',    icon: '▶',  label: 'Live TV',  amharic: 'ቴሌቪዥን' },
  { id: 'bible',    icon: '✝',  label: 'Bible',    amharic: 'መጽሐፍ ቅዱስ' },
  { id: 'news',     icon: '📰', label: 'News',     amharic: 'ዜና' },
  { id: 'weather',  icon: '☁',  label: 'Weather',  amharic: 'የአየር ሁኔታ' },
  { id: 'settings', icon: '⚙',  label: 'Settings', amharic: 'ቅንብሮች' },
];

function SidebarItem({
  item,
  isActive,
  expanded,
}: {
  item: NavItemDef;
  isActive: boolean;
  expanded: boolean;
}) {
  const { setActiveNav } = useAppStore();
  const { scale, glowOpacity, onFocus, onBlur } = useFocusAnimation(1.04);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Animated.View
        style={[styles.itemGlow, { opacity: glowOpacity }]}
        pointerEvents="none"
      />
      <TouchableOpacity
        style={[
          styles.navItem,
          isActive && styles.navItemActive,
          !expanded && styles.navItemCollapsed,
        ]}
        onPress={() => setActiveNav(item.id)}
        onFocus={onFocus}
        onBlur={onBlur}
        activeOpacity={0.8}
        hasTVPreferredFocus={item.id === 'home'}
      >
        {isActive && (
          <LinearGradient
            colors={['rgba(212,160,23,0.15)', 'rgba(212,160,23,0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        )}
        <View style={[styles.iconContainer, !expanded && styles.iconContainerCollapsed]}>
          <Text style={[styles.icon, isActive && styles.iconActive]}>{item.icon}</Text>
        </View>
        {expanded && (
          <View style={styles.labelContainer}>
            <Text style={[styles.amharicLabel, isActive && styles.amharicLabelActive]}>
              {item.amharic}
            </Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.label}
            </Text>
          </View>
        )}
        {expanded && isActive && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </Animated.View>
  );
}

export function Sidebar() {
  const { activeNav } = useAppStore();
  const [expanded, setExpanded] = useState(true);
  const widthAnim = useRef(new Animated.Value(EXPANDED_WIDTH)).current;

  const toggle = () => {
    const toValue = expanded ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
    Animated.spring(widthAnim, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 12,
    }).start();
    setExpanded((e) => !e);
  };

  return (
    <Animated.View style={[styles.container, { width: widthAnim }]}>
      <LinearGradient
        colors={['rgba(8,6,2,0.98)', 'rgba(12,8,2,0.96)', 'rgba(8,6,2,0.98)']}
        style={StyleSheet.absoluteFill}
      />

      {/* Logo + toggle button */}
      <View style={styles.logoContainer}>
        {expanded ? (
          <>
            <Text style={styles.logoIcon}>☩</Text>
            <Text style={styles.logoText}>እግዚአብሔር ይመሰገን</Text>
          </>
        ) : (
          <Text style={styles.logoIcon}>☩</Text>
        )}
        <TouchableOpacity style={styles.toggleBtn} onPress={toggle}>
          <Text style={styles.toggleIcon}>{expanded ? '‹' : '›'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Scrollable nav list */}
      <ScrollView
        style={styles.navScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.navContent}
      >
        {NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={activeNav === item.id}
            expanded={expanded}
          />
        ))}
      </ScrollView>

      {/* Bottom profile — only when expanded */}
      <View style={styles.divider} />
      {expanded ? (
        <TouchableOpacity style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>ዩ</Text>
          </View>
          <View>
            <Text style={styles.profileName}>ይበልጣል</Text>
            <Text style={styles.profileSub}>Yibe Software solution</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.avatarCollapsed}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>ዩ</Text>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: Colors.borderGlass,
    paddingVertical: Spacing.md,
    overflow: 'hidden',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    position: 'relative',
  },
  logoIcon: {
    fontSize: 28,
    color: Colors.gold,
    marginBottom: 2,
  },
  logoText: {
    fontSize: 9,
    fontFamily: Fonts.text,
    color: Colors.gold,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  toggleBtn: {
    position: 'absolute',
    right: 4,
    top: '30%',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(212,160,23,0.15)',
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleIcon: {
    fontSize: 14,
    color: Colors.gold,
    fontWeight: '700',
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderGlass,
    marginHorizontal: Spacing.sm,
    marginVertical: Spacing.xs,
  },
  navScroll: {
    flex: 1,
  },
  navContent: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xs,
    gap: 2,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  navItemCollapsed: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  navItemActive: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.gold,
  },
  itemGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.goldGlow,
    borderRadius: BorderRadius.md,
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
  },
  iconContainerCollapsed: {
    width: '100%',
  },
  icon: {
    fontSize: 18,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  iconActive: {
    color: Colors.gold,
  },
  labelContainer: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  amharicLabel: {
    fontSize: 13,
    fontFamily: Fonts.text,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  amharicLabelActive: {
    color: Colors.gold,
  },
  label: {
    fontSize: 10,
    fontFamily: Fonts.text,
    color: Colors.textMuted,
    marginTop: 1,
  },
  labelActive: {
    color: Colors.goldDark,
  },
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gold,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  avatarCollapsed: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.goldBorder,
  },
  avatarText: {
    color: Colors.gold,
    fontSize: 14,
    fontWeight: '700',
  },
  profileName: {
    color: Colors.textPrimary,
    fontFamily: Fonts.text,
    fontSize: 13,
    fontWeight: '600',
  },
  profileSub: {
    color: Colors.textMuted,
    fontFamily: Fonts.text,
    fontSize: 10,
  },
});
