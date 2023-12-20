import { render, fireEvent } from '@testing-library/react'
import { useSelector } from 'react-redux'
import { useAppData } from 'src/hooks'
import { HeroSection } from 'src/libs/resources/pay-bill-online'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
jest.mock('src/utils/adobe/dynamicTagManagement/client', () => ({
  triggerEvent: jest.fn(),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Online bill payment',
  },
  description: {
    value: 'Hero section description',
  },
  buttonText: {
    value: '',
  },
  buttonUrl: {
    value: '',
  },
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/payyourbill-page/payYourbill-hero.png?rev=aa6ee05753264715ac8ef66a6da8d279',
    alt: 'Online Bill Payment with Laptop',
  },
  mobileImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/payyourbill-page/payYourbill-mobile-Hero.png?rev=689fd6e47a9e4c7e9de52faecd5633d3',
    alt: 'Online Bill Payment with Laptop',
  },
  logoImage: {
    src: null,
    alt: '',
  },
  logoMobileImage: {
    src: null,
    alt: '',
  },
}
const loginStatus = {
  login: true,
}
describe('HeroSection', () => {
  it('should render correctly without button', () => {
    ;(useSelector as any).mockImplementation(() => loginStatus)
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, queryByRole } = render(<HeroSection />)
    expect(getByText('Online bill payment')).toBeInTheDocument()
    expect(getByText('Hero section description')).toBeInTheDocument()
    expect(queryByRole('link')).not.toBeInTheDocument()
  })

  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        button: {
          url: '/login',
          text: 'Sign in to pay',
        },
      }
    })
    const { getByRole } = render(<HeroSection />)
    const button = getByRole('link', { name: 'Sign in to pay' })
    fireEvent.click(button)
    expect(button).toBeInTheDocument()
    expect(DTMClient.triggerEvent).toHaveBeenCalled()
  })
})
