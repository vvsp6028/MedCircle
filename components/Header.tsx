import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Bell, MessageCircle, ArrowLeft, MoreHorizontal, Settings } from 'lucide-react-native';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcons?: Array<'bell' | 'chat' | 'settings' | 'more'>;
  onIconPress?: (icon: 'bell' | 'chat' | 'settings' | 'more') => void;
  notificationDot?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showLogo,
  showBack,
  onBackPress,
  rightIcons = [],
  onIconPress,
  notificationDot,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.borderSoft,
        },
      ]}
    >
      <View style={styles.left}>
        {showBack && (
          <Pressable
            onPress={onBackPress}
            hitSlop={8}
            style={styles.iconBtn}
          >
            <ArrowLeft size={22} color={theme.colors.textPrimary} />
          </Pressable>
        )}
        {showLogo && (
          <View style={styles.logoRow}>
            <View
              style={[
                styles.logoMark,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text style={styles.logoLetter}>M</Text>
            </View>
            <Text
              style={[
                styles.logoText,
                { color: theme.colors.textPrimary },
              ]}
            >
              MedCircle
            </Text>
          </View>
        )}
        {title && (
          <Text
            style={[styles.title, { color: theme.colors.textPrimary }]}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}
      </View>

      <View style={styles.right}>
        {rightIcons.map((ic) => {
          let Icon = Bell;
          if (ic === 'chat') Icon = MessageCircle;
          else if (ic === 'settings') Icon = Settings;
          else if (ic === 'more') Icon = MoreHorizontal;
          return (
            <Pressable
              key={ic}
              onPress={() => onIconPress?.(ic)}
              hitSlop={6}
              style={styles.iconBtn}
            >
              <Icon size={20} color={theme.colors.textSecondary} />
              {ic === 'bell' && notificationDot && (
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: theme.colors.error },
                  ]}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    position: 'relative',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoMark: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  logoText: { fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  title: { fontSize: 18, fontWeight: '700' },
  dot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
