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
import { StatusBar } from 'expo-status-bar';
import Button from '../../componets/layout/Button';
import InputField from '../../componets/layout/InputField';
import Logo from '../../componets/layout/Logo';

const COLORS = {
  primary: '#02B97D',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(0, 0, 0, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  link: '#02B97D',
};

type FormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

type SignUpData = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  countryFlag: string;
  countryCode: string;
};

type RegisterScreenProps = {
  onNext?: (data: SignUpData) => void;
  onSignIn?: () => void;
  onCountryPress?: () => void;
  countryFlag?: string;
  countryCode?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function BrandHeader() {
  return (
    <View style={styles.brandHeader}>
      <Logo height={48} />

      <View style={styles.headerCopy}>
        <Text style={styles.headerTitle}>Sign up</Text>
        <Text style={styles.headerSubtitle}>
          Create your account and start shopping your daily essentials easily.
        </Text>
      </View>
    </View>
  );
}

export default function RegisterScreen({
  onNext,
  onSignIn,
  onCountryPress,
  countryFlag = '🇩🇪',
  countryCode = '+49',
}: RegisterScreenProps) {
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (
    next: Partial<SignUpData> = {},
  ): FormErrors => {
    const values = {
      fullName: next.fullName ?? fullName,
      email: next.email ?? email,
      phone: next.phone ?? phone,
      password: next.password ?? password,
      confirmPassword: next.confirmPassword ?? confirmPassword,
    };

    const nextErrors: FormErrors = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = 'Full name is required';
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email address is required';
    } else if (!isValidEmail(values.email.trim())) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!values.phone.trim()) {
      nextErrors.phone = 'Phone number is required';
    }

    if (!values.password.trim()) {
      nextErrors.password = 'Password is required';
    } else if (values.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    if (!values.confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Confirm password is required';
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    return nextErrors;
  };

  const updateField = <K extends keyof FormErrors>(
    key: K,
    value: string,
    setter: (value: string) => void,
  ) => {
    setter(value);
    if (submitted) {
      setErrors((prev) => ({
        ...prev,
        [key]: validate({ [key]: value } as Partial<SignUpData>)[key],
      }));
    }
  };

  const handleNext = () => {
    setSubmitted(true);
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onNext?.({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      confirmPassword,
      countryFlag,
      countryCode,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style="light" />

      <View style={[styles.greenTop, { paddingTop: insets.top + 16 }]}>
        <BrandHeader />
      </View>

      <View style={styles.sheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 40 },
          ]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
        >
          <View style={styles.form}>
            <InputField
              label="Fullname"
              variant="text"
              placeholder="eg: John Doe"
              value={fullName}
              onChangeText={(value) =>
                updateField('fullName', value, setFullName)
              }
              error={errors.fullName}
            />

            <InputField
              label="Email address"
              variant="email"
              placeholder="Example@gmail.com"
              value={email}
              onChangeText={(value) => updateField('email', value, setEmail)}
              autoCapitalize="none"
              error={errors.email}
            />

            <InputField
              label="Phone number"
              variant="phone"
              placeholder="1234 5678 9012"
              value={phone}
              onChangeText={(value) => updateField('phone', value, setPhone)}
              countryFlag={countryFlag}
              countryCode={countryCode}
              onCountryPress={onCountryPress}
              error={errors.phone}
            />

            <InputField
              label="Password"
              variant="password"
              placeholder="********"
              value={password}
              onChangeText={(value) =>
                updateField('password', value, setPassword)
              }
              error={errors.password}
            />

            <InputField
              label="Confirm Password"
              variant="password"
              placeholder="********"
              value={confirmPassword}
              onChangeText={(value) =>
                updateField('confirmPassword', value, setConfirmPassword)
              }
              error={errors.confirmPassword}
            />

            <Button
              title="Next"
              onPress={handleNext}
              containerStyle={styles.nextButton}
              textStyle={styles.nextButtonText}
            />
          </View>

          <Pressable onPress={onSignIn} style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.footerLink}>Sign in</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
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
    marginTop: -8,
    marginLeft: 20,
    marginRight: 20,
    
  },
  scrollContent: {
    paddingHorizontal: '4.5%',
    paddingTop: '5.5%',
    gap: 24,
  },
  form: {
    gap: 16,
  },
  nextButton: {
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 4,
  },
  footerText: {
    fontSize: 16,
    color: COLORS.muted,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  footerLink: {
    fontWeight: '500',
    color: COLORS.link,
  },
});
