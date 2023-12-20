import { WhyFiber2Gig } from 'src/libs/shop/internet/fiber-internet/2-gig'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
jest.mock('src/hooks')

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  })
  window.IntersectionObserver = mockIntersectionObserver
})

const mockData = {
  heading: {
    value: 'Why Frontier® Fiber 2 Gig?',
  },
  subHeading: {
    value:
      'It supercharges your internet so you can work, live and play the way you want.',
  },
  containerTitle: {
    value: 'Our fastest internet ever',
  },
  containerText: {
    value:
      'Upload speeds more than 50x faster than cable. Share pictures and videos as fast as you stream.Plus with 2.5x less latency than cable, your gaming will be more responsive than ever.',
  },
  cards: {
    targetItems: [
      {
        cardImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/compare-1.png?rev=fcba2e072cb044a6b28269db52e01e63',
          alt: 'headset',
        },
        cardTitle: {
          value: 'Frontier® Fiber 2 Gig leaves cable behind',
        },
        cardSubTitle: {
          value: '50x',
        },
        cardDescription: {
          value: 'faster uploads than cable 1',
        },
      },
      {
        cardImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/compare-2.png?rev=429149751f2d40e9b1adabeb65e5c82a',
          alt: 'gaming controller',
        },
        cardTitle: {
          value: 'Play to win',
        },
        cardSubTitle: {
          value: '2.5x',
        },
        cardDescription: {
          value: 'less lag <br />\nthan cable',
        },
      },
      {
        cardImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/compare-3.png?rev=616bc607a52c4f7b994cd0639fa61fb9',
          alt: 'tablet with wifi',
        },
        cardTitle: {
          value: 'Binge with less buffering',
        },
        cardSubTitle: {
          value: ' 11x',
        },
        cardDescription: {
          value: 'faster downloads than cable 1',
        },
      },
    ],
  },
  caption: {
    value: '1: Based on FCC 12/31/2021 MBA, weighted median cable speed.',
  },
}

describe('WhyFiber2Gig Offer', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getAllByTestId, getByText } = render(<WhyFiber2Gig />)
    const firstCard = getAllByTestId('card')[0]
    expect(getByText('Why Frontier® Fiber 2 Gig?')).toBeInTheDocument()
    expect(
      getByText(
        'It supercharges your internet so you can work, live and play the way you want.',
      ),
    ).toBeInTheDocument()
    expect(getByText('Our fastest internet ever')).toBeInTheDocument()
    expect(
      getByText(
        'Upload speeds more than 50x faster than cable. Share pictures and videos as fast as you stream.Plus with 2.5x less latency than cable, your gaming will be more responsive than ever.',
      ),
    ).toBeInTheDocument()
    expect(
      getByText('1: Based on FCC 12/31/2021 MBA, weighted median cable speed.'),
    ).toBeInTheDocument()
    expect(
      getByText('Frontier® Fiber 2 Gig leaves cable behind'),
    ).toBeInTheDocument()
    expect(
      firstCard.querySelector('[data-testid=cardImage]')?.getAttribute('src'),
    ).toBe(
      'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/compare-1.png?rev=fcba2e072cb044a6b28269db52e01e63',
    )
    expect(
      firstCard.querySelector('[data-testid=cardImage]')?.getAttribute('alt'),
    ).toBe('headset')
    expect(
      firstCard.querySelector('[data-testid=cardSubTitle]'),
    ).toBeInTheDocument()
    expect(
      firstCard.querySelector('[data-testid=cardDescription]')?.innerHTML,
    ).toContain('faster uploads than cable 1')
  })
})
