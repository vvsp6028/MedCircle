import {
  User,
  Post,
  Comment,
  Community,
  NotificationItem,
  ChatPreview,
  ChatMessage,
  Author,
} from '../types';

// The "logged in" user we render the app for
export const CURRENT_USER: User = {
  id: 'me',
  fullName: 'Venkata Prasad',
  email: 'venkata@example.com',
  collegeName: 'AIIMS Delhi',
  collegeCity: 'Delhi',
  batchYear: 'final_year',
  bio: 'Final year MBBS. Interested in cardiology & medical AI. ✨',
  status: 'approved',
};

// Other users in the demo world
const PRIYA: Author = {
  id: 'u_priya',
  fullName: 'Priya Sharma',
  collegeName: 'AIIMS Delhi',
  batchYear: '4th_year',
};

const RAHUL: Author = {
  id: 'u_rahul',
  fullName: 'Rahul Mehta',
  collegeName: 'JIPMER Puducherry',
  batchYear: '3rd_year',
};

const ANJALI: Author = {
  id: 'u_anjali',
  fullName: 'Anjali Reddy',
  collegeName: 'KIMS Hyderabad',
  batchYear: '2nd_year',
};

const ARJUN: Author = {
  id: 'u_arjun',
  fullName: 'Arjun Kapoor',
  collegeName: 'CMC Vellore',
  batchYear: 'intern',
};

const NEHA: Author = {
  id: 'u_neha',
  fullName: 'Neha Iyer',
  collegeName: 'AIIMS Delhi',
  batchYear: 'final_year',
};

export const SAMPLE_POSTS: Post[] = [
  {
    id: 'p1',
    authorId: PRIYA.id,
    author: PRIYA,
    communityId: 'c_aiims_delhi',
    communityName: 'AIIMS Delhi',
    category: 'study_partner',
    title: 'Looking for study partner — Pharmacology revision',
    content:
      'Hey everyone! Final exams are around the corner and I want to start a 2-hour daily Pharmacology revision group. Looking for 2-3 serious people who can commit till the exam. We can rotate Zoom hosting. DM if interested 🙋‍♀️',
    mediaUrls: [],
    locationScope: 'my_college',
    isBoosted: false,
    likeCount: 24,
    commentCount: 8,
    userLiked: false,
    userSaved: false,
    createdAt: '2 hours ago',
  },
  {
    id: 'p2',
    authorId: RAHUL.id,
    author: RAHUL,
    communityId: 'c_jipmer',
    communityName: 'JIPMER Puducherry',
    category: 'trips',
    title: 'Goa trip — March 15-18 — 4 spots left',
    content:
      "Planning a 4-day Goa trip during the semester break. Already 6 people confirmed. Budget ~₹8000/person all-inclusive (stay, travel, food). Beach stay at Anjuna. We've booked an Airbnb that can fit 10. Open to medics from any college. Drop a 🌴 in comments if interested.",
    mediaUrls: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=450&fit=crop',
    ],
    locationScope: 'all_india',
    isBoosted: true,
    likeCount: 142,
    commentCount: 38,
    userLiked: true,
    userSaved: true,
    createdAt: '5 hours ago',
  },
  {
    id: 'p3',
    authorId: ARJUN.id,
    author: ARJUN,
    communityId: 'c_cmc',
    communityName: 'CMC Vellore',
    category: 'job_opportunities',
    title: 'Internship opening at a health-tech startup',
    content:
      "My friend's startup is hiring medical interns for a clinical-validation role. Remote, 10-15 hrs/week, ₹15k stipend. Great if you want to explore digital health. Share resume in DMs.",
    mediaUrls: [],
    locationScope: 'all_india',
    isBoosted: false,
    likeCount: 87,
    commentCount: 21,
    userLiked: false,
    userSaved: true,
    createdAt: '1 day ago',
  },
  {
    id: 'p4',
    authorId: ANJALI.id,
    author: ANJALI,
    communityId: 'c_kims',
    communityName: 'KIMS Hyderabad',
    category: 'college_events',
    title: 'KIMS Annual Fest — performers wanted!',
    content:
      'Calling all singers, dancers, comedians! Our annual cultural fest is on Feb 22. Auditions next Saturday at 4pm in the auditorium. Cross-college entries allowed.',
    mediaUrls: [],
    locationScope: 'my_city',
    isBoosted: false,
    likeCount: 34,
    commentCount: 12,
    userLiked: false,
    userSaved: false,
    createdAt: '1 day ago',
  },
  {
    id: 'p5',
    authorId: NEHA.id,
    author: NEHA,
    communityId: 'c_aiims_delhi',
    communityName: 'AIIMS Delhi',
    category: 'exam_information',
    title: 'NEET PG 2026 — schedule announced 📢',
    content:
      "NMC released the tentative schedule today. Looks like Jan 2026 first attempt. Anyone has the official PDF? Sharing my prep tracker template in comments — it's been working really well for me.",
    mediaUrls: [],
    locationScope: 'all_india',
    isBoosted: false,
    likeCount: 211,
    commentCount: 64,
    userLiked: true,
    userSaved: false,
    createdAt: '2 days ago',
  },
  {
    id: 'p6',
    authorId: RAHUL.id,
    author: RAHUL,
    communityId: 'c_jipmer',
    communityName: 'JIPMER Puducherry',
    category: 'movies',
    title: 'Movie night at JIPMER auditorium — Friday',
    content: '"3 Idiots" screening this Friday at 7pm. Free entry. Pizzas after the show. Bring friends!',
    mediaUrls: [],
    locationScope: 'my_college',
    isBoosted: false,
    likeCount: 56,
    commentCount: 14,
    userLiked: false,
    userSaved: false,
    createdAt: '3 days ago',
  },
];

