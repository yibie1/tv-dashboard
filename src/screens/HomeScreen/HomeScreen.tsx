import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Linking, useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HeroSection } from '../../components/hero/HeroSection';
import { SaintsSlideshow } from '../../components/widgets/SaintsSlideshow';
import { WeatherWidget } from '../../components/widgets/WeatherWidget';
import { MusicWidget } from '../../components/widgets/MusicWidget';
import { BibleVerseWidget } from '../../components/widgets/BibleVerseWidget';
import { EthCalendarClock } from '../../components/widgets/EthCalendarClock';
import { QuickAccessDock } from '../../components/common/QuickAccessDock';
import { NewsCarousel } from '../../components/common/NewsCarousel';
import { ContentCarousel, ContentItem } from '../../components/common/ContentCarousel';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { CONTENT_IMAGES } from '../../data/realContent';
import { useAppStore } from '../../store/appStore';
import { Fonts } from '../../hooks/useFonts';

const MUSIC_ITEMS: ContentItem[] = [
  { id: 'm1', title: 'ዘማሪ ዮሴፍ', subtitle: 'ምስጋና ዝማሬ', emoji: '🎤', color: Colors.gold, imageUrl: CONTENT_IMAGES.church },
  { id: 'm2', title: 'ቤዛ ሙዚቃ', subtitle: 'ዘመናዊ ወንጌል', emoji: '🎸', color: Colors.emerald, imageUrl: CONTENT_IMAGES.lalibela },
  { id: 'm3', title: 'ባህላዊ ሙዚቃ', subtitle: 'ኢትዮጵያ ባህል', emoji: '🪘', color: Colors.warmOrange, imageUrl: CONTENT_IMAGES.omo },
  { id: 'm4', title: 'ቅዱስ ዝማሬ', subtitle: 'ኦርቶዶክስ', emoji: '🎶', color: Colors.crimson, imageUrl: CONTENT_IMAGES.axum },
];

// Quick shortcut links shown in right panel
const SHORTCUTS = [
  { label: 'YouTube', icon: '▶', color: '#FF0000', url: 'https://www.youtube.com' },
  { label: 'BBC አማርኛ', icon: '📰', color: '#BB1919', url: 'https://www.bbc.com/amharic' },
  { label: 'ቤተ ክርስቲያን', icon: '☩', color: Colors.gold, url: 'https://www.eotc.net' },
  { label: 'ሬዲዮ', icon: '📻', color: Colors.emeraldLight, url: 'https://www.shegerfm.com' },
  { label: 'ዜና', icon: '🌐', color: '#4A90D9', url: 'https://www.bbc.com/amharic' },
];

function ShortcutsWidget() {
  return (
    <LinearGradient
      colors={['rgba(16,12,4,0.95)', 'rgba(10,10,10,0.98)']}
      style={sc.container}
    >
      <Text style={sc.title}>ፈጣን አገናኞች</Text>
      <View style={sc.grid}>
        {SHORTCUTS.map((s, i) => (
          <TouchableOpacity
            key={i}
            style={sc.item}
            onPress={() => Linking.openURL(s.url)}
            activeOpacity={0.8}
          >
            <View style={[sc.iconBg, { borderColor: `${s.color}60` }]}>
              <Text style={[sc.icon, { color: s.color }]}>{s.icon}</Text>
            </View>
            <Text style={sc.label} numberOfLines={1}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}

export function HomeScreen() {
  const { setActiveNav } = useAppStore();
  const { width } = useWindowDimensions();

  // Right panel: 25% of screen width, hard capped at 240px
  const rightWidth = Math.round(Math.min(240, width * 0.25));

  return (
    <View style={styles.container}>
      <View style={styles.mainLayout}>

        {/* CENTER column */}
        <ScrollView
          style={styles.centerColumn}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.centerContent}
        >
          <HeroSection />

          <View style={styles.widgetRow}>
            <View style={styles.saintsWrap}>
              <SaintsSlideshow />
            </View>
            <View style={styles.weatherWidgetWrap}>
              <WeatherWidget />
            </View>
          </View>

          <NewsCarousel />

          <ContentCarousel
            title="ሙዚቃ"
            items={MUSIC_ITEMS}
            onSelect={() => setActiveNav('music')}
          />
        </ScrollView>

        {/* RIGHT panel — scrollable, constrained width */}
        <ScrollView
          style={[styles.rightPanel, { width: rightWidth, maxWidth: rightWidth }]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.rightContent, { width: rightWidth }]}
        >
          <EthCalendarClock />
          <View style={styles.gap} />
          <BibleVerseWidget />
          <View style={styles.gap} />
          {/* YouTube music widget */}
          <TouchableOpacity onPress={() => setActiveNav('music')} activeOpacity={0.9}>
            <MusicWidget />
          </TouchableOpacity>
          <View style={styles.gap} />
          {/* Quick shortcuts */}
          <ShortcutsWidget />
          <View style={styles.gap} />
          <QuickAccessDock />
          <View style={styles.gap} />
        </ScrollView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  mainLayout: { flex: 1, flexDirection: 'row', gap: Spacing.md, padding: Spacing.md },
  centerColumn: { flex: 1 },
  centerContent: { gap: Spacing.md, paddingBottom: Spacing.xl },
  widgetRow: { flexDirection: 'row', gap: Spacing.md },
  saintsWrap: { flex: 1 },
  weatherWidgetWrap: { flex: 1.3 },
  rightPanel: { flexShrink: 0, flexGrow: 0 },
  rightContent: { gap: 0, paddingBottom: Spacing.xl },
  gap: { height: Spacing.sm },
});

const sc = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderGlass,
  },
  title: {
    fontSize: 11,
    fontFamily: Fonts.text,
    color: Colors.gold,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  item: {
    width: '28%',
    alignItems: 'center',
    gap: 4,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 20 },
  label: {
    fontSize: 9,
    fontFamily: Fonts.text,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
