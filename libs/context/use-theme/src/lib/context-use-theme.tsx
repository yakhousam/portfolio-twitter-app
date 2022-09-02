import { Theme } from '@yak-twitter-app/types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export const ThemeContext = createContext<
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
    } else if (osTheme) {
      theme = 'dark';
      localStorage.setItem('theme', theme);
    } else {
      theme = 'light';
      localStorage.setItem('theme', theme);
    }
    root.className = theme;
    return theme;
  });

  useEffect(() => {
    const listener = function (e: MediaQueryListEvent) {
      const theme = e.matches ? 'dark' : 'light';
      const root = document.querySelector(':root') as HTMLHtmlElement;
      root.className = theme;
      setTheme(theme);
      changeTweetsTheme(theme);
    };
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', listener);
    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', listener);
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.querySelector(':root') as HTMLHtmlElement;
    setTheme((prev) => {
      const currTheme: Theme = prev === 'dark' ? 'light' : 'dark';
      root.className = currTheme;
      localStorage.setItem('theme', currTheme);
      changeTweetsTheme(currTheme);
      return currTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function changeTweetsTheme(newTheme: Theme) {
  const oldTheme = newTheme === 'dark' ? 'light' : 'dark';
  const tweets = document.querySelectorAll(
    '[data-tweet-id]'
  ) as unknown as Array<HTMLIFrameElement>;

  tweets.forEach(function (tweet) {
    const src = tweet.getAttribute('src');
    src &&
      tweet.setAttribute(
        'src',
        src.replace('theme=' + oldTheme, 'theme=' + newTheme)
      );
  });
}
