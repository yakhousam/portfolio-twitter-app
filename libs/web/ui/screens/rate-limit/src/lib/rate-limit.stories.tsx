import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AppDispatchContext,
  AppStateContext,
} from '@yak-twitter-app/context/use-app-data';
import { getTimestamp } from '@yak-twitter-app/utility/date';
import { withReactContext } from 'storybook-react-context';

import { RateLimit } from './rate-limit';

export default {
  component: RateLimit,
  title: 'screens/RateLimit',
  decorators: [
    withReactContext({
      Context: AppStateContext,
      initialState: {
        rateLimit: {
          limit: 450,
          remaining: 420,
          reset: getTimestamp(15),
        },
      },
    }),
    withReactContext({
      Context: AppDispatchContext,
      initialState: () => console.log('dispatch rate limit'),
    }),
  ],
  argTypes: {
    dispatch: { action: 'onTimerEnd' },
  },
} as ComponentMeta<typeof RateLimit>;

const Template: ComponentStory<typeof RateLimit> = (args) => <RateLimit />;

export const Default = Template.bind({});

// Default.play = async () => {
//   expect(
//     screen.getByRole('heading', { level: 2, name: /rate/i })
//   ).toBeInTheDocument();
//   expect(screen.getByLabelText(/limit/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/remaining/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/reset/i)).toBeInTheDocument();
// };
