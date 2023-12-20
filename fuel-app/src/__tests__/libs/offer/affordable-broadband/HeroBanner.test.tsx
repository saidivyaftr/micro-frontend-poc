import { render } from '@testing-library/react'
import { HeroSection } from 'src/libs/offer/affordable-broadband'
import { useAppData, useChatState } from 'src/hooks'

jest.mock('src/hooks')
const chatData = {
  isChatOpen: true,
  setChatState: () => null,
}
const MOCK_DATA = {
  componentName: 'heroBanner',
  title: {
    value: 'Hero',
  },
  description: {
    value: 'Hero description',
  },
  buttonText: {
    value: 'CHAT NOW',
  },
  image: 'https://frontier.com/~/media/Why-Frontier/images/wf-banner.jpg',
  mobileImage:
    'https://frontier.com/~/media/Why-Frontier/images/wf-banner-sm.jpg',
}
describe('Hero', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => MOCK_DATA)
    ;(useChatState as any).mockImplementation(() => chatData)

    const { getByTestId } = render(<HeroSection />)
    expect(getByTestId('hero-banner-section')).toBeTruthy()
  })
  it('should render correctly title and image', () => {
    ;(useAppData as any).mockImplementation(() => MOCK_DATA)
    ;(useChatState as any).mockImplementation(() => chatData)

    const { getByText } = render(<HeroSection />)
    expect(getByText(MOCK_DATA.title.value)).toBeInTheDocument()
    expect(getByText(MOCK_DATA.description.value)).toBeInTheDocument()
  })
  it('should render correctly title and image', () => {
    const mockDataWithoutTitle = {
      ...MOCK_DATA,
      title: {
        value: '',
      },
    }
    ;(useAppData as any).mockImplementation(() => mockDataWithoutTitle)
    ;(useChatState as any).mockImplementation(() => chatData)

    const { queryByTestId } = render(<HeroSection />)
    expect(queryByTestId(MOCK_DATA.title.value)).not.toBeInTheDocument()
  })
})
