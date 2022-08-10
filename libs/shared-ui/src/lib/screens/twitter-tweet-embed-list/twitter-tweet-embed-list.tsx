import TwitterTweetEmbed from '../../components/twitter-tweet-embed/twitter-tweet-embed';
import { useAppData } from '../../context/use-app-data/use-app-data';
import styles from './twitter-tweet-embed-list.module.css';

export function TwitterTweetEmbedList() {
  const {
    state: { mostEngagedTweetsIds, status },
  } = useAppData();
  if (status !== 'resolved') {
    return null;
  }
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>most engaged tweets</h2>
      <div className={styles['tweets-container']}>
        {mostEngagedTweetsIds.map((id) => (
          <TwitterTweetEmbed key={id} tweetId={id} />
        ))}
      </div>
    </section>
  );
}

export default TwitterTweetEmbedList;
