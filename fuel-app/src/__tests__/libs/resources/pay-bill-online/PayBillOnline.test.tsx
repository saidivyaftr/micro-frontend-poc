import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { PayBillOnline } from 'src/libs/resources/pay-bill-online'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Pay your bill online',
  },
  tooltipContent: {
    value: '',
  },
  subTitle: {
    value: '',
  },
  subTitle1: {
    value: '',
  },
  tiles: {
    list: [
      {
        title: {
          value: 'Online account',
        },
        description: {
          value:
            'Sign in to your online account to view and pay your bill and access more billing features.',
        },
        icon: {
          rendered:
            '<svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M8 36H24V32H8V36Z" fill="#FF0037"/>\n<path d="M24 29L8 29V25L24 25V29Z" fill="#FF0037"/>\n<path d="M17.5 9H21.5V12H12C11.7239 12 11.5 12.2239 11.5 12.5V13C11.5 13.2761 11.7239 13.5 12 13.5H19C20.933 13.5 22.5 15.067 22.5 17V17.5C22.5 19.433 20.933 21 19 21H17.5V23H14.5V21H9.5V18H19C19.2761 18 19.5 17.7761 19.5 17.5V17C19.5 16.7239 19.2761 16.5 19 16.5H12C10.067 16.5 8.5 14.933 8.5 13V12.5C8.5 10.567 10.067 9 12 9H14.5V7H17.5V9Z" fill="#FF0037"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.47715 0 0 4.47715 0 10V34C0 39.5228 4.47715 44 10 44H22C27.5228 44 32 39.5228 32 34V10C32 4.47715 27.5228 0 22 0H10ZM4 10C4 6.68629 6.68629 4 10 4H22C25.3137 4 28 6.68629 28 10V34C28 37.3137 25.3137 40 22 40H10C6.68629 40 4 37.3137 4 34V10Z" fill="#FF0037"/>\n</svg>',
        },
        buttonText: {
          value: 'sign in',
        },
        buttonVariant: {
          targetItem: {
            type: {
              value: 'tertiary',
            },
          },
        },
        buttonHoverVariant: {
          targetItem: {
            type: {
              value: 'secondary',
            },
          },
        },
        buttonhref: {
          url: '/login',
        },
      },
      {
        title: {
          value: 'Express Pay',
        },
        description: {
          value:
            'Make payments without signing in. You’ll need your account number and PIN.',
        },
        icon: {
          rendered:
            '<svg width="48" height="40" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M0 0V4H32C38.6274 4 44 9.37258 44 16V24C44 30.6274 38.6274 36 32 36H24C17.3726 36 12 30.6274 12 24H8C8 32.8366 15.1634 40 24 40H32C40.8366 40 48 32.8366 48 24V16C48 7.16344 40.8366 0 32 0H0Z" fill="#FF0037"/>\n<path d="M2 8V12H12.6828C13.2096 10.5095 14.0225 9.15419 15.0556 8H2Z" fill="#FF0037"/>\n<path d="M4 16H12V20H4V16Z" fill="#FF0037"/>\n<path d="M29.6243 12.8753H34.9996V15.8753H22.625C22.3488 15.8753 22.125 16.0991 22.125 16.3753V18.0001C22.125 18.2763 22.3488 18.5001 22.625 18.5001H32.3746C34.3076 18.5001 35.8746 20.0671 35.8746 22.0001V23.625C35.8746 25.558 34.3076 27.125 32.3746 27.125H29.6243V30.0001H26.6243V27.125H20V24.125H32.3746C32.6508 24.125 32.8746 23.9011 32.8746 23.625V22.0001C32.8746 21.724 32.6508 21.5001 32.3746 21.5001H22.625C20.692 21.5001 19.125 19.9331 19.125 18.0001V16.3753C19.125 14.4423 20.692 12.8753 22.625 12.8753H26.6243V10.0005H29.6243V12.8753Z" fill="#FF0037"/>\n</svg>',
        },
        buttonText: {
          value: 'make payment',
        },
        buttonVariant: {
          targetItem: {
            type: {
              value: 'tertiary',
            },
          },
        },
        buttonHoverVariant: {
          targetItem: {
            type: {
              value: 'secondary',
            },
          },
        },
        buttonhref: {
          url: '/expresspay',
        },
      },
    ],
  },
}

describe('PayBillOnline', () => {
  it('should render correctly without subtitle', () => {
    ;(useAppData as any).mockImplementation(() => {
      return { ...mockData }
    })
    const { getByTestId } = render(<PayBillOnline />)
    const component = getByTestId('pay-bill-online')
    expect(
      component.querySelector('[data-testid=pay-bill-online-title]')?.innerHTML,
    ).toBe('Pay your bill online')
    expect(
      component.querySelector('[data-testid=pay-bill-online-subtitle]'),
    ).not.toBeInTheDocument()
  })

  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        subTitle: {
          value: 'Pay bill online subtitle',
        },
      }
    })
    const { getAllByTestId } = render(<PayBillOnline />)
    const component = getAllByTestId('pay-bill-online')[0]
    expect(
      component.querySelector('[data-testid=pay-bill-online-subtitle]')
        ?.innerHTML,
    ).toBe('Pay bill online subtitle')
  })

  it('should not render without list', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        tiles: {},
      }
    })
    const { queryByTestId } = render(<PayBillOnline />)
    const component = queryByTestId('pay-bill-online')
    expect(component).not.toBeInTheDocument()
  })
})
