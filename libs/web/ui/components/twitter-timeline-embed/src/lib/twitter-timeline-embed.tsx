import { useTheme } from '@yak-twitter-app/context/use-theme';
import { useEffect } from 'react';
// import styles from './twitter-timeline-embed.module.css';

export interface TwitterTimelineEmbedProps {
  username: string;
  height?: number;
}

export function TwitterTimelineEmbed({
  username,
  height = 600,
}: TwitterTimelineEmbedProps) {
  const { theme } = useTheme();
  useEffect(() => {
    window.twttr.widgets.load();
  }, [theme]);
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      key={theme}
      className="twitter-timeline"
      data-height={String(height)}
      data-theme={theme}
      href={`https://twitter.com/${username}`}
    />
  );
}

export default TwitterTimelineEmbed;
