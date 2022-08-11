import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar } from './avatar';

export default {
  component: Avatar,
  title: 'components/Avatar',
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const UserAvatar = Template.bind({});
UserAvatar.args = {
  src: 'https://i.pravatar.cc/150',
};

export const Empty = Template.bind({});
