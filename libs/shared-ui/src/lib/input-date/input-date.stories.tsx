import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { InputDate } from './input-date';

export default {
  component: InputDate,
  title: 'InputDate',
} as ComponentMeta<typeof InputDate>;

const Template: ComponentStory<typeof InputDate> = (args) => (
  <InputDate {...args} />
);

export const Light = Template.bind({});
Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];
Light.args = {
  label: 'start date',
};

export const Dark = Template.bind({});
Dark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];
Dark.args = {
  label: 'start date',
};
