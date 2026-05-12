import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Settings,
  Moon,
  Sun,
  Smartphone,
  LogOut,
  Bookmark,
  Shield,
  HelpCircle,
  ChevronRight,
} from 'lucide-react-native';
import { useTheme } from '../../components/ThemeProvider';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { CURRENT_USER, SAMPLE_POSTS } from '../../constants/sampleData';
import { BATCH_LABELS, ThemeMode } from '../../types';
import { PostCard } from '../../components/PostCard';
import { haptic } from '../../lib/haptics';
import { showComingSoon } from '../../lib/toast';

export default function Profile() {
  const { theme, mode, setMode } = useTheme();

  const cycleTheme = () => {
    const order: ThemeMode[] = ['light', 'dark', 'system'];
    const next = order[(order.indexOf(mode) + 1) % order.length];
    haptic.light();
    setMode(next);
  };

  const themeIcon =
    mode === 'light' ? <Sun size={18} color={theme.colors.warning} />
    : mode === 'dark' ? <Moon size={18} color={theme.colors.primary} />
    : <Smartphone size={18} color={theme.colors.textSecondary} />;

  const themeLabel =
    mode === 'light' ? 'Light' : mode === 'dark' ? 'Dark' : 'Auto (System)';

  const logout = () => {
    haptic.warning();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          Profile
        </Text>
        <Pressable
          onPress={() => showComingSoon('Settings')}
          hitSlop={8}
          style={styles.iconBtn}
        >
          <Settings size={20} color={theme.colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile hero */}
        <View style={styles.hero}>
          <Avatar name={CURRENT_USER.fullName} size="xl" />
          <Text style={[styles.name, { color: theme.colors.textPrimary }]}>
            {CURRENT_USER.fullName}
          </Text>
          <Text style={[styles.sub, { color: theme.colors.textSecondary }]}>
            {CURRENT_USER.collegeName}
            {CURRENT_USER.batchYear ? `  ·  ${BATCH_LABELS[CURRENT_USER.batchYear]}` : ''}
          </Text>
          {CURRENT_USER.bio && (
            <Text style={[styles.bio, { color: theme.colors.textSecondary }]}>
              {CURRENT_USER.bio}
            </Text>
          )}

          <View style={styles.actionRow}>
            <Button
              variant="secondary"
              size="md"
              onPress={() => showComingSoon('Profile editing')}
            >
              Edit Profile
            </Button>
            <Button
              variant="ghost"
              size="md"
              onPress={() => showComingSoon('Share profile')}
            >
              Share
            </Button>
          </View>
        </View>

        {/* Stats */}
        <View
          style={[
            styles.stats,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderSoft,
              borderRadius: theme.radius.xxl,
              ...theme.shadows.elevation1,
            },
          ]}
        >
          <Stat value="6" label="Posts" />
          <Divider />
          <Stat value="124" label="Following" />
          <Divider />
          <Stat value="312" label="Followers" />
        </View>

        {/* Settings list */}
        <View style={styles.settingsBlock}>
          <Text
            style={[styles.sectionLabel, { color: theme.colors.textTertiary }]}
          >
            APPEARANCE
          </Text>
          <SettingRow
            icon={themeIcon}
            label="Theme"
            value={themeLabel}
            onPress={cycleTheme}
          />

          <Text
            style={[
              styles.sectionLabel,
              { color: theme.colors.textTertiary, marginTop: 16 },
            ]}
          >
            ACCOUNT
          </Text>
          <SettingRow
            icon={<Bookmark size={18} color={theme.colors.textSecondary} />}
            label="Saved Posts"
            onPress={() => showComingSoon('Saved posts')}
          />
          <SettingRow
            icon={<Shield size={18} color={theme.colors.textSecondary} />}
            label="Privacy"
            onPress={() => showComingSoon('Privacy settings')}
          />
          <SettingRow
            icon={<HelpCircle size={18} color={theme.colors.textSecondary} />}
            label="Help & Support"
            onPress={() => showComingSoon('Help & Support')}
          />
          <SettingRow
            icon={<LogOut size={18} color={theme.colors.error} />}
            label="Log Out"
            color={theme.colors.error}
            onPress={logout}
            hideChevron
          />
        </View>

        {/* User's posts */}
        <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
          <Text
            style={[
              styles.sectionLabel,
              { color: theme.colors.textTertiary, marginBottom: 12 },
            ]}
          >
            MY POSTS
          </Text>
          {SAMPLE_POSTS.slice(0, 2).map((p) => (
            <PostCard
              key={p.id}
              post={p}
              onPress={() => router.push(`/post/${p.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color: theme.colors.textPrimary }]}>
        {value}
      </Text>
      <Text style={[styles.statLabel, { color: theme.colors.textTertiary }]}>
        {label}
      </Text>
    </View>
  );
};

const Divider: React.FC = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: 1,
        height: 32,
        backgroundColor: theme.colors.borderSoft,
      }}
    />
  );
};

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  color?: string;
  hideChevron?: boolean;
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  label,
  value,
  onPress,
  color,
  hideChevron,
}) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingRow,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.borderSoft,
          borderRadius: theme.radius.lg,
        },
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={styles.settingLeft}>
        {icon}
        <Text
          style={[
            styles.settingLabel,
            { color: color || theme.colors.textPrimary },
          ]}
        >
          {label}
        </Text>
      </View>
      <View style={styles.settingRight}>
        {value && (
          <Text
            style={[styles.settingValue, { color: theme.colors.textTertiary }]}
          >
            {value}
          </Text>
        )}
        {!hideChevron && (
          <ChevronRight size={18} color={theme.colors.textTertiary} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  iconBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: { alignItems: 'center', paddingHorizontal: 24, paddingVertical: 12 },
  name: { fontSize: 22, fontWeight: '800', marginTop: 12 },
  sub: { fontSize: 14, marginTop: 4 },
  bio: { fontSize: 13, marginTop: 8, textAlign: 'center', lineHeight: 18 },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  stats: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, marginTop: 2 },
  settingsBlock: { paddingHorizontal: 16, paddingTop: 20 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingLabel: { fontSize: 15, fontWeight: '500' },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  settingValue: { fontSize: 13 },
});
