import { TwitterTweetEmbed } from '@yak-twitter-app/shared-ui';
import { TweetV2 } from 'twitter-api-v2';
import styles from './twitter-tweet-embed-list.module.css';

export interface TwitterTweetEmbedListProps {
  title: string;
  tweets: TweetV2[];
}

export function TwitterTweetEmbedList({
  title,
  tweets,
}: TwitterTweetEmbedListProps) {
  if (tweets.length === 0) {
    return null;
  }
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      <div className={styles['tweets-container']}>
        {tweets.map(({ id }) => (
          <TwitterTweetEmbed key={id} tweetId={id} />
        ))}
      </div>
    </section>
  );
}

export default TwitterTweetEmbedList;
