import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Crown, Shield, Users, MessageSquare, Settings as SettingsIcon } from 'lucide-react-native';
import { useTheme } from '../../components/ThemeProvider';
import { Header } from '../../components/Header';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { PostCard } from '../../components/PostCard';
import {
  MY_COMMUNITIES,
  DISCOVER_COMMUNITIES,
  SAMPLE_POSTS,
} from '../../constants/sampleData';
import { BATCH_LABELS } from '../../types';
import { showComingSoon, showToast } from '../../lib/toast';
import { haptic } from '../../lib/haptics';

type Tab = 'posts' | 'members' | 'about';

export default function CommunityDetail() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>('posts');

  const community = useMemo(() => {
    return (
      MY_COMMUNITIES.find((c) => c.id === id) ||
      DISCOVER_COMMUNITIES.find((c) => c.id === id) ||
      MY_COMMUNITIES[0]
    );
  }, [id]);

  const isMember = !!community.myRole;
  const role = community.myRole;
  const isOwnerOrAdmin = role === 'owner' || role === 'admin';

  // Show some posts (in real app, filtered by community_id)
  const posts = SAMPLE_POSTS.slice(0, 3);

  const join = () => {
    haptic.success();
    showToast('Join request sent!');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <Header
        showBack
        onBackPress={() => router.back()}
        rightIcons={isOwnerOrAdmin ? ['settings', 'more'] : ['more']}
        onIconPress={(ic) => {
          if (ic === 'settings') showComingSoon('Community settings');
          else showComingSoon('Community options');
        }}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Avatar name={community.name} size="xl" />
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            {community.name}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {[community.collegeName, community.collegeCity]
              .filter((s) => s && s !== '—')
              .join('  ·  ')}
          </Text>

          {/* Role badge */}
          {isMember && role && (
            <View
              style={[
                styles.roleBadge,
                {
                  backgroundColor:
                    role === 'owner'
                      ? theme.colors.ownerSoft
                      : role === 'admin'
                      ? theme.colors.adminSoft
                      : theme.colors.memberSoft,
                  marginTop: 12,
                },
              ]}
            >
              {role === 'owner' && (
                <Crown size={12} color={theme.colors.ownerColor} />
              )}
              {role === 'admin' && (
                <Shield size={12} color={theme.colors.adminColor} />
              )}
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color:
                    role === 'owner'
                      ? theme.colors.ownerColor
                      : role === 'admin'
                      ? theme.colors.adminColor
                      : theme.colors.memberColor,
                }}
              >
                {role === 'owner' ? 'Owner' : role === 'admin' ? 'Admin' : 'Member'}
              </Text>
            </View>
          )}

          {/* Action button */}
          <View style={{ marginTop: 18 }}>
            {isMember ? (
              <Button
                variant="secondary"
                onPress={() => showComingSoon('Community chat')}
              >
                Open Group Chat
              </Button>
            ) : (
              <Button onPress={join}>Request to Join</Button>
            )}
          </View>
        </View>

        {/* Stat row */}
        <View
          style={[
            styles.statsRow,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderSoft,
              borderRadius: theme.radius.xxl,
              ...theme.shadows.elevation1,
            },
          ]}
        >
          <Stat icon={<Users size={16} color={theme.colors.primary} />} value={community.memberCount.toLocaleString()} label="Members" />
          <Divider />
          <Stat icon={<MessageSquare size={16} color={theme.colors.accent} />} value="24" label="Posts" />
          <Divider />
          <Stat
            icon={<Crown size={16} color={theme.colors.ownerColor} />}
            value={community.ownerName.split(' ')[0]}
            label="Owner"
          />
        </View>

        {/* Batch tag */}
        {community.batchYear && (
          <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
            <View
              style={[
                styles.batchTag,
                { backgroundColor: theme.colors.primarySoft },
              ]}
            >
              <Text style={{ color: theme.colors.primaryText, fontWeight: '700', fontSize: 12 }}>
                Batch {BATCH_LABELS[community.batchYear]}
              </Text>
            </View>
          </View>
        )}

        {/* Tab switcher */}
        <View style={styles.tabsRow}>
          <TabPill label="Posts" active={tab === 'posts'} onPress={() => setTab('posts')} />
          <TabPill label="Members" active={tab === 'members'} onPress={() => setTab('members')} />
          <TabPill label="About" active={tab === 'about'} onPress={() => setTab('about')} />
        </View>

        {/* Tab content */}
        {tab === 'posts' && (
          <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
            {posts.map((p) => (
              <PostCard key={p.id} post={p} onPress={() => router.push(`/post/${p.id}`)} />
            ))}
          </View>
        )}

        {tab === 'members' && (
          <View style={{ paddingHorizontal: 16, paddingTop: 12, gap: 10 }}>
            {['Dr. Priya Sharma', 'Rahul Mehta', 'Anjali Reddy', 'Arjun Kapoor', 'Neha Iyer'].map((n, i) => (
              <View
                key={n}
                style={[
                  styles.memberRow,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.borderSoft,
                    borderRadius: theme.radius.lg,
                  },
                ]}
              >
                <Avatar name={n} size="md" />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.textPrimary, fontWeight: '700' }}>{n}</Text>
                  <Text style={{ color: theme.colors.textTertiary, fontSize: 12, marginTop: 2 }}>
                    {i === 0 ? 'Owner' : i === 1 ? 'Admin' : 'Member'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {tab === 'about' && (
          <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
            <View
              style={[
                styles.aboutBox,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.borderSoft,
                  borderRadius: theme.radius.xxl,
                },
              ]}
            >
              <Text style={[styles.aboutTitle, { color: theme.colors.textPrimary }]}>
                About this community
              </Text>
              <Text style={[styles.aboutText, { color: theme.colors.textSecondary }]}>
                A community for MBBS students and graduates from {community.collegeName}. Connect with batchmates, share opportunities, discuss exams, plan trips, and find study partners. Membership is admin-approved to maintain quality.
              </Text>

              <View style={[styles.aboutDivider, { backgroundColor: theme.colors.borderSoft }]} />

              <View style={styles.aboutRow}>
                <Text style={[styles.aboutLabel, { color: theme.colors.textTertiary }]}>Created</Text>
                <Text style={[styles.aboutValue, { color: theme.colors.textPrimary }]}>Mar 2024</Text>
              </View>
              <View style={styles.aboutRow}>
                <Text style={[styles.aboutLabel, { color: theme.colors.textTertiary }]}>Privacy</Text>
                <Text style={[styles.aboutValue, { color: theme.colors.textPrimary }]}>Approval required</Text>
              </View>
              <View style={styles.aboutRow}>
                <Text style={[styles.aboutLabel, { color: theme.colors.textTertiary }]}>Owner</Text>
                <Text style={[styles.aboutValue, { color: theme.colors.textPrimary }]}>{community.ownerName}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const Stat: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({
  icon,
  value,
  label,
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.stat}>
      {icon}
      <Text style={[styles.statValue, { color: theme.colors.textPrimary }]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={[styles.statLabel, { color: theme.colors.textTertiary }]}>{label}</Text>
    </View>
  );
};

const Divider: React.FC = () => {
  const { theme } = useTheme();
  return (
    <View style={{ width: 1, height: 36, backgroundColor: theme.colors.borderSoft }} />
  );
};

const TabPill: React.FC<{ label: string; active: boolean; onPress: () => void }> = ({
  label,
  active,
  onPress,
}) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={() => {
        haptic.selection();
        onPress();
      }}
      style={[
        styles.tabPill,
        {
          backgroundColor: active ? theme.colors.primary : theme.colors.surface,
          borderColor: active ? theme.colors.primary : theme.colors.border,
        },
      ]}
    >
      <Text
        style={{
          color: active ? '#FFFFFF' : theme.colors.textSecondary,
          fontWeight: '700',
          fontSize: 13,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingHorizontal: 24, paddingVertical: 20 },
  title: { fontSize: 22, fontWeight: '800', marginTop: 12, textAlign: 'center', letterSpacing: -0.3 },
  subtitle: { fontSize: 13, marginTop: 4, textAlign: 'center' },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  stat: { alignItems: 'center', flex: 1, gap: 4 },
  statValue: { fontSize: 14, fontWeight: '700' },
  statLabel: { fontSize: 10, fontWeight: '500' },
  batchTag: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tabPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 1,
  },
  aboutBox: { padding: 16, borderWidth: 1 },
  aboutTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8 },
  aboutText: { fontSize: 14, lineHeight: 21 },
  aboutDivider: { height: 1, marginVertical: 14 },
  aboutRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  aboutLabel: { fontSize: 13 },
  aboutValue: { fontSize: 13, fontWeight: '600' },
});
