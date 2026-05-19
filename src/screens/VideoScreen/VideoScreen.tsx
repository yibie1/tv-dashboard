import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, Linking, Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { Fonts } from '../../hooks/useFonts';
import { MEZMUR_VIDEOS, YouTubeVideo } from '../../data/realContent';

const LIVE_CHANNELS = [
  { id: 'lc1', name: 'EBC ቴሌቪዥን', youtubeId: 'coYw-eVU0Ks', color: Colors.gold, emoji: '📺', live: true },
  { id: 'lc2', name: 'ፋና ቴሌቪዥን', youtubeId: 'Hu-8HNkVHqk', color: Colors.emerald, emoji: '📡', live: true },
  { id: 'lc3', name: 'ቤተ ክርስቲያን ቲቪ', youtubeId: 'K4TOrB7at0Y', color: Colors.crimson, emoji: '✝', live: false },
];

// Build YouTube HTML using IFrame API to avoid Error 153
function buildYouTubeHtml(videoId: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#000; width:100vw; height:100vh; overflow:hidden; }
  #player { width:100%; height:100%; }
</style>
</head>
<body>
<div id="player"></div>
<script>
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      videoId: '${videoId}',
      playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1, controls: 1, fs: 1 },
      events: { onReady: function(e) { e.target.playVideo(); } }
    });
  }
