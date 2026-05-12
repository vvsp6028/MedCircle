import { Platform } from 'react-native';

// Soft shadow ladder matching the Bolt design aesthetic.
// On web, we use elevation differently because RN's shadow does not translate perfectly.
// On Android, we use 'elevation'.
// On iOS, we use shadow* properties.

export const shadows = {
  elevation0: {},

  elevation1: Platform.select({
    ios: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
    },
    android: { elevation: 1 },
    web: {
      // @ts-ignore - boxShadow is supported in react-native-web
      boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
    },
    default: {},
  }) as object,

  elevation2: Platform.select({
    ios: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    android: { elevation: 3 },
    web: {
      // @ts-ignore
      boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
    },
    default: {},
  }) as object,

  elevation3: Platform.select({
    ios: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
    },
    android: { elevation: 6 },
    web: {
      // @ts-ignore
      boxShadow: '0 4px 16px rgba(15,23,42,0.08)',
    },
    default: {},
  }) as object,

  // Bigger lift for the central + button on the bottom nav
  buttonFloat: Platform.select({
    ios: {
      shadowColor: '#4F46E5',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
    },
    android: { elevation: 12 },
    web: {
      // @ts-ignore
      boxShadow: '0 8px 16px rgba(79,70,229,0.3)',
    },
    default: {},
  }) as object,
};
