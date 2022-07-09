import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Info } from './info';

export default {
  component: Info,
  title: 'Components/Info',
} as ComponentMeta<typeof Info>;

const Template: ComponentStory<typeof Info> = (args) => <Info {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'limit',
  text: '450',
};
