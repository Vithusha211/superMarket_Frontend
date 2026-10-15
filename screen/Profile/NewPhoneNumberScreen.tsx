import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
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
import CountryFlag from '../../componets/layout/CountryFlag';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(13, 13, 13, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  inputBg: 'rgba(242, 242, 243, 1)',
  danger: 'rgba(235, 87, 87, 1)',
};

type NewPhoneNumberScreenProps = {
  countryFlag: string;
  countryCode: string;
  onBack?: () => void;
  onCountryPress?: () => void;
  onSave?: (phone: string) => void;
};

export default function NewPhoneNumberScreen({
  countryFlag,
  countryCode,
  onBack,
  onCountryPress,
  onSave,
}: NewPhoneNumberScreenProps) {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const canSave = phone.replace(/\D/g, '').length >= 7;

  const handleSave = () => {
    if (!canSave) {
      setError('Enter a valid phone number.');
      return;
    }
    setError('');
    onSave?.(phone.trim());
  };

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
            Verification successful. Now, enter your new phone number.
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
                <CountryFlag flag={countryFlag} size={20} />
              </Pressable>
              <View style={styles.phoneField}>
                <Text style={styles.countryCode}>{countryCode}</Text>
                <TextInput
                  value={phone}
                  onChangeText={(value) => {
                    setPhone(value.replace(/[^\d\s-]/g, ''));
                    setError('');
                  }}
                  placeholder="77 661 2445"
                  placeholderTextColor={COLORS.muted}
                  keyboardType="phone-pad"
                  style={styles.phoneInput}
                  accessibilityLabel="New phone number"
                />
              </View>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>
        </View>

        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <Button
            title="Save"
            onPress={handleSave}
            containerStyle={styles.saveButton}
            textStyle={styles.saveText}
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
    height: 51,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
  },
  countryCode: {
    fontSize: 14,
    color: COLORS.text,
  },
  phoneInput: {
    flex: 1,
    height: '100%',
    padding: 0,
    fontSize: 14,
    color: COLORS.text,
  },
  error: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.danger,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: COLORS.white,
  },
  saveButton: {
    height: 52,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
