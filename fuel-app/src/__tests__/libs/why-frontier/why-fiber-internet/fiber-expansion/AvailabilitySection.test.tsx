import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import store from 'src/redux/Store'
import { Provider } from 'react-redux'
import CheckAvailability from 'src/libs/why-frontier/why-fiber-internet/fiber-expansion/CheckAvailability'

jest.mock('src/hooks')
const handleScrollToSection = jest.fn()

const availabilitySectionMockData = {
  checkAvailabilityTitle: {
    value:
      "Check to see if fiber internet is available <span style='color: #96fff5;'>at your address</span>",
  },
  checkAvailabilityStickyTitle: {
    value: 'Check if fiber is available at your address',
  },
  enterYourAddressPlaceholder: {
    value: 'Enter your address',
  },
  nominateTitle: {
    value: 'Nominate your area for fiber internet',
  },
  nominateSuccessHeader: {
    value: 'Thanks for your nomination',
  },
  nominateSuccessSubHeader1: {
    value: "We'll let you know if we plan to bring fiber to your location",
  },
  nominateSuccessSubHeader2: {
    value:
      'In the meantime, see if other Frontier internet plans are available in your area.',
  },
  nominateThanks1Header: {
    value: 'Thank you',
  },
  nominateThanks1SubHeader: {
    value:
      'Check your inbox or text messages for updates as we plan to bring fiber to your area',
  },
  nominateThanksCopperAvailableSubHeader: {
    value:
      "We'll be in touch. In the meantime, check out the other internet service options that are currently available in your area.",
  },
  nominateThanksCopperAvailableSuccessButton: {
    link: '/buy',
    text: 'View Plans',
  },
  nominateThanks2SubHeader: {
    value:
      'Check your inbox or text messages for updates as we bring fiber to your area',
  },
  checkAvailability: {
    value: 'CHECK AVAILABILITY',
  },
  checkAvailabilityUrl: {
    value: '/buy',
  },
  editAddress: {
    value: 'Edit address',
  },
  signupText: {
    value: "Fiber's not available in your area (yet!)",
  },
  signupSubText: {
    value:
      'Nominate your area for fiber and sign up for updates. We use nominations like yours to choose where we install fiber next.',
  },
  nominateTitleNOPAL: {
    value: 'Finally, Frontier Fiber Internet is within reach',
  },
  signupTextNOPAL: {
    value:
      "We're working with your property management to bring 100% fiber internet to you",
  },
  signupSubTextNOPAL: {
    value:
      'Share your information and we will let you know as soon as you can sign up for service.',
  },
}

describe('CheckAvailability', () => {
  it('should render correctly', async () => {
    ;(useAppData as any).mockImplementation(() => availabilitySectionMockData)
    const { findByText } = render(
      <Provider store={store}>
        <CheckAvailability
          isSectionFixed={false}
          handleScrollToSection={handleScrollToSection}
        />
        ,
      </Provider>,
    )
    expect(
      await findByText('Check if fiber is available at your address'),
    ).toBeInTheDocument()
  })
})