</script>
</body>
</html>`;
}

// Inline YouTube player modal
function YouTubeModal({
  videoId,
  visible,
  onClose,
}: {
  videoId: string;
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalClose} onPress={onClose}>
          <Text style={styles.modalCloseText}>✕ ዝጋ</Text>
        </TouchableOpacity>
        <WebView
          style={styles.webview}
          source={{ html: buildYouTubeHtml(videoId) }}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          mixedContentMode="always"
          originWhitelist={['*']}
          userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        />
      </View>
    </Modal>
  );
}

function VideoCard({ video, onPlay }: { video: YouTubeVideo; onPlay: (id: string) => void }) {
  return (
    <TouchableOpacity style={styles.videoCard} onPress={() => onPlay(video.youtubeId)} activeOpacity={0.85}>
      <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.85)']} style={styles.thumbGradient} />
      <View style={styles.playBtn}>
        <Text style={styles.playIcon}>▶</Text>
      </View>
      <View style={styles.durationBadge}>
        <Text style={styles.durationText}>{video.duration}</Text>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
        <Text style={styles.videoMeta}>{video.artist} · {video.views} ጊዜ ታይቷል</Text>
      </View>
    </TouchableOpacity>
  );
}

function LiveCard({ ch, onPlay }: { ch: typeof LIVE_CHANNELS[0]; onPlay: (id: string) => void }) {
  return (
    <TouchableOpacity style={styles.liveCard} onPress={() => onPlay(ch.youtubeId)} activeOpacity={0.85}>
      <LinearGradient colors={[`${ch.color}40`, 'rgba(10,10,10,0.92)']} style={StyleSheet.absoluteFill} />
      {ch.live && (
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      )}
      <Text style={styles.liveEmoji}>{ch.emoji}</Text>
      <Text style={[styles.liveName, { color: ch.color }]}>{ch.name}</Text>
      <Text style={styles.liveAction}>ለማየት ይጫኑ ›</Text>
    </TouchableOpacity>
  );
}

export function VideoScreen() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const featured = MEZMUR_VIDEOS[0];
  const rest = MEZMUR_VIDEOS.slice(1);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>ቴሌቪዥን እና ቪዲዮ</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>ቀጥታ ስርጭት</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.liveRow}>
          {LIVE_CHANNELS.map((ch) => (
            <LiveCard key={ch.id} ch={ch} onPlay={setActiveVideoId} />
          ))}
        </ScrollView>

        {featured && (
          <>
            <Text style={styles.sectionTitle}>ዋና ቪዲዮ</Text>
            <TouchableOpacity
              style={styles.featuredCard}
              onPress={() => setActiveVideoId(featured.youtubeId)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: featured.thumbnail }} style={StyleSheet.absoluteFill} resizeMode="cover" />
              <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={StyleSheet.absoluteFill} />
              <View style={styles.featuredPlayBtn}>
                <Text style={styles.featuredPlayIcon}>▶</Text>
              </View>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredTitle}>{featured.title}</Text>
                <Text style={styles.featuredMeta}>{featured.artist} · {featured.views} ጊዜ ታይቷል</Text>
              </View>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.sectionTitle}>ኦርቶዶክስ መዝሙር</Text>
        <View style={styles.videoGrid}>
          {rest.map((v) => (
            <VideoCard key={v.id} video={v} onPlay={setActiveVideoId} />
          ))}
        </View>

        <TouchableOpacity
          style={styles.browseBtn}
          onPress={() => Linking.openURL('https://www.youtube.com/results?search_query=ethiopian+orthodox+mezmur')}
        >
          <Text style={styles.browseBtnText}>YouTube ላይ ተጨማሪ ›</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Inline YouTube player */}
      {activeVideoId && (
        <YouTubeModal
          videoId={activeVideoId}
          visible={!!activeVideoId}
          onClose={() => setActiveVideoId(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary, padding: Spacing.lg },
  scroll: { paddingBottom: Spacing.xl },
  pageTitle: { ...Typography.sectionTitle, fontSize: 28, marginBottom: Spacing.lg },
  sectionTitle: { ...Typography.sectionTitle, fontSize: 13, marginBottom: Spacing.md, marginTop: Spacing.lg },

  // Modal player
  modalContainer: { flex: 1, backgroundColor: '#000' },
  modalClose: {
    padding: Spacing.md,
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalCloseText: { color: Colors.gold, fontSize: 16, fontFamily: Fonts.text },
  webview: { flex: 1 },

  // Live channels
  liveRow: { marginBottom: Spacing.sm },
  liveCard: {
    width: 180, height: 120, borderRadius: BorderRadius.lg, overflow: 'hidden',
    backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.borderGlass,
    padding: Spacing.md, marginRight: Spacing.md, justifyContent: 'flex-end',
  },
  liveBadge: {
    position: 'absolute', top: Spacing.sm, left: Spacing.sm,
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(200,0,0,0.85)',
    borderRadius: BorderRadius.sm, paddingHorizontal: 6, paddingVertical: 3,
  },
  liveDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#fff' },
  liveText: { fontSize: 9, fontFamily: Fonts.text, color: '#fff', fontWeight: '700', letterSpacing: 1 },
  liveEmoji: { fontSize: 28, position: 'absolute', top: Spacing.md, right: Spacing.md },
  liveName: { fontSize: 14, fontFamily: Fonts.text, fontWeight: '700' },
  liveAction: { fontSize: 10, fontFamily: Fonts.text, color: Colors.textMuted, marginTop: 2 },

  // Featured
  featuredCard: {
    height: 200, borderRadius: BorderRadius.xl, overflow: 'hidden',
    backgroundColor: Colors.bgCard, marginBottom: Spacing.sm,
    borderWidth: 1, borderColor: Colors.borderGlass,
  },
  featuredPlayBtn: {
    position: 'absolute', top: '30%', alignSelf: 'center', left: '44%',
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(212,160,23,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  featuredPlayIcon: { fontSize: 22, color: Colors.bgPrimary },
  featuredInfo: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Spacing.lg },
  featuredTitle: { fontSize: 20, fontFamily: Fonts.text, fontWeight: '700', color: '#fff' },
  featuredMeta: { fontSize: 12, fontFamily: Fonts.text, color: 'rgba(255,255,255,0.7)', marginTop: 4 },

  // Video grid
  videoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  videoCard: {
    width: '48%', borderRadius: BorderRadius.lg, overflow: 'hidden',
    backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.borderGlass,
  },
  thumbnail: { width: '100%', height: 110 },
  thumbGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80 },
  playBtn: {
    position: 'absolute', top: 35, right: Spacing.md,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(212,160,23,0.85)',
    alignItems: 'center', justifyContent: 'center',
  },
  playIcon: { fontSize: 14, color: Colors.bgPrimary },
  durationBadge: {
    position: 'absolute', bottom: 70, right: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2,
  },
  durationText: { fontSize: 10, fontFamily: Fonts.clock, color: '#fff' },
  videoInfo: { padding: Spacing.sm },
  videoTitle: { fontSize: 13, fontFamily: Fonts.text, fontWeight: '700', color: Colors.textPrimary },
  videoMeta: { fontSize: 10, fontFamily: Fonts.text, color: Colors.textMuted, marginTop: 3 },
  browseBtn: {
    marginTop: Spacing.lg, borderWidth: 1, borderColor: Colors.goldBorder,
    borderRadius: BorderRadius.lg, paddingVertical: Spacing.md,
    alignItems: 'center', backgroundColor: 'rgba(212,160,23,0.08)',
  },
  browseBtnText: { fontFamily: Fonts.text, color: Colors.gold, fontSize: 14, fontWeight: '700' },
});
