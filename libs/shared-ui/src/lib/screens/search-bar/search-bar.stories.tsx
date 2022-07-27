import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchBar } from './search-bar';

export default {
  component: SearchBar,
  title: 'screens/SearchBar',
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => (
  <SearchBar {...args} />
);

export const Default = Template.bind({});
