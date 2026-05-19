import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export function useFocusAnimation(scaleTarget = 1.06) {
  const scale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const borderOpacity = useRef(new Animated.Value(0.2)).current;

  const onFocus = useCallback(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: scaleTarget,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
      }),
      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(borderOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, glowOpacity, borderOpacity, scaleTarget]);

  const onBlur = useCallback(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
      }),
      Animated.timing(glowOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(borderOpacity, {
        toValue: 0.2,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, glowOpacity, borderOpacity]);

  return { scale, glowOpacity, borderOpacity, onFocus, onBlur };
}
