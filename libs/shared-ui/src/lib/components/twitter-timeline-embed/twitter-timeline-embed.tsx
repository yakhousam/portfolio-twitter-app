import styles from './twitter-timeline-embed.module.css';
import { TwitterTimelineEmbed as ReactTwitterTimelineEmbed } from 'react-twitter-embed';
import { useTheme } from '@yak-twitter-app/context';

export interface TwitterTimelineEmbedProps {
  userId: string;
}

export function TwitterTimelineEmbed({ userId }: TwitterTimelineEmbedProps) {
  const { theme } = useTheme();
  return (
    <div className={styles['container']}>
      <ReactTwitterTimelineEmbed
        key={`${userId}-${theme}`}
        options={{ height: 600 }}
        sourceType="profile"
        userId={userId}
        theme={theme}
        transparent={true}
      />
    </div>
  );
}

export default TwitterTimelineEmbed;
