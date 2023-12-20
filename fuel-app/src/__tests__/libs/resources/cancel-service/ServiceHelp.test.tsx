import { render } from '@testing-library/react'
import { ServiceHelp } from 'src/libs/resources/cancel-service'
import { useAppData, useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')
const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

const MOCK_DATA = {
  title: {
    value: 'We have solutions for you',
  },
  tiles: {
    targetItems: [
      {
        title: {
          value: 'Move your service',
        },
        description: {
          value:
            'Frontier is available in 25 states. If you’re relocating, you might be able to <a href="https://frontier.com/resources/movers">transfer your services</a>. ',
        },
        href: {
          url: '/helpcenter/categories/billing',
        },
        svgIcon: {
          rendered: 'leftRightArrow',
        },
        iconName: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Icon/billing-icon.png?rev=2f5da3b8f8904fc2b04993c04bfc63bd',
        },
      },
      {
        title: {
          value: 'Pause your service',
        },
        description: {
          value:
            'Leaving home temporarily? You can <a href="https://frontier.com/resources/vacation-services">suspend your Frontier services</a> and fees for one to nine months.',
        },
        href: {
          url: '/helpcenter/categories/internet',
        },
        icon: {
          value: 'wifiCrop',
        },
        svgIcon: {
          rendered: 'wifiCrop',
        },
        iconName: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Icon/wifi-icon.png?rev=a1a157a8408d4bbaab46189c5711c195',
        },
      },
      {
        title: {
          value: 'Save on your bill',
        },
        description: {
          value:
            'You can save $5/mo. with Auto Pay. Plus, chat with us to explore other solutions that fit your budget.',
        },
        href: {
          url: '/helpcenter/categories/ticket-status',
        },
        svgIcon: {
          rendered: 'DownArrow',
        },
        iconName: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Icon/ticket-icon.png?rev=a357e795259546439d632fd218182179',
        },
      },
    ],
  },
}
describe('How to get Performance component', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => MOCK_DATA)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)

    const { getAllByTestId, getByTestId, container } = render(<ServiceHelp />)

    expect(getByTestId('service-help')).toBeTruthy()
    expect(getAllByTestId('test-description').length).toBe(3)
    expect(container.getElementsByClassName('tile-icon').length).toBe(3)
  })

  it('should not render correctly', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...MOCK_DATA,
        title: {
          value: '',
        },
      }
    })
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)

    const { queryByTestId } = render(<ServiceHelp />)
    expect(queryByTestId('how-to-get-performance')).not.toBeInTheDocument()
  })
})
