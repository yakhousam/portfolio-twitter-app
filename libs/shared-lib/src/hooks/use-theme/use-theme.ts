import { useEffect } from 'react';

type Theme = 'dark' | 'light';

export function useTheme(theme: Theme) {
  useEffect(() => {
    document.body.dataset['theme'] = theme;
  }, [theme]);
}
