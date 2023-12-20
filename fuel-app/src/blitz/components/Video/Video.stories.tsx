import { ComponentStory, ComponentMeta } from '@storybook/react'
import Video from './Video'
const BRIGHTCOVE_ACCOUNT_ID = process.env.BRIGHTCOVE_ACCOUNT_ID
const BRIGHTCOVE_PLAYER_ID = process.env.BRIGHTCOVE_PLAYER_ID

export default {
  title: 'Components/Video',
  component: Video,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Video>

const Template: ComponentStory<typeof Video> = (args) => <Video {...args} />

export const VideoPlayer = Template.bind({})

VideoPlayer.args = {
  accountId: BRIGHTCOVE_ACCOUNT_ID,
  playerId: BRIGHTCOVE_PLAYER_ID,
  autoPlay: false,
  videoId: '6305884524112',
}
