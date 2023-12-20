import { render } from '@testing-library/react'
import HeroStripeBanner from 'src/libs/resources/HeroComponent'
import { useChatState } from 'src/hooks'
jest.mock('src/hooks')
const chatData = {
  isChatOpen: false,
  setChatState: () => null,
}
const mockData = {
  subTitle: {
    value: 'EYEBROW',
  },
  subTitleColor: {
    Color: {
      field: {
        value: 'default',
      },
    },
  },
  title1: {
    value: 'Main headline',
  },
  title2: {
    value: 'Example',
  },
  titleColor: {
    Color: {
      field: {
        value: 'default',
      },
    },
  },
  description: {
    value: 'Mattis arcu ut risus fermentum in ornare facilisi sit',
  },
  descriptionColor: {
    Color: {
      field: {
        value: 'default',
      },
    },
  },
  showStripes: {
    value: true,
  },
  primaryButton: {
    value: false,
  },
  showSubTitle: {
    value: true,
  },
  primaryButtonText: {
    value: '',
  },
  primaryButtonType: {
    type: {
      field: {
        value: 'button',
      },
    },
  },
  primaryButtonLink: {
    url: '',
  },
  backgroundImg: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/resources/hero_background_image_desktop.png?rev=ee2045c9360f4318824edbad2232e5d0',
    alt: 'hero',
  },
  mobileBackgroundImg: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/resources/hero_background_image_mobile.png?rev=ca59386a10f24fcabed0699eca559abe',
    alt: 'hero',
  },
  backgroundColor: {
    Color: null,
  },
  rootbackgroundColor: {
    Color: {
      field: {
        value: '#FFFFFF',
      },
    },
  },
}

describe('Hero Banner ', () => {
  it('should render without buttons correctly', () => {
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByTestId } = render(<HeroStripeBanner data={mockData} />)
    expect(getByTestId('title1')).toHaveTextContent('Main headline')
    expect(getByTestId('title2')).toHaveTextContent('Example')
    expect(getByTestId('description')).toHaveTextContent(
      'Mattis arcu ut risus fermentum in ornare facilisi sit',
    )
    expect(getByTestId('subTitle')).toHaveTextContent('EYEBROW')
    expect(getByTestId('hero-banner-stripe-section')).toBeTruthy()
  })
  it('should render with out chat button', () => {
    const mockDataWithoutChatButton = {
      ...mockData,
      chatButtonText: {
        value: 'Sign Up Now chat',
      },
    }
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByTestId } = render(
      <HeroStripeBanner data={mockDataWithoutChatButton} />,
    )
    expect(getByTestId('chat-button')).toHaveTextContent('Sign Up Now chat')
  })
  it('should render with out primary button', () => {
    const mockDataWithoutChatButton = {
      ...mockData,
      primaryButtonText: {
        value: 'Sign Up Now',
      },
    }
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByTestId } = render(
      <HeroStripeBanner data={mockDataWithoutChatButton} />,
    )
    expect(getByTestId('primary-button')).toHaveTextContent('Sign Up Now')
  })
  it('should render without EYEBROW text', () => {
    const mockDataWithoutChatButton = {
      ...mockData,
      subTitle: {
        value: '',
      },
    }
    ;(useChatState as any).mockImplementation(() => chatData)
    const { queryByTestId } = render(
      <HeroStripeBanner data={mockDataWithoutChatButton} />,
    )
    expect(queryByTestId('subTitle')).not.toBeInTheDocument()
  })
  it('should render without EYEBROW text', () => {
    const mockDataWithoutChatButton = {
      ...mockData,
      subTitle: {
        value: '',
      },
    }
    ;(useChatState as any).mockImplementation(() => chatData)
    const { queryByTestId } = render(
      <HeroStripeBanner data={mockDataWithoutChatButton} />,
    )
    expect(queryByTestId('subTitle')).not.toBeInTheDocument()
  })
  it('should render with root background color red', () => {
    const mockDataWithoutChatButton = {
      ...mockData,
      rootbackgroundColor: {
        Color: {
          field: {
            value: 'red',
          },
        },
      },
    }
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByTestId } = render(
      <HeroStripeBanner data={mockDataWithoutChatButton} />,
    )
    const element = getByTestId('hero-banner-stripe-section')
    const styles = getComputedStyle(element)
    expect(styles.backgroundColor).toBe('red')
  })
})
