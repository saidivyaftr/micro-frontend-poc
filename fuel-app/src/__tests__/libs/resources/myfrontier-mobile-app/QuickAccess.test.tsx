import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { QuickAccess } from 'src/libs/resources/myfrontier-mobile-app'

jest.mock('src/hooks')
const mockData = {
  tiles: {
    targetItems: [
      {
        title: {
          value: 'View your services',
        },
        description: {
          value: 'View your Frontier services right inside the app.',
        },
        href: {
          url: 'www.mock1.com',
        },
        iconName: {
          src: '',
        },
        svgIcon: {
          rendered:
            '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M1 12.0391C5.94139 7.65928 12.4426 5 19.565 5H27.565C34.6873 5 41.1885 7.65928 46.1299 12.0391L43.8109 15.3343C39.5366 11.4015 33.8312 9 27.565 9H19.565C13.2987 9 7.59336 11.4015 3.31905 15.3343L1 12.0391Z" fill="#FF0037"/>\n<path d="M13.249 29.4443L10.8322 26.0101C13.4004 22.9473 17.2553 21 21.565 21H25.565C29.8747 21 33.7296 22.9473 36.2977 26.0101L33.8809 29.4443C32.087 26.7644 29.032 25 25.565 25H21.565C18.0979 25 15.043 26.7644 13.249 29.4443Z" fill="#FF0037"/>\n<path d="M27.565 17C32.1215 17 36.2331 18.9047 39.1471 21.9612L41.485 18.6392C37.8846 15.1486 32.9757 13 27.565 13H19.565C14.1542 13 9.24529 15.1486 5.6449 18.6392L7.9828 21.9612C10.8968 18.9047 15.0085 17 19.565 17H27.565Z" fill="#FF0037"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5654 36C16.5654 32.6863 19.2517 30 22.5654 30H24.5654C27.8791 30 30.5654 32.6863 30.5654 36V38C30.5654 41.3137 27.8791 44 24.5654 44H22.5654C19.2517 44 16.5654 41.3137 16.5654 38V36ZM20.5654 36C20.5654 34.8954 21.4609 34 22.5654 34H24.5654C25.67 34 26.5654 34.8954 26.5654 36V38C26.5654 39.1046 25.67 40 24.5654 40H22.5654C21.4609 40 20.5654 39.1046 20.5654 38V36Z" fill="#FF0037"/>\n</svg>',
        },
      },
      {
        title: {
          value: 'Manage billing',
        },
        description: {
          value:
            'Set up or change billing preferences like Paperless Billing and Auto Pay any time.',
        },
        href: {
          url: 'www.mock2.com',
        },
        iconName: {
          src: '',
        },
        svgIcon: {
          rendered:
            '<svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g clip-path="url(#clip0_4962_1844)">\n<path d="M16.3334 38H32.3334V34H16.3334V38Z" fill="#FF0037"/>\n<path d="M32.3334 31L16.3334 31V27L32.3334 27V31Z" fill="#FF0037"/>\n<path d="M25.8334 11H29.8334V14H20.3334C20.0572 14 19.8334 14.2239 19.8334 14.5V15C19.8334 15.2761 20.0572 15.5 20.3334 15.5H27.3334C29.2664 15.5 30.8334 17.067 30.8334 19V19.5C30.8334 21.433 29.2664 23 27.3334 23H25.8334V25H22.8334V23H17.8334V20H27.3334C27.6095 20 27.8334 19.7761 27.8334 19.5V19C27.8334 18.7239 27.6095 18.5 27.3334 18.5H20.3334C18.4004 18.5 16.8334 16.933 16.8334 15V14.5C16.8334 12.567 18.4004 11 20.3334 11H22.8334V9H25.8334V11Z" fill="#FF0037"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M18.3334 2C12.8105 2 8.33337 6.47715 8.33337 12V36C8.33337 41.5228 12.8105 46 18.3334 46H30.3334C35.8562 46 40.3334 41.5228 40.3334 36V12C40.3334 6.47715 35.8562 2 30.3334 2H18.3334ZM12.3334 12C12.3334 8.68629 15.0197 6 18.3334 6H30.3334C33.6471 6 36.3334 8.68629 36.3334 12V36C36.3334 39.3137 33.6471 42 30.3334 42H18.3334C15.0197 42 12.3334 39.3137 12.3334 36V12Z" fill="#FF0037"/>\n</g>\n<defs>\n<clipPath id="clip0_4962_1844">\n<rect width="48" height="48" fill="white" transform="translate(0.333374)"/>\n</clipPath>\n</defs>\n</svg>',
        },
      },
      {
        title: {
          value: 'Get support',
        },
        description: {
          value:
            'Get quick access to support topics in our Help Center when you need it.',
        },
        href: {
          url: 'www.mock3.com',
        },
        iconName: {
          src: '',
        },
        svgIcon: {
          rendered:
            '<svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M19.6665 12C17.2365 12 15.6665 13.5699 15.6665 16H11.6665C11.6665 11 15.0273 8 19.6665 8H22.6665C26.5837 8 29.6665 11.1755 29.6665 15.0927C29.6665 18.2245 27.3884 20.891 24.295 21.3799L24.0674 21.4159C23.1623 21.5589 22.6665 22.0837 22.6665 23V24H18.6665V23C18.6665 20.1156 20.5939 17.9152 23.443 17.4649L23.6705 17.429C24.82 17.2473 25.6665 16.1637 25.6665 15C25.6665 13.2919 24.3746 12 22.6665 12H19.6665Z" fill="#FF0037"/>\n            <path d="M23.6665 31C23.6665 32.1046 22.7711 33 21.6665 33H19.6665C18.5619 33 17.6665 32.1046 17.6665 31V29C17.6665 27.8954 18.5619 27 19.6665 27H21.6665C22.7711 27 23.6665 27.8954 23.6665 29V31Z" fill="#FF0037"/>\n            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.666504 18C0.666504 8.05887 8.72538 0 18.6665 0H22.6665C32.6076 0 40.6665 8.05887 40.6665 18V22C40.6665 31.9411 32.6076 40 22.6665 40H18.6665C8.72538 40 0.666504 31.9411 0.666504 22V18ZM18.6665 4H22.6665C30.3985 4 36.6665 10.268 36.6665 18V22C36.6665 29.732 30.3985 36 22.6665 36H18.6665C10.9345 36 4.6665 29.732 4.6665 22V18C4.6665 10.268 10.9345 4 18.6665 4Z" fill="#FF0037"/>\n            </svg>',
        },
      },
    ],
  },
}

describe('QuickAccess', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, getAllByTestId } = render(<QuickAccess />)
    const tiles = getAllByTestId('test-title')
    expect(tiles.length).toBe(3)
    expect(getByText('View your services')).toBeInTheDocument()
    expect(getByText('Manage billing')).toBeInTheDocument()
    expect(getByText('Get support')).toBeInTheDocument()
  })

  it('should not render list', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        tiles: {},
      }
    })
    const { queryAllByTestId } = render(<QuickAccess />)
    const tiles = queryAllByTestId('test-title')
    expect(tiles.length).toBe(0)
  })
})
