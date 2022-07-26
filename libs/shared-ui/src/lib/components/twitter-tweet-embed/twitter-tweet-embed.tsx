// import styles from './twitter-embed.module.css';
import { TwitterTweetEmbed as ReactTwitterTweetEmbed } from 'react-twitter-embed';
import { useTheme } from '@yak-twitter-app/shared-lib';

export interface TwitterEmbedProps {
  tweetId: string;
}

export function TwitterTweetEmbed({ tweetId }: TwitterEmbedProps) {
  const [theme] = useTheme();
  return (
    <ReactTwitterTweetEmbed
      options={{ theme: theme, width: 400 }}
      tweetId={tweetId}
    />
    // <div style={{ height: 100, background: 'red' }}></div>
  );
}

export default TwitterTweetEmbed;
