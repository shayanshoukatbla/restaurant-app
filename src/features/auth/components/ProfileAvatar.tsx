import React from 'react';
import { View, Text } from 'react-native';

interface ProfileAvatarProps {
  name: string;
}

export function ProfileAvatar({ name }: ProfileAvatarProps): React.JSX.Element {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <View
      className="items-center justify-center rounded-full bg-[#D9D9D9]"
      style={{ width: 136, height: 136 }}
    >
      <Text className="font-roobert-semibold text-5xl text-ink">{initial}</Text>
    </View>
  );
}
