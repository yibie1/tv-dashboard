import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { Fonts } from '../../hooks/useFonts';

const NEWS_ITEMS = [
  {
    id: '1',
    category: 'ዜና',
    title: 'ኢትዮጵያ አዲስ ኢኮኖሚ ፖሊሲ አወጀ',
    summary: 'መንግሥት አዲስ ኢኮኖሚ ፖሊሲ ለ2017 ዓ.ም. አወጀ፤ ዋና ዓላማው ኢንቨስትመንት ማሳደግ ነው።',
    time: 'ከ2 ሰዓት በፊት',
    emoji: '📰',
    color: '#4A90D9',
    featured: true,
  },
  {
    id: '2',
    category: 'ቤተ ክርስቲያን',
    title: 'ጥምቀት ዓለም አቀፍ ክብረ በዓል ተከበረ',
    summary: 'ዓለም አቀፍ ጥምቀት ክብረ በዓል በላሊበላ ተከበረ፤ ሺዎች ምዕመናን ተሳትፈዋል።',
    time: 'ከ5 ሰዓት በፊት',
    emoji: '✝',
    color: Colors.gold,
    featured: false,
  },
  {
    id: '3',
    category: 'ስፖርት',
    title: 'ኢትዮጵያ ኦሎምፒክ ወርቅ ሜዳሊያ አሸነፈ',
    summary: 'ኢትዮጵያዊ አትሌት ዓለም አቀፍ ውድድር ላይ ወርቅ ሜዳሊያ አሸነፈ።',
    time: 'ትናንት',
    emoji: '🏅',
    color: Colors.emerald,
    featured: false,
  },
  {
    id: '4',
    category: 'ቴክኖሎጂ',
    title: 'ኢትዮጵያ ዲጂታል ትራንስፎርሜሽን',
    summary: 'ኢትዮጵያ ዲጂታል ኢኮኖሚ ለማሳደግ አዲስ ፕሮጀክት ጀምሯል።',
    time: 'ትናንት',
    emoji: '💻',
    color: Colors.warmOrange,
    featured: false,
  },
];

export function NewsScreen() {
  const featured = NEWS_ITEMS.find((n) => n.featured);
  const rest = NEWS_ITEMS.filter((n) => !n.featured);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>ዜና</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured */}
        {featured && (
          <TouchableOpacity style={styles.featuredCard} activeOpacity={0.85}>
            <LinearGradient
              colors={[`${featured.color}40`, 'rgba(10,10,10,0.95)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>ዋና ዜና</Text>
            </View>
            <Text style={styles.featuredEmoji}>{featured.emoji}</Text>
            <Text style={styles.featuredTitle}>{featured.title}</Text>
            <Text style={styles.featuredSummary}>{featured.summary}</Text>
            <Text style={styles.featuredTime}>{featured.time}</Text>
          </TouchableOpacity>
        )}

        {/* News grid */}
        <View style={styles.newsGrid}>
          {rest.map((item) => (
            <TouchableOpacity key={item.id} style={styles.newsCard} activeOpacity={0.85}>
              <LinearGradient
                colors={[`${item.color}25`, 'rgba(10,10,10,0.9)']}
                style={StyleSheet.absoluteFill}
              />
              <View style={[styles.categoryBadge, { backgroundColor: `${item.color}30` }]}>
                <Text style={[styles.categoryText, { color: item.color }]}>{item.category}</Text>
              </View>
              <Text style={styles.newsEmoji}>{item.emoji}</Text>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsSummary} numberOfLines={2}>{item.summary}</Text>
              <Text style={styles.newsTime}>{item.time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary, padding: Spacing.lg },
  pageTitle: { ...Typography.sectionTitle, fontSize: 28, marginBottom: Spacing.lg },
  featuredCard: {
    height: 200,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.bgCard,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderGlass,
    justifyContent: 'flex-end',
  },
  featuredBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    backgroundColor: 'rgba(212,160,23,0.2)',
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  featuredBadgeText: { fontSize: 10, color: Colors.gold, fontWeight: '700', letterSpacing: 1 },
  featuredEmoji: { fontSize: 40, position: 'absolute', top: Spacing.md, right: Spacing.lg },
  featuredTitle: { fontSize: 22, fontFamily: Fonts.text, fontWeight: '700', color: Colors.textPrimary, marginBottom: Spacing.sm },
  featuredSummary: { fontSize: 14, fontFamily: Fonts.text, color: Colors.textSecondary, lineHeight: 22 },
  featuredTime: { fontSize: 11, fontFamily: Fonts.clock, color: Colors.textMuted, marginTop: Spacing.sm },
  newsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  newsCard: {
    width: '48%',
    minHeight: 160,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.bgCard,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderGlass,
    justifyContent: 'flex-end',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    marginBottom: Spacing.sm,
  },
  categoryText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  newsEmoji: { fontSize: 28, position: 'absolute', top: Spacing.md, right: Spacing.md },
  newsTitle: { fontSize: 15, fontFamily: Fonts.text, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  newsSummary: { fontSize: 12, fontFamily: Fonts.text, color: Colors.textSecondary, lineHeight: 18 },
  newsTime: { fontSize: 10, fontFamily: Fonts.clock, color: Colors.textMuted, marginTop: 4 },
});
