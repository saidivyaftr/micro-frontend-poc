import { HeroSection } from 'src/libs/shop/internet/fiber-internet/2-gig'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
jest.mock('src/hooks')

const mockData = {
  heading: {
    value: 'Introducing Frontier® Fiber 2 Gig Internet',
  },
  subHeading: {
    value: 'with our most advanced Wi-Fi ever',
  },
  signUpButtonText: {
    value: 'Sign Up Now',
  },
  signUpButtonHref: {
    url: '/order-online',
  },
  sectionBackgroundImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/banner-unstop.jpg?rev=f0f52b92b0604b86a30ea8e3d06b0b91',
    alt: 'woman using 2 gigabit internet with virtual realty headset',
  },
}

describe('HeroSection Offer', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText } = render(<HeroSection />)
    expect(getByText(mockData.subHeading.value)).toBeInTheDocument()
    expect(getByText(mockData.signUpButtonText.value)).toHaveTextContent(
      'Sign Up Now',
    )
  })
})
