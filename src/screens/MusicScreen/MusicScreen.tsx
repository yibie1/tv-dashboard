import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { useAppStore } from '../../store/appStore';
import { Fonts } from '../../hooks/useFonts';

const PLAYLISTS = [
  { id: '1', name: 'ምስጋና ዝማሬ', count: 24, emoji: '🎵', color: Colors.gold },
  { id: '2', name: 'ባህላዊ ሙዚቃ', count: 18, emoji: '🪘', color: Colors.emerald },
  { id: '3', name: 'ዘመናዊ ወንጌል', count: 32, emoji: '🎤', color: Colors.warmOrange },
  { id: '4', name: 'ቅዱስ ዝማሬ', count: 15, emoji: '🎶', color: Colors.crimson },
  { id: '5', name: 'ኢትዮጵያ ፖፕ', count: 40, emoji: '🎸', color: '#4A90D9' },
  { id: '6', name: 'ቅዱሳን ዝማሬ', count: 20, emoji: '✝', color: Colors.goldLight },
];

const RECENT_TRACKS = [
  { id: 't1', title: 'ሃሌሉያ', artist: 'ዘማሪ ዮሴፍ', duration: '4:32' },
  { id: 't2', title: 'አምላኬ', artist: 'ቤዛ ሙዚቃ', duration: '3:58' },
  { id: 't3', title: 'ጌታዬ', artist: 'ዘማሪ ሰሎሞን', duration: '5:12' },
  { id: 't4', title: 'ምስጋና', artist: 'ቅዱስ ዝማሬ', duration: '4:05' },
];

export function MusicScreen() {
  const { isPlaying, setPlaying } = useAppStore();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>ሙዚቃ</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Playlists */}
        <Text style={styles.sectionTitle}>ዝርዝሮች</Text>
        <View style={styles.playlistGrid}>
          {PLAYLISTS.map((p) => (
            <TouchableOpacity key={p.id} style={styles.playlistCard} activeOpacity={0.8}>
              <LinearGradient
                colors={[`${p.color}40`, 'rgba(10,10,10,0.9)']}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.playlistEmoji}>{p.emoji}</Text>
              <Text style={styles.playlistName}>{p.name}</Text>
              <Text style={styles.playlistCount}>{p.count} ዘፈኖች</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent tracks */}
        <Text style={styles.sectionTitle}>የቅርብ ጊዜ</Text>
        {RECENT_TRACKS.map((t, i) => (
          <TouchableOpacity key={t.id} style={styles.trackRow} activeOpacity={0.8}>
            <View style={styles.trackNum}>
              <Text style={styles.trackNumText}>{i + 1}</Text>
            </View>
            <View style={styles.trackInfo}>
              <Text style={styles.trackTitle}>{t.title}</Text>
              <Text style={styles.trackArtist}>{t.artist}</Text>
            </View>
            <Text style={styles.trackDuration}>{t.duration}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Mini player */}
      <LinearGradient
        colors={['rgba(20,14,4,0.98)', 'rgba(10,10,10,0.99)']}
        style={styles.miniPlayer}
      >
        <Text style={styles.miniTitle}>ሃሌሉያ — ዘማሪ ዮሴፍ</Text>
        <View style={styles.miniControls}>
          <TouchableOpacity><Text style={styles.miniCtrl}>⏮</Text></TouchableOpacity>
          <TouchableOpacity
            style={styles.miniPlay}
            onPress={() => setPlaying(!isPlaying)}
          >
            <Text style={styles.miniPlayIcon}>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>
          <TouchableOpacity><Text style={styles.miniCtrl}>⏭</Text></TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary, padding: Spacing.lg },
  pageTitle: { ...Typography.sectionTitle, fontSize: 28, marginBottom: Spacing.lg },
  sectionTitle: { ...Typography.sectionTitle, marginBottom: Spacing.md, marginTop: Spacing.lg },
  playlistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  playlistCard: {
    width: 160,
    height: 120,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.bgCard,
    padding: Spacing.md,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: Colors.borderGlass,
  },
  playlistEmoji: { fontSize: 32, position: 'absolute', top: Spacing.md, right: Spacing.md },
  playlistName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  playlistCount: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGlass,
    gap: Spacing.md,
  },
  trackNum: { width: 28, alignItems: 'center' },
  trackNumText: { color: Colors.textMuted, fontSize: 13 },
  trackInfo: { flex: 1 },
  trackTitle: { color: Colors.textPrimary, fontFamily: Fonts.text, fontSize: 14, fontWeight: '600' },
  trackArtist: { color: Colors.textMuted, fontFamily: Fonts.text, fontSize: 12, marginTop: 2 },
  trackDuration: { color: Colors.textMuted, fontFamily: Fonts.clock, fontSize: 12 },
  miniPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    marginTop: Spacing.md,
  },
  miniTitle: { color: Colors.textPrimary, fontFamily: Fonts.text, fontSize: 13, fontWeight: '600', flex: 1 },
  miniControls: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  miniCtrl: { fontSize: 18, color: Colors.textSecondary },
  miniPlay: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.gold, alignItems: 'center', justifyContent: 'center',
  },
  miniPlayIcon: { fontSize: 16, color: Colors.bgPrimary },
});
