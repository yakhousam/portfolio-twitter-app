import styles from './twitter-tweet-embed-list.module.css';
import { useAppState } from '@yak-twitter-app/context/use-app-data';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useTheme } from '@yak-twitter-app/context/use-theme';

export function TwitterTweetEmbedList() {
  const { mostEngagedTweets } = useAppState();
  const { theme } = useTheme();

  console.log({ mostEngagedTweets });
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>most engaged tweets</h2>
      <div className={styles['tweets-container']}>
        {mostEngagedTweets.map(({ id }) => (
          <TwitterTweetEmbed key={id} tweetId={id} options={{ theme: theme }} />
        ))}
      </div>
    </section>
  );
}

export default TwitterTweetEmbedList;
