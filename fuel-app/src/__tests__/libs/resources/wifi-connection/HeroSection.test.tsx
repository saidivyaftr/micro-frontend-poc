import { render } from '@testing-library/react'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { HeroSection } from 'src/libs/resources/wifi-connection'

jest.mock('src/hooks')
const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

const MOCK_DATA = {
  desktopImage: {
    src: 'https://i.postimg.cc/431SJV0F/desktop.png',
  },
  mobileImage: {
    src: 'https://i.postimg.cc/yWqPh85Z/mobile.png',
  },
  title: {
    value: 'title',
  },
  description: {
    value: 'Find out how to optimize your Wi-Fi<br> for peak performance',
  },
  button: {
    text: 'FIND OUT MORE',
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

describe('HeroSection', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => MOCK_DATA)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)

    const { getByTestId } = render(<HeroSection />)

    expect(getByTestId('hero-banner-title1')).toBeTruthy()
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
