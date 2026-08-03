import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../../componets/layout/Button';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: '#07B787',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  border: '#E5E7EB',
  radio: '#07B787',
};

export type LanguageOption = {
  id: string;
  label: string;
  subtitle?: string;
  flag: string;
};

const LANGUAGES: LanguageOption[] = [
  { id: 'de', label: 'German', subtitle: 'Deutsch', flag: '🇩🇪' },
  { id: 'en', label: 'English', subtitle: 'English - UK', flag: '🇬🇧' },
  { id: 'fr', label: 'French', subtitle: 'Français', flag: '🇫🇷' },
];

type LanguageSelectScreenProps = {
  onSelect?: (language: LanguageOption) => void;
};

export default function LanguageSelectScreen({
  onSelect,
}: LanguageSelectScreenProps) {
  const [selectedId, setSelectedId] = useState('en');

  const handleSelect = () => {
    const language = LANGUAGES.find((item) => item.id === selectedId);
    if (language) {
      onSelect?.(language);
    }
  };

  return (
    <View style={styles.screen}>
      <Header showLogo backgroundColor={COLORS.primary} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.card}>
          <View style={styles.illustration}>
            <Image
              source={require('../../assets/languages.png')}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.copy}>
            <Text style={styles.title}>Select your language</Text>
            <Text style={styles.subtitle}>
              Choose your language to stay within the app.
            </Text>
          </View>

          <View style={styles.list}>
            {LANGUAGES.map((language) => {
              const isSelected = selectedId === language.id;

              return (
                <Pressable
                  key={language.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setSelectedId(language.id)}
                  style={[
                    styles.languageRow,
                    isSelected && styles.languageRowSelected,
                  ]}
                >
                  <View style={styles.languageLeft}>
                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterSelected,
                      ]}
                    >
                      {isSelected ? <View style={styles.radioInner} /> : null}
                    </View>
                    <Text style={styles.flag}>{language.flag}</Text>
                    <View style={styles.languageText}>
                      <Text style={styles.languageLabel}>{language.label}</Text>
                      {language.subtitle ? (
                        <Text style={styles.languageSubtitle}>
                          ({language.subtitle})
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <Button
            title="Select"
            onPress={handleSelect}
            containerStyle={styles.selectButton}
            textStyle={styles.selectButtonText}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: '4.5%',
    paddingBottom: 24,
  },
  card: {
    width: '100%',
    maxWidth: '82%',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: '4.5%',
    gap: 16,
  },
  illustration: {
    width: '100%',
    aspectRatio: 360 / 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  copy: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
  list: {
    gap: 10,
  },
  languageRow: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: '4.5%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  languageRowSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#F0FDF8',
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    borderColor: COLORS.radio,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.radio,
  },
  flag: {
    fontSize: 22,
  },
  languageText: {
    flex: 1,
  },
  languageLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  languageSubtitle: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  selectButton: {
    height: 52,
    backgroundColor: COLORS.primary,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
