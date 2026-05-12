import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Crown, Shield, Check, Clock } from 'lucide-react-native';
import { useTheme } from './ThemeProvider';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { Community, BATCH_LABELS } from '../types';

interface CommunityCardProps {
  community: Community;
  onPress?: () => void;
  onJoin?: () => void;
  joined?: boolean; // forces "Joined" appearance even if community has no myRole
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  community,
  onPress,
  onJoin,
  joined,
}) => {
  const { theme } = useTheme();

  const isJoined = joined || community.myStatus === 'approved';
  const isPending = community.myStatus === 'pending';

  // Role badge
  const role = community.myRole;
  const renderRoleBadge = () => {
    if (isPending) {
      return (
        <RoleBadge
          icon={<Clock size={10} color={theme.colors.pendingColor} />}
          label="Pending"
          bg={theme.colors.pendingSoft}
          color={theme.colors.pendingColor}
        />
      );
    }
    if (role === 'owner') {
      return (
        <RoleBadge
          icon={<Crown size={10} color={theme.colors.ownerColor} />}
          label="Owner"
          bg={theme.colors.ownerSoft}
          color={theme.colors.ownerColor}
        />
      );
    }
    if (role === 'admin') {
      return (
        <RoleBadge
          icon={<Shield size={10} color={theme.colors.adminColor} />}
          label="Admin"
          bg={theme.colors.adminSoft}
          color={theme.colors.adminColor}
        />
      );
    }
    if (role === 'member' || isJoined) {
      return (
        <RoleBadge
          icon={<Check size={10} color={theme.colors.memberColor} />}
          label="Member"
          bg={theme.colors.memberSoft}
          color={theme.colors.memberColor}
        />
      );
    }
    return null;
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
        pressed && { opacity: 0.96 },
      ]}
    >
      <View style={styles.row}>
        <Avatar name={community.name} size="md" />
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text
                numberOfLines={1}
                style={[styles.name, { color: theme.colors.textPrimary }]}
              >
                {community.name}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.sub, { color: theme.colors.textTertiary }]}
              >
                {[community.collegeName, community.collegeCity]
                  .filter((s) => s && s !== '—')
                  .join('  ·  ')}
              </Text>
            </View>
            {renderRoleBadge()}
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaLeft}>
              {community.batchYear && (
                <View
                  style={[
                    styles.batchTag,
                    { backgroundColor: theme.colors.primarySoft },
                  ]}
                >
                  <Text
                    style={[
                      styles.batchTagText,
                      { color: theme.colors.primaryText },
                    ]}
                  >
                    {BATCH_LABELS[community.batchYear]}
                  </Text>
                </View>
              )}
              <Text style={[styles.members, { color: theme.colors.textTertiary }]}>
                {community.memberCount.toLocaleString()} members
              </Text>
            </View>

            {onJoin && !isJoined && !isPending && (
              <Button size="sm" variant="primary" onPress={onJoin}>
                Join
              </Button>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

interface RoleBadgeProps {
  icon: React.ReactNode;
  label: string;
  bg: string;
  color: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ icon, label, bg, color }) => (
  <View style={[styles.roleBadge, { backgroundColor: bg }]}>
    {icon}
    <Text style={[styles.roleText, { color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  row: { flexDirection: 'row', gap: 12 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  name: { fontSize: 15, fontWeight: '700' },
  sub: { fontSize: 12, marginTop: 2 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 8,
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    flex: 1,
  },
  batchTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  batchTagText: { fontSize: 10, fontWeight: '700' },
  members: { fontSize: 11 },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  roleText: { fontSize: 10, fontWeight: '700' },
});
