import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import  {
  Image,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Text } from './AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from './Logo';
import {
  useResponsiveFontScale,
  useResponsiveScale,
} from './useResponsiveScale';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
};

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  titleAlign?: 'center' | 'left';
  onBack?: () => void;
  right?: ReactNode;
  left?: ReactNode;
  backgroundColor?: string;
  titleColor?: string;
  style?: ViewStyle;
};

export default function Header({
  title,
  showBack = false,
  showLogo = false,
  titleAlign = 'center',
  onBack,
  right,
  left,
  backgroundColor = COLORS.primary,
  titleColor = COLORS.white,
  style,
}: HeaderProps) {
  const scale = useResponsiveScale();
  const fontScale = useResponsiveFontScale();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, paddingTop: insets.top + 12 * scale },
        style,
      ]}
    >
      <StatusBar style="light" />

      <View
        style={[
          styles.row,
          { minHeight: 40 * scale * fontScale },
        ]}
      >
        {showLogo && !showBack && !left && !right && !title ? (
          <View style={styles.logoOnly}>
            <Logo height={36} />
          </View>
        ) : showBack && titleAlign === 'left' && title && !left ? (
          <View style={styles.rowLeft}>
            <Pressable
              accessibilityRole="button"
              onPress={onBack}
              hitSlop={8}
              style={[
                styles.backButton,
                {
                  width: 36 * scale,
                  height: 36 * scale,
                  borderRadius: 18 * scale,
                },
              ]}
            >
              <Image
                source={require('../../assets/back-icon.png')}
                style={[
                  styles.backIcon,
                  {
                    width: 20 * scale,
                    height: 20 * scale,
                    tintColor: titleColor,
                  },
                ]}
                resizeMode="contain"
              />
            </Pressable>
            <Text
              style={[styles.titleLeft, { color: titleColor }]}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        ) : (
          <>
            <View style={[styles.side, { width: 40 * scale }]}>
              {left ??
                (showBack ? (
                  <Pressable
                    accessibilityRole="button"
                    onPress={onBack}
                    hitSlop={8}
                    style={[
                      styles.backButton,
                      {
                        width: 36 * scale,
                        height: 36 * scale,
                        borderRadius: 18 * scale,
                      },
                    ]}
                  >
                    <Image
                      source={require('../../assets/back-icon.png')}
                      style={[
                        styles.backIcon,
                        {
                          width: 20 * scale,
                          height: 20 * scale,
                          tintColor: titleColor,
                        },
                      ]}
                      resizeMode="contain"
                    />
                  </Pressable>
                ) : (
                  <View
                    style={[
                      styles.sideSpacer,
                      { width: 36 * scale, height: 36 * scale },
                    ]}
                  />
                ))}
            </View>

            <View style={styles.center} pointerEvents="none">
              {showLogo ? (
                <Logo height={36} />
              ) : title ? (
                <Text
                  style={[styles.title, { color: titleColor }]}
                  numberOfLines={1}
                >
                  {title}
                </Text>
              ) : null}
            </View>

            <View
              style={[styles.side, styles.sideRight, { width: 40 * scale }]}
            >
              {right ?? (
                <View
                  style={[
                    styles.sideSpacer,
                    { width: 36 * scale, height: 36 * scale },
                  ]}
                />
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '4.5%',
    paddingBottom: '3.5%',
  },
  row: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 40,
  },
  side: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 2,
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  sideSpacer: {
    width: 36,
    height: 36,
  },
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 48,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleLeft: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
  },
  iconButton: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  logoOnly: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
