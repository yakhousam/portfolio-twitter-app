import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

export function useTheme(
  themeProp?: Theme
): [Theme, React.Dispatch<React.SetStateAction<Theme>>] {
  const [theme, setTheme] = useState<Theme>(() => {
    if (themeProp) {
      document.body.dataset['theme'] = themeProp;
      return themeProp;
    }
    const theme = document.body.dataset['theme'] as Theme;
    if (theme) {
      return theme;
    }
    document.body.dataset['theme'] = 'light';
    return 'light';
  });
  useEffect(() => {
    if (theme !== undefined) {
      document.body.dataset['theme'] = theme;
      toogleTwitterEmbedTheme(theme);
    }
  }, [theme]);
  return [theme, setTheme];
}

function toogleTwitterEmbedTheme(theme: Theme) {
  const tweets = document.querySelectorAll('[data-tweet-id]');
  const oldTheme = theme === 'dark' ? 'light' : 'dark';

  tweets.forEach(function (tweet) {
    const src = tweet.getAttribute('src');
    if (src) {
      tweet.setAttribute(
        'src',
        src.replace('theme=' + oldTheme, 'theme=' + theme)
      );
    }
  });
}
