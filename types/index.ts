import { CategoryKey, LocationScope } from '../constants/categories';

export type BatchYear =
  | '1st_year'
  | '2nd_year'
  | '3rd_year'
  | '4th_year'
  | 'final_year'
  | 'intern'
  | 'graduated';

export const BATCH_LABELS: Record<BatchYear, string> = {
  '1st_year': '1st Year',
  '2nd_year': '2nd Year',
  '3rd_year': '3rd Year',
  '4th_year': '4th Year',
  'final_year': 'Final Year',
  intern: 'Intern',
  graduated: 'Graduated',
};

export type MemberRole = 'owner' | 'admin' | 'member';
export type MembershipStatus = 'pending' | 'approved' | 'rejected';
export type AccountStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  collegeName?: string;
  collegeCity?: string;
  batchYear?: BatchYear;
  bio?: string;
  status: AccountStatus;
}

export interface Author {
  id: string;
  fullName: string;
  avatarUrl?: string;
  collegeName?: string;
  batchYear?: BatchYear;
}

export interface Post {
  id: string;
  authorId: string;
  author: Author;
  communityId?: string;
  communityName?: string;
  category: CategoryKey;
  title: string;
  content: string;
  mediaUrls: string[];
  locationScope: LocationScope;
  isBoosted: boolean;
  likeCount: number;
  commentCount: number;
  userLiked: boolean;
  userSaved: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: Author;
  content: string;
  likeCount: number;
  userLiked: boolean;
  createdAt: string;
}

export interface Community {
  id: string;
  name: string;
  collegeName: string;
  collegeCity: string;
  batchYear?: BatchYear;
  memberCount: number;
  ownerName: string;
  // Only present for "my communities":
  myRole?: MemberRole;
  myStatus?: MembershipStatus;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'join_request' | 'approval';
  actor: Author;
  message: string;
  read: boolean;
  createdAt: string;
  postId?: string;
}

export interface ChatPreview {
  id: string;
  other: Author;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
