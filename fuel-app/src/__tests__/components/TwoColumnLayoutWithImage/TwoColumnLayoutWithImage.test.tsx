import { render } from '@testing-library/react'
import TwoColumnLayoutWithImage from 'src/components/TwoColumnLayoutWithImage/TwoColumnLayoutWithImage'
import { useAppData, useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')
const dimensionsData = {
  width: 500,
}
const data = {
  componentName: 'twoColumnLayoutGlobal',
  title: {
    value: 'Whole Home Wi-Fi',
  },
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/500Page/Whole-home-Wi-Fi-guarantee.png?rev=62ccac29638547ce9ae606319feb2a2a',
    alt: 'Whole home Wi-Fi guarantee',
  },
  mobileImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/500Page/Whole-home-Wi-Fi-guarantee-Mobile.png?rev=afe8ee9683c84dffa4dfcbbd8a226baa',
    alt: 'Whole home Wi-Fi Mobile',
  },
  titleColorCode: {
    targetItem: null,
  },
  descriptionColorCode: {
    targetItem: null,
  },
  contentBlockColorCode: {
    targetItem: null,
  },
  tooltipColorCode: {
    targetItem: null,
  },
  description: {
    value:
      'Get guaranteed coverage in every room of your home. Add Wi-Fi extenders to your plan for just $10 per month.',
  },
  isDarkMode: {
    value: false,
  },
  tooltipContent: {
    value:
      'Whole Home Wi-Fi consists of up to two Wi-Fi extenders. Equipment model and quantity will be determined at the time of installation. Coverage varies based on normal use and building conditions.',
  },
  legalText: {
    value: '',
  },
}
describe('twoColumnLayout', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => data)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByText, getByTestId } = render(<TwoColumnLayoutWithImage />)
    expect(getByText(data.title.value)).toBeInTheDocument()
    expect(getByText(data.description.value)).toBeInTheDocument()
    const image = getByTestId('Image-id')
    expect(image.getAttribute('src')).toBe(data.image.src)
  })
  it('should not render correctly', () => {
    const withOutTitle = {
      ...data,
      title: {
        value: '',
      },
    }
    ;(useAppData as any).mockImplementation(() => withOutTitle)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { queryByText } = render(<TwoColumnLayoutWithImage />)
    expect(queryByText('Whole Home Wi-Fi')).not.toBeInTheDocument()
  })
})
