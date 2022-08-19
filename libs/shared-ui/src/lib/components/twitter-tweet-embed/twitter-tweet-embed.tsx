// import styles from './twitter-embed.module.css';
import { useTheme } from '@yak-twitter-app/context';
import { TwitterTweetEmbed as ReactTwitterTweetEmbed } from 'react-twitter-embed';

export interface TwitterEmbedProps {
  tweetId: string;
}

export function TwitterTweetEmbed({ tweetId }: TwitterEmbedProps) {
  const { theme } = useTheme();

  return (
    <ReactTwitterTweetEmbed options={{ theme: theme }} tweetId={tweetId} />
  );
}

export default TwitterTweetEmbed;
