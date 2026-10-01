import { Image, ImageSourcePropType, StyleSheet, Text } from 'react-native';

type CountryFlagProps = {
  flag: string;
  size?: number;
};

const FLAG_IMAGES: Record<string, ImageSourcePropType> = {
  '🇫🇷': require('../../assets/flags/france.png'),
  fr: require('../../assets/flags/france.png'),
  '🇩🇪': require('../../assets/flags/germany.png'),
  de: require('../../assets/flags/germany.png'),
  '🇬🇧': require('../../assets/flags/uk.png'),
  gb: require('../../assets/flags/uk.png'),
  en: require('../../assets/flags/uk.png'),
};

export default function CountryFlag({ flag, size = 20 }: CountryFlagProps) {
  const source = FLAG_IMAGES[flag];

  if (source) {
    return (
      <Image
        source={source}
        accessibilityLabel="country flag"
        style={[styles.image, { width: size, height: size }]}
        resizeMode="contain"
      />
    );
  }

  return (
    <Text
      accessibilityLabel="country flag"
      style={[styles.flag, { fontSize: size, lineHeight: size * 1.15 }]}
    >
      {flag}
    </Text>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 2,
  },
  flag: {
    includeFontPadding: false,
    textAlign: 'center',
  },
});
