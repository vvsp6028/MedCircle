import React from 'react';
import { ScrollView, Pressable, Text, View, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';
import { CATEGORIES, CategoryKey } from '../constants/categories';
import { haptic } from '../lib/haptics';

interface FilterChipsProps {
  active: CategoryKey | 'all';
  onChange: (k: CategoryKey | 'all') => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ active, onChange }) => {
  const { theme } = useTheme();

  const handlePress = (key: CategoryKey | 'all') => {
    if (key === active) return;
    haptic.selection();
    onChange(key);
  };

  return (
    <View style={[styles.wrap, { borderBottomColor: theme.colors.borderSoft }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        <Chip
          label="All"
          active={active === 'all'}
          onPress={() => handlePress('all')}
        />
        {CATEGORIES.map((c) => (
          <Chip
            key={c.key}
            label={c.label}
            color={c.color}
            bg={c.bg}
            textColor={c.textColor}
            active={active === c.key}
            onPress={() => handlePress(c.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

interface ChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
  color?: string;
  bg?: string;
  textColor?: string;
}

const Chip: React.FC<ChipProps> = ({ label, active, onPress, color, bg, textColor }) => {
  const { theme } = useTheme();

  const activeBg = bg || theme.colors.primarySoft;
  const activeTextColor = textColor || theme.colors.primary;
  const inactiveBg = theme.colors.surface;
  const inactiveTextColor = theme.colors.textSecondary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: active ? activeBg : inactiveBg,
          borderColor: active
            ? color || theme.colors.primary
            : theme.colors.border,
        },
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text
        style={[
          styles.chipText,
          {
            color: active ? activeTextColor : inactiveTextColor,
            fontWeight: active ? '700' : '500',
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: 1,
  },
  row: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
  },
});
