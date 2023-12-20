import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { ShowTimeHero } from 'src/libs/shop/tv/channels/showtime'

jest.mock('src/hooks')

const mock = {
  firstTitle: { value: 'Title' },
  secondTitle: {
    value: '',
  },
  thirdTitle: {
    value: '',
  },
  description: {
    value:
      'SHOWTIME<sup>® </sup> is a premium television network and streaming<br/> service featuring award-winning Original Series, hit <br/>Hollywood movies, hilarious comedy specials, hard-hitting <br/>sports programming, groundbreaking documentaries and so <br/>much more.',
  },
  primaryButtonText: {
    value: 'HOW TO ORDER',
  },
  rootBackgroundColorLeft: {
    Color: null,
  },
  firstTitleColor: {
    Color: null,
  },
  rootBackgroundColorRight: {
    Color: null,
  },
  primaryButtonHref: {
    url: '',
  },
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/Showtime_Hero_desktop.png?rev=2f6e37a827084148b70422e698a18faa',
    alt: 'Hero',
  },
  mobileImage: {
    src: null,
    alt: '',
  },
}

describe('HeroSection', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mock)
    // ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByText, queryByTestId } = render(<ShowTimeHero />)
    expect(queryByTestId('hero-section')).toBeInTheDocument()
    expect(queryByTestId('title-value')).toBeInTheDocument()
    expect(getByText('Title')).toBeInTheDocument()
    expect(queryByTestId('description-value')).toBeInTheDocument()
    expect(queryByTestId('test-text')).toBeInTheDocument()
  })

  it('should not render without data', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {}
    })
    const { queryByTestId } = render(<ShowTimeHero />)
    expect(queryByTestId('hero-section')).not.toBeInTheDocument()
  })
})
