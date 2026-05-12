import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send, Paperclip } from 'lucide-react-native';
import { useTheme } from '../../components/ThemeProvider';
import { Avatar } from '../../components/Avatar';
import { SAMPLE_CHATS, SAMPLE_MESSAGES, CURRENT_USER } from '../../constants/sampleData';
import { ChatMessage } from '../../types';
import { haptic } from '../../lib/haptics';
import { showComingSoon } from '../../lib/toast';

export default function ChatThread() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const chat = SAMPLE_CHATS.find((c) => c.id === id) || SAMPLE_CHATS[0];
  const [messages, setMessages] = useState<ChatMessage[]>(
    SAMPLE_MESSAGES.filter((m) => m.chatId === chat.id).length > 0
      ? SAMPLE_MESSAGES.filter((m) => m.chatId === chat.id)
      : SAMPLE_MESSAGES, // fallback
  );
  const [draft, setDraft] = useState('');

  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: false }), 50);
  }, []);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    haptic.light();
    setMessages((prev) => [
      ...prev,
      {
        id: `m_${Date.now()}`,
        chatId: chat.id,
        senderId: CURRENT_USER.id,
        content: text,
        createdAt: 'now',
      },
    ]);
    setDraft('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      {/* Custom header */}
      <View
        style={[
          styles.topBar,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.borderSoft,
          },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={styles.iconBtn}
        >
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </Pressable>
        <Pressable
          onPress={() => showComingSoon('Profile')}
          style={styles.topUser}
        >
          <Avatar
            name={chat.other.fullName}
            avatarUrl={chat.other.avatarUrl}
            size="sm"
          />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text
              numberOfLines={1}
              style={[styles.topName, { color: theme.colors.textPrimary }]}
            >
              {chat.other.fullName}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.topSub, { color: theme.colors.textTertiary }]}
            >
              {chat.other.collegeName || 'Active now'}
            </Text>
          </View>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              isMe={item.senderId === CURRENT_USER.id}
            />
          )}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        {/* Composer */}
        <View
          style={[
            styles.composer,
            {
              backgroundColor: theme.colors.surface,
              borderTopColor: theme.colors.borderSoft,
            },
          ]}
        >
          <Pressable
            onPress={() => showComingSoon('Attachments')}
            style={styles.attachBtn}
            hitSlop={6}
          >
            <Paperclip size={20} color={theme.colors.textSecondary} />
          </Pressable>

          <View
            style={[
              styles.composerField,
              {
                backgroundColor: theme.colors.surfaceMuted,
                borderRadius: theme.radius.full,
              },
            ]}
          >
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Type a message…"
              placeholderTextColor={theme.colors.textTertiary}
              style={[styles.composerInput, { color: theme.colors.textPrimary }]}
              multiline
              maxLength={500}
            />
          </View>

          <Pressable
            onPress={send}
            disabled={!draft.trim()}
            style={[
              styles.sendBtn,
              {
                backgroundColor: draft.trim()
                  ? theme.colors.primary
                  : theme.colors.surfaceMuted,
              },
            ]}
          >
            <Send size={16} color={draft.trim() ? '#FFFFFF' : theme.colors.textTertiary} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

interface MessageBubbleProps {
  message: ChatMessage;
  isMe: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isMe }) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.bubbleRow,
        { justifyContent: isMe ? 'flex-end' : 'flex-start' },
      ]}
    >
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isMe ? theme.colors.primary : theme.colors.surface,
            borderColor: isMe ? theme.colors.primary : theme.colors.borderSoft,
            borderBottomRightRadius: isMe ? 4 : 16,
            borderBottomLeftRadius: isMe ? 16 : 4,
          },
        ]}
      >
        <Text
          style={[
            styles.bubbleText,
            { color: isMe ? '#FFFFFF' : theme.colors.textPrimary },
          ]}
        >
          {message.content}
        </Text>
        <Text
          style={[
            styles.bubbleTime,
            {
              color: isMe
                ? 'rgba(255,255,255,0.7)'
                : theme.colors.textTertiary,
            },
          ]}
        >
          {message.createdAt}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    gap: 4,
  },
  iconBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topUser: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 12,
  },
  topName: { fontSize: 15, fontWeight: '700' },
  topSub: { fontSize: 11, marginTop: 1 },
  messagesList: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 6,
  },
  bubbleRow: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 14,
    paddingTop: 9,
    paddingBottom: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTime: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  attachBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  composerField: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    minHeight: 38,
    maxHeight: 100,
    justifyContent: 'center',
  },
  composerInput: {
    fontSize: 14,
    minHeight: 26,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
