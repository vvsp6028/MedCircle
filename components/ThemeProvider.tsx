import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, Theme } from '../constants/theme';
import { ThemeMode } from '../types';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;          // user's selected mode ('system' | 'light' | 'dark')
  setMode: (m: ThemeMode) => void;
  toggleTheme: () => void;  // convenience: flip light <-> dark
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = '@medcircle/theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const [mode, setModeState] = useState<ThemeMode>('light'); // default: LIGHT

  // Load saved preference on first render
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
          setModeState(saved);
        }
      } catch {
        // ignore — fall back to default
      }
    })();
  }, []);

  const setMode = async (m: ThemeMode) => {
    setModeState(m);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, m);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    // If currently 'system', resolve to actual & flip
    const current =
      mode === 'system'
        ? systemScheme === 'dark'
          ? 'dark'
          : 'light'
        : mode;
    setMode(current === 'light' ? 'dark' : 'light');
  };

  const isDark =
    mode === 'system' ? systemScheme === 'dark' : mode === 'dark';
  const theme: Theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return ctx;
};
