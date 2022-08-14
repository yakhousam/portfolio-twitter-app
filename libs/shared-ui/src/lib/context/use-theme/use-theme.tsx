import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const ThemContext = createContext<
  { theme: Theme; toggleTheme: () => void } | undefined
>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    let theme: Theme;
    const root = document.querySelector(':root') as HTMLHtmlElement;
    const localStorageTheme = localStorage.getItem('theme');
    const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (localStorageTheme) {
      theme = localStorageTheme as Theme;
      root.className = theme;
    } else if (osTheme) {
      theme = 'dark';
    } else {
      theme = 'light';
    }
    return theme;
  });

  useEffect(() => {
    const listener = function (e: MediaQueryListEvent) {
      const theme = e.matches ? 'dark' : 'light';
      const root = document.querySelector(':root') as HTMLHtmlElement;
      root.className = theme;
      setTheme(theme);
    };
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', listener);
    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', listener);
  }, []);

  const toggleTheme = () => {
    const toggledTheme = theme === 'dark' ? 'light' : 'dark';
    const root = document.querySelector(':root') as HTMLHtmlElement;
    root.className = toggledTheme;
    setTheme(toggledTheme);
    localStorage.setItem('theme', toggledTheme);
  };
  return (
    <ThemContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
