import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

export function useTheme(
  themeProp?: Theme
): [Theme, React.Dispatch<React.SetStateAction<Theme>>] {
  const [theme, setTheme] = useState<Theme>(() => {
    if (themeProp) {
      document.body.dataset.theme = themeProp;
      return themeProp;
    }
    const theme = document.body.dataset.theme as Theme;
    if (theme) {
      return theme;
    }
    document.body.dataset.theme = 'light';
    return 'light';
  });
  useEffect(() => {
    if (theme !== undefined) {
      document.body.dataset.theme = theme;
    }
  }, [theme]);
  return [theme, setTheme];
}
