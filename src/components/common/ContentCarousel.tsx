import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Fonts } from '../../hooks/useFonts';
import { useFocusAnimation } from '../../hooks/useFocusAnimation';

export interface ContentItem {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  imageUrl?: string;
}

interface Props {
  title: string;
  items: ContentItem[];
  onSelect?: (item: ContentItem) => void;
}

function ContentCard({ item, onSelect }: { item: ContentItem; onSelect?: (i: ContentItem) => void }) {
  const { scale, glowOpacity, borderOpacity, onFocus, onBlur } = useFocusAnimation(1.05);

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale }] }]}>
      <Animated.View
        style={[styles.cardGlow, { opacity: glowOpacity, backgroundColor: `${item.color}28` }]}
        pointerEvents="none"
      />
      <TouchableOpacity
        style={styles.card}
        onFocus={onFocus}
        onBlur={onBlur}
        onPress={() => onSelect?.(item)}
        activeOpacity={0.85}
      >
        {/* Real background image */}
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={StyleSheet.absoluteFill} resizeMode="cover" />
        ) : null}

        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', `${item.color}55`, 'rgba(0,0,0,0.88)']}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Focus border */}
        <Animated.View
          style={[styles.cardBorder, { borderColor: item.color, opacity: borderOpacity }]}
          pointerEvents="none"
        />

        <Text style={styles.cardEmoji}>{item.emoji}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export function ContentCarousel({ title, items, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>ሁሉንም ›</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item) => (
          <ContentCard key={item.id} item={item} onSelect={onSelect} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.md },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 14, fontFamily: Fonts.text, fontWeight: '700',
    color: Colors.gold, letterSpacing: 1.2, textTransform: 'uppercase',
  },
  seeAll: { fontSize: 12, fontFamily: Fonts.text, color: Colors.textMuted },
  scrollContent: { gap: Spacing.sm, paddingRight: Spacing.md },
  cardWrapper: { position: 'relative' },
  cardGlow: { ...StyleSheet.absoluteFillObject, borderRadius: BorderRadius.md },
  card: {
    width: 160, height: 100,
    borderRadius: BorderRadius.md, overflow: 'hidden',
    backgroundColor: Colors.bgCard, padding: Spacing.sm,
    justifyContent: 'flex-end', position: 'relative',
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.md, borderWidth: 1.5,
  },
  cardEmoji: {
    fontSize: 26, position: 'absolute', top: Spacing.sm, right: Spacing.sm, opacity: 0.85,
  },
  cardTitle: { fontSize: 13, fontFamily: Fonts.text, fontWeight: '700', color: '#fff' },
  cardSubtitle: { fontSize: 10, fontFamily: Fonts.text, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
});
