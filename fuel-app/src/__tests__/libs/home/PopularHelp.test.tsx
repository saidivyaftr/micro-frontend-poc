import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { PopularHelp } from 'src/libs/home'

const mockData = {
  title: {
    value: 'Popular help and support topics',
  },
  tiles: {
    list: [
      {
        title: {
          value: 'Billing',
        },
        description: {
          value: 'Get help with your bill, making payments and more',
        },
        href: {
          url: '/helpcenter/categories/billing',
        },
        svgIcon: {
          rendered:
            '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M21.6243 12.8753H26.9996V15.8753H14.625C14.3488 15.8753 14.125 16.0991 14.125 16.3753V18.0001C14.125 18.2763 14.3488 18.5001 14.625 18.5001H24.3746C26.3076 18.5001 27.8746 20.0671 27.8746 22.0001V23.625C27.8746 25.558 26.3076 27.125 24.3746 27.125H21.6243V30.0001H18.6243V27.125H12V24.125H24.3746C24.6508 24.125 24.8746 23.9011 24.8746 23.625V22.0001C24.8746 21.724 24.6508 21.5001 24.3746 21.5001H14.625C12.692 21.5001 11.125 19.9331 11.125 18.0001V16.3753C11.125 14.4423 12.692 12.8753 14.625 12.8753H18.6243V10.0005H21.6243V12.8753Z" fill="#FF0037"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M0 16C0 7.16344 7.16344 0 16 0H24C32.8366 0 40 7.16344 40 16V24C40 32.8366 32.8366 40 24 40H16C7.16344 40 0 32.8366 0 24V16ZM16 4H24C30.6274 4 36 9.37258 36 16V24C36 30.6274 30.6274 36 24 36H16C9.37258 36 4 30.6274 4 24V16C4 9.37258 9.37258 4 16 4Z" fill="#FF0037"/>\n</svg>\n',
        },
        iconName: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Icon/billing-icon.png?rev=2f5da3b8f8904fc2b04993c04bfc63bd',
        },
      },
      {
        title: {
          value: 'Internet',
        },
        description: {
          value:
            'Learn self-installation tips, manage your home network and more',
        },
        href: {
          url: '/helpcenter/categories/internet',
        },
        svgIcon: {
          rendered:
            '<svg width="44" height="39" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M0.941406 7.03909C5.59213 2.65928 11.7109 0 18.4143 0H25.9437C32.6471 0 38.7659 2.65928 43.4166 7.03909L41.234 10.3343C37.2111 6.40149 31.8414 4 25.9437 4H18.4143C12.5167 4 7.14692 6.40149 3.12404 10.3343L0.941406 7.03909Z" fill="#FF0037"/>\n<path d="M12.4699 24.4443L10.1953 21.0101C12.6124 17.9473 16.2405 16 20.2967 16H24.0614C28.1176 16 31.7457 17.9473 34.1628 21.0101L31.8881 24.4443C30.1997 21.7644 27.3245 20 24.0614 20H20.2967C17.0336 20 14.1583 21.7644 12.4699 24.4443Z" fill="#FF0037"/>\n<path d="M25.9437 12C30.2322 12 34.102 13.9047 36.8446 16.9612L39.045 13.6392C35.6564 10.1486 31.0362 8 25.9437 8H18.4143C13.3218 8 8.70168 10.1486 5.31307 13.6392L7.51345 16.9612C10.2561 13.9047 14.1259 12 18.4143 12H25.9437Z" fill="#FF0037"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5912 31C15.5912 27.6863 18.1195 25 21.2383 25H23.1206C26.2394 25 28.7677 27.6863 28.7677 31V33C28.7677 36.3137 26.2394 39 23.1206 39H21.2383C18.1195 39 15.5912 36.3137 15.5912 33V31ZM19.3559 31C19.3559 29.8954 20.1987 29 21.2383 29H23.1206C24.1602 29 25.003 29.8954 25.003 31V33C25.003 34.1046 24.1602 35 23.1206 35H21.2383C20.1987 35 19.3559 34.1046 19.3559 33V31Z" fill="#FF0037"/>\n</svg>\n',
        },
        iconName: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Icon/wifi-icon.png?rev=a1a157a8408d4bbaab46189c5711c195',
        },
      },
      {
        title: {
          value: 'Ticket status',
        },
        description: {
          value: 'Check the status of a support ticket',
        },
        href: {
          url: '/helpcenter/categories/ticket-status',
        },
        svgIcon: {
          rendered:
            '<svg width="44" height="40" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M29.5 9L32.5 12L19.5 25L13 18.5L16 15.5L19.5 19L29.5 9Z" fill="#FF0037"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M2.98023e-06 0H44V10.9265L42.6665 11.3978C39.945 12.3597 38 14.9553 38 18C38 21.0447 39.945 23.6403 42.6665 24.6022L44 25.0735V36L0 36V25.0735L1.33351 24.6022C4.05499 23.6403 6 21.0447 6 18C6 14.9553 4.05499 12.3597 1.33351 11.3978L2.14577e-06 10.9265L2.98023e-06 0ZM4 4L4 8.20002C7.55978 10.0198 10 13.7229 10 18C10 22.2771 7.55978 25.9802 4 27.8L4 32L40 32V27.8C36.4402 25.9802 34 22.2771 34 18C34 13.7229 36.4402 10.0198 40 8.20001V4H4Z" fill="#FF0037"/>\n</svg>\n',
        },
        iconName: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Icon/ticket-icon.png?rev=a357e795259546439d632fd218182179',
        },
      },
      {
        title: {
          value: 'Contact us',
        },
        description: {
          value: 'Speak with a technical support representative, 24/7',
        },
        href: {
          url: '/contact-us',
        },
        svgIcon: {
          rendered:
            '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M5.16988 0.755774C5.90908 0.262971 6.77762 0 7.66603 0H10.0163C11.9532 0 13.6728 1.23943 14.2854 3.07697L16.6016 10.0258C17.0408 11.3432 16.8471 12.7895 16.0768 13.9449L14.6191 16.1314C14.4869 16.3297 14.5131 16.5937 14.6816 16.7623L23.2377 25.3184C23.4062 25.4869 23.6703 25.5131 23.8686 25.3809L26.0551 23.9232C27.2105 23.1529 28.6568 22.9592 29.9742 23.3984L36.923 25.7146C38.7606 26.3272 40 28.0468 40 29.9837V32.334C40 33.2224 39.737 34.0909 39.2442 34.8301L37.7273 37.1056C36.5217 38.9138 34.4922 40 32.3189 40H30.3182C29.7241 40 29.1358 39.8824 28.5874 39.6538L18.5134 35.4563C12.1997 32.8256 7.04266 28.012 3.98378 21.8942L0.475078 14.8768C0.162653 14.252 0 13.563 0 12.8644V6.61069C0 5.1061 0.751955 3.70106 2.00385 2.86646L5.16988 0.755774ZM7.66603 4C7.56732 4 7.47081 4.02922 7.38868 4.08397L4.22265 6.19466C4.08355 6.28739 4 6.44351 4 6.61069V12.8644C4 12.942 4.01807 13.0186 4.05279 13.088L7.56149 20.1054C10.1911 25.3645 14.6243 29.5025 20.0519 31.764L30.1259 35.9615C30.1868 35.9869 30.2522 36 30.3182 36H32.3189C33.1548 36 33.9354 35.5822 34.3991 34.8867L35.916 32.6113C35.9708 32.5292 36 32.4327 36 32.334V29.9837C36 29.7685 35.8623 29.5774 35.6581 29.5094L28.7093 27.1931C28.5629 27.1443 28.4022 27.1658 28.2739 27.2514L26.0874 28.7091C24.3026 29.8989 21.9261 29.6636 20.4093 28.1468L11.8532 19.5907C10.3364 18.0739 10.1011 15.6974 11.2909 13.9126L12.7486 11.7261C12.8342 11.5978 12.8557 11.4371 12.8069 11.2907L10.4906 4.34189C10.4226 4.13771 10.2315 4 10.0163 4H7.66603Z" fill="#FF0037"/>\n</svg>\n',
        },
        iconName: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Icons/contact-icon.png?rev=75164d473e204da39666f15dfad70cb6',
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

describe('PopularHelp', () => {
  it('should render correctly', () => {
    // eslint-disable-next-line prettier/prettier
    ; (useAppData as any).mockImplementation(() => mockData)
    const { queryAllByTestId, getByRole } = render(<PopularHelp />)

    expect(
      getByRole('heading', { name: /popular help and support topics/i }),
    ).toBeInTheDocument()
    expect(queryAllByTestId('Mock FourTiles')).toHaveLength(1)
  })
})
