import { ComponentStory, ComponentMeta } from '@storybook/react'
import VideoCollection from './VideoCollection'

export default {
  title: 'Components/VideoCollection',
  component: VideoCollection,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof VideoCollection>

const Template: ComponentStory<typeof VideoCollection> = (args) => (
  <VideoCollection {...args} />
)

export const VideoCollectionStories = Template.bind({})
VideoCollectionStories.args = {
  title: 'Help Center Articles',
  subtext:
    'Get the help you need with step-by-step solutions to your questions.',
  videos: [
    {
      title: 'TV & Video',
      subtitle: 'How to pay your bill',
      videoId: '6305884524112',
      thumbnail:
        'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/when-all.jpg?rev=bda31478ea3c4276b2c34f188902e7c9',
    },
    {
      title: 'TV & Video',
      subtitle: 'How to pay your bill',
      videoId: '6305884524112',
      thumbnail:
        'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/when-all.jpg?rev=bda31478ea3c4276b2c34f188902e7c9',
    },
    {
      title: 'TV & Video',
      subtitle: 'How to pay your bill',
      videoId: '6305884524112',
      thumbnail:
        'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/when-all.jpg?rev=bda31478ea3c4276b2c34f188902e7c9',
    },
    {
      title: 'TV & Video',
      subtitle: 'How to pay your bill',
      videoId: '6305884524112',
      thumbnail:
        'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/when-all.jpg?rev=bda31478ea3c4276b2c34f188902e7c9',
    },
  ],
  shouldTruncate: true,
}
