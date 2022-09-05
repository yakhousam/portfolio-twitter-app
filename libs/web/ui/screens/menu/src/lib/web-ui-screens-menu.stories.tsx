import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WebUiScreensMenu as Menu } from './web-ui-screens-menu';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: Menu,
  title: 'components/Menu',
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Default = Template.bind({});

const user_avatar_url = 'https://i.pravatar.cc/150';

Default.decorators = [
  (Story) => {
    document.cookie = `user_avatar_url=${user_avatar_url}`;
    return (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Story />
      </div>
    );
  },
];

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(await canvas.findByAltText('')).toHaveAttribute(
    'src',
    user_avatar_url
  );
  await userEvent.click(
    canvas.getByRole('button', { name: /open user menu/i, pressed: false })
  );
  await expect(
    await canvas.findByRole('link', { name: /logout/i })
  ).toBeInTheDocument();
  await userEvent.click(
    canvas.getByRole('button', { name: /open user menu/i, pressed: true })
  );
};
