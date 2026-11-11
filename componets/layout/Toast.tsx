/* eslint-disable react-hooks/refs */
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Text } from './AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ToastVariant = 'success' | 'error';

type ToastProps = {
  visible: boolean;
  variant: ToastVariant;
  message: string;
  onClose: () => void;
};

const COLORS = {
  success: '#42D267',
  error: '#FF3158',
  text: '#121226',
  muted: '#676767',
  close: '#6A6A6A',
  white: '#FFFFFF',
};

export default function Toast({
  visible,
  variant,
  message,
  onClose,
}: ToastProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isCompact = width < 360;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: visible ? 0 : -16,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY, visible]);

  if (!visible) return null;

  return (
    <View pointerEvents="box-none" style={styles.host}>
      <Animated.View
        accessibilityRole="alert"
        style={[
          styles.toast,
          isCompact && styles.toastCompact,
          { marginTop: insets.top + 12 },
          { opacity, transform: [{ translateY }] },
        ]}
      >
        <View style={[styles.accent, { backgroundColor: COLORS[variant] }]} />
        <View
          style={[
            styles.iconCircle,
            isCompact && styles.iconCircleCompact,
            { backgroundColor: COLORS[variant] },
          ]}
        >
          <Ionicons
            name={variant === 'success' ? 'checkmark' : 'close'}
            size={isCompact ? 20 : 25}
            color={COLORS.white}
          />
        </View>
        <View style={styles.copy}>
          <Text style={[styles.title, isCompact && styles.titleCompact]}>
            {variant === 'success' ? 'Success' : 'Error'}
          </Text>
          <Text style={[styles.message, isCompact && styles.messageCompact]}>
            {message}
          </Text>
        </View>
        <Pressable
          accessibilityLabel="Close notification"
          accessibilityRole="button"
          hitSlop={10}
          onPress={onClose}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={20} color={COLORS.close} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    zIndex: 1000,
  },
  toast: {
    width: '92%',
    minHeight: 64,
    borderRadius: 11,
    paddingLeft: 20,
    paddingRight: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.white,
    elevation: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
  },
  toastCompact: {
    width: '94%',
    minHeight: 58,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 6,
    gap: 8,
  },
  accent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 7,
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleCompact: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
  },
  titleCompact: {
    fontSize: 14,
    lineHeight: 18,
  },
  message: {
    flexShrink: 1,
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 15,
  },
  messageCompact: {
    fontSize: 11,
    lineHeight: 15,
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginTop: -4,
  },
});