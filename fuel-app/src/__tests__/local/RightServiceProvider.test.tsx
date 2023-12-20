import RightServiceProvider from 'src/libs/local/components/RightServiceProvider'
import { render } from '@testing-library/react'

const MOCKDATA = {
  title: {
    value: 'The right internet service provider for you',
  },
  subTitle: {
    value:
      'As a Californian, it’s important to stay connected. The right ISP for you will depend on the features and bandwidth you need, including average download speeds, pricing and tech support. It’s also important to look out for data caps and overages and whether you can bundle services.',
  },
  tiles: {
    list: [
      {
        title: {
          value: 'See discounts available',
        },
        description: {
          value:
            'Frontier offers discounted services to qualifying individuals and organizations in partnership with several government and assistance programs, including the California Teleconnect Fund. See how you can get access to more affordable services, including high-speed internet.',
        },
        ctaUrl: {
          url: '',
        },
        ctaLabel: {
          value: 'See discounts available',
        },
      },
      {
        title: {
          value: 'Live in a rural area?',
        },
        description: {
          value:
            'If you live in a rural area in California, fiber internet may not be available just yet. However, you might still have access to other internet options, like DSL internet, satellite internet and cable internet. Wherever you live in California, though, Frontier knows the importance of staying connected.',
        },
        ctaUrl: {
          url: '',
        },
        ctaLabel: {
          value: 'Find rural options',
        },
      },
    ],
  },
}

describe('RightServiceProvider', () => {
  it('should render correctly', () => {
    const { getAllByTestId } = render(<RightServiceProvider data={MOCKDATA} />)
    expect(getAllByTestId('tile').length).toBe(2)
  })
})
