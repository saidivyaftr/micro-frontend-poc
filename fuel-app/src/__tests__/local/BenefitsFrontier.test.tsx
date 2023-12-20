import BenefitsFrontier from 'src/libs/local/components/BenefitsFrontier'
import { render } from '@testing-library/react'

const benefitsFrontierData = {
  title: {
    value:
      'Benefits of using Frontier as your internet provider in Los Angeles, California',
  },
  tiles: {
    list: [
      {
        title: {
          value: 'Unlimited data with no caps',
        },
        description: {
          value:
            'Surf, game and stream as much as you want. Your Frontier Internet service includes unlimited data with no data caps or overages. There won’t be any hidden fees when your internet bill arrives.',
        },
      },
      {
        title: {
          value: 'Customer-first service',
        },
        description: {
          value:
            'At Frontier, customer satisfaction is our priority. To be sure you have help when you need it, our tech support is available 24/7/365. We are serious about our commitment to keeping you connected.',
        },
      },
      {
        title: {
          value: 'Transparent pricing',
        },
        description: {
          value:
            'We understand that transparency is important to our customers. That’s why we offer straightforward pricing — giving you the chance to find the terms that work for you and your needs.',
        },
      },
    ],
  },
}
describe('BenefitsFrontier', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <BenefitsFrontier data={benefitsFrontierData} />,
    )
    expect(getByText(benefitsFrontierData.title.value)).toBeInTheDocument()
    expect(
      getByText(benefitsFrontierData.tiles.list[0].title.value),
    ).toBeInTheDocument()
    expect(
      getByText(benefitsFrontierData.tiles.list[0].description.value),
    ).toBeInTheDocument()
  })

  it('should not render correctly', () => {
    const { container, queryByText } = render(<BenefitsFrontier />)
    expect(container.innerHTML).toBe('')

    expect(
      queryByText(benefitsFrontierData.title.value),
    ).not.toBeInTheDocument()
    expect(
      queryByText(benefitsFrontierData.tiles.list[0].title.value),
    ).not.toBeInTheDocument()
    expect(
      queryByText(benefitsFrontierData.tiles.list[0].description.value),
    ).not.toBeInTheDocument()
  })
})
