import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../componets/layout/Button';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(0, 0, 0, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  inputBg: 'rgba(242, 242, 243, 1)',
  border: 'rgba(229, 231, 235, 1)',
  danger: 'rgba(255, 22, 18, 1)',
  overlay: 'rgba(0, 0, 0, 0.45)',
  cancel: 'rgba(218, 218, 219, 1)',
};

const REASONS = [
  'I found a better app/service',
  'Delivery charges are too high',
  'Products I need are often unavailable',
  'I no longer need the service',
  'The app is difficult to use',
  'Other',
] as const;

type DeleteAccountScreenProps = {
  email?: string;
  onBack?: () => void;
  onForgotPassword?: () => void;
  onDeleted?: () => void;
};

export default function DeleteAccountScreen({
  onBack,
  onDeleted,
}: DeleteAccountScreenProps) {
  const insets = useSafeAreaInsets();
  const [reason, setReason] = useState<(typeof REASONS)[number]>(REASONS[0]);
  const [otherReason, setOtherReason] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!showSuccess) {
      return;
    }

    const timeout = setTimeout(() => {
      setShowSuccess(false);
      onDeleted?.();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [onDeleted, showSuccess]);

  const handleNext = () => {
    setShowConfirm(true);
  };

  const footerBottom = Math.max(insets.bottom, 16);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Delete account"
        titleAlign="left"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <View style={styles.flex}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.reasonContent}
          >
            <Text style={styles.reasonTitle}>We're Sorry to See You Go!</Text>
            <Text style={styles.reasonSubtitle}>
              Please let us know why you’re deleting your account —{`\n`}
              your feedback helps us improve.
            </Text>
            <Text style={styles.question}>Why are you deleting your account?</Text>

            <View style={styles.reasonList}>
              {REASONS.map((item) => {
                const selected = reason === item;
                return (
                  <View key={item} style={styles.reasonItemWrap}>
                    <Pressable
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      onPress={() => setReason(item)}
                      style={[styles.reasonItem, selected && styles.reasonItemSelected]}
                    >
                      <View
                        style={[styles.radio, selected && styles.radioSelected]}
                      >
                        {selected ? <View style={styles.radioDot} /> : null}
                      </View>
                      <Text style={styles.reasonLabel}>{item}</Text>
                    </Pressable>

                    {item === 'Other' && selected ? (
                      <TextInput
                        value={otherReason}
                        onChangeText={setOtherReason}
                        placeholder="Type here....."
                        placeholderTextColor={COLORS.muted}
                        style={styles.otherInput}
                      />
                    ) : null}
                  </View>
                );
              })}
            </View>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: footerBottom }]}>
            <Button
              title="Next"
              onPress={handleNext}
              containerStyle={styles.nextButton}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </View>

      <Modal
        visible={showConfirm}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setShowConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmCard}>
            <Text style={styles.confirmText}>
              Confirm the account deletion by{`\n`}clicking “yes”.
            </Text>
            <View style={styles.confirmActions}>
              <Pressable
                onPress={() => setShowConfirm(false)}
                style={[styles.confirmButton, styles.noButton]}
              >
                <Text style={styles.noText}>No</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowConfirm(false);
                  setShowSuccess(true);
                }}
                style={[styles.confirmButton, styles.yesButton]}
              >
                <Text style={styles.yesText}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Return to sign in"
            onPress={onDeleted}
            style={styles.successCard}
          >
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={30} color={COLORS.white} />
            </View>
            <View style={styles.successCopy}>
              <Text style={styles.successTitle}>Account deleted!</Text>
              <Text style={styles.successMessage}>
                Your account and all associated data have been{`\n`}permanently removed.
              </Text>
            </View>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  flex: {
    flex: 1,
  },
  sheet: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  passwordContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    gap: 24,
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  warningIcon: {
    marginTop: 2,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: COLORS.muted,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: -2,
  },
  confirmationError: {
    marginTop: -16,
    marginLeft: 24,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.danger,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  consentText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: COLORS.muted,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: COLORS.primary,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: COLORS.white,
  },
  deleteButton: {
    height: 52,
    borderRadius: 100,
    backgroundColor: COLORS.danger,
  },
  nextButton: {
    height: 52,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
  },
  reasonContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  reasonTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: COLORS.text,
  },
  reasonSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: COLORS.muted,
    marginTop: 8,
    marginBottom: 20,
  },
  question: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: COLORS.text,
    marginBottom: 10,
  },
  reasonList: {
    gap: 4,
  },
  reasonItemWrap: {
    gap: 10,
  },
  reasonItem: {
    minHeight: 39,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 8,
  },
  reasonItemSelected: {
    borderColor: COLORS.primary,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  reasonLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: COLORS.text,
  },
  otherInput: {
    width: '100%',
    height: 51,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    fontSize: 14,
    color: COLORS.text,
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.overlay,
  },
  confirmCard: {
    width: '100%',
    padding: 20,
    gap: 30,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  confirmText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    textAlign: 'center',
    color: COLORS.muted,
  },
  confirmActions: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
  },
  confirmButton: {
    flex: 1,
    height: 52,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noButton: {
    backgroundColor: COLORS.cancel,
  },
  yesButton: {
    backgroundColor: COLORS.primary,
  },
  noText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.muted,
  },
  yesText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
  },
  successCard: {
    width: '100%',
    padding: 20,
    gap: 20,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  successIcon: {
    width: 51,
    height: 51,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  successCopy: {
    width: '100%',
    gap: 4,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: 0.3,
    color: COLORS.text,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.3,
    color: COLORS.muted,
    textAlign: 'center',
  },
});
