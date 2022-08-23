import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TwitterTimelineEmbed } from './twitter-timeline-embed';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { sleep } from '@yak-twitter-app/utility/helpers';

export default {
  component: TwitterTimelineEmbed,
  title: 'TwitterTimelineEmbed',
} as ComponentMeta<typeof TwitterTimelineEmbed>;

const Template: ComponentStory<typeof TwitterTimelineEmbed> = (args) => (
  <TwitterTimelineEmbed {...args} />
);

export const Default = Template.bind({});
Default.args = {
  username: 'yksamir',
};
Default.decorators = [
  (Story) => (
    <div style={{ width: 400, margin: 'auto' }}>
      <Story />
    </div>
  ),
];
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const container = canvas.getByTestId(args.username);
  expect(container).toBeTruthy();
  await sleep(1000 * 2);
  expect(container.firstChild?.firstChild?.nodeName).toBe('IFRAME');
  console.log(container.firstChild);
  // const iframe =
};
