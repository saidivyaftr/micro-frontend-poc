import Typography from './Typography'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Typography>

const Template: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args} />
)

export const TypographyStories = Template.bind({})

TypographyStories.args = {
  children: 'This is the link',
  tagType: 'h1',
  styleType: 'h1',
}
