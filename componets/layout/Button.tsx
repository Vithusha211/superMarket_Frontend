import { ActivityIndicator } from 'react-native';
import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
};

export type ButtonVariant = 'primary' | 'outline' | 'text';
export type ButtonSize = 'md' | 'sm';

export type ButtonProps = {
  title?: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  icon,
  containerStyle,
  textStyle,
}: ButtonProps) {
  const isDisabled = !!disabled || !!loading || !onPress;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        styles[variant],
        !isDisabled && pressed ? styles.pressed : null,
        containerStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <View style={styles.content}>
          {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
          {title ? (
            <Text
              style={[
                styles.label,
                variant === 'primary' && styles.textPrimary,
                variant === 'outline' && styles.textOutline,
                variant === 'text' && styles.textTextVariant,
                textStyle,
              ]}
            >
              {title}
            </Text>
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  md: {
    width: '100%',
    height: 52,
    paddingHorizontal: '4.5%',
  },
  sm: {
    height: 41,
    width: 41,
  },
  content: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 10,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  text: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
  textPrimary: {
    color: COLORS.white,
  },
  textOutline: {
    color: COLORS.primary,
  },
  textTextVariant: {
    color: COLORS.primary,
  },
});
