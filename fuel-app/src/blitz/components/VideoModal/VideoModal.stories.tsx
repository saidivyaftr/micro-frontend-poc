import { ComponentStory, ComponentMeta } from '@storybook/react'
import VideoModal from './VideoModal'

export default {
  title: 'Components/VideoModal',
  component: VideoModal,
} as ComponentMeta<typeof VideoModal>

const Template: ComponentStory<typeof VideoModal> = (args) => (
  <VideoModal {...args} />
)

export const VideoModalPlayer = Template.bind({})

VideoModalPlayer.args = {
  imageSrc:
    'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/when-all.jpg?rev=bda31478ea3c4276b2c34f188902e7c9',
  videoId: '5027682335001',
  title: 'How to pay your Frontier bill',
  desc: 'This video gives an overview of the different ways you can pay your Frontier bill so you can choose the method that works best for you.',
  videoTitle: 'Billing',
  videoDesc: 'How to Pay My Frontier Bill',
}
