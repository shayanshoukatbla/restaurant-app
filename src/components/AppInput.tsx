import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  type TextInputProps,
  type TextInput as RNTextInput,
} from 'react-native';
import { IconEdit } from './icons';

type InputTheme = 'dark' | 'light' | 'profile';

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
  const isProfile = theme === 'profile';
  const isPassword = Boolean(secureTextEntry);

  // ── Profile variant ───────────────────────────────────────
  if (isProfile) {
    return (
      <View className="w-full">
        {/* Row: text column + edit icon */}
        <View className="flex-row items-center gap-2 pb-2 border-b border-blue">
          {/* Left: label stacked above input value */}
          <View className="flex-1 gap-2">
            <Text className="font-roobert-semibold text-base text-ink">{label}</Text>
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
              className="font-roobert text-sm"
              style={[
                {
                  color: '#0B0B0B',
                  opacity: isFocused ? 1 : 0.6,
                  paddingHorizontal: 0,
                  paddingVertical: 2,
                },
                style,
              ]}
              placeholderTextColor="rgba(11,11,11,0.4)"
            />
          </View>

          {/* Right: pencil edit icon  */}
          <TouchableOpacity
            onPress={() => inputRef.current?.focus()}
            activeOpacity={0.6}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <IconEdit size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Error */}
        {error ? <Text className="font-roobert text-xs text-red-600 mt-1">{error}</Text> : null}
      </View>
    );
  }

  // ── Dark / Light variants (existing) ─────────────────────
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
        <Text className="font-roobert text-xs" style={{ color: errorColor }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
