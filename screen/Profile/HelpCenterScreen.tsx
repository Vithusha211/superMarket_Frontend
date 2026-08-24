import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Linking,
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
import Logo from '../../componets/layout/Logo';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(0, 0, 0, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  inputBg: 'rgba(242, 242, 243, 1)',
};

type ContactItem = {
  id: string;
  label: string;
  value: string;
  action: string;
  icon: ImageSourcePropType;
};

const CONTACTS: ContactItem[] = [
  {
    id: 'phone',
    label: 'Phone number',
    value: '0774412558',
    action: 'Call',
    icon: require('../../assets/profile/help-center/phone.png'),
  },
  {
    id: 'mobile',
    label: 'Lorem',
    value: '0774412558',
    action: 'Call',
    icon: require('../../assets/profile/help-center/mobile.png'),
  },
  {
    id: 'email',
    label: 'Email',
    value: 'example@gmail.com',
    action: 'Mail',
    icon: require('../../assets/profile/help-center/email.png'),
  },
];

type HelpCenterScreenProps = {
  initialName?: string;
  initialEmail?: string;
  onBack?: () => void;
  onSend?: (data: { fullName: string; email: string; message: string }) => void;
  onContactPress?: (contact: ContactItem) => void;
};

export default function HelpCenterScreen({
  initialName = '',
  initialEmail = '',
  onBack,
  onSend,
  onContactPress,
}: HelpCenterScreenProps) {
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    onSend?.({
      fullName: fullName.trim(),
      email: email.trim(),
      message: message.trim(),
    });
  };

  const handleContactPress = (contact: ContactItem) => {
    if (onContactPress) {
      onContactPress(contact);
      return;
    }
    const url =
      contact.id === 'email'
        ? `mailto:${contact.value}`
        : `tel:${contact.value}`;
    void Linking.openURL(url);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Help Center"
        titleAlign="left"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top + 56}
      >
        <View style={styles.sheet}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets
            contentContainerStyle={[
              styles.content,
              { paddingBottom: Math.max(insets.bottom, 16) + 8 },
            ]}
          >
            <Logo height={42} style={styles.logo} />

            <View style={styles.form}>
              <Field
                label="Fullname"
                value={fullName}
                onChangeText={setFullName}
                placeholder="eg; John Doe"
                autoCapitalize="words"
              />
              <Field
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="example@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Field
                label="Message"
                value={message}
                onChangeText={setMessage}
                placeholder="Type here..."
                multiline
              />

              <Button
                title="Send"
                onPress={handleSend}
                containerStyle={styles.sendButton}
                textStyle={styles.sendText}
              />
            </View>

            <View style={styles.contactSection}>
              <Text style={styles.contactTitle}>Contact us</Text>
              <View style={styles.contactList}>
                {CONTACTS.map((contact) => (
                  <View key={contact.id} style={styles.contactRow}>
                    <Image
                      source={contact.icon}
                      style={styles.contactIcon}
                      resizeMode="contain"
                    />
                    <View style={styles.contactCopy}>
                      <Text style={styles.contactLabel}>{contact.label}</Text>
                      <Text style={styles.contactValue}>{contact.value}</Text>
                    </View>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => handleContactPress(contact)}
                      style={styles.contactButton}
                    >
                      <Text style={styles.contactButtonText}>
                        {contact.action}
                      </Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words';
};

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[styles.input, multiline && styles.messageInput]}
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
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  logo: {
    alignSelf: 'center',
  },
  form: {
    width: '100%',
    gap: 16,
  },
  field: {
    width: '100%',
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: 0.3,
    color: COLORS.text,
  },
  input: {
    width: '100%',
    height: 57,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.text,
  },
  messageInput: {
    height: 139,
    paddingTop: 16,
  },
  sendButton: {
    width: '100%',
    height: 52,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },
  sendText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
  },
  contactSection: {
    width: '100%',
    gap: 10,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: 0.3,
    color: COLORS.text,
  },
  contactList: {
    width: '100%',
    gap: 8,
  },
  contactRow: {
    width: '100%',
    minHeight: 57,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
  },
  contactIcon: {
    width: 42,
    height: 42,
  },
  contactCopy: {
    flex: 1,
    gap: 2,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: COLORS.primary,
  },
  contactValue: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: COLORS.muted,
  },
  contactButton: {
    minWidth: 52,
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  contactButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.white,
  },
});
