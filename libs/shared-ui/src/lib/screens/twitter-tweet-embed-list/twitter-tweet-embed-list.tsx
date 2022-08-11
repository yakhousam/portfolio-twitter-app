import TwitterTweetEmbed from '../../components/twitter-tweet-embed/twitter-tweet-embed';
import { useAppData } from '../../context/use-app-data/use-app-data';
import { useTheme } from '../../context/use-theme/use-theme';
import styles from './twitter-tweet-embed-list.module.css';

export function TwitterTweetEmbedList() {
  const {
    state: { mostEngagedTweetsIds },
  } = useAppData();

  const { theme } = useTheme();

  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>most engaged tweets</h2>
      <div className={styles['tweets-container']}>
        {mostEngagedTweetsIds.map((id) => (
          <TwitterTweetEmbed key={id} tweetId={id} theme={theme} />
        ))}
      </div>
    </section>
  );
}

export default TwitterTweetEmbedList;
