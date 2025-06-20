
import { useState, useEffect } from 'react';
import { Theme } from '@/types/habit';

const themes = {
  ocean: {
    name: 'Ocean Breeze',
    description: 'Calm and refreshing blue tones',
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
    secondary: 'bg-gradient-to-r from-cyan-400 to-blue-400',
    accent: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    background: 'bg-gradient-to-br from-blue-50/50 via-background to-cyan-50/30',
    cssVars: {
      '--primary': '221.2 83.2% 53.3%',
      '--primary-foreground': '210 40% 98%',
      '--secondary': '210 40% 96.1%',
      '--accent': '210 40% 96.1%'
    }
  },
  sunset: {
    name: 'Sunset Glow',
    description: 'Warm orange and pink gradients',
    primary: 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600',
    secondary: 'bg-gradient-to-r from-pink-400 to-orange-400',
    accent: 'bg-gradient-to-r from-orange-600 to-pink-600',
    background: 'bg-gradient-to-br from-orange-50/50 via-background to-pink-50/30',
    cssVars: {
      '--primary': '24.6 95% 53.1%',
      '--primary-foreground': '210 40% 98%',
      '--secondary': '210 40% 96.1%',
      '--accent': '210 40% 96.1%'
    }
  },
  forest: {
    name: 'Forest Green',
    description: 'Natural green and earth tones',
    primary: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
    secondary: 'bg-gradient-to-r from-emerald-400 to-green-400',
    accent: 'bg-gradient-to-r from-green-600 to-emerald-600',
    background: 'bg-gradient-to-br from-green-50/50 via-background to-emerald-50/30',
    cssVars: {
      '--primary': '142.1 76.2% 36.3%',
      '--primary-foreground': '210 40% 98%',
      '--secondary': '210 40% 96.1%',
      '--accent': '210 40% 96.1%'
    }
  },
  purple: {
    name: 'Purple Dream',
    description: 'Rich purple and violet shades',
    primary: 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600',
    secondary: 'bg-gradient-to-r from-violet-400 to-purple-400',
    accent: 'bg-gradient-to-r from-purple-600 to-violet-600',
    background: 'bg-gradient-to-br from-purple-50/50 via-background to-violet-50/30',
    cssVars: {
      '--primary': '258.3 89.5% 58.4%',
      '--primary-foreground': '210 40% 98%',
      '--secondary': '210 40% 96.1%',
      '--accent': '210 40% 96.1%'
    }
  },
  modern: {
    name: 'Modern Dark',
    description: 'Sleek dark theme with blue accents',
    primary: 'bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-800 hover:to-blue-700',
    secondary: 'bg-gradient-to-r from-blue-500 to-slate-500',
    accent: 'bg-gradient-to-r from-slate-800 to-blue-700',
    background: 'bg-gradient-to-br from-slate-100/50 via-background to-blue-50/30',
    cssVars: {
      '--primary': '215.4 16.3% 46.9%',
      '--primary-foreground': '210 40% 98%',
      '--secondary': '210 40% 96.1%',
      '--accent': '210 40% 96.1%'
    }
  }
};

export const useTheme = () => {
  const [currentThemeKey, setCurrentThemeKey] = useState('ocean');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const applyThemeCSSVars = (theme: any) => {
    const root = document.documentElement;
    Object.entries(theme.cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value as string);
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('habit_tracker_theme');
    const savedDarkMode = localStorage.getItem('habit_tracker_dark_mode');
    
    if (savedTheme) {
      setCurrentThemeKey(savedTheme);
      applyThemeCSSVars(themes[savedTheme as keyof typeof themes]);
    }
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
  }, []);

  const setTheme = (themeKey: string) => {
    setCurrentThemeKey(themeKey);
    localStorage.setItem('habit_tracker_theme', themeKey);
    applyThemeCSSVars(themes[themeKey as keyof typeof themes]);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('habit_tracker_dark_mode', JSON.stringify(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return {
    themes,
    currentTheme: themes[currentThemeKey as keyof typeof themes],
    setTheme,
    isDarkMode,
    toggleDarkMode
  };
};
