import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  type TextInputProps,
  type TextInput as RNTextInput,
} from 'react-native';

type InputTheme = 'dark' | 'light';

export interface AppInputProps extends TextInputProps {
  label: string;
  theme?: InputTheme;
  error?: string;
}

export function AppInput({
  label,
  theme = 'dark',
  error,
  secureTextEntry,
  onFocus,
  onBlur,
  style,
  ...rest
}: AppInputProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<RNTextInput>(null);

  const isLight = theme === 'light';
  const isPassword = Boolean(secureTextEntry);

  const labelClass = isLight
    ? 'font-roobert-semibold text-2xl text-canvas'
    : 'font-roobert-semibold text-2xl text-ink';
  const boxClass = [
    'flex-row items-center rounded-3xl px-6 py-2 gap-2 border',
    isLight ? 'border-canvas' : 'border-ink',
    isFocused && !isLight ? 'border-ink' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inputTextColor = isLight ? '#FFFFFF' : '#0B0B0B';
  const placeholderColor = isLight ? 'rgba(255,255,255,0.6)' : '#9CA3AF';

  const errorClass = isLight ? 'font-roobert text-xs' : 'font-roobert text-xs';
  const errorColor = isLight ? '#FFB3B3' : '#DC2626';

  return (
    <View className="w-full gap-2">
      {/* Label */}
      <Text className={labelClass} onPress={() => inputRef.current?.focus()}>
        {label}
      </Text>

      {/* Input box */}
      <View className={boxClass}>
        <TextInput
          ref={inputRef}
          {...rest}
          secureTextEntry={isPassword}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className="flex-1 font-roobert text-2xl"
          style={[{ color: inputTextColor, padding: 0 }, style]}
          placeholderTextColor={placeholderColor}
        />
      </View>

      {/* Error */}
      {error ? (
        <Text className={errorClass} style={{ color: errorColor }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
