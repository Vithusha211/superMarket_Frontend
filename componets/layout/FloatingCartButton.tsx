import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  badge: '#EF4444',
};

const CART_ICON = require('../../assets/footer/floating-cart.png');

type FloatingCartButtonProps = {
  count?: number;
  onPress?: () => void;
  style?: ViewStyle;
  /** Distance from bottom of parent (px). */
  bottomOffset?: number;
};

export default function FloatingCartButton({
  count = 0,
  onPress,
  style,
  bottomOffset,
}: FloatingCartButtonProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const scale = useRef(new Animated.Value(1)).current;
  const prevCount = useRef(count);

  const size = Math.min(Math.max(width * 0.16, 56), 70);
  const iconSize = size * 0.42;
  const right = width * 0.045;
  const bottom = bottomOffset ?? Math.max(insets.bottom, 12) + 100;

  useEffect(() => {
    if (count > prevCount.current) {
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.18,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    }
    prevCount.current = count;
  }, [count, scale]);

  return (
    <Animated.View
      style={[
        styles.wrap,
        {
          bottom,
          right,
          width: size,
          height: size,
          transform: [{ scale }],
        },
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open cart, ${count} items`}
        onPress={onPress}
        hitSlop={8}
        style={[
          styles.button,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <Image
          source={CART_ICON}
          style={{ width: iconSize, height: iconSize, tintColor: COLORS.white }}
          resizeMode="contain"
        />
        {count > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    zIndex: 100,
    elevation: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 16,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.badge,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
