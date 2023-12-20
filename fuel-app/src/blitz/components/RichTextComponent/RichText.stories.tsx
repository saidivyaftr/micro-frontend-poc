import { ComponentStory, ComponentMeta } from '@storybook/react'
import RichText from './RichText'

export default {
  title: 'Components/RichText',
  component: RichText,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof RichText>

const Template: ComponentStory<typeof RichText> = (args) => (
  <RichText {...args} />
)

export const RichTextStories = Template.bind({})
RichTextStories.args = {
  data: {
    image: {
      src: 'https://dummyimage.com/104x48.jpg',
      alt: 'test image',
    },
    content: {
      value: 'rich text content',
    },
  },
}
