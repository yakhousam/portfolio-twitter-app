import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { RankedAccounts } from './ranked-accounts';

const tweetsIds = [
  '1545260483980234753',
  '1545260274726453248',
  '1545260256636424194',
  '1545259630015774722',
  '1545258875993133056',
  '1545258356834721793',
];

export default {
  component: RankedAccounts,
  title: 'Composite components/RankedAccounts',
} as ComponentMeta<typeof RankedAccounts>;

const Template: ComponentStory<typeof RankedAccounts> = (args) => (
  <RankedAccounts {...args} />
);

export const Light = Template.bind({});
Light.args = {
  tweetsIds,
};
Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const Dark = Template.bind({});
Dark.args = {
  tweetsIds,
};
Dark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
