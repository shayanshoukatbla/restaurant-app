import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  type TextInputProps,
  type TextInput as RNTextInput,
} from 'react-native';
import { IconEdit } from './icons';
import { useAddressSuggestions } from '@hooks/useAddressSuggestions';
import type { NominatimResult } from '@api/geocodingApi';

// ── Types ─────────────────────────────────────────────────────

type InputTheme = 'dark' | 'light' | 'profile';

export interface AddressLocation {
  address: string;
  lat: number;
  lng: number;
}

export interface AddressInputProps extends Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onChange'
> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onLocationChange?: (location: AddressLocation) => void;
  theme?: InputTheme;
  error?: string;
}

// ── Theme tokens ──────────────────────────────────────────────

function getTokens(theme: InputTheme, isFocused: boolean) {
  const isLight = theme === 'light';
  const isProfile = theme === 'profile';

  return {
    isLight,
    isProfile,
    labelClass: isProfile
      ? 'font-roobert-semibold text-base text-ink'
      : isLight
        ? 'font-roobert-semibold text-2xl text-canvas'
        : 'font-roobert-semibold text-2xl text-ink',
    boxClass: isProfile
      ? 'flex-row items-center gap-2 pb-2 border-b border-blue'
      : [
          'flex-row items-center rounded-3xl px-6 py-2 gap-2 border',
          isLight ? 'border-canvas' : 'border-ink',
          isFocused && !isLight ? 'border-ink' : '',
        ]
          .filter(Boolean)
          .join(' '),
    inputTextColor: isLight ? '#FFFFFF' : '#0B0B0B',
    inputOpacity: isProfile ? (isFocused ? 1 : 0.6) : 1,
    inputClass: isProfile ? 'font-roobert text-sm' : 'flex-1 font-roobert text-2xl',
    placeholderColor: isLight
      ? 'rgba(255,255,255,0.6)'
      : isProfile
        ? 'rgba(11,11,11,0.4)'
        : '#9CA3AF',
    errorColor: isLight ? '#FFB3B3' : '#DC2626',
    dropdownBg: isLight ? '#1F2937' : '#FFFFFF',
    dropdownBorder: isLight ? '#374151' : '#E5E7EB',
    dropdownTextColor: isLight ? '#FFFFFF' : '#0B0B0B',
    dropdownDivider: isLight ? '#374151' : '#F1F1F0',
  };
}

// ── Component ─────────────────────────────────────────────────

export function AddressInput({
  label,
  value,
  onChange,
  onLocationChange,
  theme = 'dark',
  error,
  style,
  ...rest
}: AddressInputProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<RNTextInput>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: suggestions = [], isFetching } = useAddressSuggestions(debouncedQuery);
  const tokens = getTokens(theme, isFocused);

  const handleChangeText = useCallback(
    (text: string) => {
      onChange(text);
      setShowDropdown(true);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        setDebouncedQuery(text);
      }, 500);
    },
    [onChange],
  );

  const handleSelect = (item: NominatimResult): void => {
    onChange(item.display_name);
    onLocationChange?.({
      address: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    });
    setShowDropdown(false);
    setDebouncedQuery('');
    inputRef.current?.blur();
  };

  const handleBlur = (): void => {
    setIsFocused(false);

    setTimeout(() => setShowDropdown(false), 200);
  };

  const isDropdownVisible = showDropdown && isFocused && (isFetching || suggestions.length > 0);

  if (tokens.isProfile) {
    return (
      <View className="w-full">
        <View className={tokens.boxClass}>
          <View className="flex-1 gap-2">
            <Text className={tokens.labelClass}>{label}</Text>
            <TextInput
              ref={inputRef}
              {...rest}
              value={value}
              onChangeText={handleChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              textContentType="fullStreetAddress"
              autoComplete="street-address"
              autoCorrect={false}
              returnKeyType="done"
              className="font-roobert text-sm"
              style={[
                {
                  color: tokens.inputTextColor,
                  opacity: tokens.inputOpacity,
                  paddingHorizontal: 0,
                  paddingVertical: 2,
                },
                style,
              ]}
              placeholderTextColor={tokens.placeholderColor}
            />
          </View>
          <TouchableOpacity
            onPress={() => inputRef.current?.focus()}
            activeOpacity={0.6}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <IconEdit size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {error ? (
          <Text className="font-roobert text-xs mt-1" style={{ color: tokens.errorColor }}>
            {error}
          </Text>
        ) : null}

        {isDropdownVisible && <Dropdown {...{ isFetching, suggestions, tokens, handleSelect }} />}
      </View>
    );
  }

  // ── Dark / Light variants ─────────────────────────────────

  return (
    <View className="w-full gap-2">
      <Text className={tokens.labelClass} onPress={() => inputRef.current?.focus()}>
        {label}
      </Text>

      <View className={tokens.boxClass}>
        <TextInput
          ref={inputRef}
          {...rest}
          value={value}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          textContentType="fullStreetAddress"
          autoComplete="street-address"
          autoCorrect={false}
          returnKeyType="done"
          className={tokens.inputClass}
          style={[{ color: tokens.inputTextColor, padding: 0 }, style]}
          placeholderTextColor={tokens.placeholderColor}
        />
      </View>

      {error ? (
        <Text className="font-roobert text-xs" style={{ color: tokens.errorColor }}>
          {error}
        </Text>
      ) : null}

      {isDropdownVisible && <Dropdown {...{ isFetching, suggestions, tokens, handleSelect }} />}
    </View>
  );
}

// ── Dropdown (shared across all themes) ───────────────────────

interface DropdownProps {
  isFetching: boolean;
  suggestions: NominatimResult[];
  tokens: ReturnType<typeof getTokens>;
  handleSelect: (item: NominatimResult) => void;
}

function Dropdown({
  isFetching,
  suggestions,
  tokens,
  handleSelect,
}: DropdownProps): React.JSX.Element {
  return (
    <View
      style={{
        borderRadius: 12,
        marginTop: 4,
        backgroundColor: tokens.dropdownBg,
        borderWidth: 1,
        borderColor: tokens.dropdownBorder,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      {isFetching && suggestions.length === 0 ? (
        <View style={{ paddingVertical: 16, alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#264BEB" />
        </View>
      ) : (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.display_name}
          keyboardShouldPersistTaps="always"
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              activeOpacity={0.7}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: index < suggestions.length - 1 ? 1 : 0,
                borderBottomColor: tokens.dropdownDivider,
              }}
            >
              <Text
                numberOfLines={2}
                className="font-roobert text-sm"
                style={{ color: tokens.dropdownTextColor }}
              >
                {item.display_name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
