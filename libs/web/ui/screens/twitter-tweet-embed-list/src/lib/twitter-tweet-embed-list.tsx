import styles from './twitter-tweet-embed-list.module.css';
import { useAppState } from '@yak-twitter-app/context/use-app-data';
import { TwitterTweetEmbed } from '@yak-twitter-app/web/ui/components/twitter-tweet-embed';

export function TwitterTweetEmbedList() {
  const { mostEngagedTweets } = useAppState();

  console.log({ mostEngagedTweets });
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>most engaged tweets</h2>
      <div className={styles['tweets-container']}>
        {mostEngagedTweets.map(({ id }) => (
          <TwitterTweetEmbed key={id} tweetId={id} />
        ))}
      </div>
    </section>
  );
}

export default TwitterTweetEmbedList;
