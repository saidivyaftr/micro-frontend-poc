import { render } from '@testing-library/react'
import { useAppData, useWindowDimensions } from 'src/hooks'
import TwocardlayoutwithImageAndTitle from 'src/libs/shop/internet/fiber-internet/5-gig/TwocardlayoutwithImageAndTitle'
import { TwoColumnLayout } from '@/shared-ui/components'

jest.mock('src/utils/adobe/dynamicTagManagement/client', () => ({
  triggerEvent: jest.fn(),
}))
jest.mock('src/hooks')

const dimensionsData = {
  width: 1025,
}
const mockData = {
  mainHeading: {
    value: 'Go cable-free with YouTube TV',
  },
  subHeading: {
    value: 'Unlock savings when you purchase Frontier Fiber Internet',
  },

  image: {
    src: '"https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/5-gig/4_5gig_ytyv_xl.png?rev=3fc9384e96c147858c34b1258d9ddbf8"    ',
    alt: 'YouTubeTv',
  },
  mobileImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.n…xe300_xs.png?rev=c56de9e0f4cf4958afa63004c9f25b08',
    alt: 'Router',
  },
  button: {
    label: 'https://frontier.com/shop/tv',
    url: 'Learn More',
  },
}

describe('TwoCardLayoutwithImageAndTitle', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByTestId } = render(<TwocardlayoutwithImageAndTitle />)
    expect(getByTestId('Two-Card-LayoutWithImage')).toBeInTheDocument()
    expect(getByTestId('mainHeading')).toBeInTheDocument()
    expect(getByTestId('subHeading')).toBeInTheDocument()
  })
})

describe('TwoColumnLayout', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <TwoColumnLayout
        image="testsrc"
        title="test title"
        testId="layoutimage"
        content="Test content"
      />,
    )
    const image = getByTestId('layoutimage')
    const content = getByTestId('content')
    expect(image.getAttribute('src')).toBe('testsrc')
    expect(image.getAttribute('alt')).toBe('test title')
    expect(content.innerHTML).toBe('Test content')
  })
})
