import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { QuickAccess } from 'src/libs/home'

const mockData = {
  title: {
    value: 'Quick access to your account',
  },
  tiles: {
    list: [
      {
        title: {
          value: 'Pay your bill',
        },
        description: {
          value: 'Make a payment or set up Auto Pay',
        },
        href: {
          url: '/login',
        },
        iconName: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Icon/payment.png?rev=6017ec7de3834405a610cf806a4444ba',
        },
        svgIcon: {
          rendered:
            '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M21.6243 12.8753H26.9996V15.8753H14.625C14.3488 15.8753 14.125 16.0991 14.125 16.3753V18.0001C14.125 18.2763 14.3488 18.5001 14.625 18.5001H24.3746C26.3076 18.5001 27.8746 20.0671 27.8746 22.0001V23.625C27.8746 25.558 26.3076 27.125 24.3746 27.125H21.6243V30.0001H18.6243V27.125H12V24.125H24.3746C24.6508 24.125 24.8746 23.9011 24.8746 23.625V22.0001C24.8746 21.724 24.6508 21.5001 24.3746 21.5001H14.625C12.692 21.5001 11.125 19.9331 11.125 18.0001V16.3753C11.125 14.4423 12.692 12.8753 14.625 12.8753H18.6243V10.0005H21.6243V12.8753Z" fill="#141928"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M0 16C0 7.16344 7.16344 0 16 0H24C32.8366 0 40 7.16344 40 16V24C40 32.8366 32.8366 40 24 40H16C7.16344 40 0 32.8366 0 24V16ZM16 4H24C30.6274 4 36 9.37258 36 16V24C36 30.6274 30.6274 36 24 36H16C9.37258 36 4 30.6274 4 24V16C4 9.37258 9.37258 4 16 4Z" fill="#141928"/>\n</svg>\n',
        },
      },
      {
        title: {
          value: 'View your account',
        },
        description: {
          value: 'Manage your Frontier account and services',
        },
        href: {
          url: '/account#/summary',
        },
        iconName: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Icon/Account.png?rev=d6d53f2848ac404ba52450c8c71dbda0',
        },
        svgIcon: {
          rendered:
            '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M11.8182 14.5455C11.8182 10.5288 15.0743 7.27273 19.0909 7.27273H20.9091C24.9257 7.27273 28.1818 10.5288 28.1818 14.5455V16.3636C28.1818 20.3803 24.9257 23.6364 20.9091 23.6364H19.0909C15.0743 23.6364 11.8182 20.3803 11.8182 16.3636V14.5455ZM19.0909 10.9091C17.0826 10.9091 15.4545 12.5371 15.4545 14.5455V16.3636C15.4545 18.3719 17.0826 20 19.0909 20H20.9091C22.9174 20 24.5455 18.3719 24.5455 16.3636V14.5455C24.5455 12.5371 22.9174 10.9091 20.9091 10.9091H19.0909Z" fill="#141928"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M16.3636 0C7.32625 0 0 7.32625 0 16.3636V23.6364C0 32.6738 7.32625 40 16.3636 40H23.6364C32.6738 40 40 32.6738 40 23.6364V16.3636C40 7.32625 32.6738 0 23.6364 0H16.3636ZM23.6364 3.63636H16.3636C9.33456 3.63636 3.63636 9.33456 3.63636 16.3636V23.6364C3.63636 26.1109 4.34255 28.4204 5.56438 30.3745C8.79745 27.8607 12.8604 27.2727 17.2729 27.2727H22.7275C27.1399 27.2727 31.2027 27.8606 34.4357 30.3743C35.6575 28.4203 36.3636 26.1108 36.3636 23.6364V16.3636C36.3636 9.33456 30.6654 3.63636 23.6364 3.63636ZM32.0857 33.1545C29.4883 31.1752 26.2451 30.9091 22.7275 30.9091H17.2729C13.7552 30.9091 10.5119 31.1753 7.91443 33.1547C10.1618 35.1511 13.1211 36.3636 16.3636 36.3636H23.6364C26.879 36.3636 29.8383 35.151 32.0857 33.1545Z" fill="#141928"/>\n</svg>\n',
        },
      },
      {
        title: {
          value: 'Check your mail',
        },
        description: {
          value: 'Log into your Frontier Yahoo Mail account',
        },
        href: {
          url: 'https://login.frontier.com/webmail',
        },
        iconName: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Icon/Mail.png?rev=366eeab055d64048a5ed25a6add1fe1a',
        },
        svgIcon: {
          rendered:
            '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M30.9091 0C35.9299 0 40 4.07014 40 9.09091V27.2727C40 32.2935 35.9299 36.3636 30.9091 36.3636H9.09091C4.07014 36.3636 0 32.2935 0 27.2727V9.09091C0 4.07014 4.07014 0 9.09091 0H30.9091ZM36.3636 9.09091C36.3636 6.07845 33.9216 3.63636 30.9091 3.63636L9.09091 3.63636C6.07845 3.63636 3.63636 6.07845 3.63636 9.09091L3.63636 11.6725L20 20.6868L36.3636 11.6725V9.09091ZM36.3636 15.8242L29.0746 19.8395L36.3636 26.0373V15.8242ZM25.668 21.7161L20 24.8385L14.332 21.7161L4.44131 30.1261C5.40105 31.6867 7.12446 32.7273 9.09091 32.7273H30.9091C32.8755 32.7273 34.599 31.6867 35.5587 30.1261L25.668 21.7161ZM10.9254 19.8395L3.63636 15.8242L3.63636 26.0373L10.9254 19.8395Z" fill="#141928"/>\n</svg>\n',
        },
      },
      {
        title: {
          value: 'Visit our help center',
        },
        description: {
          value: 'Get support and find answers to common questions',
        },
        href: {
          url: '/helpcenter',
        },
        iconName: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Icon/Question.png?rev=3af8f3a24636482683ee96cc426dd435',
        },
        svgIcon: {
          rendered:
            '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M19 12C16.57 12 15 13.5699 15 16H11C11 11 14.3608 8 19 8H22C25.9172 8 29 11.1755 29 15.0927C29 18.2245 26.7219 20.891 23.6285 21.3799L23.4009 21.4159C22.4958 21.5589 22 22.0837 22 23V24H18V23C18 20.1156 19.9274 17.9152 22.7765 17.4649L23.004 17.429C24.1535 17.2473 25 16.1637 25 15C25 13.2919 23.7081 12 22 12H19Z" fill="#141928"/>\n<path d="M23 31C23 32.1046 22.1046 33 21 33H19C17.8954 33 17 32.1046 17 31V29C17 27.8954 17.8954 27 19 27H21C22.1046 27 23 27.8954 23 29V31Z" fill="#141928"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M0 18C0 8.05887 8.05887 0 18 0H22C31.9411 0 40 8.05887 40 18V22C40 31.9411 31.9411 40 22 40H18C8.05887 40 0 31.9411 0 22V18ZM18 4H22C29.732 4 36 10.268 36 18V22C36 29.732 29.732 36 22 36H18C10.268 36 4 29.732 4 22V18C4 10.268 10.268 4 18 4Z" fill="#141928"/>\n</svg>\n',
        },
      },
    ],
  },
}

jest.mock('src/hooks')

jest.mock('@/shared-ui/components/FourTiles', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock FourTiles" />
  },
}))

describe('QuickAccess', () => {
  it('should render correctly', () => {
    // eslint-disable-next-line prettier/prettier
    ; (useAppData as any).mockImplementation(() => mockData)
    const { queryAllByTestId, getByRole } = render(<QuickAccess />)

    expect(
      getByRole('heading', { name: /quick access to your account/i }),
    ).toBeInTheDocument()
    expect(queryAllByTestId('Mock FourTiles')).toHaveLength(1)
  })
})
