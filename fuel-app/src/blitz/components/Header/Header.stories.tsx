import { ComponentStory, ComponentMeta } from '@storybook/react'
import Header from './Header'

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

const MENU_ITEM = {
  title: 'Shop',
  subItems: [
    {
      title: 'Plans',
      href: 'https://www.google.com',
    },
    {
      title: 'Internet',
      subItems: [
        {
          title: '1 Gig',
          href: 'https://www.google.com',
        },
        {
          title: '2 Gig',
          href: 'https://www.google.com',
        },
      ],
    },
  ],
}

const MOCK_PROFILE_NAV = [
  {
    title: 'Account Summary',
    href: '/summary',
  },
  {
    title: 'My Payments',
    href: '/payment',
  },
  {
    title: 'My Bills',
    href: '/bills',
  },
  {
    title: 'My Profile',
    href: '/profile',
  },
  {
    title: 'MyFrontier Mobile App',
    href: '/mobile-app',
  },
  {
    title: 'Sign Out',
    href: '/sign-out',
  },
]

const props = {
  utilityNav: {
    sites: [
      {
        site: 'Residential',
        href: 'https://www.frontier.com/',
      },
      {
        site: 'Small Business',
        href: 'https://business.frontier.com/',
      },
      {
        site: 'Enterprise',
        href: 'https://enterprise.frontier.com/',
      },
      {
        site: 'Wholesale',
        href: 'https://wholesale.frontier.com/',
      },
    ],
    languageHref: "https//www.frontier.com/espanol'",
    languageTitle: 'Español',
  },
  secondaryNav: {
    search: {
      title: 'Search',
      href: 'https//www.frontier.com/search',
    },
    cart: {
      title: 'Sign In',
      href: 'https//www.frontier.com/signin',
    },
    signIn: {
      title: 'Sign In',
      href: 'https//www.frontier.com/signin',
    },
    logIn: {
      isLoggedIn: true,
      username: 'Maria',
    },
    profileNav: {
      title: 'My Account',
      href: 'https//www.frontier.com/signin',
      items: MOCK_PROFILE_NAV,
    },
  },
  menu: [
    MENU_ITEM,
    {
      title: 'Why Fronier',
      href: 'https://www.google.com',
    },
    {
      title: 'Support',
      subItems: [
        {
          title: 'Plans',
          href: 'https://www.google.com',
        },
        {
          title: 'Internet',
          subItems: [
            {
              title: '1 Gig',
              href: 'https://www.google.com',
            },
            {
              title: '2 Gig',
              href: 'https://www.google.com',
            },
          ],
        },
      ],
    },
    {
      title: '2 Gig',
      href: 'www.frontier.com/2gig',
      badge: 'NEW',
    },
  ],
}

export const HeaderStories = Template.bind({})

HeaderStories.args = {
  ...props,
}

export const HeaderWithBannerStories = Template.bind({})

HeaderWithBannerStories.args = {
  ...props,
  notificationBannerText:
    '<b>Sample Banner</b> <a href="https://www.google.com">Click me here</a>',
  showBanner: true,
}
