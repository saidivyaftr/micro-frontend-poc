import { render } from '@testing-library/react'
import { HowToGetPerformance } from 'src/libs/resources/wifi-connection'
import { useAppData, useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')
const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

const MOCK_DATA = {
  title: {
    value: 'title',
  },
  list: {
    targetItems: [
      {
        icon: {
          value: 'one',
        },
        title: {
          value: 'Place your router in the right location',
        },
        description: {
          value:
            'Keep your router in a central location in your home with plenty of unobstructed space. <a href=" https://blog.frontier.com/2019/11/tips-to-improve-stronger-wifi-signal/">Learn more about improving signal strength.</a>',
        },
        toolTip: {
          value: 'any value',
        },
      },
      {
        icon: {
          value: 'two',
        },
        title: {
          value: 'Test your speed and optomize your internet',
        },
        description: {
          value:
            'Visit <a href="https://speedtest.frontier.com/">speedtest.frontier.com</a> on a connected device to test your network speed. <a href="https://blog.frontier.com/2020/09/how-and-why-to-conduct-an-internet-speed-test/">Learn more about optimizing your internet speed.</a>',
        },
        toolTip: {
          value: 'any value',
        },
      },
      {
        icon: {
          value: 'three',
        },
        title: {
          value: 'Troubleshoot common issues',
        },
        description: {
          value:
            'Get to know the most common home internet issues and <a>how you can solve them.</a>',
        },
        toolTip: {
          value: 'any value',
        },
      },
    ],
  },
}
describe('How to get Performance component', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => MOCK_DATA)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)

    const { getAllByTestId, getByTestId, container } = render(
      <HowToGetPerformance />,
    )

    expect(getByTestId('how-to-get-performance')).toBeTruthy()
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

    const { queryByTestId } = render(<HowToGetPerformance />)
    expect(queryByTestId('how-to-get-performance')).not.toBeInTheDocument()
  })
})
