import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const PrimaryButton = Template.bind({})

PrimaryButton.args = {
  text: 'SIGN UP',
  type: 'button',
  buttonSize: 'large',
  isBusy: false,
}

export const SecondaryButton = Template.bind({})

SecondaryButton.args = {
  text: 'SIGN UP',
  type: 'button',
  variant: 'secondary',
  buttonSize: 'large',
  isBusy: false,
  className: '',
  hoverVariant: 'primary',
}

export const TertiaryButton = Template.bind({})

TertiaryButton.args = {
  text: 'SIGN UP',
  type: 'button',
  variant: 'tertiary',
  buttonSize: 'large',
  isBusy: false,
  className: '',
  hoverVariant: 'primary',
}

export const TertiaryWhiteButton = Template.bind({})

TertiaryWhiteButton.args = {
  text: 'White Tertiary Button',
  type: 'button',
  variant: 'white',
  buttonSize: 'large',
  isBusy: false,
  className: '',
  hoverVariant: 'primary',
}

export const ButtonWithTextAsElement = Template.bind({})

ButtonWithTextAsElement.args = {
  text: <span>SIGN UP</span>,
  type: 'button',
  variant: 'tertiary',
  buttonSize: 'large',
}

export const DisabledButton = Template.bind({})

DisabledButton.args = {
  text: 'SIGN UP',
  type: 'button',
  buttonSize: 'large',
  variant: 'primary',
  disabled: true,
}

export const LinkButton = Template.bind({})

LinkButton.args = {
  text: 'SIGN UP',
  type: 'link',
  buttonSize: 'large',
  variant: 'primary',
  href: 'https://www.google.com',
}
