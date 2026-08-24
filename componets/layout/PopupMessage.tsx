import { Ionicons } from '@expo/vector-icons';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Button from './Button';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(0, 0, 0, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  overlay: 'rgba(0, 0, 0, 0.45)',
  noBg: 'rgba(218, 218, 219, 1)',
  yesBg: 'rgba(255, 22, 18, 1)',
  icon: 'rgba(7, 103, 128, 1)',
};

export type PopupVariant = 'confirm' | 'status' | 'action';

type PopupMessageProps = {
  visible: boolean;
  variant?: PopupVariant;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  actionLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onAction?: () => void;
  onClose?: () => void;
  style?: ViewStyle;
};

export default function PopupMessage({
  visible,
  variant = 'action',
  title,
  message,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
  actionLabel = 'Continue',
  onConfirm,
  onCancel,
  onAction,
  onClose,
  style,
}: PopupMessageProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose ?? onCancel}
    >
      <Pressable style={styles.overlay} onPress={onClose ?? onCancel}>
        <Pressable
          style={[styles.card, style]}
          onPress={(event) => event.stopPropagation()}
        >
          {variant === 'confirm' && (
            <>
              <Text style={styles.confirmMessage}>{message}</Text>
              <View style={styles.confirmActions}>
                <Pressable
                  accessibilityRole="button"
                  onPress={onCancel}
                  style={styles.noButton}
                >
                  <Text style={styles.noButtonText}>{cancelLabel}</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={onConfirm}
                  style={styles.yesButton}
                >
                  <Text style={styles.yesButtonText}>{confirmLabel}</Text>
                </Pressable>
              </View>
            </>
          )}

          {variant === 'status' && (
            <>
              <View style={styles.iconCircle}>
                <Ionicons name="checkmark" size={36} color={COLORS.icon} />
              </View>
              {title ? <Text style={styles.title}>{title}</Text> : null}
              <Text style={styles.description}>{message}</Text>
            </>
          )}

          {variant === 'action' && (
            <>
              <View style={styles.actionCopy}>
                {title ? (
                  <Text style={styles.actionTitle}>{title}</Text>
                ) : null}
                <Text style={styles.actionMessage}>{message}</Text>
              </View>
              <Button
                title={actionLabel}
                onPress={onAction}
                containerStyle={styles.actionButton}
                textStyle={styles.actionButtonText}
              />
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    gap: 30,
    alignItems: 'center',
  },
  confirmMessage: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 21,
  },
  confirmActions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 20,
  },
  noButton: {
    flex: 1,
    maxWidth: 170,
    height: 52,
    borderRadius: 100,
    padding: 10,
    backgroundColor: COLORS.noBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.muted,
    lineHeight: 16,
  },
  yesButton: {
    flex: 1,
    maxWidth: 170,
    height: 52,
    borderRadius: 100,
    padding: 10,
    backgroundColor: COLORS.yesBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
    lineHeight: 16,
  },
  iconCircle: {
    width: '16.5%',
    aspectRatio: 1,
    maxWidth: 80,
    minWidth: 64,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: COLORS.icon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
  actionCopy: {
    width: '100%',
    gap: 4,
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: 0.3,
    color: COLORS.text,
    textAlign: 'center',
  },
  actionMessage: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.3,
    color: COLORS.muted,
    textAlign: 'center',
  },
  actionButton: {
    width: '100%',
    height: 52,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
  },
});
