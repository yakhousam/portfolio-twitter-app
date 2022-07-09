import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LineChart } from './line-chart';
import { chartDefaultData, chartDefaultOptions } from './data';
import { useTheme } from '@yak-twitter-app/shared-lib';

export default {
  component: LineChart,
  title: 'components/LineChart',
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = (args) => (
  <LineChart {...args} />
);

export const Light = Template.bind({});
Light.decorators = [
  (Story) => {
    const [theme] = useTheme('light');
    console.log('stroy theme =', theme);
    return <Story />;
  },
];
Light.args = {
  data: chartDefaultData,
  options: chartDefaultOptions,
  scales: { min: 0, max: 10 },
};

export const Dark = Template.bind({});
Dark.decorators = [
  (Story) => {
    const [theme] = useTheme('dark');
    console.log('story theme =', theme);
    return <Story />;
  },
];
Dark.args = {
  data: chartDefaultData,
  options: chartDefaultOptions,
  scales: { min: 0, max: 10 },
};
