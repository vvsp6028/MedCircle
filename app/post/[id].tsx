import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Send, Heart } from 'lucide-react-native';
import { useTheme } from '../../components/ThemeProvider';
import { Header } from '../../components/Header';
import { Avatar } from '../../components/Avatar';
import { PostCard } from '../../components/PostCard';
import { SAMPLE_POSTS, SAMPLE_COMMENTS, CURRENT_USER } from '../../constants/sampleData';
import { Comment } from '../../types';
import { haptic } from '../../lib/haptics';
import { showComingSoon } from '../../lib/toast';

export default function PostDetail() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const post = SAMPLE_POSTS.find((p) => p.id === id) || SAMPLE_POSTS[0];

  const [comments, setComments] = useState<Comment[]>(
    SAMPLE_COMMENTS.filter((c) => c.postId === post.id).length > 0
      ? SAMPLE_COMMENTS.filter((c) => c.postId === post.id)
      : SAMPLE_COMMENTS, // fallback so screen never looks empty in demo
  );
  const [draft, setDraft] = useState('');

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    haptic.success();
    setComments((prev) => [
      ...prev,
      {
        id: `cm_${Date.now()}`,
        postId: post.id,
        author: {
          id: CURRENT_USER.id,
          fullName: CURRENT_USER.fullName,
          collegeName: CURRENT_USER.collegeName,
          batchYear: CURRENT_USER.batchYear,
        },
        content: text,
        likeCount: 0,
        userLiked: false,
        createdAt: 'just now',
      },
    ]);
    setDraft('');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <Header
        title="Post"
        showBack
        onBackPress={() => router.back()}
        rightIcons={['more']}
        onIconPress={() => showComingSoon('Post options')}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <PostCard post={post} truncate={false} />

          <View style={styles.commentsHeader}>
            <Text style={[styles.commentsTitle, { color: theme.colors.textPrimary }]}>
              {comments.length} Comments
            </Text>
          </View>

          {comments.map((c) => (
            <CommentRow key={c.id} comment={c} />
          ))}
          <View style={{ height: 24 }} />
        </ScrollView>

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
          <Avatar name={CURRENT_USER.fullName} size="sm" />
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
              style={[
                styles.composerInput,
                { color: theme.colors.textPrimary },
              ]}
              placeholder="Add a comment…"
              placeholderTextColor={theme.colors.textTertiary}
              value={draft}
              onChangeText={setDraft}
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

const CommentRow: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { theme } = useTheme();
  const [liked, setLiked] = useState(comment.userLiked);
  const [count, setCount] = useState(comment.likeCount);

  const like = () => {
    haptic.light();
    setLiked(!liked);
    setCount((c) => c + (liked ? -1 : 1));
  };

  return (
    <View style={[styles.commentRow, { borderBottomColor: theme.colors.borderSoft }]}>
      <Avatar name={comment.author.fullName} size="sm" />
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={styles.commentMeta}>
          <Text
            style={[
              styles.commentAuthor,
              { color: theme.colors.textPrimary },
            ]}
          >
            {comment.author.fullName}
          </Text>
          <Text
            style={[
              styles.commentTime,
              { color: theme.colors.textTertiary },
            ]}
          >
            {comment.createdAt}
          </Text>
        </View>
        <Text
          style={[styles.commentText, { color: theme.colors.textPrimary }]}
        >
          {comment.content}
        </Text>
        <View style={styles.commentActions}>
          <Pressable onPress={like} style={styles.commentAction} hitSlop={4}>
            <Heart
              size={14}
              color={liked ? theme.colors.error : theme.colors.textTertiary}
              fill={liked ? theme.colors.error : 'transparent'}
            />
            <Text
              style={[
                styles.commentActionText,
                {
                  color: liked ? theme.colors.error : theme.colors.textTertiary,
                },
              ]}
            >
              {count}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => haptic.selection()}
            hitSlop={4}
            style={styles.commentAction}
          >
            <Text
              style={[
                styles.commentActionText,
                { color: theme.colors.textTertiary },
              ]}
            >
              Reply
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16 },
  commentsHeader: { marginTop: 4, marginBottom: 8 },
  commentsTitle: { fontSize: 16, fontWeight: '700' },
  commentRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  commentMeta: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  commentAuthor: { fontSize: 13, fontWeight: '700' },
  commentTime: { fontSize: 11 },
  commentText: { fontSize: 14, lineHeight: 20, marginTop: 2 },
  commentActions: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 6,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentActionText: { fontSize: 12, fontWeight: '600' },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  composerField: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 4,
    minHeight: 38,
    maxHeight: 100,
    justifyContent: 'center',
  },
  composerInput: {
    fontSize: 14,
    minHeight: 30,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
