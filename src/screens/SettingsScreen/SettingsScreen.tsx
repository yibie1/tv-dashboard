import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { Fonts } from '../../hooks/useFonts';

interface SettingRow {
  label: string;
  amharic: string;
  type: 'toggle' | 'select' | 'action';
  value?: boolean;
  options?: string[];
}

const SETTINGS: Array<{ section: string; items: SettingRow[] }> = [
  {
    section: 'መልክ',
    items: [
      { label: 'Dark Mode', amharic: 'ጨለማ ሁነታ', type: 'toggle', value: true },
      { label: 'Animations', amharic: 'እንቅስቃሴዎች', type: 'toggle', value: true },
      { label: 'Accent Color', amharic: 'ዋና ቀለም', type: 'select', options: ['Gold', 'Green', 'Blue'] },
      { label: 'Font Size', amharic: 'የፊደል መጠን', type: 'select', options: ['Small', 'Medium', 'Large'] },
    ],
  },
  {
    section: 'ሚዲያ',
    items: [
      { label: 'Autoplay', amharic: 'ራስ-ሰር ማጫወት', type: 'toggle', value: false },
      { label: 'Streaming Quality', amharic: 'የስትሪሚንግ ጥራት', type: 'select', options: ['720p', '1080p', '4K'] },
      { label: 'Subtitles', amharic: 'ንዑስ ርዕሶች', type: 'toggle', value: true },
    ],
  },
  {
    section: 'ስርዓት',
    items: [
      { label: 'Clear Cache', amharic: 'ካሽ አጽዳ', type: 'action' },
      { label: 'Check Updates', amharic: 'ዝማኔ ፈልግ', type: 'action' },
      { label: 'Remote Pairing', amharic: 'ሪሞት ማጣመር', type: 'action' },
    ],
  },
];

export function SettingsScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Dark Mode': true,
    'Animations': true,
    'Autoplay': false,
    'Subtitles': true,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>ቅንብሮች</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {SETTINGS.map((section) => (
          <View key={section.section} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, i) => (
                <View
                  key={item.label}
                  style={[
                    styles.settingRow,
                    i < section.items.length - 1 && styles.settingRowBorder,
                  ]}
                >
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingAmharic}>{item.amharic}</Text>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                  </View>
                  {item.type === 'toggle' && (
                    <Switch
                      value={toggles[item.label] ?? false}
                      onValueChange={(v) => setToggles((prev) => ({ ...prev, [item.label]: v }))}
                      trackColor={{ false: Colors.bgSecondary, true: Colors.gold }}
                      thumbColor={Colors.textPrimary}
                    />
                  )}
                  {item.type === 'select' && (
                    <TouchableOpacity style={styles.selectBtn}>
                      <Text style={styles.selectBtnText}>{item.options?.[0]} ›</Text>
                    </TouchableOpacity>
                  )}
                  {item.type === 'action' && (
                    <TouchableOpacity style={styles.actionBtn}>
                      <Text style={styles.actionBtnText}>›</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Version info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Ethiopian TV Dashboard v1.0.0</Text>
          <Text style={styles.versionSub}>© 2024 — ሁሉም መብቶች የተጠበቁ ናቸው</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary, padding: Spacing.lg },
  pageTitle: { ...Typography.sectionTitle, fontSize: 28, marginBottom: Spacing.lg },
  section: { marginBottom: Spacing.lg },
  sectionTitle: { ...Typography.sectionTitle, fontSize: 13, marginBottom: Spacing.sm },
  sectionCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderGlass,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGlass,
  },
  settingInfo: { flex: 1 },
  settingAmharic: { fontSize: 14, fontFamily: Fonts.text, color: Colors.textPrimary, fontWeight: '600' },
  settingLabel: { fontSize: 11, fontFamily: Fonts.text, color: Colors.textMuted, marginTop: 2 },
  selectBtn: {
    backgroundColor: 'rgba(212,160,23,0.1)',
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  selectBtnText: { color: Colors.gold, fontSize: 13 },
  actionBtn: { padding: Spacing.sm },
  actionBtnText: { color: Colors.textMuted, fontSize: 20 },
  versionInfo: { alignItems: 'center', paddingVertical: Spacing.xl },
  versionText: { fontFamily: Fonts.text, color: Colors.textMuted, fontSize: 12 },
  versionSub: { fontFamily: Fonts.text, color: Colors.textMuted, fontSize: 10, marginTop: 4 },
});
