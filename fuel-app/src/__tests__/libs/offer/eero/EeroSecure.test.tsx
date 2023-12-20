import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { EeroSecure } from 'src/libs/offer/eero'

jest.mock('src/hooks')
const mockData = {
  buttonText: {
    value: 'Explore eero Secure',
  },
  title: {
    value: 'eero Secure',
  },
  description: {
    value: 'connected devices and network protected from online',
  },
  buttonUrl: null,
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/shared/EeroSecure.png?rev=85c0394f167d4a9e8e55fab86f14019e',
    alt: 'EeroSecure',
  },
  mobileImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/shared/EeroSecure-Mobile.png?rev=0ca75d22db654841922d6d1ea4df6b5e',
    alt: 'EeroSecure',
  },
  logoImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/eero-secure-page/eero-secure-logo.png?rev=3a086c0334064c66b6d11421c7c8edbf',
    alt: 'Eero Secure',
  },
  logoMobileImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/eero-secure-page/mobile-logo.png?rev=42788684560b494bbb20b87346615e90',
    alt: 'Eero Secure',
  },
}
describe('EeroSecure', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, getByTestId } = render(<EeroSecure />)
    expect(getByText('eero Secure')).toBeInTheDocument()
    expect(
      getByText('connected devices and network protected from online'),
    ).toBeInTheDocument()
    expect(getByTestId('button-secure')).toBeInTheDocument()
  })
  it('should render without description', () => {
    ;(useAppData as any).mockImplementation(() => ({
      ...mockData,
      description: {
        value: '',
      },
    }))
    const { getByText, queryByTestId } = render(<EeroSecure />)
    expect(getByText('eero Secure')).toBeInTheDocument()
    expect(queryByTestId('description-value')).not.toBeInTheDocument()
    expect(getByText('Explore eero Secure')).toBeInTheDocument()
  })
  it('should render without description', () => {
    ;(useAppData as any).mockImplementation(() => ({
      ...mockData,
      buttonText: {
        value: '',
      },
    }))
    const { queryByTestId } = render(<EeroSecure />)
    expect(queryByTestId('button-secure')).not.toBeInTheDocument()
  })
})
