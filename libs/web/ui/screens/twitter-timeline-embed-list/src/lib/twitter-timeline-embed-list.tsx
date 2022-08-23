import styles from './twitter-timeline-embed-list.module.css';
import { TwitterTimelineEmbed } from '@yak-twitter-app/web/ui/components/twitter-timeline-embed';
import { useAppState } from '@yak-twitter-app/context/use-app-data';

export function TwitterTimelineEmbedList() {
  const { rankedAccounts } = useAppState();

  console.log({ rankedAccounts });
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>most followed accounts</h2>
      <div className={styles['tweets-container']}>
        {rankedAccounts.map(({ id, username }) => (
          <TwitterTimelineEmbed key={id} username={username} />
        ))}
      </div>
    </section>
  );
}

export default TwitterTimelineEmbedList;
