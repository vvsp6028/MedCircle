import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { Heart, MessageCircle, Share2, Bookmark, MapPin, Zap } from 'lucide-react-native';
import { useTheme } from './ThemeProvider';
import { Avatar } from './Avatar';
import { CategoryChip } from './CategoryChip';
import { getCategoryByKey, LOCATION_LABELS } from '../constants/categories';
import { Post } from '../types';
import { haptic } from '../lib/haptics';
import { formatCount } from '../lib/format';
import { BATCH_LABELS } from '../types';

interface PostCardProps {
  post: Post;
  onPress?: () => void;
  onAuthorPress?: () => void;
  truncate?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onPress,
  onAuthorPress,
  truncate = true,
}) => {
  const { theme } = useTheme();
  const [liked, setLiked] = useState(post.userLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [saved, setSaved] = useState(post.userSaved);

  const category = getCategoryByKey(post.category);

  const toggleLike = () => {
    haptic.light();
    setLiked(!liked);
    setLikeCount((c) => c + (liked ? -1 : 1));
  };
  const toggleSave = () => {
    haptic.light();
    setSaved(!saved);
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.borderSoft,
          borderRadius: theme.radius.xxl,
          ...theme.shadows.elevation1,
        },
        pressed && styles.pressed,
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onAuthorPress} hitSlop={4}>
          <Avatar
            name={post.author.fullName}
            avatarUrl={post.author.avatarUrl}
            size="md"
          />
        </Pressable>

        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={styles.nameRow}>
            <Pressable onPress={onAuthorPress} hitSlop={4} style={{ flexShrink: 1 }}>
              <Text
                numberOfLines={1}
                style={[styles.authorName, { color: theme.colors.textPrimary }]}
              >
                {post.author.fullName}
              </Text>
            </Pressable>
            {post.isBoosted && (
              <View
                style={[
                  styles.boostBadge,
                  { backgroundColor: theme.colors.warningSoft },
                ]}
              >
                <Zap size={9} color={theme.colors.warning} fill={theme.colors.warning} />
                <Text style={[styles.boostText, { color: theme.colors.warning }]}>
                  Boosted
                </Text>
              </View>
            )}
          </View>

          <Text
            numberOfLines={1}
            style={[styles.subInfo, { color: theme.colors.textTertiary }]}
          >
            {[
              post.author.collegeName,
              post.author.batchYear ? BATCH_LABELS[post.author.batchYear] : null,
              post.createdAt,
            ]
              .filter(Boolean)
              .join('  ·  ')}
          </Text>
        </View>

        {category && <CategoryChip category={category} size="sm" />}
      </View>

      {/* Location pill */}
      <View style={styles.locationRow}>
        <MapPin size={11} color={theme.colors.textTertiary} />
        <Text style={[styles.locationText, { color: theme.colors.textTertiary }]}>
          {LOCATION_LABELS[post.locationScope]}
        </Text>
      </View>

      {/* Title + content */}
      <View style={styles.body}>
        <Text
          numberOfLines={truncate ? 2 : undefined}
          style={[styles.title, { color: theme.colors.textPrimary }]}
        >
          {post.title}
        </Text>
        <Text
          numberOfLines={truncate ? 4 : undefined}
          style={[styles.content, { color: theme.colors.textSecondary }]}
        >
          {post.content}
        </Text>
      </View>

      {/* Media */}
      {post.mediaUrls.length > 0 && (
        <View
          style={[
            styles.media,
            { backgroundColor: theme.colors.surfaceMuted },
          ]}
        >
          <Image
            source={{ uri: post.mediaUrls[0] }}
            style={styles.mediaImage}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Footer */}
      <View
        style={[
          styles.footer,
          { borderTopColor: theme.colors.borderSoft },
        ]}
      >
        <ActionBtn
          icon={
            <Heart
              size={18}
              color={liked ? theme.colors.error : theme.colors.textTertiary}
              fill={liked ? theme.colors.error : 'transparent'}
            />
          }
          label={formatCount(likeCount)}
          color={liked ? theme.colors.error : theme.colors.textSecondary}
          onPress={toggleLike}
        />
        <ActionBtn
          icon={<MessageCircle size={18} color={theme.colors.textTertiary} />}
          label={formatCount(post.commentCount)}
          color={theme.colors.textSecondary}
          onPress={onPress}
        />
        <ActionBtn
          icon={<Share2 size={18} color={theme.colors.textTertiary} />}
          label="Share"
          color={theme.colors.textSecondary}
          onPress={() => haptic.selection()}
        />

        <View style={{ flex: 1 }} />

        <Pressable onPress={toggleSave} hitSlop={6} style={styles.bookmarkBtn}>
          <Bookmark
            size={18}
            color={saved ? theme.colors.primary : theme.colors.textTertiary}
            fill={saved ? theme.colors.primary : 'transparent'}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

interface ActionBtnProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onPress?: () => void;
}

const ActionBtn: React.FC<ActionBtnProps> = ({ icon, label, color, onPress }) => (
  <Pressable onPress={onPress} style={styles.actionBtn} hitSlop={4}>
    {icon}
    <Text style={[styles.actionLabel, { color }]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.96,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  authorName: { fontSize: 14, fontWeight: '700' },
  subInfo: { fontSize: 11, marginTop: 2 },
  boostBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  boostText: { fontSize: 9, fontWeight: '700' },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  locationText: { fontSize: 11 },
  body: { gap: 4, marginBottom: 12 },
  title: { fontSize: 15, fontWeight: '700', lineHeight: 21 },
  content: { fontSize: 14, lineHeight: 20 },
  media: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
  },
  mediaImage: { width: '100%', height: '100%' },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  actionLabel: { fontSize: 12, fontWeight: '600' },
  bookmarkBtn: { padding: 6 },
});
