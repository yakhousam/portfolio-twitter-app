import styles from './twitter-tweet-embed-list.module.css';
import { useAppState } from '@yak-twitter-app/context/use-app-data';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useTheme } from '@yak-twitter-app/context/use-theme';

export function TwitterTweetEmbedList() {
  const { mostEngagedTweetsIds } = useAppState();
  const { theme } = useTheme();

  console.log({ mostEngagedTweetsIds });
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>most engaged tweets</h2>
      <div className={styles['tweets-container']}>
        {mostEngagedTweetsIds.map((id) => (
          <TwitterTweetEmbed key={id} tweetId={id} options={{ theme: theme }} />
        ))}
      </div>
    </section>
  );
}

export default TwitterTweetEmbedList;
