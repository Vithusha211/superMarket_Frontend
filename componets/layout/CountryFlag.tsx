import { StyleSheet, Text } from 'react-native';

type CountryFlagProps = {
  flag: string;
  size?: number;
};

export default function CountryFlag({ flag, size = 20 }: CountryFlagProps) {
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
  flag: {
    includeFontPadding: false,
    textAlign: 'center',
  },
});