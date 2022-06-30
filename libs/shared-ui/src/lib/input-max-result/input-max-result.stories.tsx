import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { InputMaxResult } from './input-max-result';

export default {
  component: InputMaxResult,
  title: 'InputMaxResult',
} as ComponentMeta<typeof InputMaxResult>;

const Template: ComponentStory<typeof InputMaxResult> = (args) => (
  <InputMaxResult {...args} />
);

export const Light = Template.bind({});
Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];
