import FrontierInternetServices from 'src/libs/local/components/FrontierInternetServices'
import { render } from '@testing-library/react'

const frontierInternetServicesData = {
  leftContent: { value: `Frontier Internet services available in California` },
  rightContent: {
    value: `If you’re looking for a fast broadband internet connection in your area of California — including Los Angeles, San Francisco, Sacramento and San Diego — you can trust Frontier® Internet to deliver. Although our services vary depending on where you live in California, rest assured we have a high-speed internet service plan that can work for you. Explore the services we offer in your neighborhood.`,
  },
}

describe('FrontierInternetServices', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <FrontierInternetServices data={frontierInternetServicesData} />,
    )
    expect(
      getByText(frontierInternetServicesData.leftContent.value),
    ).toBeInTheDocument()
    expect(
      getByText(frontierInternetServicesData.rightContent.value),
    ).toBeInTheDocument()
  })
})
