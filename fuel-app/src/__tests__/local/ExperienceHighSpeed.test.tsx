import ExperienceHighSpeed from 'src/libs/local/components/ExperienceHighSpeed'
import { render, cleanup } from '@testing-library/react'

const experienceHighSpeedData = {
  leftContent: { value: `Experience high-speed internet` },
  rightContent: {
    value: `Life moves fast in Los Angeles, so you need internet service that can keep up with you and your lifestyle. Count on Frontier® Internet for fast internet connections. You also don’t have to worry about data caps or usage limits, so you can enjoy the internet the way you want. Learn more about what we offer in your California neighborhood.`,
  },
  legalText: { value: 'legal text' },
  toolTipText: { value: 'tool tip text' },
}

describe('ExperienceHighSpeed', () => {
  afterEach(cleanup)
  it('should render correctly', () => {
    const { getByText, asFragment } = render(
      <ExperienceHighSpeed data={experienceHighSpeedData} />,
    )
    expect(asFragment()).toMatchSnapshot()
    expect(
      getByText(experienceHighSpeedData.leftContent.value),
    ).toBeInTheDocument()
    expect(
      getByText(experienceHighSpeedData.rightContent.value),
    ).toBeInTheDocument()
  })

  it('should not render correctly', () => {
    const { queryByText, asFragment } = render(
      <ExperienceHighSpeed data={''} />,
    )
    expect(asFragment()).toMatchSnapshot()
    expect(
      queryByText(experienceHighSpeedData.leftContent.value),
    ).not.toBeInTheDocument()
    expect(
      queryByText(experienceHighSpeedData.rightContent.value),
    ).not.toBeInTheDocument()
  })
})
