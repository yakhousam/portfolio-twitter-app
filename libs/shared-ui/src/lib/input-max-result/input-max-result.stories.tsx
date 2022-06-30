import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { InputMaxResult } from './input-max-result';

export default {
  component: InputMaxResult,
  title: 'Components/InputMaxResult',
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

export const Dark = Template.bind({});
Dark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
