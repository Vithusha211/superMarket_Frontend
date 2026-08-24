import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../componets/layout/Button';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  black: 'rgba(0, 0, 0, 1)',
  text: 'rgba(13, 13, 13, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  overlay: 'rgba(0, 0, 0, 0.45)',
  radioIdle: 'rgba(209, 213, 219, 1)',
  selectedBg: 'rgba(240, 253, 248, 1)',
};

export type ProfileLanguage = {
  id: string;
  label: string;
  subtitle: string;
  flag: string;
};

export const PROFILE_LANGUAGES: ProfileLanguage[] = [
  { id: 'de', label: 'German', subtitle: 'Deutsch', flag: '🇩🇪' },
  { id: 'en', label: 'English', subtitle: 'English - UK', flag: '🇬🇧' },
  { id: 'fr', label: 'French', subtitle: 'Français', flag: '🇫🇷' },
];

type LanguageSheetProps = {
  visible: boolean;
  selectedId?: string;
  onClose?: () => void;
  onSelect?: (language: ProfileLanguage) => void;
};

export default function LanguageSheet({
  visible,
  selectedId = 'en',
  onClose,
  onSelect,
}: LanguageSheetProps) {
  const insets = useSafeAreaInsets();
  const [activeId, setActiveId] = useState(selectedId);

  useEffect(() => {
    if (visible) {
      setActiveId(selectedId);
    }
  }, [visible, selectedId]);

  const handleSelect = () => {
    const language =
      PROFILE_LANGUAGES.find((item) => item.id === activeId) ??
      PROFILE_LANGUAGES[1];
    onSelect?.(language);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View
          style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 30) }]}
        >
          <Text style={styles.title}>language</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          >
            {PROFILE_LANGUAGES.map((language) => {
              const active = language.id === activeId;

              return (
                <Pressable
                  key={language.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                  onPress={() => setActiveId(language.id)}
                  style={[styles.row, active && styles.rowActive]}
                >
                  <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
                    {active ? <View style={styles.radioInner} /> : null}
                  </View>
                  <Text style={styles.flag}>{language.flag}</Text>
                  <View style={styles.copy}>
                    <Text style={styles.label}>{language.label}</Text>
                    <Text style={styles.subtitle}>({language.subtitle})</Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>

          <Button
            title="Select"
            onPress={handleSelect}
            containerStyle={styles.selectButton}
            textStyle={styles.selectText}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.overlay,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    maxHeight: '70%',
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: COLORS.black,
    textAlign: 'center',
    paddingVertical: 10,
  },
  list: {
    gap: 10,
    paddingBottom: 12,
  },
  row: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: COLORS.white,
  },
  rowActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.selectedBg,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.radioIdle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  flag: {
    fontSize: 18,
  },
  copy: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  selectButton: {
    width: '100%',
    height: 52,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },
  selectText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
  },
});
