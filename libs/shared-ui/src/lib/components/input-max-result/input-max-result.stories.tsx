import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputMaxResult } from './input-max-result';

export default {
  component: InputMaxResult,
  title: 'Components/InputMaxResult',
} as ComponentMeta<typeof InputMaxResult>;

const Template: ComponentStory<typeof InputMaxResult> = (args) => (
  <InputMaxResult {...args} />
);

export const Default = Template.bind({});
