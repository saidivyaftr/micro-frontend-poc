import { render } from '@testing-library/react'
import NewFooter from 'src/components/NewFooter'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')
const legalInfo = {
  description: {
    value: 'Exclusive offer for qualified addresses.',
  },
}
const footer = {
  componentName: 'newFooter',
  field: {
    main_links: [
      {
        title: 'Shop',
        items: [
          {
            name: {
              value: 'Plans',
            },
            path: {
              url: '/shop',
            },
          },
          {
            name: {
              value: 'Internet',
            },
            path: {
              url: '/shop/internet',
            },
          },
          {
            name: {
              value: 'Fiber Internet',
            },
            path: {
              url: '/shop/internet/why-fiber-internet',
            },
          },
          {
            name: {
              value: 'Video/TV',
            },
            path: {
              url: '/shop/tv',
            },
          },
          {
            name: {
              value: 'Phone',
            },
            path: {
              url: '/shop/phone',
            },
          },
          {
            name: {
              value: 'Frontier Secure',
            },
            path: {
              url: '/shop/frontier-secure',
            },
          },
          {
            name: {
              value: 'Moving',
            },
            path: {
              url: '/resources/movers',
            },
          },
          {
            name: {
              value: 'Availability',
            },
            path: {
              url: '/local',
            },
          },
          {
            name: {
              value: 'Multifamily',
            },
            path: {
              url: '/resources/multifamily',
            },
          },
        ],
      },
      {
        title: 'My Account',
        items: [
          {
            name: {
              value: 'Register',
            },
            path: {
              url: 'https://frontier.com/resources/frontier-id-registration?icid=18oct12_national_homepage_register_footer_page_link',
            },
          },
          {
            name: {
              value: 'Pay Bill',
            },
            path: {
              url: 'https://frontier.com/login',
            },
          },
          {
            name: {
              value: 'Check Email',
            },
            path: {
              url: 'https://login.frontier.com/webmail',
            },
          },
          {
            name: {
              value: 'Manage Account',
            },
            path: {
              url: 'https://frontier.com/login',
            },
          },
          {
            name: {
              value: 'MyFrontier App',
            },
            path: {
              url: '/resources/myfrontier-mobile-app',
            },
          },
          {
            name: {
              value: 'Watch TV',
            },
            path: {
              url: 'https://tv.frontier.com/',
            },
          },
        ],
      },
      {
        title: 'Support',
        items: [
          {
            name: {
              value: 'Help Center',
            },
            path: {
              url: 'https://frontier.com/helpcenter',
            },
          },
          {
            name: {
              value: 'How-To Videos',
            },
            path: {
              url: 'https://videos.frontier.com/',
            },
          },
          {
            name: {
              value: 'Support Wizard',
            },
            path: {
              url: '/helpcenter/categories/support-wizard',
            },
          },
          {
            name: {
              value: 'Trouble Ticket Status',
            },
            path: {
              url: 'https://frontier.com/helpcenter/categories/ticket-status',
            },
          },
          {
            name: {
              value: 'Order Status',
            },
            path: {
              url: 'https://frontier.com/helpcenter/categories/order-status',
            },
          },
          {
            name: {
              value: 'Contact Us',
            },
            path: {
              url: '/contact-us',
            },
          },
        ],
      },
      {
        title: 'Corporate',
        items: [
          {
            name: {
              value: 'Company',
            },
            path: {
              url: 'https://newsroom.frontier.com/leadership',
            },
          },
          {
            name: {
              value: 'Investors',
            },
            path: {
              url: 'https://investor.frontier.com/',
            },
          },
          {
            name: {
              value: 'News',
            },
            path: {
              url: 'https://newsroom.frontier.com',
            },
          },
          {
            name: {
              value: 'Blog',
            },
            path: {
              url: 'https://blog.frontier.com/',
            },
          },
          {
            name: {
              value: 'Responsibility',
            },
            path: {
              url: 'https://frontier.com/corporate/responsibility/home',
            },
          },
          {
            name: {
              value: 'Suppliers',
            },
            path: {
              url: 'https://newsroom.frontier.com/suppliers',
            },
          },
          {
            name: {
              value: 'Discount Programs',
            },
            path: {
              url: '/discount-programs',
            },
          },
          {
            name: {
              value: 'Careers',
            },
            path: {
              url: 'https://frontier-careers.com/',
            },
          },
        ],
      },
      {
        title: 'Frontier Sites',
        items: [
          {
            name: {
              value: 'Small Business',
            },
            path: {
              url: 'https://business.frontier.com/',
            },
          },
          {
            name: {
              value: 'Enterprise',
            },
            path: {
              url: 'https://enterprise.frontier.com/',
            },
          },
          {
            name: {
              value: 'Wholesale',
            },
            path: {
              url: 'https://wholesale.frontier.com/home',
            },
          },
          {
            name: {
              value: 'Frontier Yahoo Portal',
            },
            path: {
              url: 'https://frontier.yahoo.com/',
            },
          },
          {
            name: {
              value: 'Frontier Business Partner Program',
            },
            path: {
              url: 'https://agents.frontier.com/',
            },
          },
          {
            name: {
              value: 'Phone Directories',
            },
            path: {
              url: '/resources/white-pages',
            },
          },
        ],
      },
      {
        title: 'Sales Partners',
        items: [
          {
            name: {
              value: 'Frontier Internet',
            },
            path: {
              url: 'https://internet.frontier.com/',
            },
          },
          {
            name: {
              value: 'Frontier Fiber',
            },
            path: {
              url: 'https://go.frontier.com/',
            },
          },
          {
            name: {
              value: 'Frontier Fiber Internet',
            },
            path: {
              url: 'https://internet.frontier.com/fiber-internet/',
            },
          },
          {
            name: {
              value: 'Local Internet',
            },
            path: {
              url: 'https://www.frontierbundles.com/availability',
            },
          },
        ],
      },
    ],
  },
  footer_copy_rights: {
    value: '©2023 Frontier Communications Parent, Inc. ',
  },
  footer_rights_reserved: {
    value: 'All Rights Reserved.',
  },
  social_media_header: {
    value: 'Please Follow & Like Us :)',
  },
  social_media_links: {
    social_media_links: [
      {
        name: 'Twitter',
        path: {
          url: 'https://twitter.com/FrontierCorp',
        },
      },
      {
        name: 'Facebook',
        path: {
          url: 'https://www.facebook.com/FrontierCorp',
        },
      },
      {
        name: 'LinkedIn',
        path: {
          url: 'https://www.linkedin.com/company/frontier-communications',
        },
      },
      {
        name: 'YouTube',
        path: {
          url: 'https://www.youtube.com/user/FrontierCorp',
        },
      },
    ],
  },
  sub_footer_links: {
    links: [
      {
        name: 'Home',
        path: {
          url: '/',
        },
      },
      {
        name: 'Site Map',
        path: {
          url: 'https://frontier.com/page-sitemap',
        },
      },
      {
        name: 'Policies &amp; Notifications',
        path: {
          url: '/corporate/policies',
        },
      },
      {
        name: 'Terms &amp; Conditions',
        path: {
          url: '/corporate/terms',
        },
      },
      {
        name: 'Privacy Policy',
        path: {
          url: '/corporate/privacy-policy',
        },
      },
      {
        name: 'California Privacy Policy',
        path: {
          url: '/corporate/privacy-policy-california',
        },
      },
    ],
  },
  legal_notice: {
    value: '',
  },
}
describe('New footer', () => {
  it('should render correctly with legalData', () => {
    ;(useAppData as any).mockImplementation(() => legalInfo)
    const { getByText } = render(
      <NewFooter data={footer} legalData={legalInfo} />,
    )
    expect(getByText(legalInfo?.description?.value)).toBeInTheDocument()
  })
  it('should  not render correctly with legalData', () => {
    ;(useAppData as any).mockImplementation(() => footer)
    const { queryByText } = render(
      <NewFooter data={footer} legalData={legalInfo} />,
    )
    expect(queryByText(legalInfo?.description?.value)).not.toBeInTheDocument()
  })

  it('should  render correctly with footer', () => {
    ;(useAppData as any).mockImplementation(() => footer)
    const { getByTestId } = render(<NewFooter />)
    expect(getByTestId('test-copyRights')).toBeInTheDocument()
  })
  it('should  not render correctly with footer', () => {
    ;(useAppData as any).mockImplementation(() => legalInfo)
    const { queryByTestId } = render(<NewFooter />)
    expect(queryByTestId('test-copyRights')).not.toBeInTheDocument()
  })
})
