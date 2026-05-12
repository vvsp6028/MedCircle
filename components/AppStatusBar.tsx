import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from './ThemeProvider';

export const AppStatusBar: React.FC = () => {
  const { theme } = useTheme();
  return <StatusBar style={theme.isDark ? 'light' : 'dark'} />;
};
