import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Picture from './Picture'

export default {
  title: 'Components/Picture',
  component: Picture,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Picture>

const Template: ComponentStory<typeof Picture> = (args) => <Picture {...args} />

export const PictureStories = Template.bind({})

PictureStories.args = {
  desktop: {
    image: 'https://via.placeholder.com/600',
    webp: 'https://via.placeholder.com/600.webp',
  },
  tablet: {
    image: 'https://via.placeholder.com/300',
    webp: 'https://via.placeholder.com/300.webp',
  },
  mobile: {
    image: 'https://via.placeholder.com/150',
    webp: 'https://via.placeholder.com/150.webp',
  },
  altText: 'Placeholder image',
}
