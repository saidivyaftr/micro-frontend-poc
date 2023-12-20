import { ComponentStory, ComponentMeta } from '@storybook/react'
import CtaBanner from './CtaBanner'
import { MapCurve } from '@/shared-ui/react-icons/index'

export default {
  title: 'Components/CtaBanner',
  component: CtaBanner,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CtaBanner>

const Template: ComponentStory<typeof CtaBanner> = (args) => (
  <CtaBanner {...args} />
)

export const CtaBannerDark = Template.bind({})
CtaBannerDark.args = {
  colorTheme: 'gravity',
  heading: `Is Frontier at your address`,
  headingStyleType: 'h6',
  icon: <MapCurve />,
  buttonURL: 'https://www.frontier.com/order-online',
  primaryButton: {
    text: 'CHECK AVAILABILITY',
    type: 'link',
    href: 'http://frontier.com',
    variant: 'primary',
  },
  secondaryButton: {
    text: 'LEARN MORE',
    type: 'link',
    href: 'http://frontier.com',
    variant: 'white',
  },
  linkText: 'Already a customer',
  linkURL: 'http://frontier.com',
}

export const CtaBannerLight = Template.bind({})
CtaBannerLight.args = {
  colorTheme: 'gravity5',
  heading: `Is Frontier at your address`,
  headingStyleType: 'h5',
  buttonURL: 'https://www.frontier.com/order-online',
  primaryButton: {
    text: 'Sign up now',
    type: 'link',
    href: 'http://frontier.com',
    variant: 'primary',
  },
  secondaryButton: {
    text: 'Learn more',
    type: 'link',
    href: 'http://frontier.com',
    variant: 'white',
  },
}
