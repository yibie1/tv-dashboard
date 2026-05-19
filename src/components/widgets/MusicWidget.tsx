import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Fonts } from '../../hooks/useFonts';

const VIDEO_ID = 'wifiviMGTVc';
const THUMBNAIL_URL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

// HTML page using YouTube IFrame API — avoids Error 153 and redirect
function buildPlayerHtml(videoId: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;width:100vw;height:100vh;overflow:hidden}
#p{width:100%;height:100%}
</style>
</head>
<body>
<div id="p"></div>
<script>
var s=document.createElement('script');
s.src='https://www.youtube.com/iframe_api';
document.head.appendChild(s);
function onYouTubeIframeAPIReady(){
  new YT.Player('p',{
    videoId:'${videoId}',
    playerVars:{autoplay:1,playsinline:1,rel:0,modestbranding:1,controls:1},
    events:{onReady:function(e){e.target.playVideo();}}
  });
}
</script>
</body>
</html>`;
}
export function MusicWidget() {
  const [playing, setPlaying] = useState(false);

  return (
    <LinearGradient
      colors={['rgba(20,8,4,0.95)', 'rgba(10,10,10,0.98)']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.musicIcon}>♪</Text>
        <View style={styles.headerText}>
          <Text style={styles.title}>ኦርቶዶክስ መዝሙር</Text>
          <Text style={styles.subtitle}>አምላኬ መቅደስህን እወደዋለው</Text>
        </View>
        <TouchableOpacity
          style={[styles.playToggle, playing && styles.playToggleActive]}
          onPress={() => setPlaying((p) => !p)}
        >
          <Text style={[styles.playToggleIcon, playing && styles.playToggleIconActive]}>
            {playing ? '⏸' : '▶'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Player area */}
      <View style={styles.playerArea}>
        {playing ? (
          /* WebView YouTube player — stays in app */
          <WebView
            source={{ html: buildPlayerHtml(VIDEO_ID) }}
            style={styles.webview}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            javaScriptEnabled
            domStorageEnabled
            allowsFullscreenVideo
            mixedContentMode="always"
            originWhitelist={['*']}
            userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
          />
        ) : (
          /* Thumbnail with play overlay */
          <TouchableOpacity style={styles.thumbnail} onPress={() => setPlaying(true)} activeOpacity={0.85}>
            <Image
              source={{ uri: THUMBNAIL_URL }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.thumbPlayBtn}>
              <Text style={styles.thumbPlayIcon}>▶</Text>
            </View>
            <View style={styles.thumbInfo}>
              <Text style={styles.thumbLabel}>ዘማሪ ገብረዮሐንስ ገብረ ጻድቅ</Text>
              <Text style={styles.thumbSub}>ለማጫወት ይጫኑ</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerDot}>●</Text>
        <Text style={styles.footerText}>YouTube · ኦርቶዶክስ መዝሙር</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderGlass,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  musicIcon: { fontSize: 18, color: Colors.gold },
  headerText: { flex: 1 },
  title: { fontSize: 13, fontFamily: Fonts.text, fontWeight: '700', color: Colors.textPrimary },
  subtitle: { fontSize: 10, fontFamily: Fonts.text, color: Colors.textMuted, marginTop: 2 },
  playToggle: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(212,160,23,0.15)',
    borderWidth: 1, borderColor: Colors.goldBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  playToggleActive: { backgroundColor: Colors.gold },
  playToggleIcon: { fontSize: 13, color: Colors.gold },
  playToggleIconActive: { color: Colors.bgPrimary },

  // Player area
  playerArea: {
    height: 140,
    marginHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderGlass,
  },
  webview: { flex: 1, backgroundColor: '#000' },

  // Thumbnail
  thumbnail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  thumbPlayBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(212,160,23,0.9)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  thumbPlayIcon: { fontSize: 18, color: Colors.bgPrimary },
  thumbInfo: { alignItems: 'center' },
  thumbLabel: { fontSize: 12, fontFamily: Fonts.text, color: '#fff', fontWeight: '600' },
  thumbSub: { fontSize: 10, fontFamily: Fonts.text, color: 'rgba(255,255,255,0.6)', marginTop: 2 },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  footerDot: { fontSize: 8, color: Colors.gold },
  footerText: { fontSize: 10, fontFamily: Fonts.text, color: Colors.textMuted },
});
