import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from './ThemeProvider';
import { haptic } from '../lib/haptics';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const SIZES: Record<Size, { h: number; px: number; font: number }> = {
  sm: { h: 36, px: 14, font: 13 },
  md: { h: 44, px: 18, font: 14 },
  lg: { h: 52, px: 22, font: 15 },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onPress,
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  style,
}) => {
  const { theme } = useTheme();
  const s = SIZES[size];

  const handlePress = () => {
    if (disabled || loading) return;
    haptic.light();
    onPress?.();
  };

  let bg = theme.colors.primary;
  let fg = theme.colors.textOnPrimary;
  let borderColor = 'transparent';
  let borderWidth = 0;

  if (variant === 'secondary') {
    bg = theme.colors.surface;
    fg = theme.colors.primary;
    borderColor = theme.colors.primary;
    borderWidth = 1.5;
  } else if (variant === 'ghost') {
    bg = 'transparent';
    fg = theme.colors.primary;
  } else if (variant === 'danger') {
    bg = theme.colors.error;
    fg = '#FFFFFF';
  }

  const containerStyle: ViewStyle = {
    height: s.h,
    paddingHorizontal: s.px,
    backgroundColor: bg,
    borderColor,
    borderWidth,
    borderRadius: theme.radius.full,
    alignSelf: fullWidth ? 'stretch' : 'flex-start',
    opacity: disabled ? 0.5 : 1,
    ...((variant === 'primary' || variant === 'danger') && !disabled
      ? theme.shadows.elevation1
      : {}),
  };

  const textStyle: TextStyle = {
    color: fg,
    fontSize: s.font,
    fontWeight: '600',
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        containerStyle,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={fg} />
      ) : (
        <>
          {iconLeft}
          <Text style={textStyle}>{children}</Text>
          {iconRight}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },
});
