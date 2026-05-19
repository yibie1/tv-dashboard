import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import { Colors } from '../../theme';
import { Fonts } from '../../hooks/useFonts';

// Ge'ez numerals for clock positions (1–12)
const GEEZ_HOURS: Record<number, string> = {
  1: '፩', 2: '፪', 3: '፫', 4: '፬',
  5: '፭', 6: '፮', 7: '፯', 8: '፰',
  9: '፱', 10: '፲', 11: '፲፩', 12: '፲፪',
};

interface Props {
  size?: number;
  hours: number;
  minutes: number;
  seconds: number;
  color?: string;
  label?: string;
  showGeez?: boolean;
}

export function AnalogClock({
  size = 70,
  hours,
  minutes,
  seconds,
  color = Colors.gold,
  label,
  showGeez = false,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;

  const hourAngle = ((hours % 12) + minutes / 60) * 30 - 90;
  const minuteAngle = (minutes + seconds / 60) * 6 - 90;
  const secondAngle = seconds * 6 - 90;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const handEnd = (angle: number, length: number) => ({
    x: cx + length * Math.cos(toRad(angle)),
    y: cy + length * Math.sin(toRad(angle)),
  });

  const hourEnd = handEnd(hourAngle, r * 0.5);
  const minuteEnd = handEnd(minuteAngle, r * 0.7);
  const secondEnd = handEnd(secondAngle, r * 0.8);

  // Ge'ez numeral positions around the clock face
  const geezPositions = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const angle = num * 30 - 90;
    const labelR = r * 0.72;
    return {
      num,
      x: cx + labelR * Math.cos(toRad(angle)),
      y: cy + labelR * Math.sin(toRad(angle)),
      label: GEEZ_HOURS[num],
    };
  });

  // Standard tick marks (used when not showing Ge'ez)
  const markers = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30 - 90;
    const inner = r * 0.82;
    const outer = r * 0.95;
    return {
      x1: cx + inner * Math.cos(toRad(angle)),
      y1: cy + inner * Math.sin(toRad(angle)),
      x2: cx + outer * Math.cos(toRad(angle)),
      y2: cy + outer * Math.sin(toRad(angle)),
    };
  });

  const fontSize = size < 80 ? size * 0.11 : size * 0.09;

  return (
    <View style={styles.wrapper}>
      <Svg width={size} height={size}>
        {/* Outer ring */}
        <Circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth={1.5} fill="rgba(0,0,0,0.6)" />
        {/* Inner glow ring */}
        <Circle cx={cx} cy={cy} r={r - 3} stroke={`${color}30`} strokeWidth={1} fill="none" />

        {showGeez ? (
          /* Ge'ez numerals */
          geezPositions.map((p) => (
            <SvgText
              key={p.num}
              x={p.x}
              y={p.y + fontSize * 0.35}
              textAnchor="middle"
              fontSize={fontSize}
              fill={color}
              opacity={0.9}
            >
              {p.label}
            </SvgText>
          ))
        ) : (
          /* Standard tick marks */
          markers.map((m, i) => (
            <Line
              key={i}
              x1={m.x1} y1={m.y1}
              x2={m.x2} y2={m.y2}
              stroke={`${color}80`}
              strokeWidth={i % 3 === 0 ? 2 : 1}
            />
          ))
        )}

        {/* Hour hand */}
        <Line x1={cx} y1={cy} x2={hourEnd.x} y2={hourEnd.y}
          stroke={color} strokeWidth={3} strokeLinecap="round" />
        {/* Minute hand */}
        <Line x1={cx} y1={cy} x2={minuteEnd.x} y2={minuteEnd.y}
          stroke={Colors.textPrimary} strokeWidth={2} strokeLinecap="round" />
        {/* Second hand */}
        <Line x1={cx} y1={cy} x2={secondEnd.x} y2={secondEnd.y}
          stroke={Colors.warmOrange} strokeWidth={1} strokeLinecap="round" />
        {/* Center dot */}
        <Circle cx={cx} cy={cy} r={3} fill={color} />
      </Svg>
      {label && <Text style={[styles.label, { color }]}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', gap: 4 },
  label: { fontSize: 10, fontFamily: Fonts.text, letterSpacing: 0.5, textAlign: 'center' },
});
