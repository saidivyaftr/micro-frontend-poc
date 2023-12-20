import { StickyBanner } from 'src/libs/offer/eero-secure'
import { render } from '@testing-library/react'
import { useAppData, useChatState, useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Sticky Banner title',
  },
  mobileTitle: {
    value: 'Sticky Banner title',
  },
  buttonText: {
    value: 'Button text',
  },
  chatButtonText: {
    value: 'CHAT NOW',
  },
  chatButtonURL: {
    value: '',
  },
}

const chatData = {
  isChatOpen: false,
  setChatState: () => null,
}

const dimensionsData = {
  width: 1025,
}

describe('StickyBanner', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByText, getAllByTestId } = render(<StickyBanner />)
    const firstBanner = getAllByTestId('banner')[0]
    expect(
      firstBanner.querySelector('[data-testid=bannerTitle]')?.innerHTML,
    ).toBe('Sticky Banner title')
    expect(getByText('Button text')).toBeInTheDocument()
    expect(getByText('CHAT NOW')).toBeInTheDocument()
  })

  it('should not render button', () => {
    ;(useAppData as any).mockImplementation(() => {
      return { ...mockData, buttonText: {} }
    })
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getAllByTestId } = render(<StickyBanner />)
    const firstBanner = getAllByTestId('banner')[0]
    expect(
      firstBanner
        .querySelector('[data-testid=bannerButton]')
        ?.getAttribute('text'),
    ).toBeUndefined()
  })

  it('should render for mobile', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    ;(useChatState as any).mockImplementation(() => chatData)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getAllByTestId } = render(<StickyBanner />)
    const firstBanner = getAllByTestId('banner')[0]
    expect(
      firstBanner.querySelector('[data-testid=bannerMobileTitle]'),
    ).toBeNull()
  })

  it('should not render without data', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {}
    })
    const { queryByTestId } = render(<StickyBanner />)
    const firstBanner = queryByTestId('bannerTitle')
    expect(firstBanner).not.toBeInTheDocument()
  })
})
