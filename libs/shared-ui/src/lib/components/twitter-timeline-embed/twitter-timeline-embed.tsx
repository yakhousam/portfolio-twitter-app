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
      options={{ width: 300, height: 500 }}
      sourceType="profile"
      userId={userId}
      theme={theme}
    />
  );
}

export default TwitterTimelineEmbed;
