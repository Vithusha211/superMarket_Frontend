import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../componets/layout/Button';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  border: '#E5E7EB',
  selectedBg: '#F0FDF8',
};

export type CountryCodeOption = {
  id: string;
  label: string;
  flag: string;
  code: string;
};

export const COUNTRY_CODES: CountryCodeOption[] = [
  { id: 'de', label: 'Deutsch', flag: '🇩🇪', code: '+49' },
  { id: 'fr', label: 'Français', flag: '🇫🇷', code: '+33' },
  { id: 'en', label: 'English', flag: '🇬🇧', code: '+44' },
  { id: 'ar', label: 'العربية', flag: '🇸🇦', code: '+966' },
  { id: 'ru', label: 'Русский', flag: '🇷🇺', code: '+7' },
];

type CountryCodeScreenProps = {
  initialId?: string;
  onBack?: () => void;
  onSave?: (country: CountryCodeOption) => void;
};

export default function CountryCodeScreen({
  initialId = 'de',
  onBack,
  onSave,
}: CountryCodeScreenProps) {
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(initialId);

  const handleSave = () => {
    const selected =
      COUNTRY_CODES.find((item) => item.id === selectedId) ?? COUNTRY_CODES[0];
    onSave?.(selected);
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Select country code"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <FlatList
          data={COUNTRY_CODES}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isSelected = selectedId === item.id;

            return (
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                onPress={() => setSelectedId(item.id)}
                style={[styles.row, isSelected && styles.rowSelected]}
              >
                <View style={styles.rowLeft}>
                  <View
                    style={[
                      styles.radioOuter,
                      isSelected && styles.radioOuterSelected,
                    ]}
                  >
                    {isSelected ? <View style={styles.radioInner} /> : null}
                  </View>
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text style={styles.label}>{item.label}</Text>
                </View>
                <Text style={styles.code}>{item.code}</Text>
              </Pressable>
            );
          }}
        />

        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <Button
            title="Save"
            onPress={handleSave}
            containerStyle={styles.saveButton}
            textStyle={styles.saveText}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  listContent: {
    paddingHorizontal: '4.5%',
    paddingTop: 20,
    paddingBottom: 12,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    gap: 10,
  },
  rowSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.selectedBg,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  flag: {
    fontSize: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
    flexShrink: 1,
  },
  code: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.muted,
  },
  footer: {
    paddingHorizontal: '4.5%',
    paddingTop: 8,
    backgroundColor: COLORS.white,
  },
  saveButton: {
    height: 52,
    backgroundColor: COLORS.primary,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
