import { useTheme } from '@yak-twitter-app/context/use-theme';
import { useCallback, useRef } from 'react';
// import styles from './web-ui-components-twitter-tweet-embed.module.css';

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
  onLoad?: () => void;
}

export function TwitterTweetEmbed({ tweetId, onLoad }: TwitterTweetEmbedProps) {
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
          onLoad?.();
        });
    },
    [theme, tweetId, onLoad]
  );
  return <div data-testid={tweetId} ref={callbackRef}></div>;
}

export default TwitterTweetEmbed;
