import { ComponentStory, ComponentMeta } from '@storybook/react'
import CardAndImage from './CardAndImage'

export default {
  title: 'Components/CardAndImage',
  component: CardAndImage,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CardAndImage>

const Template: ComponentStory<typeof CardAndImage> = (args) => (
  <CardAndImage {...args} />
)

export const CardAndImageStories = Template.bind({})
CardAndImageStories.args = {
  heading: 'Test heading',
  copy: 'Test copy',
  imageMobile: 'https://via.placeholder.com/345x345',
  imageTablet: 'https://via.placeholder.com/640x400',
  altText: 'Woman playing video games',
}
