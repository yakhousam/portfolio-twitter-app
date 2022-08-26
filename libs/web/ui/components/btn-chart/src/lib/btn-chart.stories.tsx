import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BtnChart } from './btn-chart';

export default {
  component: BtnChart,
  title: 'components/BtnChart',
  argTypes: {
    handleClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof BtnChart>;

const Template: ComponentStory<typeof BtnChart> = (args) => (
  <BtnChart {...args} />
);

export const Default = Template.bind({});

Default.args = {
  caption: 'h1',
  active: false,
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/C8eVLaTuAtQvJjcHBNqY4D/twitter-hashtag-analytic?node-id=203%3A396',
  },
};

export const Active = Template.bind({});
Active.args = {
  ...Default.args,
  active: true,
};

Active.parameters = {
  ...Default.parameters,
};
