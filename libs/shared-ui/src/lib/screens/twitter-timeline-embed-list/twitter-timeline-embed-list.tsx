import TwitterTimelineEmbed from '../../components/twitter-timeline-embed/twitter-timeline-embed';
import styles from './twitter-timeline-embed-list.module.css';

/* eslint-disable-next-line */
export interface TwitterTimelineEmbedListProps {
  title: string;
  usersIds: Array<string>;
}

export function TwitterTimelineEmbedList({
  title,
  usersIds,
}: TwitterTimelineEmbedListProps) {
  return (
    <section className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      <div className={styles['tweets-container']}>
        {usersIds.map((id) => (
          <TwitterTimelineEmbed key={id} userId={id} />
        ))}
      </div>
    </section>
  );
}

export default TwitterTimelineEmbedList;
