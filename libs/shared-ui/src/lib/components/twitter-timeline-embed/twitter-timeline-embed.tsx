import { useTheme } from '@yak-twitter-app/shared-lib';
import { TwitterTimelineEmbed as ReactTwitterTimelineEmbed } from 'react-twitter-embed';

export interface TwitterTimelineEmbedProps {
  userId: string;
}

export function TwitterTimelineEmbed({ userId }: TwitterTimelineEmbedProps) {
  const [theme] = useTheme();
  return (
    <ReactTwitterTimelineEmbed
      options={{ theme: theme, width: 400, height: 400 }}
      sourceType="profile"
      userId={userId}
    />
  );
}

export default TwitterTimelineEmbed;
