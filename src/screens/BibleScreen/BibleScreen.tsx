import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { Fonts } from '../../hooks/useFonts';

interface BibleBook {
  name: string;
  chapters: number;
  preview: string; // first verse preview
}

const BIBLE_BOOKS: BibleBook[] = [
  { name: 'ዘፍጥረት', chapters: 50, preview: 'በመጀመሪያ እግዚአብሔር ሰማይንና ምድርን ፈጠረ።' },
  { name: 'ዘጸአት', chapters: 40, preview: 'እነዚህ ወደ ግብፅ ከያዕቆብ ጋር የገቡ የእስራኤል ልጆች ስሞች ናቸው።' },
  { name: 'ዘሌዋውያን', chapters: 27, preview: 'እግዚአብሔርም ሙሴን ከመገናኛው ድንኳን ጠርቶ ተናገረው።' },
  { name: 'ዘኁልቁ', chapters: 36, preview: 'እግዚአብሔር በሲና ምድረ በዳ ሙሴን ተናገረ።' },
  { name: 'ዘዳግም', chapters: 34, preview: 'ሙሴ ለእስራኤል ሁሉ ያናገራቸው ቃሎች እነዚህ ናቸው።' },
  { name: 'ኢያሱ', chapters: 24, preview: 'ሙሴ የእግዚአብሔር ባሪያ ከሞተ በኋላ እግዚአብሔር ሙሴን ያገለግለው ለነበረው ለኢያሱ ተናገረ።' },
  { name: 'መሳፍንት', chapters: 21, preview: 'ሙሴ ከሞተ በኋላ የእስራኤል ልጆች እግዚአብሔርን ጠየቁ።' },
  { name: 'ሩት', chapters: 4, preview: 'መሳፍንት ይፈርዱ በነበሩ ዘመን አንድ ሰው ከቤተ ልሔም ወደ ሞዓብ ሄደ።' },
  { name: '1ኛ ሳሙኤል', chapters: 31, preview: 'ኤፍሬምን ከሚወርስ ከራማታይም ጾፊም አንድ ሰው ነበረ።' },
  { name: '2ኛ ሳሙኤል', chapters: 24, preview: 'ሳኦል ከሞተ በኋላ ዳዊት ከአማሌቃውያን ድብደባ ተመልሶ ሲኖርበት ሁለት ቀን ሲቅላቅ ቆየ።' },
  { name: 'መዝሙር', chapters: 150, preview: 'ኃጢአተኞችን ምክር ያልተከተለ፣ ኃጢአተኞችም መንገድ ያልቆመ ሰው ብፁዕ ነው።' },
  { name: 'ምሳሌ', chapters: 31, preview: 'የእስራኤል ንጉሥ የዳዊት ልጅ የሰሎሞን ምሳሌዎች።' },
  { name: 'ኢሳይያስ', chapters: 66, preview: 'የዓሞጽ ልጅ ኢሳይያስ ስለ ይሁዳና ስለ ኢየሩሳሌም ያየው ራእይ።' },
  { name: 'ኤርምያስ', chapters: 52, preview: 'የቤንያሚን ምድር ከሚሆን ከዓናቶት ካህናት ወገን ከሒልቅያ ልጅ ቃሎቹ።' },
  { name: 'ሕዝቅኤል', chapters: 48, preview: 'በሠላሳኛው ዓመት በአራተኛው ወር ሕዝቅኤል ራእይ አየ።' },
  { name: 'ማቴዎስ', chapters: 28, preview: 'የዳዊት ልጅ የአብርሃምም ልጅ የኢየሱስ ክርስቶስ የልደት ታሪክ።' },
  { name: 'ማርቆስ', chapters: 16, preview: 'የእግዚአብሔር ልጅ የኢየሱስ ክርስቶስ ወንጌል መጀመሪያ።' },
  { name: 'ሉቃስ', chapters: 24, preview: 'ብዙዎች ስለ ተፈጸሙ ነገሮች ታሪክ ሊጽፉ ሞክረዋልና።' },
  { name: 'ዮሐንስ', chapters: 21, preview: 'በመጀመሪያ ቃል ነበረ፤ ቃልም በእግዚአብሔር ዘንድ ነበረ፤ ቃልም እግዚአብሔር ነበረ።' },
  { name: 'ሐዋርያት', chapters: 28, preview: 'ቴዎፍሎስ ሆይ፤ ኢየሱስ ያደረጋቸውንና ያስተማራቸውን ሁሉ ስለ ጀመረ ስለ ፊተኛው ቃሌ ጻፍሁ።' },
  { name: 'ሮሜ', chapters: 16, preview: 'ለእግዚአብሔር ወንጌል ለይቶ የተቀደሰ የኢየሱስ ክርስቶስ ባሪያ ጳውሎስ።' },
  { name: '1ኛ ቆሮ', chapters: 16, preview: 'በቆሮንቶስ ላለች ለእግዚአብሔር ቤተ ክርስቲያን ጳውሎስ ጽፏል።' },
  { name: '2ኛ ቆሮ', chapters: 13, preview: 'ጳውሎስ ወደ ቆሮንቶስ ቤተ ክርስቲያን ሁለተኛ ደብዳቤ ጽፏል።' },
  { name: 'ገላ', chapters: 6, preview: 'ጳውሎስ ወደ ገላትያ አብያተ ክርስቲያናት ጽፏል።' },
  { name: 'ኤፌ', chapters: 6, preview: 'ጳውሎስ ወደ ኤፌሶን ቤተ ክርስቲያን ጽፏል።' },
];

