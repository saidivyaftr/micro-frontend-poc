import { render } from '@testing-library/react'
import { useSelector } from 'react-redux'
import { useAppData } from 'src/hooks'
import { HeroSection } from 'src/libs/resources/myfrontier-mobile-app'
jest.mock('src/utils/adobe/dynamicTagManagement/client', () => ({
  triggerEvent: jest.fn(),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

jest.mock('src/hooks')
const loginStatus = {
  login: true,
}
const mockData = {
  title: {},
  description: {
    value: 'Hero section description',
  },
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/myfrontier-mobile-app-page/myfrontier-mobile-app-Hero.png?rev=02ec5061ac50471680c0f9a32ba84560',
    alt: 'Hero Image',
  },
}

describe('HeroSection', () => {
  it('should render correctly without title', () => {
    ;(useSelector as any).mockImplementation(() => loginStatus)
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, queryByText } = render(<HeroSection />)
    expect(queryByText('Hero section title')).not.toBeInTheDocument()
    expect(getByText('Hero section description')).toBeInTheDocument()
  })

  it('should render correctly without description', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        title: { value: 'Hero section title' },
        description: {},
      }
    })
    const { getByText, queryByText } = render(<HeroSection />)
    expect(getByText('Hero section title')).toBeInTheDocument()
    expect(queryByText('Hero section description')).not.toBeInTheDocument()
  })
})
