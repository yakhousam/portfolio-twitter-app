import { withReactContext } from 'storybook-react-context';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TweetsStatistics } from './tweets-statistics';
import { AppStateContext } from '@yak-twitter-app/context/use-app-data';

export default {
  component: TweetsStatistics,
  title: 'screens/TweetsStatistics',
  decorators: [
    withReactContext({
      Context: AppStateContext,
      initialState: { original: 210, replay: 120, retweet: 250 },
    }),
  ],
  argTypes: {
    original: { control: { type: 'number', min: 210, max: 210 } },
    replay: { control: { type: 'number', min: 120, max: 120 } },
    retweet: { control: { type: 'number', min: 250, max: 250 } },
  },
  args: {
    original: 210,
    replay: 120,
    retweet: 250,
  },
} as ComponentMeta<typeof TweetsStatistics>;

const Template: ComponentStory<typeof TweetsStatistics> = (args) => (
  <TweetsStatistics />
);

export const Default = Template.bind({});

// Default.play = async({canvasElement})=>{
//    const canvas = within(canvasElement)

// }
