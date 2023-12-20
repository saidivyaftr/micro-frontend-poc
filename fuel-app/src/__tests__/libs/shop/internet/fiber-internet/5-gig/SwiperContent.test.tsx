import { fireEvent, render } from '@testing-library/react'
import { useAppData, useWindowDimensions } from 'src/hooks'
import SwiperContent, {
  Bars,
  Pie,
} from 'src/libs/shop/internet/fiber-internet/5-gig/SwiperContent'
import SwiperTabs from 'src/libs/shop/internet/fiber-internet/5-gig/SwiperTabs'

jest.mock('src/hooks')

const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}
const mockData = {
  list: {
    targetItems: [
      {
        barDescriptionList: {
          items: [
            {
              isFrontier: {
                value: true,
              },
              name: {
                value: 'Frontier latency',
              },
            },
            {
              isFrontier: {
                value: false,
              },
              name: {
                value: 'Competitor latency',
              },
            },
          ],
        },
        barList: {
          items: [
            {
              isFrontier: {
                value: true,
              },
              measure: {
                value: 8,
              },
              measureTitle: {
                value: '8 ms',
              },
              name: {
                value: 'Frontier',
              },
            },
            {
              isFrontier: {
                value: false,
              },
              measure: {
                value: 16,
              },
              measureTitle: {
                value: '16 ms',
              },
              name: {
                value: 'Comcast',
              },
            },
            {
              isFrontier: {
                value: false,
              },
              measure: {
                value: 24,
              },
              measureTitle: {
                value: '24 ms',
              },
              name: {
                value: 'Spectrum',
              },
            },
          ],
        },
        chartDescription: {
          value:
            'Frontier has the lowest latency of broadband providers measured in the FCC &ldquo;Latency by ISP&rdquo; report.',
        },
        componentType: {
          targetItem: {
            value: 'bar',
          },
        },
        description: {
          value:
            "Frontier Fiber is built for gaming. We have lower lag and lower data loss than cable. That's why U.S. News & World Report voted us Best Internet Provider for Gaming.",
        },
        imageBadge: {
          alt: 'Badge',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier',
        },
        pieComparisionText: {
          value: '',
        },
        pieList: {
          items: Array(0),
        },
        pieTitle: {
          value: '',
        },
        tabTitle: {
          value: 'Lower latency for better gaming',
        },
        title: {
          value: 'Lower latency for <br/> better gaming',
        },
        tooltipText: {
          value:
            'Best Internet Service Providers of 2022, U.S. News & World Report',
        },
      },
      {
        barDescriptionList: {
          items: [],
        },
        barList: {
          items: [],
        },
        chartDescription: {
          value: '',
        },
        componentType: {
          targetItem: {
            value: 'pie',
          },
        },
        description: {
          value:
            'Get blazing fast speeds with Frontier’s 5 Gig internet with uploads up to <b> 125x faster than cable. </b>',
        },
        imageBadge: {
          alt: null,
          src: ' ',
        },
        pieComparisionText: {
          value: 'vs',
        },
        pieList: {
          items: Array(0),
        },
        pieTitle: {
          value: 'Upload Speed',
        },
        tabTitle: {
          value: 'Faster Speed',
        },
        title: {
          value: 'Faster Speed',
        },
        tooltipText: {
          value:
            'Based on comparison of Frontier Fiber 5 Gig upload speed up to 5000 Mbps versus advertised cable upload speeds for Xfinity Gigabit plan of 35 Mbps, Spectrum Internet Gig plan of 35 Mbps and Optimum 1 Gig Internet plan of 35 Mbps.',
        },
      },
    ],
  },
}
describe('SwiperContent', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId } = render(<SwiperContent />)
    expect(getByTestId('swiper-content')).toBeInTheDocument()
  })
})

describe('should render bar', () => {
  ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
  ;(useAppData as any).mockImplementation(() => mockData)
  const { queryByTestId } = render(
    <Bars selectedTab={0} {...mockData.list.targetItems[0]} />,
  )
  expect(queryByTestId('bar')).toBeInTheDocument()
})

describe('should render pie', () => {
  ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
  ;(useAppData as any).mockImplementation(() => mockData)
  const { queryByTestId } = render(
    <Pie selectedTab={1} {...mockData.list.targetItems[1]} />,
  )
  expect(queryByTestId('pie')).toBeInTheDocument()
})

describe('SwiperTabs', () => {
  it('should render correctly', () => {
    const mockSetSelectedTab = jest.fn()
    const { getByText, getByTestId } = render(
      <SwiperTabs
        tabs={['FIRST', 'SECOND', 'THIRD']}
        selectedTabIndex={0}
        setSelectedTab={mockSetSelectedTab}
      />,
    )
    expect(getByText('FIRST')).toBeInTheDocument()
    expect(getByText('SECOND')).toBeInTheDocument()
    expect(getByText('THIRD')).toBeInTheDocument()
    const lastTab = getByTestId('Swiper-tabs-2')
    fireEvent.click(lastTab)
    expect(mockSetSelectedTab).toHaveBeenCalledWith(2)
  })
})

it('should not render list', () => {
  ;(useAppData as any).mockImplementation(() => ({
    ...mockData,
    list: {
      targetItems: [],
    },
  }))
  const { queryByTestId } = render(<SwiperContent />)
  expect(queryByTestId('swiper-content')).not.toBeInTheDocument()
})
