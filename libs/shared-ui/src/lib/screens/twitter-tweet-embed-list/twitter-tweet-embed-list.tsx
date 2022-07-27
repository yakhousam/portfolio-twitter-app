import TwitterTweetEmbed from '../../components/twitter-tweet-embed/twitter-tweet-embed';
import styles from './twitter-tweet-embed-list.module.css';

export interface TwitterTweetEmbedListProps {
  title: string;
  tweetsIds: Array<string>;
}

export function TwitterTweetEmbedList({
  title,
  tweetsIds,
}: TwitterTweetEmbedListProps) {
  if (tweetsIds.length === 0) {
    return null;
  }
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      <div className={styles['tweets-container']}>
        {tweetsIds.map((id) => (
          <TwitterTweetEmbed key={id} tweetId={id} />
        ))}
      </div>
    </section>
  );
}

export default TwitterTweetEmbedList;
