import React from 'react';
import { Tabs, router, usePathname } from 'expo-router';
import { BottomNav, BottomTab } from '../../components/BottomNav';

export default function TabsLayout() {
  const pathname = usePathname();

  const active: BottomTab = pathname.includes('communities')
    ? 'communities'
    : pathname.includes('notifications')
    ? 'notifications'
    : pathname.includes('profile')
    ? 'profile'
    : 'home';

  const onNavigate = (tab: BottomTab) => {
    if (tab === 'home') router.replace('/(tabs)/home');
    else if (tab === 'communities') router.replace('/(tabs)/communities');
    else if (tab === 'create') router.push('/post/create');
    else if (tab === 'notifications') router.replace('/(tabs)/notifications');
    else if (tab === 'profile') router.replace('/(tabs)/profile');
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => (
        <BottomNav active={active} onNavigate={onNavigate} notificationDot />
      )}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="communities" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
