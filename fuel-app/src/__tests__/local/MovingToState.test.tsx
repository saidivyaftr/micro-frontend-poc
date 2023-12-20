import MovingToState from 'src/libs/local/components/MovingToState'
import { render } from '@testing-library/react'
const movingToStateData = {
  heading: {
    value: 'Moving to California',
  },
  subHeading: {
    value:
      'Are you considering moving to California? Whether you’re a new or existing customer, Frontier makes setting up your home internet a little easier. Just check availability to see what services are available in your area and order your preferred plan. You can also call or chat with us to schedule installation and activation.',
  },
  mobileBackgroundImage: {
    src: 'https://content-qat.frontier.com/-/jssmedia/Project/Frontier/Dotcom/Images/local/Moving-to-state-mobile.png?rev=35c4f7ac5a224254ad1d9f04669686b7',
    alt: 'Move to TBD',
  },
  desktopBackgroundImage: {
    src: 'https://content-qat.frontier.com/-/jssmedia/Project/Frontier/Dotcom/Images/local/Moving-to-state.png?rev=e00b6da6e3bd4c0292135c8ecaca0f17',
    alt: 'Move to TBD',
  },
}
describe('MovingToState', () => {
  it('should render correctly', () => {
    const { getByText } = render(<MovingToState data={movingToStateData} />)
    expect(getByText(movingToStateData.heading.value)).toBeInTheDocument()
    expect(getByText(movingToStateData.subHeading.value)).toBeInTheDocument()
  })

  it('should not render correctly', () => {
    const { queryByText } = render(<MovingToState data={''} />)

    expect(queryByText(movingToStateData.heading.value)).not.toBeInTheDocument()
    expect(
      queryByText(movingToStateData.subHeading.value),
    ).not.toBeInTheDocument()
  })
})
