import { ComponentStory, ComponentMeta } from '@storybook/react'
import TitleWithButton from './TitleWithButton'

export default {
  title: 'Components/TitleWithButton',
  component: TitleWithButton,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof TitleWithButton>

const Template: ComponentStory<typeof TitleWithButton> = (args) => (
  <TitleWithButton {...args} />
)

export const TitleWithButtonStories = Template.bind({})
TitleWithButtonStories.args = {
  title: 'Watch more. Stream faster. Blink less.',
  backgroundColor: 'dark-blue',
  titleFontColor: 'white',
  buttonText: 'Frontier TV Services',
  buttonColor: 'primary',
  hoverVariant: 'secondary',
  buttonURL: 'google.com',
  buttonVariant: 'tertiary',
}
