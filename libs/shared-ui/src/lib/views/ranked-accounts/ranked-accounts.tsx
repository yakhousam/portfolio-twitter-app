import TwitterEmbed from '../../components/twitter-embed/twitter-embed';
import styles from './ranked-accounts.module.css';

export interface RankedAccountsProps {
  tweetsIds: Array<string>;
}

export function RankedAccounts({ tweetsIds }: RankedAccountsProps) {
  if (tweetsIds.length === 0) {
    return null;
  }
  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>top accounts</h2>
      <div className={styles['tweets-container']}>
        {tweetsIds.map((id) => (
          <div className={styles['tweet-wrapper']}>
            <TwitterEmbed tweetId={id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankedAccounts;
