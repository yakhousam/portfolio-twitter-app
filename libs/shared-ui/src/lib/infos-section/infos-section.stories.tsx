import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useTheme } from '@yak-twitter-app/shared-lib';
import { InfoSection } from './infos-section';
import { InfoProps } from '../info/info';

const data: InfoProps[] = [
  { title: 'limit', text: '450' },
  { title: 'remaning', text: '200' },
  { title: 'reset', text: '00:02:00' },
];

export default {
  component: InfoSection,
  title: 'Composite components/InfoSection',
} as ComponentMeta<typeof InfoSection>;

const Template: ComponentStory<typeof InfoSection> = (args) => (
  <InfoSection {...args} />
);

export const Light = Template.bind({});
Light.decorators = [
  (Story) => {
    useTheme('light');
    return <Story />;
  },
];
Light.args = {
  title: 'rate limit',
  infos: data,
};

export const Dark = Template.bind({});
Dark.decorators = [
  (Story) => {
    useTheme('dark');
    return <Story />;
  },
];

Dark.args = {
  title: 'rate limit',
  infos: data,
};
