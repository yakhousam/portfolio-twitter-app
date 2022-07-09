// import styles from './twitter-embed.module.css';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useTheme } from '@yak-twitter-app/shared-lib';

export interface TwitterEmbedProps {
  tweetId: string;
}

export function TwitterEmbed({ tweetId }: TwitterEmbedProps) {
  const [theme] = useTheme();
  return (
    <TwitterTweetEmbed
      options={{ theme: theme, width: 300 }}
      tweetId={tweetId}
    />
  );
}

export default TwitterEmbed;
