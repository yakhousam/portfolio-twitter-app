import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { SearchBar } from './search-bar';

export default {
  component: SearchBar,
  title: 'views/SearchBar',
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => (
  <SearchBar {...args} />
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
