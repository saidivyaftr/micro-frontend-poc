import { render } from '@testing-library/react'
import { useAppData, useWindowDimensions, useChatState } from 'src/hooks'
import { HeroSection } from 'src/libs/resources/cancel-service'

jest.mock('src/hooks')
const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

const MOCK_DATA = {
  desktopImage: {
    src: 'https://i.postimg.cc/Fsqpn18m/cancel-service-hero-xl-1.png',
  },
  mobileImage: {
    src: 'https://i.postimg.cc/TPkB1ThP/cancel-sevice-hero-xs-1mobile.png',
  },
  title: {
    value: 'CANCELING SERVICE',
  },
  description: {
    value: 'Before you go, let’s see if we can help',
  },
  button: {
    text: 'CHAT NOW',
    url: '/',
  },
  toolTipText: {
    value: 'test',
  },
  legalText: {
    value: '',
  },
  legalTextColor: {
    Color: '',
  },
  rootBackgroundColorLeft: {
    Color: '#141928',
  },
  rootBackgroundColorRight: {
    Color: '#141928',
  },
}
const chatData = {
  isChatOpen: false,
  setChatState: jest.fn(),
}
describe('HeroSection', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => MOCK_DATA)
    ;(useChatState as any).mockImplementation(() => chatData)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)

    const { getByTestId } = render(<HeroSection />)

    expect(getByTestId('hero-section')).toBeTruthy()
  })

  it('should not render correctly', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...MOCK_DATA,
        title: {
          value: '',
        },
      }
    })
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { queryByTestId } = render(<HeroSection />)
    expect(queryByTestId('hero-banner-title1')).not.toBeTruthy()
  })
})
