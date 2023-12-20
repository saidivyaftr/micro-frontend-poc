import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { GetMoreValue } from 'src/libs/shop/internet/fiber-internet/5-gig'
import { Button, FourTiles, Tooltip } from '@/shared-ui/components'
import { useWindowDimensions } from 'src/hooks'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))
jest.mock('src/hooks')

const dimensionsData = {
  width: 1024,
}
const mockData = {
  title: {
    value: 'Example',
  },
  subTitle: {
    value: 'Example2',
  },
  list: {
    targetItems: [
      {
        description: {
          value:
            'Get an Archer AXE300 Wi-Fi 6E router included with your Fiber 5 Gig order.',
        },
        title: {
          value: 'The industry’s fastest Wi-Fi 6E router',
        },
        tooltip: {
          value: '',
        },
      },
      {
        description: {
          value:
            'Claim a $200 Visa Reward Card when you order Fiber 5 Gig internet.1',
        },
        title: {
          value: '$200 Visa® Reward Card',
        },
        tooltip: {
          value: 'Example1',
        },
      },
      {
        description: {
          value:
            'U.S.-based tech experts are available 7 a.m. to midnight ET, 365 days a year to help you when you need it.',
        },
        title: {
          value: 'Free premium tech support',
        },
        tooltip: {
          value: '',
        },
      },
      {
        description: {
          value:
            'Our certified technicians will install your Fiber 5 Gig internet completely free of charge.',
        },
        title: {
          value: 'Free expert installation',
        },
        tooltip: {
          value: '',
        },
      },
    ],
  },
  legalDisclaimer: { value: '' },
}
describe('GetMoreValue', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId, queryByTestId } = render(<GetMoreValue />)
    expect(getByTestId('get-more-value')).toBeInTheDocument()
    expect(getByTestId('h2Title')).toBeInTheDocument()
    expect(getByTestId('subTitle')).toBeInTheDocument()
    expect(queryByTestId('legalDisclaimer')).not.toBeInTheDocument()
  })
})

it('should render without button', () => {
  ;(useAppData as any).mockImplementation(() => ({
    ...mockData,
    primaryButtonText: {
      value: '',
    },
  }))
  const { getByTestId } = render(<GetMoreValue />)
  expect(getByTestId('get-more-value')).toBeInTheDocument()
})

it('should render without button', () => {
  ;(useAppData as any).mockImplementation(() => ({
    list: {
      targetItems: [
        {
          description: {
            value:
              'Get an Archer AXE300 Wi-Fi 6E router included with your Fiber 5 Gig order.',
          },
          title: {
            value: 'The industry’s fastest Wi-Fi 6E router',
          },
          tooltip: {
            value: 'tooltip content',
          },
        },
        {
          description: {
            value:
              'Claim a $200 Visa Reward Card when you order Fiber 5 Gig internet.1',
          },
          title: {
            value: '$200 Visa® Reward Card',
          },
          tooltip: {
            value: 'Example1',
          },
        },
        {
          description: {
            value:
              'U.S.-based tech experts are available 7 a.m. to midnight ET, 365 days a year to help you when you need it.',
          },
          title: {
            value: 'Free premium tech support',
          },
          tooltip: {
            value: '',
          },
        },
        {
          description: {
            value:
              'Our certified technicians will install your Fiber 5 Gig internet completely free of charge.',
          },
          title: {
            value: 'Free expert installation',
          },
          tooltip: {
            value: '',
          },
        },
      ],
    },
  }))
  const { queryByTestId, getByTestId } = render(<GetMoreValue />)
  expect(getByTestId('get-more-value')).toBeInTheDocument()
  expect(queryByTestId('tooltip')).not.toBeInTheDocument()
})

it('should not render tooltip', () => {
  ;(useAppData as any).mockImplementation(() => {
    return {
      ...mockData,
      list: {
        targetItems: [
          {
            description: {
              value:
                'Get an Archer AXE300 Wi-Fi 6E router included with your Fiber 5 Gig order.',
            },
            title: {
              value: 'The industry’s fastest Wi-Fi 6E router',
            },
            tooltip: {
              value: '',
            },
          },
        ],
      },
    }
  })
  const { queryByTestId } = render(<GetMoreValue />)
  expect(queryByTestId('tooltip')).not.toBeInTheDocument()
})

it('should not render list', () => {
  ;(useAppData as any).mockImplementation(() => {
    return {
      ...mockData,
      list: {
        targetItems: [],
      },
    }
  })
  const { queryAllByTestId } = render(<GetMoreValue />)
  const tiles = queryAllByTestId('test-title')
  expect(tiles.length).toBe(0)
})

describe('FourTiles', () => {
  it('should render correctly', () => {
    const { getAllByTestId } = render(
      <FourTiles
        type="light"
        textAlign="left"
        tiles={[
          {
            description: 'test description 1',
            href: 'test href 1',
            icon: <div />,
            title: 'test title 1',
          },
          {
            description: 'test description 2',
            href: 'test href 2',
            icon: <div />,
            title: 'test title 2',
          },
        ]}
      />,
    )

    const description = getAllByTestId('test-description')
    const title = getAllByTestId('test-title')

    for (let i = 0; i < title.length; i++) {
      expect(title[i].textContent).toBe('test title ' + (i + 1))
    }

    for (let j = 0; j < description.length; j++) {
      expect(description[j].textContent).toBe('test description ' + (j + 1))
    }
  })
})

describe('ToolTip', () => {
  it('should not render correctly', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { queryByTestId } = render(
      <Tooltip
        tooltipText={'Content1'}
        includeBorder={true}
        isDarkMode={true}
      />,
    )
    expect(queryByTestId('toolTip')).not.toBeInTheDocument()
  })
})

describe('Button', () => {
  it('should not render button correctly', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { queryByTestId } = render(
      <Button text="" href="/" type="button" className={'primary'} />,
    )
    expect(queryByTestId('button')).not.toBeInTheDocument()
  })
})

describe('FourTiles', () => {
  it('should not render tiles correctly', () => {
    const { queryAllByTestId } = render(
      <FourTiles type="light" textAlign="left" tiles={[]} />,
    )
    const tiles = queryAllByTestId('test-title')
    expect(tiles.length).toBe(0)
  })
})
