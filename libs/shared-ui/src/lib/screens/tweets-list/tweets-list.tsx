import { TwitterEmbed } from '@yak-twitter-app/shared-ui';
import { TweetV2 } from 'twitter-api-v2';
import styles from './tweets-list.module.css';

export interface TweetsListProps {
  title: string;
  tweets: TweetV2[];
}

export function TweetsList({ title, tweets }: TweetsListProps) {
  if (tweets.length === 0) {
    return null;
  }
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      <div className={styles['tweets-container']}>
        {tweets.map(({ id }) => (
          <TwitterEmbed key={id} tweetId={id} />
        ))}
      </div>
    </section>
  );
}

export default TweetsList;
