import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from './Logo';

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
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, paddingTop: insets.top + 12 },
        style,
      ]}
    >
      <StatusBar style="light" />

      <View style={styles.row}>
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
              style={styles.backButton}
            >
              <Image
                source={require('../../assets/back-icon.png')}
                style={[styles.backIcon, { tintColor: titleColor }]}
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
            <View style={styles.side}>
              {left ??
                (showBack ? (
                  <Pressable
                    accessibilityRole="button"
                    onPress={onBack}
                    hitSlop={8}
                    style={styles.backButton}
                  >
                    <Image
                      source={require('../../assets/back-icon.png')}
                      style={[styles.backIcon, { tintColor: titleColor }]}
                      resizeMode="contain"
                    />
                  </Pressable>
                ) : (
                  <View style={styles.sideSpacer} />
                ))}
            </View>

            <View style={styles.center}>
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

            <View style={[styles.side, styles.sideRight]}>
              {right ?? <View style={styles.sideSpacer} />}
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
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
  },
  side: {
    width: '9%',
    minWidth: 36,
    maxWidth: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  sideSpacer: {
    width: '100%',
    aspectRatio: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
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
