import { render } from '@testing-library/react'
import { useAppData, useWindowDimensions } from 'src/hooks'
import Gig5MaxPerformance from 'src/libs/shop/internet/fiber-internet/5-gig/Gig5MaxPerformance'

jest.mock('src/utils/adobe/dynamicTagManagement/client', () => ({
  triggerEvent: jest.fn(),
}))
jest.mock('src/hooks')

const dimensionsData = {
  width: 1025,
}
const mockData = {
  mainHeading: {
    value:
      'Maximize performance with <br/>\nthe industry’s fastest Wi-Fi 6E router',
  },
  subHeading: {
    value:
      'An Archer AXE300 Wi-Fi 6E router is included with your Fiber 5 Gig order.',
  },
  list: {
    targetItems: [
      {
        description: {
          value:
            'Get up to 15.6 Gbps Quad-Band Wi-Fi for faster streaming, and downloading, all at the same time.',
        },
        title: {
          value: 'Built for speed',
        },
      },
      {
        description: {
          value:
            '2.0 Ghz quad-core processor and 1 GB RAM ensure fa…h operation of numerous devices and applications.',
        },
        title: {
          value: 'Powerful CPU',
        },
      },
      {
        description: {
          value:
            'The Archer AXE300 future-proofs your home Wi-Fi with a higher capacity of 200+ devices.',
        },
        title: {
          value: 'Maximized coverage',
        },
      },
    ],
  },
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.n…xe300_xl.png?rev=990118dd5c164794accebc5a155d191d',
    alt: 'Router',
  },
  mobileImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.n…xe300_xs.png?rev=c56de9e0f4cf4958afa63004c9f25b08',
    alt: 'Router',
  },
  button: {
    label: 'Sign Up Now',
    url: '/buy',
  },
}

describe('Gig5MaxPerformance', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByText, getByTestId } = render(<Gig5MaxPerformance />)
    expect(getByTestId('gig5-max-performance')).toBeInTheDocument()
    expect(getByTestId('subHeading')).toBeInTheDocument()
    expect(getByText('Built for speed')).toBeInTheDocument()
    expect(
      getByText(
        'Get up to 15.6 Gbps Quad-Band Wi-Fi for faster streaming, and downloading, all at the same time.',
      ),
    ).toBeInTheDocument()
    expect(getByText('Powerful CPU')).toBeInTheDocument()
    expect(
      getByText(
        '2.0 Ghz quad-core processor and 1 GB RAM ensure fa…h operation of numerous devices and applications.',
      ),
    ).toBeInTheDocument()
    expect(getByText('Maximized coverage')).toBeInTheDocument()
    expect(
      getByText(
        'The Archer AXE300 future-proofs your home Wi-Fi with a higher capacity of 200+ devices.',
      ),
    ).toBeInTheDocument()
    const imageContent = getByTestId('cardImage')

    expect(imageContent.getAttribute('src')).toBe(
      'https://vsgstoqarg-539670-cdn-endpoint.azureedge.n…xe300_xl.png?rev=990118dd5c164794accebc5a155d191d',
    )
    expect(imageContent.getAttribute('alt')).toBe('Router')
  })

  it('should render correctly with button', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        button: {
          url: '/buy',
          label: 'Sign Up Now',
        },
      }
    })
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByRole } = render(<Gig5MaxPerformance />)
    expect(getByRole('link', { name: 'Sign Up Now' })).toBeInTheDocument()
  })
})

it('should not render list', () => {
  ;(useAppData as any).mockImplementation(() => ({}))
  const { queryByTestId } = render(<Gig5MaxPerformance />)
  expect(queryByTestId('gig5-max-performance')).not.toBeInTheDocument()
})
