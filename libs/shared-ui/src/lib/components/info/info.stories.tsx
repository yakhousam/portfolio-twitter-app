import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { Info } from './info';

export default {
  component: Info,
  title: 'Components/Info',
} as ComponentMeta<typeof Info>;

const Template: ComponentStory<typeof Info> = (args) => <Info {...args} />;

export const Light = Template.bind({});
Light.args = {
  title: 'limit',
  info: 100,
};
Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];

export const Dark = Template.bind({});
Dark.args = {
  title: 'limit',
  info: 450,
};
Dark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
