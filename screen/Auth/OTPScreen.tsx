import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
  text: 'rgba(13, 13, 13, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  inputBg: 'rgba(242, 242, 243, 1)',
  inputBorder: 'rgba(229, 231, 235, 1)',
  disabled: 'rgba(114, 130, 138, 1)',
};
 
const OTP_LENGTH = 6;
const DEFAULT_SECONDS = 179;

export type OTPVariant = 'email' | 'phone';

type OTPScreenProps = {
  variant?: OTPVariant;
  title?: string;
  email?: string;
  phone?: string;
  onBack?: () => void;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
};

function maskEmail(email: string) {
  const [local = '', domain = 'gmail.com'] = email.split('@');
  if (!local) {
    return 'g*************@gmail.com';
  }
  const visibleStart = local.slice(0, 1);
  const visibleEnd = local.length > 2 ? local.slice(-1) : '';
  return `${visibleStart}${'*'.repeat(Math.max(local.length - 2, 10))}${visibleEnd}@${domain}`;
}

function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) {
    return '*******5657';
  }
  return `${'*'.repeat(Math.max(digits.length - 4, 6))}${digits.slice(-4)}`;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function OTPScreen({
  variant = 'email',
  title,
  email = 'user@gmail.com',
  phone = '1234565657',
  onBack,
  onVerify,
  onResend,
}: OTPScreenProps) {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SECONDS);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const isPhone = variant === 'phone';
  const headerTitle =
    title ??
    (isPhone ? 'Phone Number Verification' : 'Email Verification');
  const otpValue = otp.join('');
  const isComplete = otpValue.length === OTP_LENGTH && otp.every(Boolean);
  const canResend = secondsLeft <= 0;

  useEffect(() => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setSecondsLeft(DEFAULT_SECONDS);
  }, [variant]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) {
      return;
    }
    setOtp(Array(OTP_LENGTH).fill(''));
    setSecondsLeft(DEFAULT_SECONDS);
    inputsRef.current[0]?.focus();
    onResend?.();
  };

  return (
    <View style={styles.screen}>
      <Header
        title={headerTitle}
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
          <View style={styles.content}>
            <Text style={styles.title}>Enter your OTP number</Text>
            <Text style={styles.subtitle}>
              {isPhone
                ? `We've sent the OTP number via sms to ${maskPhone(phone)}`
                : `We've sent the OTP number via mail to ${maskEmail(email)}`}
            </Text>

            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={`${variant}-${index}`}
                  ref={(ref) => {
                    inputsRef.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(value) => handleChange(index, value)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(index, nativeEvent.key)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                />
              ))}
            </View>

            <Text style={styles.timerText}>
              Code expires in:{' '}
              <Text
                style={[
                  styles.timerValue,
                  canResend && styles.timerExpired,
                ]}
              >
                {formatTime(secondsLeft)}
              </Text>
            </Text>

            <Pressable
              onPress={handleResend}
              disabled={!canResend}
              hitSlop={8}
            >
              <Text style={styles.resendText}>
                Didn't receive the code?{' '}
                <Text
                  style={[
                    styles.resendLink,
                    canResend
                      ? styles.resendLinkActive
                      : styles.resendDisabled,
                  ]}
                >
                  Resend
                </Text>
              </Text>
            </Pressable>
          </View>

          <View
            style={[
              styles.footer,
              { paddingBottom: Math.max(insets.bottom, 16) },
            ]}
          >
            <Button
              title="Verify"
              onPress={isComplete ? () => onVerify?.(otpValue) : undefined}
              disabled={!isComplete}
              containerStyle={[
                styles.verifyButton,
                !isComplete && styles.verifyButtonDisabled,
              ]}
              textStyle={styles.verifyText}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
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
  sheet: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: '4.5%',
    paddingTop: 20,
    gap: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    gap:16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.muted,
    lineHeight: 22,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 12,
    marginBottom: 8,
  },
  otpBox: {
    flex: 1,
    height: 55,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  otpBoxFilled: {
    borderColor: COLORS.muted,
  },
  timerText: {
    fontSize: 14,
    color: COLORS.text,
    letterSpacing: 0.3,
    gap:8,
  },
  timerValue: {
    fontWeight: '500',
    color: COLORS.text,
  },
  timerExpired: {
    color: COLORS.muted,
  },
  resendText: {
    fontSize: 14,
    color: COLORS.muted,
  },
  resendLink: {
    fontWeight: '500',
  },
  resendLinkActive: {
    color: COLORS.primary,
  },
  resendDisabled: {
    color: COLORS.muted,
    opacity: 0.7,
  },
  footer: {
    paddingHorizontal: '4.5%',
    paddingTop: 12,
  },
  verifyButton: {
    height: 52,
    backgroundColor: COLORS.primary,
  },
  verifyButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  verifyText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
