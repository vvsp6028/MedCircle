import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import { useTheme } from '../../components/ThemeProvider';
import { CommunityCard } from '../../components/CommunityCard';
import { MY_COMMUNITIES, DISCOVER_COMMUNITIES } from '../../constants/sampleData';
import { haptic } from '../../lib/haptics';
import { showToast } from '../../lib/toast';

type Tab = 'my' | 'discover';

export default function Communities() {
  const { theme } = useTheme();
  const [tab, setTab] = useState<Tab>('my');
  const [query, setQuery] = useState('');

  const filteredDiscover = useMemo(() => {
    if (!query.trim()) return DISCOVER_COMMUNITIES;
    const q = query.trim().toLowerCase();
    return DISCOVER_COMMUNITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.collegeName.toLowerCase().includes(q) ||
        c.collegeCity.toLowerCase().includes(q),
    );
  }, [query]);

  const switchTab = (t: Tab) => {
    if (t === tab) return;
    haptic.selection();
    setTab(t);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      {/* Page title */}
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          Communities
        </Text>
      </View>

      {/* Tab switcher */}
      <View style={styles.tabsWrap}>
        <View
          style={[
            styles.tabsBg,
            {
              backgroundColor: theme.colors.surfaceMuted,
              borderRadius: theme.radius.full,
            },
          ]}
        >
          <TabBtn
            label="My Communities"
            active={tab === 'my'}
            onPress={() => switchTab('my')}
          />
          <TabBtn
            label="Discover"
            active={tab === 'discover'}
            onPress={() => switchTab('discover')}
          />
        </View>
      </View>

      {/* Search bar in Discover */}
      {tab === 'discover' && (
        <View style={styles.searchWrap}>
          <View
            style={[
              styles.searchBox,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.lg,
              },
            ]}
          >
            <Search size={16} color={theme.colors.textTertiary} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search communities..."
              placeholderTextColor={theme.colors.textTertiary}
              style={[
                styles.searchInput,
                { color: theme.colors.textPrimary },
              ]}
            />
          </View>
        </View>
      )}

      {/* List */}
      <FlatList
        data={tab === 'my' ? MY_COMMUNITIES : filteredDiscover}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <CommunityCard
            community={item}
            onPress={() => router.push(`/community/${item.id}`)}
            onJoin={
              tab === 'discover'
                ? () => {
                    haptic.success();
                    showToast('Join request sent!');
                  }
                : undefined
            }
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

interface TabBtnProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

const TabBtn: React.FC<TabBtnProps> = ({ label, active, onPress }) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tabBtn,
        active && {
          backgroundColor: theme.colors.surface,
          ...theme.shadows.elevation1,
        },
      ]}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: '700',
          color: active ? theme.colors.textPrimary : theme.colors.textSecondary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleRow: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  tabsWrap: { paddingHorizontal: 16, marginTop: 10 },
  tabsBg: {
    flexDirection: 'row',
    padding: 4,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 999,
  },
  searchWrap: { paddingHorizontal: 16, paddingTop: 12 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14 },
  list: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 120 },
});
