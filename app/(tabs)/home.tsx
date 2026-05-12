import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '../../components/ThemeProvider';
import { Header } from '../../components/Header';
import { FilterChips } from '../../components/FilterChips';
import { PostCard } from '../../components/PostCard';
import { SAMPLE_POSTS } from '../../constants/sampleData';
import { CategoryKey } from '../../constants/categories';
import { haptic } from '../../lib/haptics';
import { showComingSoon } from '../../lib/toast';

export default function Home() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<CategoryKey | 'all'>('all');
  const [refreshing, setRefreshing] = useState(false);

  const filtered = useMemo(() => {
    if (filter === 'all') return SAMPLE_POSTS;
    return SAMPLE_POSTS.filter((p) => p.category === filter);
  }, [filter]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    haptic.light();
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const handleHeaderIcon = (icon: 'bell' | 'chat' | 'settings' | 'more') => {
    if (icon === 'chat') router.push('/chat/list');
    else if (icon === 'bell') router.push('/(tabs)/notifications');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <Header
        showLogo
        rightIcons={['chat', 'bell']}
        notificationDot
        onIconPress={handleHeaderIcon}
      />
      <FilterChips active={filter} onChange={setFilter} />

      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => router.push(`/post/${item.id}`)}
            onAuthorPress={() => showComingSoon('Author profiles')}
          />
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 120, // room for bottom nav + raised +
  },
});
