import { useTheme } from '@yak-twitter-app/context/use-theme';
import { useCallback } from 'react';
import { WebUiComponentsTweetSkeleton as TweetSkeleton } from '@yak-twitter-app/web/ui/components/tweet-skeleton';

export interface TwitterTimelineEmbedProps {
  username: string;
  height?: number;
}

export function TwitterTimelineEmbed({
  username,
  height = 600,
}: TwitterTimelineEmbedProps) {
  const { theme } = useTheme();
  const callbackRef = useCallback((node: HTMLDivElement) => {
    window.twttr.widgets.load(node);
  }, []);
  // the anchor element returned will be replaced by iframe created by twittr widget script
  return (
    <div data-testid={username} ref={callbackRef} key={theme}>
      <a
        className="twitter-timeline"
        data-height={String(height)}
        data-theme={theme}
        href={`https://twitter.com/${username}`}
      >
        <TweetSkeleton />
      </a>
    </div>
  );
}

export default TwitterTimelineEmbed;
