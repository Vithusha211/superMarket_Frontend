import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#10B981',
  white: '#FFFFFF',
  text: '#111827',
};

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  onBack?: () => void;
  right?: ReactNode;
  left?: ReactNode;
  backgroundColor?: string;
  titleColor?: string;
  style?: ViewStyle;
};

function LogoPill() {
  return (
    <View style={styles.logoPill}>
      <View style={styles.logoIcon}>
        <Ionicons name="cart-outline" size={18} color={COLORS.white} />
      </View>
      <Text style={styles.logoText}>HappyCart</Text>
    </View>
  );
}

export default function Header({
  title,
  showBack = false,
  showLogo = false,
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
            <LogoPill />
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
                    <Ionicons name="chevron-back" size={20} color={titleColor} />
                  </Pressable>
                ) : (
                  <View style={styles.sideSpacer} />
                ))}
            </View>

            <View style={styles.center}>
              {showLogo ? (
                <LogoPill />
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
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
  },
  side: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  sideSpacer: {
    width: 24,
    height: 24,
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
  iconButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoOnly: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 10,
    borderRadius: 100,
    backgroundColor: COLORS.white,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'italic',
    color: COLORS.primary,
  },
});
