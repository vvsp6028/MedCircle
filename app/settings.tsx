import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Moon,
  Sun,
  Smartphone,
  Bell,
  Shield,
  Lock,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Check,
} from 'lucide-react-native';
import { useTheme } from '../components/ThemeProvider';
import { Header } from '../components/Header';
import { ThemeMode } from '../types';
import { haptic } from '../lib/haptics';
import { showComingSoon } from '../lib/toast';

export default function Settings() {
  const { theme, mode, setMode } = useTheme();

  const logout = () => {
    haptic.warning();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <Header
        title="Settings"
        showBack
        onBackPress={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme */}
        <Section title="APPEARANCE">
          <ThemeOption
            currentMode={mode}
            option="light"
            label="Light"
            icon={<Sun size={18} color={theme.colors.warning} />}
            onPress={() => {
              haptic.selection();
              setMode('light');
            }}
          />
          <ThemeOption
            currentMode={mode}
            option="dark"
            label="Dark"
            icon={<Moon size={18} color={theme.colors.primary} />}
            onPress={() => {
              haptic.selection();
              setMode('dark');
            }}
          />
          <ThemeOption
            currentMode={mode}
            option="system"
            label="Auto (System)"
            icon={<Smartphone size={18} color={theme.colors.textSecondary} />}
            onPress={() => {
              haptic.selection();
              setMode('system');
            }}
            last
          />
        </Section>

        {/* Notifications */}
        <Section title="NOTIFICATIONS">
          <SettingsRow
            icon={<Bell size={18} color={theme.colors.textSecondary} />}
            label="Push Notifications"
            onPress={() => showComingSoon('Notification settings')}
            last
          />
        </Section>

        {/* Privacy */}
        <Section title="PRIVACY & SECURITY">
          <SettingsRow
            icon={<Shield size={18} color={theme.colors.textSecondary} />}
            label="Privacy"
            onPress={() => showComingSoon('Privacy settings')}
          />
          <SettingsRow
            icon={<Lock size={18} color={theme.colors.textSecondary} />}
            label="Change Password"
            onPress={() => showComingSoon('Password change')}
            last
          />
        </Section>

        {/* About */}
        <Section title="ABOUT">
          <SettingsRow
            icon={<HelpCircle size={18} color={theme.colors.textSecondary} />}
            label="Help & Support"
            onPress={() => showComingSoon('Help & Support')}
          />
          <SettingsRow
            icon={<FileText size={18} color={theme.colors.textSecondary} />}
            label="Terms & Privacy Policy"
            onPress={() => showComingSoon('Terms & Privacy')}
            last
          />
        </Section>

        {/* Logout */}
        <View style={styles.logoutWrap}>
          <Pressable
            onPress={logout}
            style={({ pressed }) => [
              styles.logoutBtn,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.borderSoft,
                borderRadius: theme.radius.lg,
              },
              pressed && { opacity: 0.85 },
            ]}
          >
            <LogOut size={18} color={theme.colors.error} />
            <Text
              style={{
                color: theme.colors.error,
                fontWeight: '700',
                fontSize: 15,
              }}
            >
              Log Out
            </Text>
          </Pressable>
        </View>

        <Text
          style={[styles.version, { color: theme.colors.textTertiary }]}
        >
          MedCircle  ·  v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.textTertiary }]}>
        {title}
      </Text>
      <View
        style={[
          styles.sectionBox,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.borderSoft,
            borderRadius: theme.radius.xl,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

interface ThemeOptionProps {
  currentMode: ThemeMode;
  option: ThemeMode;
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  last?: boolean;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({
  currentMode,
  option,
  label,
  icon,
  onPress,
  last,
}) => {
  const { theme } = useTheme();
  const isSelected = currentMode === option;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !last && { borderBottomColor: theme.colors.borderSoft, borderBottomWidth: 1 },
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={styles.rowLeft}>
        {icon}
        <Text style={[styles.rowLabel, { color: theme.colors.textPrimary }]}>
          {label}
        </Text>
      </View>
      {isSelected && <Check size={18} color={theme.colors.primary} />}
    </Pressable>
  );
};

interface SettingsRowProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  last?: boolean;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ icon, label, onPress, last }) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !last && { borderBottomColor: theme.colors.borderSoft, borderBottomWidth: 1 },
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={styles.rowLeft}>
        {icon}
        <Text style={[styles.rowLabel, { color: theme.colors.textPrimary }]}>
          {label}
        </Text>
      </View>
      <ChevronRight size={18} color={theme.colors.textTertiary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { paddingHorizontal: 16, marginTop: 18 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionBox: { borderWidth: 1, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowLabel: { fontSize: 15, fontWeight: '500' },
  logoutWrap: { paddingHorizontal: 16, marginTop: 24 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderWidth: 1,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 18,
  },
});
