import { ComponentStory, ComponentMeta } from '@storybook/react'
import Hero from './Hero'

export default {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Hero>

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />

export const HeroStories = Template.bind({})
HeroStories.args = {
  title1: 'Introducing ',
  title2: 'Fiber 2 Gig Internet',
  subHeader: 'For your devices, data and identity',
  backgroundColor: 'gravity',
  backgroundImage: 'https://i.postimg.cc/8C984nCG/Place-Imagedesktop.png',
  mobileBackgroundImage:
    'https://i.postimg.cc/CKDJyvNS/Place-Imagemobile-1.png',
  primaryButton: {
    text: 'SIGN UP NOW',
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
  legalText: 'Max speeds are wired. Wi-Fi, actual & average speeds vary.',
}

export const HeroWithBackgroundColor = Template.bind({})
HeroWithBackgroundColor.args = {
  title1: 'Introducing ',
  title2: 'Fiber 2 Gig Internet',
  subHeader: 'For your devices, data and identity',
  backgroundColor: 'gravity',
  backgroundImage: 'https://i.postimg.cc/8C984nCG/Place-Imagedesktop.png',
  mobileBackgroundImage:
    'https://i.postimg.cc/CKDJyvNS/Place-Imagemobile-1.png',
  primaryButton: {
    text: 'SIGN UP NOW',
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
  legalText: 'Max speeds are wired. Wi-Fi, actual & average speeds vary.',
}
