import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
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
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#72828A',
};

type FormErrors = {
  password?: string;
  confirmPassword?: string;
};

type CreateNewPasswordScreenProps = {
  onBack?: () => void;
  onResetSuccess?: () => void;
};

export default function CreateNewPasswordScreen({
  onBack,
  onResetSuccess,
}: CreateNewPasswordScreenProps) {
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = (
    nextPassword = password,
    nextConfirm = confirmPassword,
  ): FormErrors => {
    const nextErrors: FormErrors = {};

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

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (submitted) {
      setErrors(validate(value, confirmPassword));
    }
  };

  const handleConfirmChange = (value: string) => {
    setConfirmPassword(value);
    if (submitted) {
      setErrors(validate(password, value));
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
      <Header
        title="Create new password"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={insets.top + 56}
      >
        <View style={styles.sheet}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: Math.max(insets.bottom, 24) + 80 },
            ]}
          >
            <Text style={styles.helper}>
              Your new password must be different from previous passwords
            </Text>

            <View style={styles.form}>
              <InputField
                label="Enter new Password"
                variant="password"
                placeholder="********"
                value={password}
                onChangeText={handlePasswordChange}
                error={errors.password}
              />

              <InputField
                label="Confirm new password"
                variant="password"
                placeholder="********"
                value={confirmPassword}
                onChangeText={handleConfirmChange}
                error={errors.confirmPassword}
              />
            </View>
          </ScrollView>

          <View
            style={[
              styles.footer,
              { paddingBottom: Math.max(insets.bottom, 20) },
            ]}
          >
            <Button
              title="Reset password"
              onPress={handleReset}
              containerStyle={styles.resetButton}
              textStyle={styles.resetText}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <PopupMessage
        visible={showSuccess}
        variant="action"
        title="Password reset successful!"
        message="Your password has been successfully reset."
        actionLabel="Back to sign in"
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
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollContent: {
    paddingHorizontal: '4.5%',
    paddingTop: 28,
    gap: 24,
  },
  helper: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 22,
  },
  form: {
    gap: 16,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: '4.5%',
    paddingTop: 12,
    backgroundColor: COLORS.white,
  },
  resetButton: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
  },
  resetText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
