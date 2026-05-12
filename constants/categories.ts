// The 13 categories of MedCircle posts, matching the original Bolt design.
// Each category has a color, soft bg, text color, and an icon name (Lucide).

export type CategoryKey =
  | 'job_opportunities'
  | 'trips'
  | 'college_events'
  | 'study_partner'
  | 'life_partner'
  | 'parties'
  | 'sports_events'
  | 'movies'
  | 'entrepreneur'
  | 'exam_information'
  | 'counselling_discussion'
  | 'college_enquiry'
  | 'credit_cards_loans';

export interface Category {
  key: CategoryKey;
  label: string;
  iconName: string; // Lucide icon name
  color: string;       // strong color (icons, borders)
  bg: string;          // soft tinted background
  textColor: string;   // strong text on soft bg
}

export const CATEGORIES: Category[] = [
  {
    key: 'job_opportunities',
    label: 'Jobs',
    iconName: 'Briefcase',
    color: '#0EA5E9',
    bg: '#E0F2FE',
    textColor: '#0369A1',
  },
  {
    key: 'trips',
    label: 'Trips',
    iconName: 'Plane',
    color: '#10B981',
    bg: '#D1FAE5',
    textColor: '#047857',
  },
  {
    key: 'college_events',
    label: 'College Events',
    iconName: 'Calendar',
    color: '#F59E0B',
    bg: '#FEF3C7',
    textColor: '#B45309',
  },
  {
    key: 'study_partner',
    label: 'Study Partner',
    iconName: 'Users',
    color: '#8B5CF6',
    bg: '#EDE9FE',
    textColor: '#6D28D9',
  },
  {
    key: 'life_partner',
    label: 'Life Partner',
    iconName: 'Heart',
    color: '#EC4899',
    bg: '#FCE7F3',
    textColor: '#BE185D',
  },
  {
    key: 'parties',
    label: 'Parties',
    iconName: 'PartyPopper',
    color: '#EF4444',
    bg: '#FEE2E2',
    textColor: '#B91C1C',
  },
  {
    key: 'sports_events',
    label: 'Sports',
    iconName: 'Trophy',
    color: '#F97316',
    bg: '#FFEDD5',
    textColor: '#C2410C',
  },
  {
    key: 'movies',
    label: 'Movies',
    iconName: 'Film',
    color: '#6366F1',
    bg: '#E0E7FF',
    textColor: '#4338CA',
  },
  {
    key: 'entrepreneur',
    label: 'Entrepreneur',
    iconName: 'Lightbulb',
    color: '#14B8A6',
    bg: '#CCFBF1',
    textColor: '#0F766E',
  },
  {
    key: 'exam_information',
    label: 'Exam Info',
    iconName: 'BookOpen',
    color: '#3B82F6',
    bg: '#DBEAFE',
    textColor: '#1D4ED8',
  },
  {
    key: 'counselling_discussion',
    label: 'Counselling',
    iconName: 'MessageSquare',
    color: '#06B6D4',
    bg: '#CFFAFE',
    textColor: '#0E7490',
  },
  {
    key: 'college_enquiry',
    label: 'College Enquiry',
    iconName: 'School',
    color: '#84CC16',
    bg: '#ECFCCB',
    textColor: '#4D7C0F',
  },
  {
    key: 'credit_cards_loans',
    label: 'Finance',
    iconName: 'CreditCard',
    color: '#64748B',
    bg: '#F1F5F9',
    textColor: '#334155',
  },
];

export const CATEGORY_MAP: Record<CategoryKey, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c]),
) as Record<CategoryKey, Category>;

export function getCategoryByKey(key: string): Category | undefined {
  return CATEGORY_MAP[key as CategoryKey];
}

// Location scopes for a post
export type LocationScope = 'my_college' | 'my_city' | 'my_state' | 'all_india';

export const LOCATION_LABELS: Record<LocationScope, string> = {
  my_college: 'My College',
  my_city: 'My City',
  my_state: 'My State',
  all_india: 'All India',
};
