import { type ReactNode } from 'react';
import  {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Text } from './AppText';
import {
  useResponsiveFontScale,
  useResponsiveScale,
} from './useResponsiveScale';

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
  icon?: ReactNode;
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
  const scale = useResponsiveScale();
  const fontScale = useResponsiveFontScale();
  const suppliedContainerStyle = StyleSheet.flatten(containerStyle);
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
        size === 'md'
          ? { height: 52 * scale * fontScale }
          : { width: 41 * scale, height: 41 * scale * fontScale },
        !isDisabled && pressed ? styles.pressed : null,
        containerStyle,
        suppliedContainerStyle &&
        (typeof suppliedContainerStyle.height === 'number' ||
          typeof suppliedContainerStyle.minHeight === 'number')
          ? {
              height:
                typeof suppliedContainerStyle.height === 'number'
                  ? suppliedContainerStyle.height * scale * fontScale
                  : undefined,
              minHeight:
                typeof suppliedContainerStyle.minHeight === 'number'
                  ? suppliedContainerStyle.minHeight * scale * fontScale
                  : undefined,
            }
          : null,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? COLORS.white : COLORS.primary}
        />
      ) : (
        <View
          style={[
            styles.content,
            { gap: 8 * scale, paddingHorizontal: 10 * scale },
          ]}
        >
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
