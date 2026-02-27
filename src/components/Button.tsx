import React from 'react';
import { TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type ButtonVariant = 'outline' | 'solid-black' | 'solid-white';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  showArrow?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

function ArrowRight({ color }: { color: string }): React.JSX.Element {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M3 8h10M9 4l4 4-4 4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const VARIANT_STYLES: Record<
  ButtonVariant,
  { container: string; textColor: string; iconColor: string; loaderColor: string }
> = {
  outline: {
    container: 'bg-transparent border border-ink',
    textColor: 'text-ink',
    iconColor: '#0B0B0B',
    loaderColor: '#0B0B0B',
  },
  'solid-black': {
    container: 'bg-ink',
    textColor: 'text-canvas',
    iconColor: '#FFFFFF',
    loaderColor: '#FFFFFF',
  },
  'solid-white': {
    container: 'bg-canvas',
    textColor: 'text-ink',
    iconColor: '#0B0B0B',
    loaderColor: '#0B0B0B',
  },
};

export function Button({
  label,
  onPress,
  variant = 'outline',
  showArrow = false,
  disabled = false,
  loading = false,
  className = '',
}: ButtonProps): React.JSX.Element {
  const { container, textColor, iconColor, loaderColor } = VARIANT_STYLES[variant];

  const containerClass = [
    'w-full h-11 flex-row items-center justify-center gap-2 rounded-button',
    container,
    disabled ? 'opacity-40' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      className={containerClass}
    >
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <>
          <Text className={`font-roobert-semibold text-base ${textColor}`}>{label}</Text>
          {showArrow && <ArrowRight color={iconColor} />}
        </>
      )}
    </TouchableOpacity>
  );
}
