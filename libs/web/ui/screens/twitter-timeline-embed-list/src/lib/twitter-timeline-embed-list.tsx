import styles from './twitter-timeline-embed-list.module.css';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { useAppState } from '@yak-twitter-app/context/use-app-data';
import { useTheme } from '@yak-twitter-app/context/use-theme';

export function TwitterTimelineEmbedList() {
  const { mostFollowedAccountIds } = useAppState();
  const { theme } = useTheme();

  console.log({ mostFollowedAccountIds });
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>most followed accounts</h2>
      <div className={styles['tweets-container']}>
        {mostFollowedAccountIds.map((id) => (
          <div className={styles['tweet-wrapper']}>
            <TwitterTimelineEmbed
              key={`${id}-${theme}`}
              options={{ height: 600 }}
              sourceType="profile"
              userId={id}
              theme={theme}
              transparent={true}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TwitterTimelineEmbedList;
