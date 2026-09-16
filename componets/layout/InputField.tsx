import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import CountryFlag from './CountryFlag';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  inputBg: 'rgba(242, 242, 243, 1)',
  label: 'rgba(17, 24, 39, 1)',
  placeholder: 'rgba(156, 163, 175, 1)',
  text: 'rgba(0, 0, 0, 1)',
  inputFocus: 'rgba(59, 130, 246, 1)',
  divider: 'rgba(209, 213, 219, 1)',
  error: '#FF4B2B',
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
  rightImage?: ImageSourcePropType;
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
  rightImage,
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
    (isSelect ? 'chevron-down' : undefined);

  const inputContent = isPhone ? (
    <View style={styles.phoneRow}>
      <Pressable
        style={[
          styles.phonePrefix,
          isFocused && !error && styles.phonePrefixFocused,
          !!error && styles.phonePrefixError,
        ]}
        onPress={onCountryPress}
        hitSlop={6}
        accessibilityRole="button"
        accessibilityLabel="Select country code"
      >
        <CountryFlag flag={countryFlag} size={20} />
      </Pressable>

      <View
        style={[
          styles.phoneInputContainer,
          isFocused && !error && styles.inputFocused,
          !!error && styles.inputError,
        ]}
      >
        <TextInput
          style={styles.phoneInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          keyboardType={keyboardType}
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
      </View>
    </View>
  ) : (
    <View
      style={[
        styles.inputContainer,
        isTextarea && styles.textareaContainer,
        isFocused && !error && styles.inputFocused,
        !!error && styles.inputError,
      ]}
    >
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

      {(rightImage || resolvedRightIcon) && !isPassword && (
        <Pressable
          onPress={onRightIconPress ?? onPress}
          hitSlop={8}
          disabled={!onRightIconPress && !onPress}
        >
          {rightImage ? (
            <Image
              source={rightImage}
              style={styles.rightImage}
              resizeMode="contain"
            />
          ) : (
            <Ionicons
              name={resolvedRightIcon!}
              size={20}
              color={COLORS.primary}
            />
          )}
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
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 51,
    width: '100%',
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textareaContainer: {
    height: undefined,
    minHeight: 87,
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  inputFocused: {
    borderColor: 'transparent',
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
  },
  textareaInput: {
    flex: 1,
    textAlignVertical: 'top',
  },
  selectContent: {
    flex: 1,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
  },
  placeholderText: {
    color: COLORS.placeholder,
  },
  rightImage: {
    width: 20,
    height: 20,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  phonePrefix: {
    width: 58,
    height: 51,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  phonePrefixFocused: {
    borderColor: COLORS.label,
  },
  phonePrefixError: {
    borderColor: COLORS.error,
    borderWidth: 1.5,
  },
  phoneInputContainer: {
    flex: 1,
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  phoneInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    padding: 0,
    height: '100%',
  },
  flagText: {
    fontSize: 22,
    lineHeight: 26,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.error,
    lineHeight: 16,
    marginTop: -4,
  },
});
