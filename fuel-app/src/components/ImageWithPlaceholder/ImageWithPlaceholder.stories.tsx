import { ComponentStory, ComponentMeta } from '@storybook/react'
import ImageWithPlaceholder from '.'

export default {
  title: 'Components/ImageWithPlaceholder',
  component: ImageWithPlaceholder,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ImageWithPlaceholder>

const Template: ComponentStory<typeof ImageWithPlaceholder> = (args) => (
  <ImageWithPlaceholder {...args} />
)

export const ImageWithPlaceholderExample = Template.bind({})
ImageWithPlaceholderExample.args = {
  width: 150,
  height: 150,
  src: 'https://via.placeholder.com/640x400',
  alt: 'logo',
}
