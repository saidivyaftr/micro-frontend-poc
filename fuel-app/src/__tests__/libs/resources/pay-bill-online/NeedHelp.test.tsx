import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { NeedHelp } from 'src/libs/resources/pay-bill-online'
import { useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Need Help?',
  },
  description: {
    value: 'Need help description',
  },
}

const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

describe('NeedHelp', () => {
  it('should render correctly without button', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByTestId } = render(<NeedHelp />)
    const component = getByTestId('need-help')
    expect(
      component.querySelector('[data-testid=need-help-title]')?.innerHTML,
    ).toBe('Need Help?')
    expect(
      component.querySelector('[data-testid=need-help-description]')?.innerHTML,
    ).toBe('Need help description')
    expect(component.querySelector('[data-testid=need-help-button]')).toBeNull()
  })

  it('should render correctly with button', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        button: {
          url: '/helpcenter/billing/how-to-pay-your-bill',
          text: 'Get Support',
        },
      }
    })
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByRole } = render(<NeedHelp />)
    expect(getByRole('link', { name: 'Get Support' })).toBeInTheDocument()
  })

  it('should render correctly with image', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        image: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/payyourbill-page/Need-Help.png?rev=627ecc13fc304e82b5d4558578fd06bf',
          alt: 'Need help',
        },
      }
    })
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByAltText } = render(<NeedHelp />)
    expect(getByAltText('Need help')).toBeInTheDocument()
  })

  it('should render correctly with image for mobile', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        mobileImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/payyourbill-page/Need-Help.png?rev=627ecc13fc304e82b5d4558578fd06bf',
          alt: 'Need help mobile',
        },
      }
    })
    ;(useWindowDimensions as any).mockImplementation(() => {
      return {
        width: 375,
        height: 375,
        visualViewportWidth: 0,
      }
    })
    const { getByAltText } = render(<NeedHelp />)
    expect(getByAltText('Need help mobile')).toBeInTheDocument()
  })
})
