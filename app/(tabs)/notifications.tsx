import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Heart, MessageCircle, UserPlus, Check } from 'lucide-react-native';
import { useTheme } from '../../components/ThemeProvider';
import { Avatar } from '../../components/Avatar';
import { SAMPLE_NOTIFICATIONS } from '../../constants/sampleData';
import { NotificationItem } from '../../types';
import { haptic } from '../../lib/haptics';

export default function Notifications() {
  const { theme } = useTheme();

  const onItemPress = (n: NotificationItem) => {
    haptic.light();
    if (n.postId) router.push(`/post/${n.postId}`);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          Notifications
        </Text>
      </View>

      <FlatList
        data={SAMPLE_NOTIFICATIONS}
        keyExtractor={(n) => n.id}
        renderItem={({ item }) => (
          <NotifRow item={item} onPress={() => onItemPress(item)} />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: theme.colors.borderSoft,
              marginLeft: 76,
            }}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

interface NotifRowProps {
  item: NotificationItem;
  onPress: () => void;
}

const NotifRow: React.FC<NotifRowProps> = ({ item, onPress }) => {
  const { theme } = useTheme();

  let Icon: typeof Heart = Heart;
  let iconColor = theme.colors.error;
  let iconBg = theme.colors.errorSoft;

  if (item.type === 'comment') {
    Icon = MessageCircle;
    iconColor = theme.colors.primary;
    iconBg = theme.colors.primarySoft;
  } else if (item.type === 'follow') {
    Icon = UserPlus;
    iconColor = theme.colors.success;
    iconBg = theme.colors.successSoft;
  } else if (item.type === 'approval' || item.type === 'join_request') {
    Icon = Check;
    iconColor = theme.colors.success;
    iconBg = theme.colors.successSoft;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: item.read
            ? theme.colors.background
            : theme.colors.primarySoft,
        },
        pressed && { opacity: 0.8 },
      ]}
    >
      <View style={styles.avatarWrap}>
        <Avatar
          name={item.actor.fullName}
          avatarUrl={item.actor.avatarUrl}
          size="md"
        />
        <View style={[styles.iconBadge, { backgroundColor: iconBg }]}>
          <Icon size={11} color={iconColor} fill={iconColor} />
        </View>
      </View>

      <View style={{ flex: 1, minWidth: 0 }}>
        <Text
          style={[styles.text, { color: theme.colors.textPrimary }]}
          numberOfLines={2}
        >
          <Text style={{ fontWeight: '700' }}>{item.actor.fullName}</Text>{' '}
          {item.message}
        </Text>
        <Text
          style={[styles.timestamp, { color: theme.colors.textTertiary }]}
        >
          {item.createdAt}
        </Text>
      </View>

      {!item.read && (
        <View
          style={[styles.unreadDot, { backgroundColor: theme.colors.primary }]}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleRow: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  list: { paddingBottom: 120 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  avatarWrap: { position: 'relative' },
  iconBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  text: { fontSize: 14, lineHeight: 20 },
  timestamp: { fontSize: 11, marginTop: 2 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
