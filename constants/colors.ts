// MedCircle color tokens.
// Light is the default — based on the Bolt design (white surfaces, slate text, indigo primary).
// Dark mode is a softer version (not OLED-true-black; nicer for a lifestyle app).

export const lightColors = {
  // Brand
  primary: '#4F46E5',         // indigo-600
  primaryDark: '#4338CA',     // indigo-700
  primarySoft: '#EEF2FF',     // indigo-50
  primaryText: '#3730A3',     // indigo-800

  accent: '#14B8A6',          // teal-500
  accentSoft: '#F0FDFA',      // teal-50

  // Surfaces
  background: '#F8FAFC',      // slate-50
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5F9',    // slate-100
  surfaceElevated: '#FFFFFF',

  // Text
  textPrimary: '#0F172A',     // slate-900
  textSecondary: '#475569',   // slate-600
  textTertiary: '#94A3B8',    // slate-400
  textOnPrimary: '#FFFFFF',

  // Borders & dividers
  border: '#E2E8F0',          // slate-200
  borderSoft: '#F1F5F9',      // slate-100

  // Status
  success: '#10B981',
  successSoft: '#D1FAE5',
  warning: '#F59E0B',
  warningSoft: '#FEF3C7',
  error: '#EF4444',
  errorSoft: '#FEE2E2',
  info: '#3B82F6',
  infoSoft: '#DBEAFE',

  // Roles
  ownerColor: '#D97706',      // amber-600
  ownerSoft: '#FEF3C7',
  adminColor: '#2563EB',      // blue-600
  adminSoft: '#DBEAFE',
  memberColor: '#059669',     // emerald-600
  memberSoft: '#D1FAE5',
  pendingColor: '#D97706',
  pendingSoft: '#FEF3C7',
};

export const darkColors = {
  primary: '#818CF8',         // indigo-400 (lighter for dark bg)
  primaryDark: '#6366F1',     // indigo-500
  primarySoft: '#1E1B4B',     // indigo-950
  primaryText: '#A5B4FC',     // indigo-300

  accent: '#2DD4BF',          // teal-400
  accentSoft: '#0F2A26',

  background: '#0F172A',      // slate-900
  surface: '#1E293B',         // slate-800
  surfaceMuted: '#334155',    // slate-700
  surfaceElevated: '#1E293B',

  textPrimary: '#F8FAFC',     // slate-50
  textSecondary: '#CBD5E1',   // slate-300
  textTertiary: '#94A3B8',    // slate-400
  textOnPrimary: '#FFFFFF',

  border: '#334155',          // slate-700
  borderSoft: '#1E293B',      // slate-800

  success: '#34D399',
  successSoft: '#064E3B',
  warning: '#FBBF24',
  warningSoft: '#451A03',
  error: '#F87171',
  errorSoft: '#450A0A',
  info: '#60A5FA',
  infoSoft: '#1E3A8A',

  ownerColor: '#FBBF24',
  ownerSoft: '#451A03',
  adminColor: '#60A5FA',
  adminSoft: '#1E3A8A',
  memberColor: '#34D399',
  memberSoft: '#064E3B',
  pendingColor: '#FBBF24',
  pendingSoft: '#451A03',
};

export type ColorScheme = typeof lightColors;
