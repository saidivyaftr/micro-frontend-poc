import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import HeroSection from 'src/libs/shop/internet/fiber-internet/5-gig/Hero'

jest.mock('src/hooks')

const mockData = {
  heading: {
    value: 'Example',
  },
  title2: {
    value: 'Eero makes',
  },
  subHeading: {
    value: 'Ultimate performance. 99.9% network reliability.',
  },
  signUpButtonText: {
    value: 'Sign Up Now',
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
    const { getByTestId } = render(<HeroSection />)
    expect(getByTestId('heroSection')).toBeInTheDocument()
    expect(getByTestId('title2')).toBeInTheDocument()
  })

  it('should not render list', () => {
    ;(useAppData as any).mockImplementation(() => ({}))
    const { queryByTestId } = render(<HeroSection />)
    expect(queryByTestId('heroSection')).not.toBeInTheDocument()
  })
})
