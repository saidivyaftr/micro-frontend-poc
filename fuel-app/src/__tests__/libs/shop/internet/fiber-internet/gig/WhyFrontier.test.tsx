import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { FourTiles } from '@/shared-ui/components'
import { WhyFrontier } from 'src/libs/shop/internet/fiber-internet/gig'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))
jest.mock('src/hooks')

const mockData = {
  title: {
    value: 'Why Fiber 1 Gig Internet?',
  },
  subTitle: {
    value: 'Stream, game, telework and share on social media without worry.',
  },
  list: {
    targetItems: [
      {
        description: {
          value:
            'Everyone in your home can watch anything they want, all at once, with virtually no interruptions or buffering',
        },
        title: {
          value: 'Streaming',
        },
        tooltip: {
          value: '',
        },
      },
      {
        description: {
          value:
            'Game on the fiber-optic network named the “Best Internet Provider for Gaming by U.S. News &amp; World Report',
        },
        title: {
          value: 'Gaming',
        },
        tooltip: {
          value: 'Example1',
        },
      },
      {
        description: {
          value:
            'Share as fast as you can stream with upload speeds 25x faster than cable',
        },
        title: {
          value: 'Sharing',
        },
        tooltip: {
          value: '',
        },
      },
    ],
  },
  legalDisclaimer: { value: '' },
}
describe('WhyFrontier', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId, queryByTestId } = render(<WhyFrontier />)
    expect(getByTestId('whyFrontier')).toBeInTheDocument()
    expect(getByTestId('title')).toBeInTheDocument()
    expect(getByTestId('subTitle')).toBeInTheDocument()
    expect(queryByTestId('legalDisclaimer')).not.toBeInTheDocument()
  })
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
