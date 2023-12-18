import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import NotificationBanner from './NotificationBanner'

export default {
  title: 'Components/NotificationBanner',
  component: NotificationBanner,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof NotificationBanner>

const Template: ComponentStory<typeof NotificationBanner> = (args) => (
  <NotificationBanner {...args} />
)

export const NotificationBannerStories = Template.bind({})
NotificationBannerStories.args = {
  showBanner: true,
  notificationBannerText:
    "This is a mock banner <a href='https://www.google.com'>Google</a>",
}
