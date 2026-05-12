import { Alert, Platform, ToastAndroid } from 'react-native';
import { haptic } from './haptics';

/**
 * Cross-platform "Coming soon" toast.
 * - Android: native toast
 * - iOS: Alert.alert
 * - Web: alert()
 */
export function showComingSoon(feature: string = 'This feature') {
  haptic.selection();
  const message = `${feature} is coming soon!`;

  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === 'web') {
    // Use a soft inline approach on web — alert is ugly but works
    // eslint-disable-next-line no-alert
    if (typeof window !== 'undefined') window.alert(message);
  } else {
    Alert.alert('Coming Soon', message);
  }
}

export function showToast(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') window.alert(message);
  } else {
    Alert.alert('', message);
  }
}
