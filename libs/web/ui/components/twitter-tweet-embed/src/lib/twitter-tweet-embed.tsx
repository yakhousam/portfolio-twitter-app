import { useTheme } from '@yak-twitter-app/context/use-theme';
import { WebUiComponentsTweetSkeleton as TweetSkeleton } from '@yak-twitter-app/web/ui/components/tweet-skeleton';
import { useCallback, useRef, useState } from 'react';

declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (e?: unknown) => void;
        createTweet: (...args: unknown[]) => Promise<unknown>;
      };
    };
  }
}

export interface TwitterTweetEmbedProps {
  tweetId: string;
}

export function TwitterTweetEmbed({ tweetId }: TwitterTweetEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const mounted = useRef(false);
  const callbackRef = useCallback(
    (node: HTMLDivElement) => {
      if (mounted.current) return;
      window.twttr.widgets
        .createTweet(tweetId, node, {
          theme,
        })
        .then(() => {
          mounted.current = true;
          setIsLoading(false);
        });
    },
    [theme, tweetId]
  );
  return (
    <div data-testid={tweetId} ref={callbackRef}>
      {isLoading && <TweetSkeleton />}
    </div>
  );
}

export default TwitterTweetEmbed;
