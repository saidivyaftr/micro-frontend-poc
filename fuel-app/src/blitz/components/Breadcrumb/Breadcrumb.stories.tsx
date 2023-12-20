import { ComponentStory, ComponentMeta } from '@storybook/react'
import Breadcrumb from './Breadcrumb'

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
  <div
    style={{
      backgroundColor: args.variant === 'primary' ? 'transparent' : 'lightgray',
    }}
  >
    <Breadcrumb {...args} />
  </div>
)

export const BreadcrumbStories = Template.bind({})

BreadcrumbStories.args = {
  variant: 'primary',
  links: [
    {
      pageName: 'Support',
      href: '/',
    },
    {
      pageName: 'Tv and phone',
      href: '/tv-and-phone',
    },
    {
      pageName: 'Help us troubleshoot',
      href: '/',
      isCurrent: true,
    },
  ],
}

export const BreadcrumbSecondary = Template.bind({})

BreadcrumbSecondary.args = {
  variant: 'secondary',
  hoverEffect: false,
  breadCrumbClassName: '',
  links: [
    {
      pageName: 'Support',
      href: '/',
    },
    {
      pageName: 'Tv and phone',
      href: '/tv-and-phone',
    },
    {
      pageName: 'Help us troubleshoot',
      href: '/',
      isCurrent: true,
    },
  ],
}
