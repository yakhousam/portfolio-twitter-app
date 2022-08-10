import React, { createContext, useContext, useState } from 'react';

export type Theme = 'dark' | 'light';

const ThemContext = createContext<
  { theme: Theme; toggleTheme: () => void } | undefined
>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => (document.body.dataset['theme'] as Theme) || 'light'
  );

  const toggleTheme = () => {
    const t = theme ? (theme === 'dark' ? 'light' : 'dark') : 'light';
    console.log('toggle theme to', t);
    document.body.dataset['theme'] = t;
    setTheme(t);
  };
  console.log('useTheme theme =', theme);
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
