import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { useResponsiveScale } from './useResponsiveScale';

const LOGO_ASPECT = 180 / 70;

type LogoProps = {
  height?: number;
  style?: StyleProp<ImageStyle>;
};

export default function Logo({ height = 48, style }: LogoProps) {
  const scale = useResponsiveScale();
  const responsiveHeight = height * scale;
  return (
    <Image
      source={require('../../assets/logo.png')}
      accessibilityLabel="HappyCart Logo"
      resizeMode="contain"
      style={[
        styles.logo,
        { width: responsiveHeight * LOGO_ASPECT, height: responsiveHeight },
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
