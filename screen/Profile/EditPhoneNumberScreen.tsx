import { StatusBar } from 'expo-status-bar';
import  {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from '../../componets/layout/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../componets/layout/Button';
import CountryFlag from '../../componets/layout/CountryFlag';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(0, 0, 0, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  inputBg: 'rgba(242, 242, 243, 1)',
  border: 'rgba(229, 231, 235, 1)',
};

type EditPhoneNumberScreenProps = {
  phone?: string;
  email?: string;
  countryFlag?: string;
  countryCode?: string;
  onBack?: () => void;
  onNext?: () => void;
};

export default function EditPhoneNumberScreen({
  phone = '0775512445',
  email = '',
  countryFlag = '🇱🇰',
  countryCode = '+94',
  onBack,
  onNext,
}: EditPhoneNumberScreenProps) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <Header
        title="Edit Phone number"
        titleAlign="left"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <View style={styles.content}>
          <Text style={styles.description}>
            To change your phone number, we need to verify your identity.
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone number</Text>
            <View style={styles.phoneRow}>
              <View style={styles.countryField}>
                <CountryFlag flag={countryFlag} size={20} />
              </View>

              <View style={styles.phoneField}>
                <Text style={styles.phoneText}>
                  {countryCode} {phone.replace(/[^\d\s-]/g, '').trim()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Send Verification Code to:</Text>
            <View style={[styles.option, styles.optionSelected]}>
              <View style={styles.radioSelected}>
                <View style={styles.radioDot} />
              </View>
              <Text style={styles.optionLabel}>Email address</Text>
            </View>
            {email ? <Text style={styles.emailText}>{email}</Text> : null}
          </View>
        </View>

        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <Button
            title="Next"
            onPress={() => onNext?.()}
            containerStyle={styles.nextButton}
            textStyle={styles.nextText}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.3,
    color: COLORS.muted,
  },
  formGroup: {
    width: '100%',
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: 0.3,
    color: COLORS.text,
  },
  phoneRow: {
    width: '100%',
    height: 57,
    flexDirection: 'row',
    gap: 8,
  },
  countryField: {
    width: 57,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
  },
  phoneField: {
    flex: 1,
    height: 51,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
  },
  phoneText: {
    width: '100%',
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.text,
  },
  option: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
  },
  optionSelected: {
    borderColor: COLORS.primary,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 8,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  optionLabel: {
    fontSize: 13,
    color: COLORS.text,
  },
  emailText: {
    paddingHorizontal: 12,
    fontSize: 13,
    color: COLORS.muted,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: COLORS.white,
  },
  nextButton: {
    height: 52,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