// Comments shown on post detail
export const SAMPLE_COMMENTS: Comment[] = [
  {
    id: 'cm1',
    postId: 'p1',
    author: RAHUL,
    content:
      'Count me in! I was looking for the same. Pharmacology is killing me 😅',
    likeCount: 4,
    userLiked: false,
    createdAt: '1 hour ago',
  },
  {
    id: 'cm2',
    postId: 'p1',
    author: NEHA,
    content:
      "Interested. I've made detailed notes for Antimicrobials and ANS — happy to share with the group.",
    likeCount: 7,
    userLiked: true,
    createdAt: '45 min ago',
  },
  {
    id: 'cm3',
    postId: 'p1',
    author: ARJUN,
    content: 'Drop a Telegram link?',
    likeCount: 2,
    userLiked: false,
    createdAt: '30 min ago',
  },
];

// Communities — JOINED
export const MY_COMMUNITIES: Community[] = [
  {
    id: 'c_aiims_delhi',
    name: 'AIIMS Delhi',
    collegeName: 'AIIMS Delhi',
    collegeCity: 'Delhi',
    memberCount: 2840,
    ownerName: 'Dr. R. Sharma',
    myRole: 'member',
    myStatus: 'approved',
  },
  {
    id: 'c_aiims_2026',
    name: 'AIIMS Delhi · Batch 2026',
    collegeName: 'AIIMS Delhi',
    collegeCity: 'Delhi',
    batchYear: 'final_year',
    memberCount: 142,
    ownerName: 'Priya Sharma',
    myRole: 'admin',
    myStatus: 'approved',
  },
  {
    id: 'c_neet_pg_2026',
    name: 'NEET PG 2026 Warriors',
    collegeName: 'All India',
    collegeCity: '—',
    memberCount: 4250,
    ownerName: 'Dr. Vikram',
    myRole: 'member',
    myStatus: 'approved',
  },
];

