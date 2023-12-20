import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { PayBillMobileApp } from 'src/libs/resources/pay-bill-online'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Pay your bill',
  },
  subTitle: {
    value: 'Pay your bill subtitle',
  },
}

describe('PayBillMobileApp', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId } = render(<PayBillMobileApp />)
    const component = getByTestId('pay-bill-mobile')
    expect(
      component.querySelector('[data-testid=pay-bill-mobile-title]')?.innerHTML,
    ).toBe('Pay your bill')
    expect(
      component.querySelector('[data-testid=pay-bill-mobile-subtitle]')
        ?.innerHTML,
    ).toBe('Pay your bill subtitle')
  })

  it('should render correctly with image', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        image: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/payyourbill-page/payBillMobileApp.png?rev=0990e89c5a3c46f2bb2f816d28d49eea',
          alt: 'payBillMobileApp',
        },
      }
    })
    const { getByAltText } = render(<PayBillMobileApp />)
    expect(getByAltText('payBillMobileApp')).toBeInTheDocument()
  })

  it('should render with play store and app store links', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        playStoreButtonImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Icons/PlayStore.png?rev=0d6097ec0bcc427cab2f13d65b2d9f6e',
          alt: 'PlayStore',
        },
        playStoreButtonUrl: {
          url: 'https://play.google.com/store/apps/details?id=com.frontier.selfserve',
        },
        appStoreButtonImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Icons/AppStore.png?rev=596e2b656d2b400f81e4900290908da7',
          alt: 'App Store',
        },
        appStoreButtonUrl: {
          url: 'https://apps.apple.com/us/app/myfrontier/id978439794',
        },
      }
    })
    const { getAllByRole } = render(<PayBillMobileApp />)
    expect(getAllByRole('link')[0]).toHaveAttribute(
      'href',
      'https://play.google.com/store/apps/details?id=com.frontier.selfserve',
    )
    expect(getAllByRole('link')[1]).toHaveAttribute(
      'href',
      'https://apps.apple.com/us/app/myfrontier/id978439794',
    )
  })
})