// Sample verses per book (in a real app this would come from an API/database)
const BOOK_CONTENT: Record<string, { chapter: number; verses: Array<{ num: number; text: string }> }> = {
  'ዮሐንስ': {
    chapter: 3,
    verses: [
      { num: 16, text: 'እግዚአብሔር ዓለሙን እጅግ ወዶ አንድያ ልጁን ሰጠ፤ በእርሱ የሚያምን ሁሉ እንዳይጠፋ ነገር ግን የዘላለም ሕይወት እንዲኖረው።' },
      { num: 17, text: 'እግዚአብሔር ዓለሙን ሊፈርድ ልጁን ወደ ዓለም አልላከም፤ ነገር ግን ዓለሙ በእርሱ እንዲድን ላከ።' },
      { num: 18, text: 'በእርሱ የሚያምን አይፈረድበትም፤ የማያምን ግን ቀድሞ ተፈርዶበታል።' },
    ],
  },
  'ማቴዎስ': {
    chapter: 5,
    verses: [
      { num: 3, text: 'መንፈሳቸው ድሆች የሆኑ ብፁዓን ናቸው፤ መንግሥተ ሰማያት የእነርሱ ናትና።' },
      { num: 4, text: 'የሚያዝኑ ብፁዓን ናቸው፤ እነርሱ ይጽናናሉና።' },
      { num: 5, text: 'የዋሆች ብፁዓን ናቸው፤ እነርሱ ምድርን ይወርሳሉና።' },
      { num: 6, text: 'ጽድቅን የሚራቡና የሚጠሙ ብፁዓን ናቸው፤ እነርሱ ይጠግባሉና።' },
    ],
  },
  'መዝሙር': {
    chapter: 23,
    verses: [
      { num: 1, text: 'እግዚአብሔር እረኛዬ ነው፤ የሚያሳጣኝ ነገር የለም።' },
      { num: 2, text: 'በለምለም ሣር ሜዳ ያሳርፈኛል፤ ወደ ዕረፍት ውኃ ይመራኛል።' },
      { num: 3, text: 'ነፍሴን ያድሳል፤ ስሙን ስለ ክብሩ በጽድቅ መንገድ ይመራኛል።' },
      { num: 4, text: 'በሞት ጥላ ሸለቆ ብሄድ እንኳ ክፉን አልፈራም፤ አንተ ከእኔ ጋር ነህና።' },
    ],
  },
  'ዘፍጥረት': {
    chapter: 1,
    verses: [
      { num: 1, text: 'በመጀመሪያ እግዚአብሔር ሰማይንና ምድርን ፈጠረ።' },
      { num: 2, text: 'ምድርም ባዶና ጨለማ ነበረች፤ የእግዚአብሔርም መንፈስ በውኃ ላይ ሰፍፎ ነበረ።' },
      { num: 3, text: 'እግዚአብሔርም ብርሃን ይሁን አለ፤ ብርሃንም ሆነ።' },
    ],
  },
};

const DEFAULT_CONTENT = {
  chapter: 1,
  verses: [{ num: 1, text: 'ይህን መጽሐፍ ለማንበብ ይጫኑ።' }],
};

