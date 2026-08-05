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
  noBg: 'rgba(242, 242, 243, 1)',
  yesBg: 'rgba(255, 0, 0, 1)',
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
              {title ? <Text style={styles.title}>{title}</Text> : null}
              <Text style={styles.description}>{message}</Text>
              <Button
                title={actionLabel}
                onPress={onAction}
                containerStyle={styles.actionButton}
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
    paddingHorizontal: '4.5%',
  },
  card: {
    width: '100%',
    maxWidth: '91%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.icon,
    padding: '4.5%',
    gap: 16,
    alignItems: 'center',
  },
  confirmMessage: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 24,
  },
  confirmActions: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  noButton: {
    flex: 1,
    height: 48,
    borderRadius: 100,
    backgroundColor: COLORS.noBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  yesButton: {
    flex: 1,
    height: 48,
    borderRadius: 100,
    backgroundColor: COLORS.yesBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
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
  actionButton: {
    marginTop: 10,
  },
});
