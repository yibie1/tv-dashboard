import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Fonts } from '../../hooks/useFonts';

const SAINTS = [
  {
    id: 1,
    name: 'ቅድስት ማርያም',
    description: 'ቅድስት ድንግል ማርያም',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs07bXBLCJ1befVdUP9wuMiSN98Jv1-1aZ4Q&s',
  },
  {
    id: 2,
    name: 'ቅዱስ ሚካኤል',
    description: 'ሊቀ መላእክት ቅዱስ ሚካኤል',
    imageUrl: 'https://amdetewahdo.wordpress.com/wp-content/uploads/2015/11/smichael.jpg?w=228&h=300',
  },
  {
    id: 3,
    name: 'ቅዱስ ገብርኤል',
    description: 'ሊቀ መላእክት ቅዱስ ገብርኤል',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZU0nH_ZmsoEHZSBizOWPwj6vn6mjTJGTqdw&s',
  },
  {
    id: 4,
    name: 'ቅዱስ ኡራኤል',
    description: 'ሊቀ መላእክት ቅዱስ ኡራኤል',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSJKs5eeGuO6JJm1ATwenHENm0EONvL4Wx_w&s',
  },
  {
    id: 5,
    name: 'ቅዱስ ጊዮርጊስ',
    description: 'ሰማዕቱ ቅዱስ ጊዮርጊስ',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrcZ8Fqscb2V6NUY0G6kuEOVakrPM4gbSow&s',
  },
  
  {
    id: 6,
    name: 'ቅዱስ ተክለ ሃይማኖት',
    description: 'ቅዱስ ተክለ ሃይማኖት',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOBPsoNuq2Ar0jnZEO16Flj3neUrs__yWQ2w&s',
  },
  
];

// Shows image or gold cross fallback on error
function SaintImage({ uri }: { uri: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <View style={[styles.saintImage, styles.fallback]}>
        <Text style={styles.fallbackCross}>☩</Text>
      </View>
    );
  }
  return (
    <Image
      source={{ uri }}
      style={styles.saintImage}
      resizeMode="cover"
      onError={() => setFailed(true)}
    />
  );
}

export function SaintsSlideshow() {
  const [current, setCurrent] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
        setCurrent((prev) => (prev + 1) % SAINTS.length);
        Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [fadeAnim]);

  const saint = SAINTS[current];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(20,10,2,0.95)', 'rgba(10,10,10,0.98)']}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Icon image */}
        <View style={styles.imageFrame}>
          <SaintImage uri={saint.imageUrl} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)']}
            style={StyleSheet.absoluteFill}
          />
        </View>

        {/* Name + description */}
        <View style={styles.nameContainer}>
          <Text style={styles.crossSymbol}>†</Text>
          <Text style={styles.saintName}>{saint.name}</Text>
          <Text style={styles.saintDesc}>{saint.description}</Text>
        </View>
      </Animated.View>

      {/* Slide dots */}
      <View style={styles.dots}>
        {SAINTS.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => setCurrent(i)}>
            <View style={[styles.dot, i === current && styles.dotActive]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    flex: 1,
    minHeight: 160,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  imageFrame: {
    width: 100,
    height: 120,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: Colors.goldBorder,
  },
  saintImage: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    backgroundColor: 'rgba(212,160,23,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackCross: {
    fontSize: 40,
    color: Colors.gold,
  },
  nameContainer: {
    flex: 1,
    gap: 6,
  },
  crossSymbol: {
    fontSize: 20,
    color: Colors.gold,
  },
  saintName: {
    fontSize: 18,
     
    fontFamily:"AppText",
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 26,
  },
  saintDesc: {
    fontSize: 12,
    fontFamily: Fonts.text,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingBottom: Spacing.sm,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  dotActive: {
    backgroundColor: Colors.gold,
    width: 14,
  },
});