export function BibleScreen() {
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS[18]); // ዮሐንስ default

  const content = BOOK_CONTENT[selectedBook.name] ?? DEFAULT_CONTENT;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(10,20,10,0.3)', 'transparent']}
        style={styles.headerGradient}
      />
      <View style={styles.layout}>
        {/* Book list */}
        <View style={styles.bookList}>
          <Text style={styles.bookListTitle}>መጻሕፍት</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {BIBLE_BOOKS.map((book) => {
              const isActive = selectedBook.name === book.name;
              return (
                <TouchableOpacity
                  key={book.name}
                  style={[styles.bookItem, isActive && styles.bookItemActive]}
                  onPress={() => setSelectedBook(book)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.bookName, isActive && styles.bookNameActive]}>
                    {book.name}
                  </Text>
                  <Text style={styles.bookChapters}>{book.chapters} ምዕ.</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Reading area */}
        <ScrollView style={styles.readingArea} showsVerticalScrollIndicator={false}>
          <View style={styles.chapterHeader}>
            <Text style={styles.chapterTitle}>{selectedBook.name}</Text>
            <Text style={styles.chapterNum}>ምዕራፍ {content.chapter}</Text>
          </View>

          {/* Preview if no full content */}
          {!BOOK_CONTENT[selectedBook.name] && (
            <View style={styles.previewCard}>
              <Text style={styles.previewText}>{selectedBook.preview}</Text>
            </View>
          )}

          {content.verses.map((v) => (
            <View key={v.num} style={styles.verseRow}>
              <Text style={styles.verseNum}>{v.num}</Text>
              <Text style={styles.verseText}>{v.text}</Text>
            </View>
          ))}

          {/* Daily verse highlight */}
          <LinearGradient
            colors={['rgba(26,107,60,0.2)', 'rgba(10,10,10,0.5)']}
            style={styles.highlightCard}
          >
            <Text style={styles.highlightLabel}>☩ ዕለታዊ ቃል</Text>
            <Text style={styles.highlightVerse}>
              "እግዚአብሔር ዓለሙን እጅግ ወዶ አንድያ ልጁን ሰጠ"
            </Text>
            <Text style={styles.highlightRef}>ዮሐንስ 3:16</Text>
          </LinearGradient>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  headerGradient: { position: 'absolute', top: 0, left: 0, right: 0, height: 200 },
  layout: { flex: 1, flexDirection: 'row', padding: Spacing.lg, gap: Spacing.lg },
  bookList: {
    width: 170,
    borderRightWidth: 1,
    borderRightColor: Colors.borderGlass,
    paddingRight: Spacing.md,
  },
  bookListTitle: { ...Typography.sectionTitle, fontSize: 14, marginBottom: Spacing.md },
  bookItem: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookItemActive: {
    backgroundColor: 'rgba(212,160,23,0.15)',
    borderLeftWidth: 2,
    borderLeftColor: Colors.gold,
  },
  bookName: { fontSize: 13, fontFamily: Fonts.text, color: Colors.textSecondary, flex: 1 },
  bookNameActive: { color: Colors.gold, fontWeight: '700' },
  bookChapters: { fontSize: 10, fontFamily: Fonts.text, color: Colors.textMuted },
  readingArea: { flex: 1 },
  chapterHeader: { marginBottom: Spacing.xl },
  chapterTitle: { fontSize: 32, fontFamily: Fonts.text, fontWeight: '700', color: Colors.textPrimary },
  chapterNum: { fontSize: 16, fontFamily: Fonts.text, color: Colors.gold, marginTop: 4 },
  previewCard: {
    backgroundColor: 'rgba(212,160,23,0.08)',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderGlass,
    marginBottom: Spacing.lg,
  },
  previewText: { fontSize: 16, fontFamily: Fonts.text, color: Colors.textSecondary, lineHeight: 28, fontStyle: 'italic' },
  verseRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGlass,
  },
  verseNum: {
    fontSize: 13, fontFamily: Fonts.clock, color: Colors.gold,
    fontWeight: '700', width: 24, marginTop: 2,
  },
  verseText: {
    flex: 1, fontSize: 16, fontFamily: Fonts.text,
    color: Colors.textPrimary, lineHeight: 28,
  },
  highlightCard: {
    borderRadius: BorderRadius.lg, padding: Spacing.lg,
    marginTop: Spacing.xl, borderWidth: 1, borderColor: Colors.emeraldGlow,
  },
  highlightLabel: { fontSize: 12, fontFamily: Fonts.text, color: Colors.emeraldLight, fontWeight: '700', marginBottom: Spacing.sm },
  highlightVerse: { fontSize: 20, fontFamily: Fonts.text, color: Colors.textPrimary, lineHeight: 32, fontStyle: 'italic' },
  highlightRef: { fontSize: 14, fontFamily: Fonts.text, color: Colors.gold, marginTop: Spacing.sm, fontWeight: '700' },
});
