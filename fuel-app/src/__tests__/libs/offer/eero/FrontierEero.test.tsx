import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { FrontierEero } from 'src/libs/offer/eero'

jest.mock('src/hooks')
const mockData = {
  titleImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/eero-Page/FrontierEero.png?rev=9004d9d59c7c48298e557ccae1abe769',
    alt: 'Forget about Dead Spots',
  },
  primaryButtonText: {
    value: 'FrontierEero',
  },
  primaryButtonLink: {
    url: '',
  },
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/eero-Page/FrontierEero-Image.png?rev=5add00f0dce84f3d84aa4233d025ae4a',
    alt: 'Forget about Dead Spots',
  },
  mobileImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/eero-Page/FrontierEero-Image-Mobile.png?rev=bb5e411a125141a4a555edb1e9021514',
    alt: 'Forget about Dead Spots',
  },
  subTitle: {
    value:
      'Teamed up with eero to bring you a premium home internet experience.',
  },
  perks: {
    list: [
      {
        title: {
          value: 'Better Wi-Fi coverage',
        },
      },
      {
        title: {
          value: 'Faster Wi-Fi speeds',
        },
      },
      {
        title: {
          value: 'More connected devices at once without slowing down',
        },
      },
      {
        title: {
          value: 'Added safety and security',
        },
      },
    ],
  },
}
describe('FrontierEero', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, getByTestId } = render(<FrontierEero />)
    const imageContent = getByTestId('frontierEero-image')
    expect(
      getByText(
        'Teamed up with eero to bring you a premium home internet experience.',
      ),
    ).toBeInTheDocument()
    expect(getByText('Faster Wi-Fi speeds')).toBeInTheDocument()
    expect(getByText('FrontierEero')).toBeInTheDocument()
    expect(imageContent.getAttribute('src')).toBe(mockData.titleImage.src)
    expect(imageContent.getAttribute('alt')).toBe(mockData.titleImage.alt)
  })
  it('should render without image', () => {
    ;(useAppData as any).mockImplementation(() => ({
      ...mockData,
      titleImage: {
        src: '',
      },
    }))
    const { getByText, queryByText } = render(<FrontierEero />)
    expect(getByText('FrontierEero')).toBeInTheDocument()
    expect(
      getByText(
        'Teamed up with eero to bring you a premium home internet experience.',
      ),
    ).toBeInTheDocument()
    expect(getByText('Faster Wi-Fi speeds')).toBeInTheDocument()
    expect(queryByText('frontierEero-image')).not.toBeInTheDocument()
  })
  it('should render without subTitle', () => {
    ;(useAppData as any).mockImplementation(() => ({
      ...mockData,
      subTitle: {
        value: '',
      },
    }))
    const { getByText, queryByText } = render(<FrontierEero />)
    expect(getByText('FrontierEero')).toBeInTheDocument()
    expect(
      queryByText(
        'Teamed up with eero to bring you a premium home internet experience.',
      ),
    ).not.toBeInTheDocument()
    expect(getByText('Faster Wi-Fi speeds')).toBeInTheDocument()
  })

  it('should render without button', () => {
    ;(useAppData as any).mockImplementation(() => ({
      ...mockData,
      primaryButtonText: {
        value: '',
      },
    }))
    const { getByText, queryByText } = render(<FrontierEero />)
    expect(queryByText('FrontierEero')).not.toBeInTheDocument()
    expect(getByText('Faster Wi-Fi speeds')).toBeInTheDocument()
  })
  it('should render without perksList', () => {
    ;(useAppData as any).mockImplementation(() => ({
      ...mockData,
      perks: {
        list: [],
      },
    }))
    const { getByTestId, queryByText } = render(<FrontierEero />)
    const imageContent = getByTestId('frontierEero-image')
    expect(imageContent.getAttribute('src')).toBe(mockData.titleImage.src)
    expect(imageContent.getAttribute('alt')).toBe(mockData.titleImage.alt)
    expect(queryByText('FrontierEero')).toBeInTheDocument()
    expect(queryByText('Faster Wi-Fi speeds')).not.toBeInTheDocument()
  })
})
