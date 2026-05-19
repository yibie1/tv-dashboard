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

// Ethiopian flag colors
const ETH_COLORS = ['#078930', '#FCDD09', '#DA121A'];
const BUBBLE_SIZES = [10, 16, 22, 12, 18, 8, 20, 14, 10, 24, 12, 16, 8, 18, 14];

function EthBubble({ index }: { index: number }) {
  const color = ETH_COLORS[index % 3];
  const size = BUBBLE_SIZES[index % BUBBLE_SIZES.length];
  const x = useRef(new Animated.Value(Math.random() * width)).current;
  const y = useRef(new Animated.Value(height + size)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const delay = index * 700 + Math.random() * 1200;
    const loop = () => {
      const duration = 10000 + Math.random() * 7000;
      x.setValue(Math.random() * width);
      y.setValue(height + size);
      opacity.setValue(0);
      scale.setValue(0.5 + Math.random() * 0.5);
      Animated.parallel([
        Animated.timing(x, { toValue: Math.random() * width, duration, useNativeDriver: true }),
        Animated.timing(y, { toValue: -size - 20, duration, useNativeDriver: true }),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0.7, duration: duration * 0.15, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.5, duration: duration * 0.6, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: duration * 0.25, useNativeDriver: true }),
        ]),
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale, { toValue: 1.2, duration: 1600, useNativeDriver: true }),
            Animated.timing(scale, { toValue: 0.85, duration: 1600, useNativeDriver: true }),
          ])
        ),
      ]).start(loop);
    };
    const t = setTimeout(loop, delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: size,
        elevation: 6,
        transform: [{ translateX: x }, { translateY: y }, { scale }],
        opacity,
      }}
    />
  );
}

// Wave band — a row of dots that animate up/down with phase offset to create a wave
const WAVE_DOT_COUNT = 28;
const WAVE_COLORS = ['#078930', '#FCDD09', '#DA121A'];
const WAVE_Y_POSITIONS = [height - 80, height - 52, height - 24]; // green, yellow, red

function WaveBand({ color, baseY, phaseOffset }: { color: string; baseY: number; phaseOffset: number }) {
  const dots = Array.from({ length: WAVE_DOT_COUNT }).map((_, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const anim = useRef(new Animated.Value(0)).current;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const delay = i * 80 + phaseOffset;
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 900, useNativeDriver: true }),
        ])
      );
      const t = setTimeout(() => loop.start(), delay);
      return () => { clearTimeout(t); loop.stop(); };
    }, []);
    return anim;
  });

  return (
    <>
      {dots.map((anim, i) => {
        const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
        const opacity = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.4, 0.9, 0.4] });
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              left: (width / WAVE_DOT_COUNT) * i,
              top: baseY,
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: color,
              shadowColor: color,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.9,
              shadowRadius: 4,
              elevation: 4,
              transform: [{ translateY }],
              opacity,
            }}
          />
        );
      })}
    </>
  );
}

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

      {/* Ethiopian flag bubbles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <EthBubble key={i} index={i} />
      ))}

      {/* Ethiopian flag waves at the bottom */}
      {WAVE_COLORS.map((color, i) => (
        <WaveBand key={color} color={color} baseY={WAVE_Y_POSITIONS[i]} phaseOffset={i * 120} />
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
