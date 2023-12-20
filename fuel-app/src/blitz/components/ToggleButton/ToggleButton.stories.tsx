import { ComponentStory, ComponentMeta } from '@storybook/react'
import ToggleButton from './ToggleButton'

export default {
  title: 'Components/Buttons/ToggleButton',
  component: ToggleButton,
} as ComponentMeta<typeof ToggleButton>

const Template: ComponentStory<typeof ToggleButton> = (args) => (
  <ToggleButton {...args} />
)

export const ToggleButtonStories = Template.bind({})
ToggleButtonStories.args = {}
