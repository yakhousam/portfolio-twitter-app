import TwitterTimelineEmbed from '../../components/twitter-timeline-embed/twitter-timeline-embed';
import { useAppData } from '../../context/use-app-data/use-app-data';
import { useTheme } from '../../context/use-theme/use-theme';
import styles from './twitter-timeline-embed-list.module.css';

export function TwitterTimelineEmbedList() {
  const {
    state: { mostFollowedAccountIds },
  } = useAppData();
  const { theme } = useTheme();

  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>most followed accounts</h2>
      <div className={styles['tweets-container']}>
        {mostFollowedAccountIds.map((id) => (
          <TwitterTimelineEmbed key={id} userId={id} theme={theme} />
        ))}
      </div>
    </section>
  );
}

export default TwitterTimelineEmbedList;
