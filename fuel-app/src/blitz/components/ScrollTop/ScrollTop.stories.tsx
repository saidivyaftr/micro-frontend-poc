import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ScrollTop from './ScrollTop.module'

export default {
  title: 'Components/ScrollTop',
  component: ScrollTop,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ScrollTop>

const Template: ComponentStory<typeof ScrollTop> = (args) => (
  <ScrollTop {...args} />
)

export const ScrollTopStories = Template.bind({})
ScrollTopStories.args = {
  backgroundColor: 'secondary',
}
