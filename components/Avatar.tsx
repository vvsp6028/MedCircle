import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';
import { initialsOf } from '../lib/format';

interface AvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SIZES = {
  sm: { d: 32, font: 12 },
  md: { d: 44, font: 15 },
  lg: { d: 56, font: 18 },
  xl: { d: 88, font: 28 },
};

// 8 gentle background tints for initials avatars
const TINTS = [
  '#EEF2FF', // indigo-50
  '#F0FDFA', // teal-50
  '#FEF3C7', // amber-100
  '#FCE7F3', // pink-100
  '#E0F2FE', // sky-100
  '#ECFCCB', // lime-100
  '#FFEDD5', // orange-100
  '#EDE9FE', // violet-100
];

const FG = [
  '#4338CA',
  '#0F766E',
  '#B45309',
  '#BE185D',
  '#0369A1',
  '#4D7C0F',
  '#C2410C',
  '#6D28D9',
];

function tintIndex(name: string): number {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return sum % 8;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  avatarUrl,
  size = 'md',
}) => {
  const { theme } = useTheme();
  const { d, font } = SIZES[size];

  if (avatarUrl) {
    return (
      <Image
        source={{ uri: avatarUrl }}
        style={[
          styles.avatar,
          { width: d, height: d, borderRadius: d / 2 },
          { borderColor: theme.colors.borderSoft },
        ]}
      />
    );
  }

  const idx = tintIndex(name || '?');
  return (
    <View
      style={[
        styles.avatar,
        {
          width: d,
          height: d,
          borderRadius: d / 2,
          backgroundColor: TINTS[idx],
          borderColor: theme.colors.borderSoft,
        },
      ]}
    >
      <Text style={[styles.initials, { fontSize: font, color: FG[idx] }]}>
        {initialsOf(name || '?')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  initials: { fontWeight: '700' },
});
