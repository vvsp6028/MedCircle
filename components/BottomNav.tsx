import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Users, Plus, Bell, User as UserIcon } from 'lucide-react-native';
import { useTheme } from './ThemeProvider';
import { haptic } from '../lib/haptics';

export type BottomTab = 'home' | 'communities' | 'create' | 'notifications' | 'profile';

interface BottomNavProps {
  active: BottomTab;
  onNavigate: (tab: BottomTab) => void;
  notificationDot?: boolean;
}

interface TabDef {
  key: Exclude<BottomTab, 'create'>;
  label: string;
  Icon: typeof Home;
}

const SIDE_TABS: TabDef[] = [
  { key: 'home', label: 'Home', Icon: Home },
  { key: 'communities', label: 'Communities', Icon: Users },
];

const RIGHT_TABS: TabDef[] = [
  { key: 'notifications', label: 'Alerts', Icon: Bell },
  { key: 'profile', label: 'Profile', Icon: UserIcon },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  active,
  onNavigate,
  notificationDot,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const handleTab = (tab: BottomTab) => {
    if (tab !== active) haptic.selection();
    onNavigate(tab);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.borderSoft,
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >
      <View style={styles.row}>
        {/* Left side tabs */}
        {SIDE_TABS.map((t) => (
          <SideTab
            key={t.key}
            tab={t}
            active={active === t.key}
            onPress={() => handleTab(t.key)}
            showDot={false}
          />
        ))}

        {/* Center raised "+" button */}
        <View style={styles.centerWrap}>
          <Pressable
            onPress={() => handleTab('create')}
            style={({ pressed }) => [
              styles.centerBtn,
              {
                backgroundColor:
                  active === 'create' ? theme.colors.primaryDark : theme.colors.primary,
                ...theme.shadows.buttonFloat,
              },
              pressed && { transform: [{ scale: 0.94 }] },
            ]}
          >
            <Plus size={26} color="#FFFFFF" strokeWidth={2.5} />
          </Pressable>
          <Text
            style={[
              styles.centerLabel,
              { color: theme.colors.textTertiary },
            ]}
          >
            Create
          </Text>
        </View>

        {/* Right side tabs */}
        {RIGHT_TABS.map((t) => (
          <SideTab
            key={t.key}
            tab={t}
            active={active === t.key}
            onPress={() => handleTab(t.key)}
            showDot={t.key === 'notifications' && !!notificationDot}
          />
        ))}
      </View>
    </View>
  );
};

interface SideTabProps {
  tab: TabDef;
  active: boolean;
  onPress: () => void;
  showDot: boolean;
}

const SideTab: React.FC<SideTabProps> = ({ tab, active, onPress, showDot }) => {
  const { theme } = useTheme();
  const color = active ? theme.colors.primary : theme.colors.textTertiary;

  return (
    <Pressable
      onPress={onPress}
      style={styles.sideTab}
      android_ripple={
        Platform.OS === 'android'
          ? { color: theme.colors.borderSoft, borderless: true }
          : undefined
      }
    >
      <View style={styles.iconWrap}>
        <tab.Icon size={22} color={color} strokeWidth={active ? 2.5 : 2} />
        {showDot && (
          <View
            style={[styles.notifDot, { backgroundColor: theme.colors.error }]}
          />
        )}
      </View>
      <Text style={[styles.sideLabel, { color, fontWeight: active ? '700' : '500' }]}>
        {tab.label}
      </Text>
      {active && (
        <View
          style={[styles.activeBar, { backgroundColor: theme.colors.primary }]}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  sideTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    position: 'relative',
  },
  iconWrap: { position: 'relative' },
  notifDot: {
    position: 'absolute',
    top: -2,
    right: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sideLabel: {
    fontSize: 10,
    marginTop: 3,
  },
  activeBar: {
    position: 'absolute',
    top: -8,
    width: 22,
    height: 3,
    borderRadius: 2,
  },
  centerWrap: {
    width: 76,
    alignItems: 'center',
  },
  centerBtn: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22,
  },
  centerLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
});
