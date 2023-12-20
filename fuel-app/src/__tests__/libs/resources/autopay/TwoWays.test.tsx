import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { TwoWays } from 'src/libs/resources/autopay'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Two ways to set up Auto Pay',
  },
  tiles: {
    list: [
      {
        content: {
          value:
            '<h4>In your online account</h4>\n<ol>\n<li><a href="/login">Sign in</a> to your online account.</li>\n<li>Under <b>My Payments</b>, select <b>Sign up for Auto Pay</b>.</li>\n<li>Choose an existing payment method or add a new one.</li>\n<li>Click <b>Sign up</b> to finish.\n\n            </li></ol>',
        },
        icon: {
          value:
            "<svg width='40' height='46' viewBox='0 0 40 46' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M20.0001 0L27 5L20.0001 10V7H16C9.37258 7 4 12.3726 4 19V27C4 32.1376 7.22866 36.5212 11.7677 38.2323L8.73875 41.2612C3.55189 38.615 0 33.2223 0 27V19C0 10.1634 7.16344 3 16 3H20.0001V0Z' fill='#FF0037'/><path d='M31.9107 5.08926L28.9395 8.06051C33.103 9.94342 36 14.1334 36 19V27C36 33.6274 30.6274 39 24 39H20V36L13 41L20 46V43H24C32.8366 43 40 35.8366 40 27V19C40 13.041 36.7423 7.84281 31.9107 5.08926Z' fill='#FF0037'/><path d='M18.6243 13.0005V15.8753H14.625C12.692 15.8753 11.125 17.4423 11.125 19.3753V21.0001C11.125 22.9331 12.692 24.5001 14.625 24.5001H24.3746C24.6508 24.5001 24.8746 24.724 24.8746 25.0001V26.625C24.8746 26.9011 24.6508 27.125 24.3746 27.125H12V30.125H18.6243V33.0001H21.6243V30.125H24.3746C26.3076 30.125 27.8746 28.558 27.8746 26.625V25.0001C27.8746 23.0671 26.3076 21.5001 24.3746 21.5001H14.625C14.3488 21.5001 14.125 21.2763 14.125 21.0001V19.3753C14.125 19.0991 14.3488 18.8753 14.625 18.8753H26.9996V15.8753H21.6243V13.0005H18.6243Z' fill='#FF0037'/></svg>",
        },
      },
      {
        content: {
          value:
            '<h4>In the mobile app</h4>\n<ol>\n<li>Sign in to your account from the <a href="/resources/myfrontier-mobile-app">MyFrontier mobile app.</a></li>\n<li>Select <b>Billing</b>, then <b>Manage</b>. Tap the Auto Pay toggle.</li>\n<li>Choose an existing payment method or add a new one.</li>\n<li>Tap <b>Save</b> to finish.</li>\n</ol>',
        },
        icon: {
          value:
            "<svg width='32' height='44' viewBox='0 0 32 44' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M10 0C4.47715 0 0 4.47715 0 10V34C0 34.6849 0.0688605 35.3538 0.200036 36H4V10C4 6.68629 6.68629 4 10 4H22C25.3137 4 28 6.68629 28 10V36H31.8C31.9311 35.3538 32 34.6849 32 34V10C32 4.47715 27.5228 0 22 0H10Z' fill='#FF0037'/><path d='M30.0007 40H1.99927C3.82368 42.4289 6.72836 44 10 44H22C25.2716 44 28.1763 42.4289 30.0007 40Z' fill='#FF0037'/><path d='M17 36C18.1046 36 19 35.1046 19 34V32C19 30.8954 18.1046 30 17 30H15C13.8954 30 13 30.8954 13 32V34C13 35.1046 13.8954 36 15 36H17Z' fill='#FF0037'/><path d='M23 8H9V12H23V8Z' fill='#FF0037'/></svg>",
        },
      },
    ],
  },
}

describe('TwoWays', () => {
  it('should render correctly with 2 tiles', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getAllByTestId, getByTestId } = render(<TwoWays />)
    const component = getByTestId('two-ways')
    expect(
      component.querySelector('[data-testid=two-ways-title]')?.innerHTML,
    ).toBe('Two ways to set up Auto Pay')
    expect(getAllByTestId('two-ways-tile').length).toBe(2)
  })

  it('should render with 1 tile', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        tiles: {
          list: [
            {
              content: {
                value:
                  '<h4>In your online account</h4>\n<ol>\n<li><a href="/login">Sign in</a> to your online account.</li>\n<li>Under <b>My Payments</b>, select <b>Sign up for Auto Pay</b>.</li>\n<li>Choose an existing payment method or add a new one.</li>\n<li>Click <b>Sign up</b> to finish.\n\n            </li></ol>',
              },
              icon: {
                value:
                  "<svg width='40' height='46' viewBox='0 0 40 46' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M20.0001 0L27 5L20.0001 10V7H16C9.37258 7 4 12.3726 4 19V27C4 32.1376 7.22866 36.5212 11.7677 38.2323L8.73875 41.2612C3.55189 38.615 0 33.2223 0 27V19C0 10.1634 7.16344 3 16 3H20.0001V0Z' fill='#FF0037'/><path d='M31.9107 5.08926L28.9395 8.06051C33.103 9.94342 36 14.1334 36 19V27C36 33.6274 30.6274 39 24 39H20V36L13 41L20 46V43H24C32.8366 43 40 35.8366 40 27V19C40 13.041 36.7423 7.84281 31.9107 5.08926Z' fill='#FF0037'/><path d='M18.6243 13.0005V15.8753H14.625C12.692 15.8753 11.125 17.4423 11.125 19.3753V21.0001C11.125 22.9331 12.692 24.5001 14.625 24.5001H24.3746C24.6508 24.5001 24.8746 24.724 24.8746 25.0001V26.625C24.8746 26.9011 24.6508 27.125 24.3746 27.125H12V30.125H18.6243V33.0001H21.6243V30.125H24.3746C26.3076 30.125 27.8746 28.558 27.8746 26.625V25.0001C27.8746 23.0671 26.3076 21.5001 24.3746 21.5001H14.625C14.3488 21.5001 14.125 21.2763 14.125 21.0001V19.3753C14.125 19.0991 14.3488 18.8753 14.625 18.8753H26.9996V15.8753H21.6243V13.0005H18.6243Z' fill='#FF0037'/></svg>",
              },
            },
          ],
        },
      }
    })
    const { getAllByTestId } = render(<TwoWays />)
    expect(getAllByTestId('two-ways-tile').length).toBe(1)
  })

  it('should render without tiles', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        tiles: {
          list: [],
        },
      }
    })
    const { queryAllByTestId } = render(<TwoWays />)
    expect(queryAllByTestId('two-ways-tile').length).toBe(0)
  })
})
