import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../componets/layout/Button';
import InputField from '../../componets/layout/InputField';
import Logo from '../../componets/layout/Logo';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(0, 0, 0, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  link: 'rgba(7, 193, 135, 1)',
  socialBg: 'rgba(247, 248, 249, 1)',
  border: 'rgba(229, 231, 235, 1)',
  overlay: 'rgba(16, 17, 17, 0.29)',
};

type SocialProvider = 'google' | 'apple' | 'facebook' | 'instagram';

type FormErrors = {
  email?: string;
  password?: string;
};

type LoginScreenProps = {
  onContinue?: (data: {
    email: string;
    password: string;
  }) => boolean | void;
  onForgotPassword?: (email: string) => void;
  onSignUp?: () => void;
  onSocialPress?: (provider: SocialProvider) => void;
};

const SOCIALS: {
  id: SocialProvider;
  icon: ImageSourcePropType;
}[] = [
  { id: 'google', icon: require('../../assets/social/google.png') },
  { id: 'apple', icon: require('../../assets/social/apple.png') },
  { id: 'facebook', icon: require('../../assets/social/facebook.png') },
  { id: 'instagram', icon: require('../../assets/social/instagram.png') },
];

function BrandHeader() {
  return (
    <View style={styles.brandHeader}>
      <Logo height={48} />

      <View style={styles.headerCopy}>
        <Text style={styles.headerTitle}>Sign in</Text>
        <Text style={styles.headerSubtitle}>
          Welcome back! Sign in to continue shopping fresh and fast.
        </Text>
      </View>
    </View>
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function LoginScreen({
  onContinue,
  onForgotPassword,
  onSignUp,
  onSocialPress,
}: LoginScreenProps) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState<string | undefined>();

  const validate = (nextEmail = email, nextPassword = password): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!nextEmail.trim()) {
      nextErrors.email = 'Email or username is required';
    } else if (!isValidEmail(nextEmail.trim())) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!nextPassword.trim()) {
      nextErrors.password = 'Password is required';
    }

    return nextErrors;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (submitted) {
      setErrors((prev) => ({
        ...prev,
        email: validate(value, password).email,
      }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (submitted) {
      setErrors((prev) => ({
        ...prev,
        password: validate(email, value).password,
      }));
    }
  };

  const handleContinue = () => {
    setSubmitted(true);
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const isAuthenticated = onContinue?.({
      email: email.trim(),
      password,
    });

    if (isAuthenticated === false) {
      setErrors({ password: 'Incorrect username or password' });
    }
  };

  const openForgotPopup = () => {
    setForgotEmail(email.trim());
    setForgotError(undefined);
    setShowForgotPopup(true);
  };

  const closeForgotPopup = () => {
    setShowForgotPopup(false);
    setForgotError(undefined);
  };

  const handleForgotSubmit = () => {
    const trimmed = forgotEmail.trim();

    if (!trimmed) {
      setForgotError('Email address is required');
      return;
    }

    if (!isValidEmail(trimmed)) {
      setForgotError('Enter a valid email address');
      return;
    }

    setForgotError(undefined);
    setShowForgotPopup(false);
    onForgotPassword?.(trimmed);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={[styles.greenTop, { paddingTop: insets.top + 16 }]}>
        <BrandHeader />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.sheet}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + 24 },
            ]}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
            automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
          >
            <View style={styles.form}>
              <InputField
                label="Email address"
                variant="email"
                placeholder="Example@gmail.com"
                value={email}
                onChangeText={handleEmailChange}
                autoCapitalize="none"
                error={errors.email}
              />

              <InputField
                label="Password"
                variant="password"
                placeholder="********"
                value={password}
                onChangeText={handlePasswordChange}
                error={errors.password}
              />

              <View style={styles.optionsRow}>
                <Pressable onPress={openForgotPopup} hitSlop={8}>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </Pressable>
              </View>

              <Button
                title="Continue"
                onPress={handleContinue}
                containerStyle={styles.continueButton}
                textStyle={styles.continueText}
              />
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              {SOCIALS.map((social) => (
                <Pressable
                  key={social.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Continue with ${social.id}`}
                  onPress={() => onSocialPress?.(social.id)}
                  style={styles.socialButton}
                >
                  <Image
                    source={social.icon}
                    style={styles.socialIcon}
                    resizeMode="contain"
                  />
                </Pressable>
              ))}
            </View>

            <Pressable onPress={onSignUp} style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Text style={styles.footerLink}>Sign up</Text>
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={showForgotPopup}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={closeForgotPopup}
      >
        <KeyboardAvoidingView
          style={styles.modalRoot}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Pressable style={styles.overlay} onPress={closeForgotPopup} />

          <View style={styles.popupCard}>
            <Text style={styles.popupTitle}>Forgot password</Text>
            <Text style={styles.popupMessage}>
              Enter your email address and we'll send you an OTP to reset your
              password.
            </Text>

            <InputField
              label="Email address"
              variant="email"
              placeholder="Example@gmail.com"
              value={forgotEmail}
              onChangeText={(value) => {
                setForgotEmail(value);
                if (forgotError) {
                  setForgotError(undefined);
                }
              }}
              autoCapitalize="none"
              error={forgotError}
            />

            <Button
              title="Continue"
              onPress={handleForgotSubmit}
              containerStyle={styles.popupButton}
              textStyle={styles.continueText}
            />
          </View>
        </KeyboardAvoidingView>
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
  greenTop: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingBottom: '6.5%',
    paddingHorizontal: '4.5%',
  },
  brandHeader: {
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  headerCopy: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: '5.5%',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.95,
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    marginTop: 30,
    marginBottom: 30,
    marginLeft:20,
    marginRight:20,
  },
  scrollContent: {
    paddingHorizontal: '4.5%',
    paddingTop: '6.5%',
    gap: 20,
  },
  form: {
    gap: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -4,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.link,
  },
  continueButton: {
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 4,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '500',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    fontSize: 14,
    color: COLORS.muted,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: COLORS.socialBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: '55%',
    height: '55%',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 16,
    color: COLORS.text,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  footerLink: {
    fontWeight: '500',
    color: COLORS.primary,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '4.5%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.overlay,
  },
  popupCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    gap: 16,
    zIndex: 1,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  popupMessage: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
  popupButton: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
    marginTop: 4,
  },
});
