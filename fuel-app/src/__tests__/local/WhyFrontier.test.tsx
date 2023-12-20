import WhyFrontier from 'src/libs/local/components/WhyFrontier'
import { render } from '@testing-library/react'
const whyFrontierData = {
  tiles: {
    list: [
      {
        title: {
          value: 'Reasonable pricing',
        },
        description: {
          value:
            'Whether you need basic high-speed internet or fast fiber-optic service, Frontier offers an affordable plan to meet your needs. We even include a dependable Wi-Fi router at no extra cost and are clear about our pricing. What you see is what you get with Frontier, and we believe in delivering quality at a reasonable price. Availability varies by location.',
        },
        linkText: {
          value: 'Shop Frontier packages',
        },
        linkUrl: {
          url: 'https://ftr.com',
        },
      },
      {
        title: {
          value: 'Diverse internet plans',
        },
        description: {
          value:
            'Whether your household consists of one remote worker or an entire family streaming videos and gaming, Frontier has the bandwidth you need. Choose from high-speed home internet service or upgrade to our 100% fiber-optic network for a faster connection where available. With Frontier, Los Angeles can connect to the internet with confidence.',
        },
        linkText: {
          value: 'Frontier Internet packages',
        },
        linkUrl: {
          url: 'https://ftr.com',
        },
      },
      {
        title: {
          value: 'Quality customer service',
        },
        description: {
          value:
            'Los Angeles residents appreciate our excellent customer service. Our customer support team is available 24/7/365, so there’s always help when you need it. If you live in the Los Angeles metro area, you can rest assured that you can rely on Frontier for fast, clear and uninterrupted internet connectivity.',
        },
        linkText: {
          value: 'Contact our 24/7 customer support',
        },
        linkUrl: {
          url: 'https://ftr.com',
        },
      },
    ],
  },
}
describe('WhyFrontier', () => {
  it('should render correctly', () => {
    const { getByText } = render(<WhyFrontier data={whyFrontierData} />)
    expect(
      getByText(whyFrontierData.tiles.list[0].title.value),
    ).toBeInTheDocument()
    expect(
      getByText(whyFrontierData.tiles.list[0].description.value),
    ).toBeInTheDocument()
    expect(
      getByText(whyFrontierData.tiles.list[0].linkText.value),
    ).toBeInTheDocument()
  })

  it('should not render correctly', () => {
    const { queryByText } = render(
      <WhyFrontier data={{ data: { data: {} } }} />,
    )

    expect(
      queryByText(whyFrontierData.tiles.list[0].title.value),
    ).not.toBeInTheDocument()
    expect(
      queryByText(whyFrontierData.tiles.list[0].description.value),
    ).not.toBeInTheDocument()
    expect(
      queryByText(whyFrontierData.tiles.list[0].linkText.value),
    ).not.toBeInTheDocument()
  })
})
