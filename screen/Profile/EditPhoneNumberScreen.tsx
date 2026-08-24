import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
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
  text: 'rgba(0, 0, 0, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  inputBg: 'rgba(242, 242, 243, 1)',
  border: 'rgba(229, 231, 235, 1)',
};

export type VerificationChannel = 'email' | 'phone';

type EditPhoneNumberScreenProps = {
  phone?: string;
  countryFlag?: string;
  countryCode?: string;
  onBack?: () => void;
  onCountryPress?: () => void;
  onNext?: (phone: string, channel: VerificationChannel) => void;
};

export default function EditPhoneNumberScreen({
  phone = '0775512445',
  countryFlag = '🇱🇰',
  countryCode = '+94',
  onBack,
  onCountryPress,
  onNext,
}: EditPhoneNumberScreenProps) {
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [channel, setChannel] = useState<VerificationChannel>('email');

  useEffect(() => {
    setPhoneNumber(phone);
  }, [phone]);

  const cleanPhone = phoneNumber.replace(/[^\d\s-]/g, '');
  const canContinue = cleanPhone.replace(/\D/g, '').length >= 7;

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
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Select country code"
                onPress={onCountryPress}
                style={styles.countryField}
              >
                <Text style={styles.flag}>{countryFlag}</Text>
                <Text style={styles.countryCode}>{countryCode}</Text>
              </Pressable>

              <View style={styles.phoneField}>
                <TextInput
                  value={phoneNumber}
                  onChangeText={(value) =>
                    setPhoneNumber(value.replace(/[^\d\s-]/g, ''))
                  }
                  placeholder="77 551 2445"
                  placeholderTextColor={COLORS.muted}
                  keyboardType="phone-pad"
                  style={styles.phoneInput}
                />
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Send Verification Code to</Text>
            <View style={styles.options}>
              <VerificationOption
                label="Email address"
                selected={channel === 'email'}
                onPress={() => setChannel('email')}
              />
              <VerificationOption
                label="Phone number"
                selected={channel === 'phone'}
                onPress={() => setChannel('phone')}
              />
            </View>
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
            disabled={!canContinue}
            onPress={
              canContinue ? () => onNext?.(cleanPhone.trim(), channel) : undefined
            }
            containerStyle={[
              styles.nextButton,
              !canContinue && styles.nextButtonDisabled,
            ]}
            textStyle={styles.nextText}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

type VerificationOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function VerificationOption({
  label,
  selected,
  onPress,
}: VerificationOptionProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.option, selected && styles.optionSelected]}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>
      <Text style={styles.optionLabel}>{label}</Text>
    </Pressable>
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
    gap: 24,
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
    width: 91,
    height: 57,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
  },
  flag: {
    fontSize: 18,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.text,
  },
  phoneField: {
    flex: 1,
    height: 57,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
  },
  phoneInput: {
    width: '100%',
    height: '100%',
    padding: 0,
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.text,
  },
  options: {
    width: '100%',
    gap: 8,
  },
  option: {
    width: '100%',
    height: 47,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  optionSelected: {
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
  optionLabel: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.3,
    color: COLORS.text,
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
  nextButtonDisabled: {
    backgroundColor: COLORS.muted,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
