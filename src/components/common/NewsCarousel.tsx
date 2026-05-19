import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Linking, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Fonts } from '../../hooks/useFonts';
import { fetchBBCAmharicNews, NewsItem } from '../../services/api/newsService';

function NewsCard({ item }: { item: NewsItem }) {
  const open = () => Linking.openURL(item.link).catch(() => {});

  // Format date nicely
  const timeAgo = (() => {
    try {
      const diff = Date.now() - new Date(item.pubDate).getTime();
      const h = Math.floor(diff / 3600000);
      if (h < 1) return 'ለቅርብ ጊዜ';
      if (h < 24) return `ከ${h} ሰዓት በፊት`;
      return `ከ${Math.floor(h / 24)} ቀን በፊት`;
    } catch {
      return '';
    }
  })();

  return (
    <TouchableOpacity style={styles.card} onPress={open} activeOpacity={0.85}>
      <LinearGradient
        colors={['rgba(26,14,4,0.95)', 'rgba(10,10,10,0.98)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.cardBorder} />

      {/* BBC badge */}
      <View style={styles.sourceBadge}>
        <Text style={styles.sourceText}>BBC አማርኛ</Text>
      </View>

      <Text style={styles.cardTitle} numberOfLines={3}>{item.title}</Text>
      {item.description ? (
        <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
      ) : null}
      <Text style={styles.cardTime}>{timeAgo}</Text>
    </TouchableOpacity>
  );
}

export function NewsCarousel() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBBCAmharicNews().then((items) => {
      setNews(items);
      setLoading(false);
    });
    // Refresh every 10 minutes
    const interval = setInterval(() => {
      fetchBBCAmharicNews().then(setNews);
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>ዜና</Text>
          <View style={styles.bbcBadge}>
            <Text style={styles.bbcText}>BBC አማርኛ</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.bbc.com/amharic')}>
          <Text style={styles.seeAll}>ሁሉንም ›</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={Colors.gold} size="small" />
          <Text style={styles.loadingText}>ዜና እየጫነ...</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Fonts.text,
    fontWeight: '700',
    color: Colors.gold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  bbcBadge: {
    backgroundColor: 'rgba(200,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(200,0,0,0.5)',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  bbcText: { fontSize: 9, fontFamily: Fonts.text, color: '#FF6666', fontWeight: '700' },
  seeAll: { fontSize: 12, fontFamily: Fonts.text, color: Colors.textMuted },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  loadingText: { fontSize: 12, fontFamily: Fonts.text, color: Colors.textMuted },
  scrollContent: { gap: Spacing.sm, paddingRight: Spacing.md },
  card: {
    width: 200,
    minHeight: 120,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    padding: Spacing.md,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.borderGlass,
  },
  sourceBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: 'rgba(200,0,0,0.15)',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  sourceText: { fontSize: 8, fontFamily: Fonts.text, color: '#FF6666', fontWeight: '700' },
  cardTitle: {
    fontSize: 13,
    fontFamily: Fonts.text,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 20,
    marginTop: Spacing.lg,
  },
  cardDesc: {
    fontSize: 10,
    fontFamily: Fonts.text,
    color: Colors.textSecondary,
    lineHeight: 15,
    marginTop: 4,
  },
  cardTime: {
    fontSize: 9,
    fontFamily: Fonts.text,
    color: Colors.textMuted,
    marginTop: 6,
  },
});
