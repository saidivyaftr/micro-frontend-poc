import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import UtilityNav from './UtilityNav'

export default {
  title: 'Components/UtilityNav',
  component: UtilityNav,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof UtilityNav>

const Template: ComponentStory<typeof UtilityNav> = (args) => (
  <UtilityNav {...args} />
)

export const UtilityNavStories = Template.bind({})
UtilityNavStories.args = {
  sites: [
    {
      site: 'Residential',
      href: 'www.frontier.com',
    },
    {
      site: 'Small Business',
      href: 'business.frontier.com',
    },
    {
      site: 'Enterprise',
      href: 'enterprise.frontier.com',
    },
    {
      site: 'Wholesale',
      href: 'wholesale.frontier.com',
    },
  ],
  languageTitle: `Español`,
  languageHref: `https://www.frontier.com/espanol`,
}
