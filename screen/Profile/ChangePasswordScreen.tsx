import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../componets/layout/Button';
import Header from '../../componets/layout/Header';
import InputField from '../../componets/layout/InputField';
import PopupMessage from '../../componets/layout/PopupMessage';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(0, 0, 0, 1)',
  muted: 'rgba(114, 130, 138, 1)',
};

type FormErrors = {
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
};

type ChangePasswordScreenProps = {
  email?: string;
  onBack?: () => void;
  onForgotPassword?: () => void;
  onResetSuccess?: () => void;
};

function maskEmail(email: string) {
  const [local = '', domain = 'gmail.com'] = email.split('@');
  if (!local) {
    return email;
  }
  const start = local.slice(0, 1);
  const end = local.length > 2 ? local.slice(-1) : '';
  return `${start}${'*'.repeat(Math.max(local.length - 2, 4))}${end}@${domain}`;
}

export default function ChangePasswordScreen({
  email = 'user@gmail.com',
  onBack,
  onForgotPassword,
  onResetSuccess,
}: ChangePasswordScreenProps) {
  const insets = useSafeAreaInsets();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCodeSent, setShowCodeSent] = useState(false);

  const validate = (
    nextCurrent = currentPassword,
    nextPassword = password,
    nextConfirm = confirmPassword,
  ): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!nextCurrent.trim()) {
      nextErrors.currentPassword = 'Current password is required';
    }

    if (!nextPassword.trim()) {
      nextErrors.password = 'New password is required';
    } else if (nextPassword.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
    }

    if (!nextConfirm.trim()) {
      nextErrors.confirmPassword = 'Confirm password is required';
    } else if (nextPassword !== nextConfirm) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    return nextErrors;
  };

  const updateField = (
    key: keyof FormErrors,
    value: string,
    setter: (value: string) => void,
  ) => {
    setter(value);
    if (submitted) {
      const next = {
        currentPassword,
        password,
        confirmPassword,
        [key]: value,
      };
      setErrors(
        validate(next.currentPassword, next.password, next.confirmPassword),
      );
    }
  };

  const handleReset = () => {
    setSubmitted(true);
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setShowSuccess(true);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Change password"
        titleAlign="left"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={insets.top + 56}
        >
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: 24 },
            ]}
          >
            <View style={styles.infoRow}>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color={COLORS.muted}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>
                For your security, please enter your current password before
                setting a new one.
              </Text>
            </View>

            <View style={styles.form}>
              <InputField
                label="Enter current password"
                variant="password"
                placeholder="********"
                value={currentPassword}
                onChangeText={(value) =>
                  updateField('currentPassword', value, setCurrentPassword)
                }
                error={errors.currentPassword}
              />

              <InputField
                label="Enter new Password"
                variant="password"
                placeholder="********"
                value={password}
                onChangeText={(value) =>
                  updateField('password', value, setPassword)
                }
                error={errors.password}
              />

              <InputField
                label="Confirm new password"
                variant="password"
                placeholder="********"
                value={confirmPassword}
                onChangeText={(value) =>
                  updateField('confirmPassword', value, setConfirmPassword)
                }
                error={errors.confirmPassword}
              />

              <Pressable
                onPress={() => setShowCodeSent(true)}
                hitSlop={12}
                style={styles.forgotWrap}
                accessibilityRole="link"
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>
            </View>
          </ScrollView>

          <View
            style={[
              styles.footer,
              { paddingBottom: Math.max(insets.bottom, 16) },
            ]}
          >
            <Button
              title="Reset password"
              onPress={handleReset}
              containerStyle={styles.resetButton}
              textStyle={styles.resetText}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <PopupMessage
        visible={showCodeSent}
        variant="action"
        title="Verification code sent!"
        message={`We have sent a verification code to ${maskEmail(email)}.`}
        actionLabel="Continue"
        onAction={() => {
          setShowCodeSent(false);
          onForgotPassword?.();
        }}
        onClose={() => setShowCodeSent(false)}
      />

      <PopupMessage
        visible={showSuccess}
        variant="action"
        title="Password reset successful!"
        message="Your password has been successfully reset."
        actionLabel="Back to account"
        onAction={() => {
          setShowSuccess(false);
          onResetSuccess?.();
        }}
        onClose={() => setShowSuccess(false)}
      />
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
    justifyContent: 'space-between',
  },
  scroll: {
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
  scrollContent: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 30,
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  infoIcon: {
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: COLORS.muted,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: -4,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
    lineHeight: 21,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: COLORS.white,
  },
  resetButton: {
    width: '100%',
    height: 52,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },
  resetText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
  },
});
