import { ComponentStory, ComponentMeta } from '@storybook/react'
import CheckAvailability from './CheckAvailability'
import { MapCurve } from '@/shared-ui/react-icons/index'
import colors from '@/shared-ui/colors'

export default {
  title: 'Components/CheckAvailability',
  component: CheckAvailability,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CheckAvailability>

const Template: ComponentStory<typeof CheckAvailability> = (args) => (
  <CheckAvailability {...args} />
)

export const CardAndImageStories = Template.bind({})
CardAndImageStories.args = {
  rootStylesClassName: '',
  iconStylesClassName: '',
  icon: <MapCurve />,
  titleText:
    'Enter your address to see if Frontier Fiber is available for your home',
  titleColorCode: 'default',
  buttonVariant: 'primary',
  buttonText: 'Check availability',
  buttonURL: '/',
  buttonhoverVariant: 'primary',
  linkURL: '/',
  linkColorCode: 'default',
  linkText: 'Already a customer?',
  containerBgColor: colors?.main?.white,
  shadowColorCode: '0px 4px 14px rgb(0 0 0 / 25%)',
}
