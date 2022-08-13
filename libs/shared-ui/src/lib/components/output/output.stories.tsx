import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Output } from './output';

export default {
  component: Output,
  title: 'Components/Output',
} as ComponentMeta<typeof Output>;

const Template: ComponentStory<typeof Output> = (args) => <Output {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'title',
  value: 254,
};
