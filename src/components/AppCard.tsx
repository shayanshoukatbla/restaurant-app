import React from 'react';
import { View } from 'react-native';

interface AppCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AppCard({ children, className = '' }: AppCardProps): React.JSX.Element {
  return (
    <View className={`flex-1 bg-card rounded-3xl overflow-hidden ${className}`}>{children}</View>
  );
}
