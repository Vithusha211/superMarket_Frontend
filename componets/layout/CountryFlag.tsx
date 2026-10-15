import { Image, ImageSourcePropType, StyleSheet, Text } from 'react-native';

type CountryFlagProps = {
  flag: string;
  size?: number;
};

const FLAG_IMAGES: Record<string, ImageSourcePropType | string> = {
  '🇫🇷': require('../../assets/flags/france.png'),
  fr: require('../../assets/flags/france.png'),
  france: require('../../assets/flags/france.png'),
  '🇩🇪': require('../../assets/flags/germany.png'),
  de: require('../../assets/flags/germany.png'),
  germany: require('../../assets/flags/germany.png'),
  '🇬🇧': require('../../assets/flags/uk.png'),
  gb: require('../../assets/flags/uk.png'),
  uk: require('../../assets/flags/uk.png'),
  en: require('../../assets/flags/uk.png'),
  england: require('../../assets/flags/uk.png'),
  '🇱🇰': require('../../assets/flags/sri-lanka.png'),
  lk: require('../../assets/flags/sri-lanka.png'),
  'sri-lanka': require('../../assets/flags/sri-lanka.png'),
  '🇸🇦': '🇸🇦',
  sa: '🇸🇦',
  ar: '🇸🇦',
  '🇷🇺': '🇷🇺',
  ru: '🇷🇺',
};

export default function CountryFlag({ flag, size = 20 }: CountryFlagProps) {
  const source = FLAG_IMAGES[flag];

  if (source && typeof source !== 'string') {
    return (
      <Image
        source={source}
        accessibilityLabel="country flag"
        style={[styles.image, { width: size, height: size }]}
        resizeMode="contain"
      />
    );
  }

  const displayFlag = typeof source === 'string' ? source : flag || '🇺🇳';

  return (
    <Text
      accessibilityLabel="country flag"
      style={[styles.flag, { fontSize: size, lineHeight: size * 1.15 }]}
    >
      {displayFlag}
    </Text>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  flag: {
    includeFontPadding: false,
    textAlign: 'center',
  },
});
