import { TwitterTimelineEmbed as ReactTwitterTimelineEmbed } from 'react-twitter-embed';

export interface TwitterTimelineEmbedProps {
  userId: string;
  theme: 'dark' | 'light';
}

export function TwitterTimelineEmbed({
  userId,
  theme,
}: TwitterTimelineEmbedProps) {
  return (
    <ReactTwitterTimelineEmbed
      key={`${userId}-${theme}`}
      options={{ height: 600 }}
      sourceType="profile"
      userId={userId}
      theme={theme}
    />
  );
}

export default TwitterTimelineEmbed;
