import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Animated,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { Fonts } from '../../hooks/useFonts';
import { RADIO_STATIONS, RadioStation } from '../../data/realContent';

// Animated equalizer bar
function EqBar({ isPlaying, color, delay }: { isPlaying: boolean; color: string; delay: number }) {
  const height = useRef(new Animated.Value(4)).current;

  useEffect(() => {
    if (!isPlaying) {
      Animated.timing(height, { toValue: 4, duration: 300, useNativeDriver: false }).start();
      return;
    }
    const animate = () => {
      Animated.sequence([
        Animated.timing(height, { toValue: 6 + Math.random() * 22, duration: 150 + Math.random() * 250, useNativeDriver: false }),
        Animated.timing(height, { toValue: 4 + Math.random() * 8, duration: 150 + Math.random() * 200, useNativeDriver: false }),
      ]).start(({ finished }) => { if (finished) animate(); });
    };
    const t = setTimeout(animate, delay);
    return () => clearTimeout(t);
  }, [isPlaying, height, delay]);

  return <Animated.View style={[styles.eqBar, { height, backgroundColor: color }]} />;
}

// Build an HTML page that plays the stream using HTML5 audio
function buildPlayerHtml(streamUrl: string, autoplay: boolean): string {
  return `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body { margin:0; background:#0A0A0A; display:flex; align-items:center; justify-content:center; height:100vh; }
  audio { width:100%; outline:none; }
</style>
</head>
<body>
  <audio id="player" controls ${autoplay ? 'autoplay' : ''} style="width:90%">
    <source src="${streamUrl}" type="audio/mpeg">
    <source src="${streamUrl}" type="audio/aac">
    <source src="${streamUrl}" type="audio/ogg">
  </audio>
  <script>
    var a = document.getElementById('player');
    a.volume = 1.0;
    ${autoplay ? 'a.play().catch(function(){});' : ''}
  </script>
</body>
</html>`;
}

