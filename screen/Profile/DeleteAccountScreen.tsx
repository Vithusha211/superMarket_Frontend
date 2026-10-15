import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
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
import InputField from '../../componets/layout/InputField';

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

const DELETE_REASONS = [
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
  onPasswordCheck?: (password: string) => boolean;
  onDeleted?: () => void;
};

export default function DeleteAccountScreen({
  onForgotPassword,
  onPasswordCheck,
  onBack,
  onDeleted,
}: DeleteAccountScreenProps) {
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [isFeedbackStep, setIsFeedbackStep] = useState(false);
  const [selectedReason, setSelectedReason] =
    useState<(typeof DELETE_REASONS)[number]>(DELETE_REASONS[0]);
  const [otherReason, setOtherReason] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const isPasswordError =
    error === 'Password is required.' ||
    error === 'Incorrect password. Please try again.';
  const isConfirmationError = error.startsWith('Please confirm');

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

  const handleDelete = () => {
    if (!password.trim()) {
      setError('Password is required.');
      return;
    }
    if (onPasswordCheck && !onPasswordCheck(password)) {
      setError('Incorrect password. Please try again.');
      return;
    }
    if (!isConfirmed) {
      setError('Please confirm that you understand this action is permanent.');
      return;
    }
    setError('');
    setIsFeedbackStep(true);
  };

  const handleForgotPassword = () => {
    onForgotPassword?.();
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Delete account"
        titleAlign="left"
        showBack
        onBack={() => {
          if (isFeedbackStep) {
            setIsFeedbackStep(false);
            return;
          }
          onBack?.();
        }}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        {isFeedbackStep ? (
          <KeyboardAvoidingView
            style={styles.feedbackPage}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.feedbackScrollContent}
            >
              <View style={styles.feedbackContent}>
                <Text style={styles.feedbackTitle}>
                  We&apos;re Sorry to See You Go!
                </Text>
                <Text style={styles.feedbackDescription}>
                  Please let us know why you&apos;re deleting your account — your
                  feedback helps us improve.
                </Text>
                <Text style={styles.feedbackQuestion}>
                  Why are you deleting your account?
                </Text>
                <View style={styles.reasonList}>
                  {DELETE_REASONS.map((reason) => {
                    const isSelected = selectedReason === reason;
                    return (
                      <Pressable
                        key={reason}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: isSelected }}
                        onPress={() => setSelectedReason(reason)}
                        style={[
                          styles.reasonOption,
                          isSelected && styles.reasonOptionSelected,
                        ]}
                      >
                        <View
                          style={[
                            styles.radioOuter,
                            isSelected && styles.radioOuterSelected,
                          ]}
                        >
                          {isSelected ? (
                            <View style={styles.radioInner} />
                          ) : null}
                        </View>
                        <Text style={styles.reasonText}>{reason}</Text>
                      </Pressable>
                    );
                  })}
                </View>
                {selectedReason === 'Other' ? (
                  <TextInput
                    accessibilityLabel="Tell us why you are deleting your account"
                    placeholder="Type here....."
                    placeholderTextColor={COLORS.muted}
                    value={otherReason}
                    onChangeText={setOtherReason}
                    style={styles.otherReasonInput}
                    returnKeyType="done"
                  />
                ) : null}
              </View>
              <View
                style={[
                  styles.feedbackFooter,
                  { paddingBottom: Math.max(insets.bottom, 16) },
                ]}
              >
                <Button
                  title="Next"
                  onPress={() => setShowConfirm(true)}
                  containerStyle={styles.nextButton}
                  textStyle={styles.nextButtonText}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.passwordContent}>
              <View style={styles.warningRow}>
                <Ionicons
                  name="warning-outline"
                  size={16}
                  color={COLORS.muted}
                  style={styles.warningIcon}
                />
                <Text style={styles.warningText}>
                  This action cannot be undone. All your data will be
                  permanently deleted.
                </Text>
              </View>

              <View style={styles.passwordGroup}>
                <InputField
                  label="Password"
                  variant="password"
                  placeholder="********"
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    setError('');
                  }}
                  error={isPasswordError ? error : undefined}
                />
                <Pressable
                  accessibilityRole="button"
                  onPress={handleForgotPassword}
                  style={styles.forgotRow}
                >
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </Pressable>
              </View>

              <View>
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: isConfirmed }}
                  onPress={() => {
                    setIsConfirmed((checked) => !checked);
                    setError('');
                  }}
                  style={styles.consentRow}
                >
                  <View
                    style={[
                      styles.checkbox,
                      isConfirmed && styles.checkboxSelected,
                    ]}
                  >
                    {isConfirmed ? (
                      <Ionicons
                        name="checkmark"
                        size={12}
                        color={COLORS.white}
                      />
                    ) : null}
                  </View>
                  <Text style={styles.consentText}>
                    I understand that this action is permanent and cannot be
                    undone.
                  </Text>
                </Pressable>
                {isConfirmationError ? (
                  <Text
                    accessibilityLiveRegion="polite"
                    style={styles.confirmationError}
                  >
                    {error}
                  </Text>
                ) : null}
              </View>
            </View>

            <View
              style={[
                styles.footer,
                { paddingBottom: Math.max(insets.bottom, 16) },
              ]}
            >
              <Button
                title="Delete account"
                onPress={handleDelete}
                containerStyle={styles.deleteButton}
                textStyle={styles.buttonText}
              />
            </View>
          </KeyboardAvoidingView>
        )}
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
  feedbackPage: {
    flex: 1,
  },
  feedbackScrollContent: {
    flexGrow: 1,
  },
  feedbackContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  feedbackTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: COLORS.text,
  },
  feedbackDescription: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: COLORS.muted,
  },
  feedbackQuestion: {
    marginTop: 10,
    marginBottom: 14,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: COLORS.text,
  },
  reasonList: {
    gap: 8,
  },
  reasonOption: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
  },
  reasonOptionSelected: {
    borderColor: COLORS.primary,
  },
  radioOuter: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.muted,
    borderRadius: 8,
  },
  radioOuterSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  reasonText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: COLORS.text,
  },
  otherReasonInput: {
    minHeight: 51,
    marginTop: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    color: COLORS.text,
    fontSize: 14,
  },
  feedbackFooter: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  nextButton: {
    height: 52,
    borderRadius: 100,
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.white,
  },
  passwordContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    gap: 20,
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
  passwordGroup: {
    gap: 8,
  },
  forgotRow: {
    alignItems: 'flex-end',
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: -2,
  },
  confirmationError: {
    marginTop: 8,
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
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
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
