import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme';
import { useClock } from '../../hooks/useClock';
import { useAppStore } from '../../store/appStore';
import { Fonts } from '../../hooks/useFonts';

const { width, height } = Dimensions.get('window');

// Floating particle
function Particle({ index }: { index: number }) {
  const x = useRef(new Animated.Value(Math.random() * width)).current;
  const y = useRef(new Animated.Value(Math.random() * height)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      const targetX = Math.random() * width;
      const targetY = Math.random() * height;
      const duration = 6000 + Math.random() * 8000;
      Animated.parallel([
        Animated.timing(x, { toValue: targetX, duration, useNativeDriver: true }),
        Animated.timing(y, { toValue: targetY, duration, useNativeDriver: true }),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0.6, duration: duration * 0.3, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: duration * 0.7, useNativeDriver: true }),
        ]),
      ]).start(animate);
    };
    const timer = setTimeout(animate, index * 400);
    return () => clearTimeout(timer);
  }, [x, y, opacity, index]);

  return (
    <Animated.View
      style={[
        styles.particle,
        { transform: [{ translateX: x }, { translateY: y }], opacity },
      ]}
    />
  );
}

export function AmbientMode() {
  const { setAmbientMode } = useAppStore();
  const { timeString, dateString, ethiopianDate } = useClock();
  const clockScale = useRef(new Animated.Value(1)).current;

  // Slow breathing animation on clock
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(clockScale, { toValue: 1.03, duration: 3000, useNativeDriver: true }),
        Animated.timing(clockScale, { toValue: 1, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, [clockScale]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => setAmbientMode(false)}
    >
      <LinearGradient
        colors={['#050300', '#0A0800', '#050300']}
        style={StyleSheet.absoluteFill}
      />

      {/* Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}

      {/* Ambient glow */}
      <View style={styles.glowCenter} />

      {/* Clock */}
      <Animated.View style={[styles.clockContainer, { transform: [{ scale: clockScale }] }]}>
        <Text style={styles.ambientTime}>{timeString}</Text>
        <Text style={styles.ambientDate}>{dateString}</Text>
        <View style={styles.ethDateRow}>
          <Text style={styles.crossIcon}>☩</Text>
          <Text style={styles.ambientEthDate}>{ethiopianDate.formatted}</Text>
        </View>
      </Animated.View>

      {/* Bottom hint */}
      <Text style={styles.tapHint}>ለመቀጠል ይጫኑ</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.gold,
  },
  glowCenter: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(212,160,23,0.04)',
  },
  clockContainer: {
    alignItems: 'center',
    gap: 12,
  },
  ambientTime: {
    fontSize: 96,
    fontFamily: Fonts.clock,
    color: Colors.textPrimary,
    letterSpacing: 8,
  },
  ambientDate: {
    fontSize: 20,
    fontFamily: Fonts.text,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  ethDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  crossIcon: {
    fontSize: 18,
    color: Colors.gold,
  },
  ambientEthDate: {
    fontSize: 18,
    fontFamily: Fonts.text,
    color: Colors.gold,
    letterSpacing: 1,
  },
  tapHint: {
    position: 'absolute',
    bottom: 40,
    fontSize: 13,
    fontFamily: Fonts.text,
    color: 'rgba(255,255,255,0.2)',
    letterSpacing: 2,
  },
});
