// import styles from './twitter-embed.module.css';
import { TwitterTweetEmbed as ReactTwitterTweetEmbed } from 'react-twitter-embed';
import { useTheme } from '../../context/use-theme/use-theme';

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
