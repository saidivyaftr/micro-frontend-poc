import { fireEvent, render } from '@testing-library/react'
import { useSelector } from 'react-redux'
import { useAppData } from 'src/hooks'
import { HeroSection } from 'src/libs/resources/autopay'
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
    value: 'Hero section title',
  },
  focusTitle: {
    value: 'Auto Pay',
  },
  description: {
    value: 'Hero section description',
  },
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/autoPay-page/autoPay-Hero.png?rev=fa85baae51724b6c8247b9da340e2332',
    alt: 'Autopay Hero',
  },
  mobileImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/autoPay-page/autoPay-Hero-Mobile.png?rev=755edc25b1b8406d975342b8377577b2',
    alt: 'Autopay Hero',
  },
}
const loginStatus = {
  state: {
    login: true,
  },
}

describe('HeroSection', () => {
  it('should render correctly without button', () => {
    ;(useSelector as any).mockImplementation(() => loginStatus)
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, queryByRole } = render(<HeroSection />)
    expect(getByText('Hero section title')).toBeInTheDocument()
    expect(getByText('Auto Pay')).toBeInTheDocument()
    expect(getByText('Hero section description')).toBeInTheDocument()
    expect(queryByRole('link')).not.toBeInTheDocument()
  })

  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        button: {
          url: '/login?target=2f6163636f756e74#/payments/autopay-signup',
          text: 'Sign up',
        },
      }
    })
    const { getByRole } = render(<HeroSection />)
    const button = getByRole('link', { name: 'Sign up' })
    fireEvent.click(button)
    expect(button).toBeInTheDocument()
    expect(DTMClient.triggerEvent).toHaveBeenCalled()
  })
})
