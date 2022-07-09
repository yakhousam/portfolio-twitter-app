import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { InputSearch } from './input-search';

export default {
  component: InputSearch,
  title: 'Components/InputSearch',
} as ComponentMeta<typeof InputSearch>;

const Template: ComponentStory<typeof InputSearch> = (args) => (
  <InputSearch {...args} />
);

export const Light = Template.bind({});
Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const Dark = Template.bind({});
Dark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
