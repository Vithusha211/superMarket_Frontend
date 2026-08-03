import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

const COLORS = {
  primary: '#10B981',
  inputBg: '#F2F2F3',
  label: '#111827',
  placeholder: '#9CA3AF',
  text: '#111827',
  border: '#3B82F6',
  divider: '#D1D5DB',
  error: '#EF4444',
};

export type InputFieldVariant =
  | 'text'
  | 'email'
  | 'password'
  | 'phone'
  | 'select'
  | 'textarea';

type InputFieldProps = {
  label: string;
  variant?: InputFieldVariant;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  onCountryPress?: () => void;
  onRightIconPress?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  countryFlag?: string;
  countryCode?: string;
  error?: string;
  containerStyle?: ViewStyle;
} & Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'placeholder' | 'style' | 'multiline'
>;

export default function InputField({
  label,
  variant = 'text',
  placeholder,
  value,
  onChangeText,
  onPress,
  onCountryPress,
  onRightIconPress,
  rightIcon,
  countryFlag = '🇩🇪',
  countryCode = '+49',
  error,
  containerStyle,
  editable = true,
  ...textInputProps
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = variant === 'password';
  const isPhone = variant === 'phone';
  const isSelect = variant === 'select';
  const isTextarea = variant === 'textarea';

  const keyboardType =
    textInputProps.keyboardType ??
    (variant === 'email'
      ? 'email-address'
      : variant === 'phone'
        ? 'phone-pad'
        : 'default');

  const resolvedRightIcon =
    rightIcon ??
    (isSelect ? 'qr-code-outline' : undefined);

  const inputContent = (
    <View
      style={[
        styles.inputContainer,
        isTextarea && styles.textareaContainer,
        isFocused && !error && styles.inputFocused,
        !!error && styles.inputError,
      ]}
    >
      {isPhone && (
        <>
          <Pressable
            style={styles.phonePrefix}
            onPress={onCountryPress}
            hitSlop={6}
          >
            <Text style={styles.flagText}>{countryFlag}</Text>
            <Ionicons name="chevron-down" size={14} color={COLORS.placeholder} />
          </Pressable>
          <View style={styles.divider} />
        </>
      )}

      {isSelect ? (
        <Pressable
          style={styles.selectContent}
          onPress={onPress}
          disabled={!onPress}
        >
          <Text
            style={[styles.inputText, !value && styles.placeholderText]}
            numberOfLines={1}
          >
            {value || placeholder || 'Select'}
          </Text>
        </Pressable>
      ) : (
        <TextInput
          style={[styles.input, isTextarea && styles.textareaInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={isPassword && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={
            textInputProps.autoCapitalize ??
            (variant === 'email' ? 'none' : 'sentences')
          }
          multiline={isTextarea}
          textAlignVertical={isTextarea ? 'top' : 'center'}
          editable={editable}
          onFocus={(event) => {
            setIsFocused(true);
            textInputProps.onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            textInputProps.onBlur?.(event);
          }}
          {...textInputProps}
        />
      )}

      {isPassword && (
        <Pressable
          onPress={() => setIsPasswordVisible((prev) => !prev)}
          hitSlop={8}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={COLORS.placeholder}
          />
        </Pressable>
      )}

      {resolvedRightIcon && !isPassword && (
        <Pressable
          onPress={onRightIconPress ?? onPress}
          hitSlop={8}
          disabled={!onRightIconPress && !onPress}
        >
          <Ionicons
            name={resolvedRightIcon}
            size={20}
            color={COLORS.primary}
          />
        </Pressable>
      )}
    </View>
  );

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      {inputContent}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.label,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 51,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textareaContainer: {
    height: 87,
    alignItems: 'flex-start',
  },
  inputFocused: {
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    padding: 0,
    height: '100%',
  },
  textareaInput: {
    height: '100%',
    textAlignVertical: 'top',
  },
  selectContent: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  inputText: {
    fontSize: 14,
    color: COLORS.text,
  },
  placeholderText: {
    color: COLORS.placeholder,
  },
  phonePrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flagText: {
    fontSize: 18,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.divider,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.error,
    marginTop: -4,
  },
});
