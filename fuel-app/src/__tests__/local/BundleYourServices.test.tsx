import BundleYourServices from 'src/libs/local/components/BundleYourServices'
import { render } from '@testing-library/react'

const bundleYourServicesData = {
  title: {
    value: 'Bundle your Frontier services',
  },
  subTitle: {
    value:
      "Step up the ease and comfort in your California home. Bundle Frontier Internet access with a range of other services, including TV streaming options and home phone service. The best part? You'll love the price that comes with bundling.",
  },
  tiles: {
    list: [
      {
        title: {
          value: 'Frontier Internet',
        },
        description: {
          value:
            'Besides quality, Frontier knows pricing matters to customers. That’s why we offer a range of internet plans at different price points so everyone finds a plan that suits their budget. You don’t have to break the bank for fast internet access.',
        },
        ctaUrl: {
          url: 'https://frontier.com',
        },
        ctaLabel: {
          value: 'INTERNET PLANS',
        },
      },
      {
        title: {
          value: 'Home Phone',
        },
        description: {
          value:
            'Frontier Home Phone service helps you keep up with friends and family near and far. Enjoy crystal-clear call quality and features like call waiting, caller ID, voicemail and three-way calling. You also don’t have to worry about dropped calls.',
        },
        ctaUrl: {
          url: 'https://frontier.com',
        },
        ctaLabel: {
          value: 'PHONE PLANS',
        },
      },
      {
        title: {
          value: 'Entertainment',
        },
        description: {
          value:
            'Get all the entertainment you want with our YouTube TV, DIRECTV Stream and DISH TV packages. Whether you love sports, family programming or streaming your favorite on-demand titles, we have you covered.',
        },
        ctaUrl: {
          url: 'https://frontier.com',
        },
        ctaLabel: {
          value: 'TV PLANS',
        },
      },
    ],
  },
}
describe('BundleYourServices', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <BundleYourServices data={bundleYourServicesData} />,
    )
    expect(getByText(bundleYourServicesData.title.value)).toBeInTheDocument()
    expect(getByText(bundleYourServicesData.subTitle.value)).toBeInTheDocument()
    expect(
      getByText(bundleYourServicesData.tiles.list[0].title.value),
    ).toBeInTheDocument()
    expect(
      getByText(bundleYourServicesData.tiles.list[0].description.value),
    ).toBeInTheDocument()
    expect(
      getByText(bundleYourServicesData.tiles.list[0].ctaLabel.value),
    ).toBeInTheDocument()
  })

  it('should not render correctly', () => {
    const { queryByText, queryByTestId } = render(
      <BundleYourServices data={''} />,
    )

    expect(queryByTestId('bundle-your-services')).toBeNull()
    expect(
      queryByText(bundleYourServicesData.title.value),
    ).not.toBeInTheDocument()
    expect(
      queryByText(bundleYourServicesData.subTitle.value),
    ).not.toBeInTheDocument()
    expect(
      queryByText(bundleYourServicesData.tiles.list[0].title.value),
    ).not.toBeInTheDocument()
    expect(
      queryByText(bundleYourServicesData.tiles.list[0].description.value),
    ).not.toBeInTheDocument()
    expect(
      queryByText(bundleYourServicesData.tiles.list[0].ctaLabel.value),
    ).not.toBeInTheDocument()
  })
})
