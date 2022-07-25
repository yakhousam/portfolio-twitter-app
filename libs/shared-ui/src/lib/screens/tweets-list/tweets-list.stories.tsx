import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TweetsList } from './tweets-list';

const tweetsIds = [
  '1545260483980234753',
  '1545260274726453248',
  '1545260256636424194',
  '1545259630015774722',
  '1545258875993133056',
  '1545258356834721793',
];

export default {
  component: TweetsList,
  title: 'screens/TweetsList',
} as ComponentMeta<typeof TweetsList>;

const Template: ComponentStory<typeof TweetsList> = (args) => (
  <TweetsList {...args} />
);

export const Light = Template.bind({});
// Light.args = {
//   tweetsIds,
//   title: 'random tweets',
// };
// Light.decorators = [
//   (Story) => {
//     useTheme('light');
//     return <Story />;
//   },
// ];

// export const Dark = Template.bind({});
// Dark.args = {
//   tweetsIds,
//   title: 'random tweets',
// };
// Dark.decorators = [
//   (Story) => {
//     useTheme('dark');
//     return <Story />;
//   },
// ];
