import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { useClock } from '../../hooks/useClock';
import { Fonts } from '../../hooks/useFonts';
import { HERO_SLIDES } from '../../data/realContent';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { timeString, ethiopianDate } = useClock();

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1.04, duration: 700, useNativeDriver: true }),
      ]).start(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        ]).start();
      });
    }, 9000);
    return () => clearInterval(interval);
  }, [fadeAnim, scaleAnim]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <View style={styles.container}>
      {/* Real background image with Ken Burns scale */}
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ scale: scaleAnim }] }]}>
        <ImageBackground
          source={{ uri: slide.imageUrl }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Dark gradient overlay for readability */}
      <LinearGradient
        colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.55)', 'rgba(0,0,0,0.82)']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.greetingRow}>
          <Text style={styles.sunIcon}>☀</Text>
          <View>
            <Text style={styles.greeting}>እንኳን ደህና መጡ!</Text>
            <Text style={styles.ethDateInline}>
              {ethiopianDate.dayName} · {ethiopianDate.formatted}
            </Text>
          </View>
        </View>
        <View style={styles.topRight}>
          <Text style={styles.statusIcon}>📶</Text>
          <Text style={styles.statusIcon}>⚙</Text>
          <Text style={styles.timeText}>{timeString}</Text>
        </View>
      </View>

      {/* Verse content */}
      <Animated.View style={[styles.verseContainer, { opacity: fadeAnim }]}>
        <Text style={styles.verseText}>{slide.verse}</Text>
        <Text style={styles.verseRef}>{slide.reference}</Text>
      </Animated.View>

      {/* Bottom row */}
      <View style={styles.bottomRow}>
        <View style={styles.dotsRow}>
          {HERO_SLIDES.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setCurrentSlide(i)}
              style={[styles.dot, i === currentSlide && styles.dotActive]}
            />
          ))}
        </View>
        <Text style={styles.locationText}>📍 {slide.location}</Text>
      </View>

      {/* Ethiopian date badge removed — shown under greeting */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    minHeight: 280,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sunIcon: { fontSize: 18, color: Colors.gold },
  greeting: {
    fontSize: 16,
    fontFamily: Fonts.text,
    color: Colors.textPrimary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  ethDateInline: {
    fontSize: 11,
    fontFamily: Fonts.text,
    color: Colors.gold,
    letterSpacing: 0.3,
    marginTop: 1,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  statusIcon: { fontSize: 16, color: 'rgba(255,255,255,0.7)' },
  timeText: {
    fontSize: 22,
    fontFamily: Fonts.clock,
    color: Colors.textPrimary,
    letterSpacing: 2,
  },
  verseContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  verseText: {
    fontSize: 21,
    fontFamily: Fonts.text,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 36,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  verseRef: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: Colors.goldLight,
    textAlign: 'center',
    marginTop: Spacing.md,
    fontWeight: '700',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotActive: {
    backgroundColor: Colors.gold,
    width: 20,
    borderRadius: 3,
  },
  locationText: {
    fontSize: 11,
    fontFamily: Fonts.text,
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 0.5,
  },
  ethDateBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  ethDateText: {
    fontSize: 11,
    fontFamily: Fonts.text,
    color: Colors.gold,
    letterSpacing: 0.5,
  },
});
