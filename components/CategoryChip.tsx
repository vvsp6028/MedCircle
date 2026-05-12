import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Category } from '../constants/categories';

interface CategoryChipProps {
  category: Category;
  size?: 'sm' | 'md';
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  size = 'sm',
}) => {
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: category.bg,
          paddingHorizontal: isSmall ? 10 : 12,
          paddingVertical: isSmall ? 4 : 6,
          borderRadius: 999,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: category.textColor,
            fontSize: isSmall ? 10 : 12,
          },
        ]}
      >
        {category.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: { alignSelf: 'flex-start' },
  label: { fontWeight: '700', letterSpacing: 0.2 },
});
