import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
}

export function IconLocation({ color = '#111827', size = 32 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.5997 8.06702C18.9548 4.42213 13.0452 4.42213 9.40034 8.06702C5.75544 11.7119 5.75544 17.6215 9.40034 21.2663L15.0583 26.9243C15.5786 27.4447 16.4212 27.4448 16.9423 26.9238L22.5997 21.2663C26.2446 17.6215 26.2446 11.7119 22.5997 8.06702ZM7.51472 6.18141C12.201 1.49511 19.799 1.49511 24.4853 6.18141C29.1716 10.8677 29.1716 18.4657 24.4853 23.152L19.8156 27.8217C19.7737 27.8635 19.8339 27.8034 19.792 27.8452L18.8279 28.8094C17.2661 30.3711 14.7352 30.3724 13.1727 28.8099L7.51472 23.152C2.82843 18.4657 2.82843 10.8677 7.51472 6.18141ZM16 12C14.5272 12 13.3333 13.1939 13.3333 14.6667C13.3333 16.1394 14.5272 17.3334 16 17.3334C17.4728 17.3334 18.6667 16.1394 18.6667 14.6667C18.6667 13.1939 17.4728 12 16 12ZM10.6667 14.6667C10.6667 11.7212 13.0545 9.33335 16 9.33335C18.9455 9.33335 21.3333 11.7212 21.3333 14.6667C21.3333 17.6122 18.9455 20 16 20C13.0545 20 10.6667 17.6122 10.6667 14.6667Z"
        fill={color}
      />
    </Svg>
  );
}

export function IconHeart({ color = '#111827', size = 32 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.7003 9.36678C18.7003 9.36679 18.7003 9.3668 18.7002 9.36682L16.943 11.1242C16.693 11.3743 16.3538 11.5148 16.0002 11.5148C15.6465 11.5148 15.3074 11.3743 15.0573 11.1242L13.2999 9.36681C11.4775 7.54437 8.5227 7.54437 6.70025 9.36681C4.8778 11.1893 4.8778 14.144 6.70025 15.9665L16.0001 25.2664L25.2999 15.9665L26.2427 16.9093L25.2999 15.9665C27.1224 14.144 27.1224 11.1893 25.2999 9.36681C23.4775 7.54438 20.5227 7.54437 18.7003 9.36678ZM16.8146 7.4812C19.6785 4.61735 24.3217 4.61735 27.1855 7.4812C30.0494 10.345 30.0494 14.9882 27.1855 17.8521L16.943 28.0948C16.6929 28.3449 16.3538 28.4853 16.0002 28.4853C15.6465 28.4853 15.3074 28.3449 15.0573 28.0948L4.81463 17.8521C1.95079 14.9883 1.95079 10.345 4.81463 7.4812C7.67848 4.61735 12.3217 4.61735 15.1855 7.4812L16.0001 8.29578L16.8146 7.48124L16.8146 7.4812Z"
        fill={color}
      />
    </Svg>
  );
}

export function IconPerson({ color = '#111827', size = 32 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9999 5.33335C13.7908 5.33335 11.9999 7.12422 11.9999 9.33335C11.9999 11.5425 13.7908 13.3334 15.9999 13.3334C18.2091 13.3334 19.9999 11.5425 19.9999 9.33335C19.9999 7.12421 18.2091 5.33335 15.9999 5.33335ZM9.33325 9.33335C9.33325 5.65145 12.318 2.66669 15.9999 2.66669C19.6818 2.66669 22.6666 5.65146 22.6666 9.33335C22.6666 13.0153 19.6818 16 15.9999 16C12.318 16 9.33325 13.0153 9.33325 9.33335ZM8.11053 26.6667H23.8893C23.2545 22.8831 19.9639 20 15.9999 20C12.0359 20 8.7453 22.8831 8.11053 26.6667ZM5.33325 28C5.33325 22.109 10.1089 17.3334 15.9999 17.3334C21.891 17.3334 26.6666 22.109 26.6666 28C26.6666 28.7364 26.0696 29.3334 25.3333 29.3334H6.66659C5.93021 29.3334 5.33325 28.7364 5.33325 28Z"
        fill={color}
      />
    </Svg>
  );
}

export function IconPlus({ color = '#FFFFFF', size = 32 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 4C16.7364 4 17.3333 4.59695 17.3333 5.33333V14.6667H26.6667C27.403 14.6667 28 15.2636 28 16C28 16.7364 27.403 17.3333 26.6667 17.3333H17.3333V26.6667C17.3333 27.403 16.7364 28 16 28C15.2636 28 14.6667 27.403 14.6667 26.6667V17.3333H5.33333C4.59695 17.3333 4 16.7364 4 16C4 15.2636 4.59695 14.6667 5.33333 14.6667H14.6667V5.33333C14.6667 4.59695 15.2636 4 16 4Z"
        fill={color}
      />
    </Svg>
  );
}

export function IconMap({ color = '#111827', size = 24 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5528 3.10557C14.8343 2.96481 15.1657 2.96481 15.4472 3.10557L20.8944 5.82918C21.572 6.16796 22 6.86049 22 7.61803V18.382C22 19.8687 20.4354 20.8357 19.1056 20.1708L15 18.118L9.44721 20.8944C9.16569 21.0352 8.83431 21.0352 8.55279 20.8944L3.10557 18.1708C2.428 17.832 2 17.1395 2 16.382V5.61803C2 4.13127 3.56462 3.16428 4.89443 3.82918L9 5.88197L14.5528 3.10557ZM8 7.61803L4 5.61803V16.382L8 18.382V7.61803ZM10 18.382L14 16.382V5.61803L10 7.61803V18.382ZM16 5.61803V16.382L20 18.382V7.61803L16 5.61803Z"
        fill={color}
      />
    </Svg>
  );
}

export function IconList({ color = '#111827', size = 24 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 6H20M4 12H20M4 18H20"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconArrowLeft({ color = '#FFFFFF', size = 28 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
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

export function IconArrowRight({ color = '#FFFFFF', size = 28 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
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

export function IconStar({ color = '#264BEB', size = 16 }: IconProps): React.JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 0L9.16938 5.17688L13.6569 2.34315L10.8231 6.83062L16 8L10.8231 9.16938L13.6569 13.6569L9.16938 10.8231L8 16L6.83062 10.8231L2.34315 13.6569L5.17688 9.16938L0 8L5.17688 6.83062L2.34315 2.34315L6.83062 5.17688L8 0Z"
        fill={color}
      />
    </Svg>
  );
}
