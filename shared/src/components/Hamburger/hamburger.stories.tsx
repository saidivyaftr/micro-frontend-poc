import { ComponentStory, ComponentMeta } from '@storybook/react'
import Hamburger from './Hamburger'

export default {
  title: 'Components/Hamburger',
  component: Hamburger,
} as ComponentMeta<typeof Hamburger>

const Template: ComponentStory<typeof Hamburger> = (args) => (
  <Hamburger {...args} />
)

export const HamburgerComponent = Template.bind({})

HamburgerComponent.args = {
  isActive: false,
}