// Communities — DISCOVER
export const DISCOVER_COMMUNITIES: Community[] = [
  {
    id: 'c_jipmer',
    name: 'JIPMER Puducherry',
    collegeName: 'JIPMER Puducherry',
    collegeCity: 'Puducherry',
    memberCount: 1580,
    ownerName: 'Rahul Mehta',
  },
  {
    id: 'c_kims',
    name: 'KIMS Hyderabad',
    collegeName: 'KIMS Hyderabad',
    collegeCity: 'Hyderabad',
    memberCount: 920,
    ownerName: 'Anjali Reddy',
  },
  {
    id: 'c_cmc',
    name: 'CMC Vellore',
    collegeName: 'CMC Vellore',
    collegeCity: 'Vellore',
    memberCount: 1100,
    ownerName: 'Arjun Kapoor',
  },
  {
    id: 'c_mamc',
    name: 'MAMC New Delhi',
    collegeName: 'MAMC New Delhi',
    collegeCity: 'Delhi',
    memberCount: 1340,
    ownerName: 'Sanya Khanna',
  },
];

// Notifications
export const SAMPLE_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'like',
    actor: PRIYA,
    message: 'liked your post',
    read: false,
    createdAt: '5 min ago',
    postId: 'p1',
  },
  {
    id: 'n2',
    type: 'comment',
    actor: RAHUL,
    message: 'commented on your post',
    read: false,
    createdAt: '20 min ago',
    postId: 'p1',
  },
  {
    id: 'n3',
    type: 'follow',
    actor: ANJALI,
    message: 'started following you',
    read: false,
    createdAt: '2 hours ago',
  },
  {
    id: 'n4',
    type: 'approval',
    actor: { id: 'admin', fullName: 'AIIMS Delhi · Batch 2026' },
    message: 'approved your request to join',
    read: true,
    createdAt: '1 day ago',
  },
  {
    id: 'n5',
    type: 'like',
    actor: NEHA,
    message: 'and 23 others liked your post',
    read: true,
    createdAt: '2 days ago',
    postId: 'p2',
  },
];

// Chat list
export const SAMPLE_CHATS: ChatPreview[] = [
  {
    id: 'ch1',
    other: PRIYA,
    lastMessage: 'Yes! Let me know when you start the group',
    lastMessageAt: '12 min ago',
    unreadCount: 2,
  },
  {
    id: 'ch2',
    other: RAHUL,
    lastMessage: "Goa trip — I'll send the airbnb details tomorrow",
    lastMessageAt: '2 hours ago',
    unreadCount: 0,
  },
  {
    id: 'ch3',
    other: NEHA,
    lastMessage: "Sharing the tracker now 📊",
    lastMessageAt: 'yesterday',
    unreadCount: 0,
  },
];

// Sample messages in a chat thread
export const SAMPLE_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    chatId: 'ch1',
    senderId: PRIYA.id,
    content: 'Hey! Saw your post about the Pharm study group.',
    createdAt: '12:00',
  },
  {
    id: 'm2',
    chatId: 'ch1',
    senderId: CURRENT_USER.id,
    content: "Hi Priya! Glad you reached out. We're aiming for daily 7-9pm. Works for you?",
    createdAt: '12:02',
  },
  {
    id: 'm3',
    chatId: 'ch1',
    senderId: PRIYA.id,
    content: 'That works. I can start tomorrow.',
    createdAt: '12:03',
  },
  {
    id: 'm4',
    chatId: 'ch1',
    senderId: PRIYA.id,
    content: 'Yes! Let me know when you start the group',
    createdAt: '12:04',
  },
];

// Colleges for signup picker
export const COLLEGES = [
  'AIIMS Delhi',
  'AIIMS Jodhpur',
  'AIIMS Bhubaneswar',
  'AIIMS Raipur',
  'JIPMER Puducherry',
  'KIMS Hyderabad',
  'CMC Vellore',
  'MAMC New Delhi',
  'Lady Hardinge Medical College',
  'Maulana Azad Medical College',
  'Grant Medical College, Mumbai',
  'KEM Hospital, Mumbai',
  'Madras Medical College',
  'Stanley Medical College',
  'BJMC Pune',
  'Other',
];
