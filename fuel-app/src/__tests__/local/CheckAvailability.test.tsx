import CheckAvailabilityInfo from 'src/libs/local/components/CheckAvailabilityInfo'
import { render, screen } from '@testing-library/react'

const domain = window?.location?.origin || ''
const checkAvailabilityData = {
  buttonText: 'Check Availability',
  buttonTitle: `What's available with Frontier?`,
  buttonURL: `${domain}/order-online`,
}

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
  }),
}))

describe('CheckAvailability', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <CheckAvailabilityInfo data={checkAvailabilityData} />,
    )
    expect(getByText(checkAvailabilityData.buttonText)).toBeInTheDocument()
    expect(getByText(checkAvailabilityData.buttonTitle)).toBeInTheDocument()
    expect(
      getByText(checkAvailabilityData.buttonText).closest('a'),
    ).toHaveAttribute('href', checkAvailabilityData.buttonURL)
  })

  it('should not render correctly', () => {
    const { queryByText } = render(<CheckAvailabilityInfo data={''} />)

    expect(
      queryByText(checkAvailabilityData.buttonText),
    ).not.toBeInTheDocument()
    expect(
      queryByText(checkAvailabilityData.buttonTitle),
    ).not.toBeInTheDocument()

    const checkAvailabilityButton = screen.queryByText('Check Availability')
    expect(checkAvailabilityButton).toBeNull()
  })
})
