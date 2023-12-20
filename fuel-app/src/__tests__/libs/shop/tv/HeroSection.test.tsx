import { HeroSection } from 'src/libs/shop/tv'
import { render } from '@testing-library/react'
import { useAppData, useWindowDimensions, useChatState } from 'src/hooks'

jest.mock('src/hooks')

const dimensionsData = { width: 1025, height: 1025, visualViewportWidth: 0 }
const chatData = {
  isChatOpen: false,
  setChatState: () => null,
}
const mock = {
  titleLoggedIn: { value: 'Switch to YouTube TV and save up to $400' },
  titleNotLoggedIn: { value: 'Save up to $400 your first year vs. cable' },
  subtitleLoggedIn: { value: 'your first year vs. cable TV' },
  subtitleNotLoggedIn: {
    value: 'with Frontier Fiber + YouTube TV',
  },
  descriptionLoggedIn: {
    value:
      'Frontier customers: Switch to YouTube TV and save up to $400 your first year vs.',
  },
  descriptionNotLoggedIn: {
    value:
      'Get your favorite channels with Frontier Fiber and YouTube TV. Save up to $400 your first year vs. cable. Watch 100+ channels of live sports, news and shows on our ultra-fast fiber internet.',
  },
  chatButton: { text: 'CHAT TO ORDER' },
  checkAvailabilityButton: {
    text: 'CHECK AVAILABILITY',
    url: 'https://internet.frontier.com/?offer=youtubetv',
  },
  alreadyCustomer: { value: 'Already a customer?' },
  chatNow: { value: 'Chat now' },
  fullTerms: { value: 'See full terms.' },
  toolTipText: {
    value:
      'For new YouTube TV base plan users with new Frontier Fiber internet. Terms apply. Savings estimate based on February 2023 study of YouTube TV promotional price of $62.99 and Frontier Fiber 1 Gig price of $69.99 vs. lowest advertised first-year cost of comparable cable TV and internet offers by major providers in Frontier markets, including all charges and fees (except RSN fees), promotion pricing, DVR box rental and service fee, and a second cable box for the home.',
  },
  desktopImage: { src: 'https://i.postimg.cc/7L9grpTZ/desktop.png' },
  mobileImage: { src: 'https://i.postimg.cc/cCgYYCkv/mobile.png' },
}

describe('HeroSection', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mock)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByText, queryByTestId } = render(<HeroSection />)
    expect(queryByTestId('title-value')).toBeInTheDocument()
    expect(queryByTestId('subtitle-value')).toBeInTheDocument()
    expect(queryByTestId('description-value')).toBeInTheDocument()
    expect(queryByTestId('btn-container')).toBeInTheDocument()
    expect(getByText('See full terms.')).toBeInTheDocument()
  })

  it('should not render without data', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {}
    })
    const { queryByTestId } = render(<HeroSection />)
    expect(queryByTestId('hero')).not.toBeInTheDocument()
  })
})
