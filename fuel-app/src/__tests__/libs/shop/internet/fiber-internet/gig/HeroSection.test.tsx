import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import HeroSection from 'src/libs/shop/internet/fiber-internet/gig/HeroSection'

jest.mock('src/hooks')

const mockData = {
  heading: {
    value: 'Example',
  },
  subHeading: {
    value: 'Better. Faster. 100% fiber',
  },
  signUpButtonText: {
    value: 'Get 1 Gig',
  },
  signUpButtonHref: {
    url: '/buy',
  },
  sectionBackgroundImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.n…-hero-xl.png?rev=311d635b2a354c96952884b33874d7c3',
    alt: 'Hero',
  },
  sectionBackgroundMobileImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.n…-hero-xs.png?rev=00e0c05f01e64f86ba628d682ddc8bd0',
    alt: 'Hero',
  },
}

describe('Hero', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId, queryAllByTestId } = render(<HeroSection />)
    expect(queryAllByTestId('heroSection')).toBeInTheDocument()
    expect(getByTestId('subHeading')).toBeInTheDocument()
  })

  it('should not render list', () => {
    ;(useAppData as any).mockImplementation(() => ({}))
    const { queryByTestId } = render(<HeroSection />)
    expect(queryByTestId('heroSection')).not.toBeInTheDocument()
  })
})
