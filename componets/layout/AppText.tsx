import { Children, forwardRef } from 'react';
import type { ComponentRef } from 'react';
import {
  StyleSheet,
  Text as NativeText,
  TextInput as NativeTextInput,
  type TextInputProps,
  type TextProps,
} from 'react-native';
import { useLocale } from '../../context/LocaleContext';
import {
  useResponsiveFontScale,
  useResponsiveScale,
} from './useResponsiveScale';

const DEFAULT_MAX_FONT_SIZE_MULTIPLIER = 2;

export const Text = forwardRef<ComponentRef<typeof NativeText>, TextProps>(
  (props, ref) => {
    const { translate } = useLocale();
    const scale = useResponsiveScale();
    const fontScale = useResponsiveFontScale(
      props.allowFontScaling,
      props.maxFontSizeMultiplier ?? DEFAULT_MAX_FONT_SIZE_MULTIPLIER,
    );
    const textScale = scale * fontScale;
    const style = StyleSheet.flatten(props.style);
    const children = Children.map(props.children, (child) =>
      typeof child === 'string'
        ? child.replace(
            /^(\s*)([\s\S]*?)(\s*)$/,
            (_match, leading: string, text: string, trailing: string) =>
              `${leading}${translate(text)}${trailing}`,
          )
        : child,
    );
    const accessibilityLabel = props.accessibilityLabel
      ? translate(props.accessibilityLabel)
      : props.accessibilityLabel;

    return (
      <NativeText
        {...props}
        accessibilityLabel={accessibilityLabel}
        style={[
          props.style,
          typeof style?.fontSize === 'number'
            ? {
                fontSize: style.fontSize * textScale,
                lineHeight:
                  typeof style.lineHeight === 'number'
                    ? style.lineHeight * textScale
                    : style.lineHeight,
                letterSpacing:
                  typeof style.letterSpacing === 'number'
                    ? style.letterSpacing * textScale
                    : style.letterSpacing,
              }
            : null,
        ]}
        allowFontScaling={false}
        maxFontSizeMultiplier={1}
        ref={ref}
      >
        {children}
      </NativeText>
    );
  },
);

Text.displayName = 'AppText';

export const TextInput = forwardRef<
  ComponentRef<typeof NativeTextInput>,
  TextInputProps
>((props, ref) => {
  const { translate } = useLocale();
  const scale = useResponsiveScale();
  const fontScale = useResponsiveFontScale(
    props.allowFontScaling,
    props.maxFontSizeMultiplier ?? DEFAULT_MAX_FONT_SIZE_MULTIPLIER,
  );
  const textScale = scale * fontScale;
  const style = StyleSheet.flatten(props.style);

  return (
    <NativeTextInput
      {...props}
      accessibilityLabel={
        props.accessibilityLabel
          ? translate(props.accessibilityLabel)
          : props.accessibilityLabel
      }
      placeholder={
        props.placeholder ? translate(props.placeholder) : props.placeholder
      }
      style={[
        props.style,
        typeof style?.fontSize === 'number'
          ? {
              fontSize: style.fontSize * textScale,
              lineHeight:
                typeof style.lineHeight === 'number'
                  ? style.lineHeight * textScale
                  : style.lineHeight,
              letterSpacing:
                typeof style.letterSpacing === 'number'
                  ? style.letterSpacing * textScale
                  : style.letterSpacing,
            }
          : null,
      ]}
      allowFontScaling={false}
      maxFontSizeMultiplier={1}
      ref={ref}
    />
  );
});

TextInput.displayName = 'AppTextInput';
