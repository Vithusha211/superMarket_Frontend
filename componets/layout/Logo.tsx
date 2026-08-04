import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';

const LOGO_ASPECT = 180 / 70;

type LogoProps = {
  height?: number;
  style?: StyleProp<ImageStyle>;
};

export default function Logo({ height = 48, style }: LogoProps) {
  return (
    <Image
      source={require('../../assets/logo.png')}
      accessibilityLabel="HappyCart Logo"
      resizeMode="contain"
      style={[
        styles.logo,
        { width: height * LOGO_ASPECT, height },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    maxWidth: '100%',
  },
});
