import { render } from '@testing-library/react'
import { HeroSection } from 'src/libs/resources'
const mockData = {
  title: {
    value: 'Example Title',
  },
  subTitle: {
    value: 'Get step-by-step help setting up or making changes',
  },
  backgroundMobileImage:
    'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/autoPay-page/Mobile-thumbnail.png?rev=bf0d23a0c2df49339fb1d3f54c7ae031',
  thumbnailImage:
    'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/autoPay-page/thmbnail.png?rev=204eed87e4e8436d9b74541274c6edc6',
}

describe('Hero Banner ', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<HeroSection data={mockData} />)
    expect(getByTestId('hero-banner-section')).toBeTruthy()
  })
})
