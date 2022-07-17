// import TwitterEmbed from '../../components/twitter-embed/twitter-embed';
import styles from './tweets-section.module.css';

export interface TweetsSectionProps {
  title: string;
  tweetsIds: Array<string>;
}

export function TweetsSection({ title, tweetsIds }: TweetsSectionProps) {
  if (tweetsIds.length === 0) {
    return null;
  }
  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      {/* <div className={styles['tweets-container']}>
        {tweetsIds.map((id) => (
          <TwitterEmbed tweetId={id} />
        ))}
      </div> */}
    </div>
  );
}

export default TweetsSection;
