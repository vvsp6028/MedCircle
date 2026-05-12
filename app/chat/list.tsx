import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '../../components/ThemeProvider';
import { Header } from '../../components/Header';
import { Avatar } from '../../components/Avatar';
import { SAMPLE_CHATS } from '../../constants/sampleData';
import { ChatPreview, BATCH_LABELS } from '../../types';
import { haptic } from '../../lib/haptics';

export default function ChatList() {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <Header
        title="Messages"
        showBack
        onBackPress={() => router.back()}
      />

      <FlatList
        data={SAMPLE_CHATS}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <ChatRow
            chat={item}
            onPress={() => {
              haptic.light();
              router.push(`/chat/${item.id}`);
            }}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: theme.colors.borderSoft,
              marginLeft: 72,
            }}
          />
        )}
        contentContainerStyle={{ paddingTop: 4 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

interface ChatRowProps {
  chat: ChatPreview;
  onPress: () => void;
}

const ChatRow: React.FC<ChatRowProps> = ({ chat, onPress }) => {
  const { theme } = useTheme();
  const hasUnread = chat.unreadCount > 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        pressed && { opacity: 0.85 },
      ]}
    >
      <Avatar
        name={chat.other.fullName}
        avatarUrl={chat.other.avatarUrl}
        size="lg"
      />

      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={styles.topRow}>
          <Text
            numberOfLines={1}
            style={[
              styles.name,
              {
                color: theme.colors.textPrimary,
                fontWeight: hasUnread ? '800' : '700',
              },
            ]}
          >
            {chat.other.fullName}
          </Text>
          <Text
            style={[
              styles.time,
              {
                color: hasUnread ? theme.colors.primary : theme.colors.textTertiary,
                fontWeight: hasUnread ? '700' : '500',
              },
            ]}
          >
            {chat.lastMessageAt}
          </Text>
        </View>

        {chat.other.collegeName && (
          <Text
            numberOfLines={1}
            style={[styles.college, { color: theme.colors.textTertiary }]}
          >
            {chat.other.collegeName}
            {chat.other.batchYear ? `  ·  ${BATCH_LABELS[chat.other.batchYear]}` : ''}
          </Text>
        )}

        <View style={styles.bottomRow}>
          <Text
            numberOfLines={1}
            style={[
              styles.message,
              {
                color: hasUnread
                  ? theme.colors.textPrimary
                  : theme.colors.textSecondary,
                fontWeight: hasUnread ? '600' : '400',
              },
            ]}
          >
            {chat.lastMessage}
          </Text>
          {hasUnread && (
            <View
              style={[
                styles.unreadBadge,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text style={styles.unreadText}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: { fontSize: 15, flex: 1 },
  time: { fontSize: 11 },
  college: { fontSize: 11, marginTop: 1 },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 3,
    gap: 8,
  },
  message: { fontSize: 13, flex: 1, lineHeight: 18 },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
});
