import CheckAvailabilityInfo from 'src/libs/shop/additional-services/CheckAvailabilityInfo'
import { render } from '@testing-library/react'
import { useAppData, useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')

const dimensionsData = {
  width: 500,
}

const checkAvailabilityInfo = {
  buttonTitle: {
    value:
      'Enter your address to see if 2 Gig internet is available for your home',
  },
  buttonURL: {
    value: '/order-online',
  },
  buttonText: {
    value: 'Check Availability',
  },
  signIn: {
    url: '/contactus/contact-us',
    text: 'Already a customer? <br>Chat to upgrade',
  },
  backgroundColor: {
    color: null,
  },
}
describe('Competition', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => checkAvailabilityInfo)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByText } = render(<CheckAvailabilityInfo />)
    expect(
      getByText(checkAvailabilityInfo.buttonText.value),
    ).toBeInTheDocument()
    // Button title is not using in the component
    // expect(
    //   getByText(checkAvailabilityInfo.buttonTitle.value),
    // ).toBeInTheDocument()
  })
})
