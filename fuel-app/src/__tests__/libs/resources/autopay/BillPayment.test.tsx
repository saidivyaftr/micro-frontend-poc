import { BillPayment } from 'src/libs/resources/autopay'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Bill Payment Title',
  },
  tiles: {
    list: [
      {
        title: {
          value: 'Save time',
        },
        description: {
          value:
            'Take back your time and let Auto Pay do the work for you. It’s easy to <nobr>set up</nobr>.',
        },
        svgIcon: {
          value:
            '<svg width="40" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">\n\n<path d="M20.0001 0L27 5L20.0001 10V7H16C9.37258 7 4 12.3726 4 19V27C4 32.1376 7.22866 36.5212 11.7677 38.2323L8.73875 41.2612C3.55189 38.615 0 33.2223 0 27V19C0 10.1634 7.16344 3 16 3H20.0001V0Z" fill="#FF0037"/>\n\n<path d="M31.9107 5.08926L28.9395 8.06051C33.103 9.94342 36 14.1334 36 19V27C36 33.6274 30.6274 39 24 39H20V36L13 41L20 46V43H24C32.8366 43 40 35.8366 40 27V19C40 13.041 36.7423 7.84281 31.9107 5.08926Z" fill="#FF0037"/>\n\n<path d="M18.6243 13.0005V15.8753H14.625C12.692 15.8753 11.125 17.4423 11.125 19.3753V21.0001C11.125 22.9331 12.692 24.5001 14.625 24.5001H24.3746C24.6508 24.5001 24.8746 24.724 24.8746 25.0001V26.625C24.8746 26.9011 24.6508 27.125 24.3746 27.125H12V30.125H18.6243V33.0001H21.6243V30.125H24.3746C26.3076 30.125 27.8746 28.558 27.8746 26.625V25.0001C27.8746 23.0671 26.3076 21.5001 24.3746 21.5001H14.625C14.3488 21.5001 14.125 21.2763 14.125 21.0001V19.3753C14.125 19.0991 14.3488 18.8753 14.625 18.8753H26.9996V15.8753H21.6243V13.0005H18.6243Z" fill="#FF0037"/>\n\n</svg>',
        },
        iconName: {
          src: null,
        },
        href: {
          url: '',
        },
      },
      {
        title: {
          value: 'Pay securely',
        },
        description: {
          value:
            'Automatic payments made safely and securely without entering your payment info each month.',
        },
        svgIcon: {
          value:
            '<svg width="41" height="45" viewBox="0 0 41 45" fill="none" xmlns="http://www.w3.org/2000/svg">\n\n<path d="M30.167 14L33.167 17L18.167 32L10.667 24.5L13.667 21.5L18.167 26L30.167 14Z" fill="#FF0037"/>\n\n<path fill-rule="evenodd" clip-rule="evenodd" d="M40.667 5L36.6033 5.40637C32.7488 5.79181 28.8729 4.92355 25.5513 2.93057L20.667 0L15.7827 2.93058C12.4611 4.92355 8.58514 5.79181 4.73071 5.40637L0.666992 5V21.6762C0.666992 28.7015 4.35297 35.2116 10.3771 38.8261L20.667 45L30.9569 38.826C36.981 35.2116 40.667 28.7015 40.667 21.6762V5ZM36.667 9.41738C32.0666 9.80665 27.457 8.73879 23.4933 6.36055L20.667 4.66476L17.8407 6.36055C13.8769 8.7388 9.26737 9.80665 4.66699 9.41738V21.6762C4.66699 27.2964 7.61578 32.5045 12.4351 35.3961L20.667 40.3352L28.8989 35.3961C33.7182 32.5045 36.667 27.2964 36.667 21.6762V9.41738Z" fill="#FF0037"/>\n\n</svg>',
        },
        iconName: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Icon/payment.png?rev=6017ec7de3834405a610cf806a4444ba',
        },
        href: {
          url: '',
        },
      },
      {
        title: {
          value: 'Save money',
        },
        description: {
          value:
            'Leave the stamps and late fees behind with convenient automatic payments.',
        },
        svgIcon: {
          value:
            '<svg width="44" height="43" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">\n\n<path d="M10.333 0C4.81016 0 0.333008 4.47715 0.333008 10V18.6863C0.333008 21.3385 1.38658 23.882 3.26194 25.7574L17.2619 39.7574C17.7699 40.2653 18.319 40.7072 18.8984 41.0831L21.8371 38.1443C21.2042 37.855 20.6113 37.4499 20.0904 36.9289L6.09037 22.9289C4.96515 21.8037 4.33301 20.2776 4.33301 18.6863V10C4.33301 6.68629 7.0193 4 10.333 4H19.0193C20.6106 4 22.1367 4.63214 23.2619 5.75736L37.2619 19.7574C37.7829 20.2783 38.188 20.8712 38.4773 21.5041L41.4161 18.5654C41.0403 17.986 40.5984 17.4369 40.0904 16.9289L26.0904 2.92894C24.215 1.05357 21.6715 0 19.0193 0H10.333Z" fill="#FF0037"/>\n\n<path d="M42.9353 22.703L23.036 42.6023C26.0082 42.9889 29.1208 42.0406 31.4041 39.7574L40.0904 31.0711C42.3736 28.7878 43.3219 25.6752 42.9353 22.703Z" fill="#FF0037"/>\n\n<path d="M10.333 13C11.9899 13 13.333 11.6569 13.333 10C13.333 8.34315 11.9899 7 10.333 7C8.67615 7 7.33301 8.34315 7.33301 10C7.33301 11.6569 8.67615 13 10.333 13Z" fill="#FF0037"/>\n\n<path d="M27.333 15H22.833V13H19.833V15H18.333C16.4 15 14.833 16.567 14.833 18.5V19C14.833 20.933 16.4 22.5 18.333 22.5H24.333C24.6091 22.5 24.833 22.7239 24.833 23V23.5C24.833 23.7761 24.6091 24 24.333 24H15.333V27H19.833V29H22.833V27H24.333C26.266 27 27.833 25.433 27.833 23.5V23C27.833 21.067 26.266 19.5 24.333 19.5H18.333C18.0569 19.5 17.833 19.2761 17.833 19V18.5C17.833 18.2239 18.0569 18 18.333 18H27.333V15Z" fill="#FF0037"/>\n\n</svg>',
        },
        iconName: {
          src: null,
        },
        href: {
          url: '',
        },
      },
    ],
  },
}

describe('BillPayment', () => {
  it('should render correctly without title', () => {
    ;(useAppData as any).mockImplementation(() => {
      return { ...mockData, title: { value: '' } }
    })
    const { getAllByTestId } = render(<BillPayment />)
    const firstBill = getAllByTestId('billPayment')[0]
    expect(
      firstBill.querySelector('[data-testid=billPayment-title]'),
    ).not.toBeInTheDocument()
  })

  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getAllByTestId } = render(<BillPayment />)
    const firstBill = getAllByTestId('billPayment')[0]
    expect(
      firstBill.querySelector('[data-testid=billPayment-title]')?.innerHTML,
    ).toBe('Bill Payment Title')
  })

  it('should not render without list', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        tiles: {
          list: [],
        },
      }
    })
    const { queryByTestId } = render(<BillPayment />)
    const firstBill = queryByTestId('billPayment')
    expect(firstBill).not.toBeInTheDocument()
  })
})
