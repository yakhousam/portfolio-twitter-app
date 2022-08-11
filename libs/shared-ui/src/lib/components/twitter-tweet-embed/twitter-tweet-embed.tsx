// import styles from './twitter-embed.module.css';
import { TwitterTweetEmbed as ReactTwitterTweetEmbed } from 'react-twitter-embed';

export interface TwitterEmbedProps {
  tweetId: string;
  theme: 'dark' | 'light';
}

export function TwitterTweetEmbed({ tweetId, theme }: TwitterEmbedProps) {
  return (
    <ReactTwitterTweetEmbed
      key={`${tweetId}-${theme}`}
      options={{ theme: theme }}
      tweetId={tweetId}
    />
  );
}

export default TwitterTweetEmbed;