export function RadioScreen() {
  const [activeStation, setActiveStation] = useState<RadioStation>(RADIO_STATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectStation = (station: RadioStation) => {
    setActiveStation(station);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>ራዲዮ</Text>

      <View style={styles.layout}>
        {/* Station list */}
        <ScrollView style={styles.stationList} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>ጣቢያዎች</Text>
          {RADIO_STATIONS.map((station) => {
            const isActive = activeStation.id === station.id;
            return (
              <TouchableOpacity
                key={station.id}
                style={[styles.stationRow, isActive && styles.stationRowActive]}
                onPress={() => selectStation(station)}
                activeOpacity={0.8}
              >
                {isActive && (
                  <LinearGradient
                    colors={[`${station.color}22`, 'transparent']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                  />
                )}
                <View style={[styles.stationIcon, { borderColor: `${station.color}70` }]}>
                  <Text style={styles.stationEmoji}>{station.emoji}</Text>
                </View>
                <View style={styles.stationInfo}>
                  <Text style={[styles.stationName, isActive && { color: station.color }]}>
                    {station.nameAmharic}
                  </Text>
                  <Text style={styles.stationFreq}>{station.freq} · {station.genreAmharic}</Text>
                </View>
                {station.live && (
                  <View style={styles.liveBadge}>
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                )}
                {isActive && isPlaying && (
                  <View style={styles.playingIndicator}>
                    {[0, 1, 2].map((i) => (
                      <EqBar key={i} isPlaying={isPlaying} color={station.color} delay={i * 80} />
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Player panel */}
        <View style={styles.playerPanel}>
          <LinearGradient
            colors={[`${activeStation.color}20`, 'rgba(10,10,10,0.98)']}
            style={styles.playerCard}
          >
            {/* Station art */}
            <View style={[styles.stationArt, { borderColor: `${activeStation.color}90` }]}>
              <Text style={styles.stationArtEmoji}>{activeStation.emoji}</Text>
              {isPlaying && (
                <View style={styles.artEqRow}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <EqBar key={i} isPlaying={isPlaying} color={activeStation.color} delay={i * 60} />
                  ))}
                </View>
              )}
            </View>

            <Text style={styles.nowPlayingLabel}>
              {isPlaying ? 'አሁን እየተጫወተ' : 'ለማጫወት ይጫኑ'}
            </Text>
            <Text style={[styles.nowPlayingName, { color: activeStation.color }]}>
              {activeStation.nameAmharic}
            </Text>
            <Text style={styles.nowPlayingFreq}>{activeStation.freq}</Text>
            <Text style={styles.nowPlayingGenre}>{activeStation.genreAmharic}</Text>

            {/* Equalizer */}
            <View style={styles.fullEq}>
              {Array.from({ length: 24 }).map((_, i) => (
                <EqBar key={i} isPlaying={isPlaying} color={activeStation.color} delay={i * 40} />
              ))}
            </View>

            {/* Play/stop button */}
            <TouchableOpacity
              style={[styles.playBtn, { backgroundColor: activeStation.color }]}
              onPress={togglePlay}
            >
              <Text style={styles.playIcon}>{isPlaying ? '⏹' : '▶'}</Text>
            </TouchableOpacity>

            {/* Hidden WebView audio player */}
            {isPlaying && (
              <View style={styles.hiddenPlayer}>
                <WebView
                  source={{ html: buildPlayerHtml(activeStation.streamUrl, true) }}
                  mediaPlaybackRequiresUserAction={false}
                  allowsInlineMediaPlayback
                  javaScriptEnabled
                  style={styles.hiddenWebView}
                />
              </View>
            )}
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary, padding: Spacing.lg },
  pageTitle: { ...Typography.sectionTitle, fontSize: 28, marginBottom: Spacing.lg },
  layout: { flex: 1, flexDirection: 'row', gap: Spacing.lg },
  stationList: { flex: 1 },
  sectionTitle: { ...Typography.sectionTitle, fontSize: 13, marginBottom: Spacing.md },
  stationRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    paddingVertical: Spacing.md, paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md, marginBottom: 4,
    overflow: 'hidden', position: 'relative',
  },
  stationRowActive: { borderLeftWidth: 2, borderLeftColor: Colors.gold },
  stationIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1.5, alignItems: 'center', justifyContent: 'center',
  },
  stationEmoji: { fontSize: 22 },
  stationInfo: { flex: 1 },
  stationName: { fontSize: 15, fontFamily: Fonts.text, fontWeight: '700', color: Colors.textPrimary },
  stationFreq: { fontSize: 11, fontFamily: Fonts.clock, color: Colors.textMuted, marginTop: 2 },
  liveBadge: {
    backgroundColor: 'rgba(200,0,0,0.75)',
    borderRadius: BorderRadius.sm, paddingHorizontal: 6, paddingVertical: 2,
  },
  liveText: { fontSize: 9, fontFamily: Fonts.text, color: '#fff', fontWeight: '700', letterSpacing: 1 },
  playingIndicator: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 20, marginLeft: 4 },
  playerPanel: { width: 300 },
  playerCard: {
    borderRadius: BorderRadius.xl, padding: Spacing.xl,
    borderWidth: 1, borderColor: Colors.borderGlass,
    alignItems: 'center',
  },
  stationArt: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 2, alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.lg, overflow: 'hidden',
  },
  stationArtEmoji: { fontSize: 52 },
  artEqRow: { position: 'absolute', bottom: 8, flexDirection: 'row', alignItems: 'flex-end', gap: 2 },
  nowPlayingLabel: { fontSize: 11, fontFamily: Fonts.text, color: Colors.textMuted, letterSpacing: 1, textTransform: 'uppercase' },
  nowPlayingName: { fontSize: 22, fontFamily: Fonts.text, fontWeight: '700', marginTop: 4, textAlign: 'center' },
  nowPlayingFreq: { fontSize: 14, fontFamily: Fonts.clock, color: Colors.textSecondary, marginTop: 4 },
  nowPlayingGenre: { fontSize: 12, fontFamily: Fonts.text, color: Colors.textMuted, marginTop: 2 },
  fullEq: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 40, marginVertical: Spacing.lg },
  eqBar: { width: 4, borderRadius: 2, minHeight: 4 },
  playBtn: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  playIcon: { fontSize: 26, color: Colors.bgPrimary },
  hiddenPlayer: { width: 260, height: 60, borderRadius: BorderRadius.md, overflow: 'hidden', marginTop: Spacing.sm },
  hiddenWebView: { flex: 1, backgroundColor: 'transparent' },
});
