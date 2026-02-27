import React from 'react';
import { TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type ButtonVariant = 'outline-black' | 'outline-white' | 'solid-black' | 'solid-white';

interface ButtonProps {
  label?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  showArrow?: boolean;
  showArrowLeft?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

function ArrowLeft({ color }: { color: string }): React.JSX.Element {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <Path
        d="M11.165 21.0817L4.08331 14L11.165 6.91833"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23.9167 14L4.28169 14"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ArrowRight({ color }: { color: string }): React.JSX.Element {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <Path
        d="M16.835 6.91833L23.9167 14L16.835 21.0817"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.08331 14L23.7183 14"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
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
  'outline-black': {
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
  'outline-white': {
    container: 'bg-transparent border border-canvas',
    textColor: 'text-canvas',
    iconColor: '#FFFFFF',
    loaderColor: '#FFFFFF',
  },
};

export function Button({
  label,
  onPress,
  variant = 'outline-white',
  showArrow = false,
  showArrowLeft = false,
  disabled = false,
  loading = false,
  className = '',
}: ButtonProps): React.JSX.Element {
  const { container, textColor, iconColor, loaderColor } = VARIANT_STYLES[variant];

  const iconOnly = !label;

  const containerClass = [
    'flex-row items-center justify-center gap-2 rounded-button',
    iconOnly ? 'py-2 px-8 !rounded-3xl' : 'w-full h-11',
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
          {showArrowLeft && <ArrowLeft color={iconColor} />}
          {label ? (
            <Text className={`font-roobert-semibold text-base ${textColor}`}>{label}</Text>
          ) : null}
          {showArrow && <ArrowRight color={iconColor} />}
        </>
      )}
    </TouchableOpacity>
  );
}
