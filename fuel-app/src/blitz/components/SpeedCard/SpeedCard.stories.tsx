import { ComponentStory, ComponentMeta } from '@storybook/react'
import SpeedCard from './SpeedCard'

export default {
  title: 'Components/SpeedCard',
  component: SpeedCard,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SpeedCard>

const Template: ComponentStory<typeof SpeedCard> = (args) => (
  <SpeedCard {...args} />
)

export const SpeedCardStories = Template.bind({})
SpeedCardStories.args = {
  title: 'What internet speed is right for you?',
  backgroundColor: 'dark-blue',
  titleFontColor: 'secondary',
  perks: [
    {
      title: 'Speeds 5-10 Mbps',
      subtitle: 'Good for:',
      targetItems: [
        { name: 'Checking email' },
        { name: 'Browsing websites' },
        { name: 'Browsing social media' },
      ],
    },
    {
      title: 'Speeds 5-10 Mbps',
      subtitle: 'Good for:',
      targetItems: [
        { name: 'Online gaming for one player' },
        { name: 'Connecting multiple devices' },
        { name: 'Browsing social media' },
      ],
    },
    {
      title: 'Speeds 50 Mbps and up',
      subtitle: 'Good for:',
      targetItems: [
        { name: 'Checking email' },
        { name: 'Online gaming for multiple users' },
        { name: 'Video chat with friends' },
      ],
    },
  ],
}
