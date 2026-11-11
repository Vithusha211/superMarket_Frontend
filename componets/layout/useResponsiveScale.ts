import { useWindowDimensions } from 'react-native';

const REFERENCE_WIDTH = 390;
const MIN_SCALE = 0.88;
const MAX_SCALE = 1.08;
const MAX_FONT_SCALE = 2;

export function getResponsiveScale(width: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, width / REFERENCE_WIDTH));
}

export function useResponsiveScale() {
  const { width } = useWindowDimensions();
  return getResponsiveScale(width);
}

export function useResponsiveFontScale(
  allowFontScaling = true,
  maxFontSizeMultiplier = MAX_FONT_SCALE,
) {
  const { fontScale } = useWindowDimensions();
  return allowFontScaling
    ? Math.min(fontScale, maxFontSizeMultiplier)
    : 1;
}
