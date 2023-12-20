import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Facebook, LinkedIn, Twitter, Youtube } from '@/shared-ui/react-icons'
import SocialMediaLinks from './SocialMediaLinks'

export default {
  title: 'Components/SocialMediaLinks',
  component: SocialMediaLinks,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SocialMediaLinks>

const Template: ComponentStory<typeof SocialMediaLinks> = (args) => (
  <SocialMediaLinks {...args} />
)

export const SocialMediaLinksComponent = Template.bind({})

SocialMediaLinksComponent.args = {
  socialMediaLinks: [
    {
      icon: <Twitter />,
      href: 'https://www.google.com',
    },
    {
      icon: <Facebook />,
      href: 'https://www.google.com',
    },
    {
      icon: <LinkedIn />,
      href: 'https://www.google.com',
    },
    {
      icon: <Youtube />,
      href: 'https://www.google.com',
    },
  ],
}
