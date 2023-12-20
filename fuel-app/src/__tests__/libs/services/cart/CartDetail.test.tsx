import { fireEvent, render, screen } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import CartDetail from 'src/libs/services/cart/CartDetail'
import { offersData } from 'src/libs/services/shared/types'

jest.mock('src/hooks')

const siteCoreData = {
  title: {
    value: 'Pricing',
  },
  newService: {
    value: 'New services',
  },
  monthlyTotalText: {
    value: 'Monthly total for new services',
  },
  monthlyTotalAmount: {
    value: '$3.99/mo',
  },
  existingServiceText: {
    value: 'Current services',
  },
  existingServiceAmount: {
    value: '$64.99/mo',
  },
  totalBillText: {
    value: 'Estimated monthly recurring charges*',
  },
  totalBillAmount: {
    value: '$68.98/mo',
  },
  orderButtonText: {
    value: 'Place order',
  },
  emptyCartText: {
    value: 'Your cart is empty.',
  },
  addressTitle: {
    value: 'Delivery address',
  },
  totalOneTimeChargeText: {
    value: 'Total one time charges',
  },
  oneTimeChargesText: {
    value: 'One-time charges',
  },
  addressSubTitle: {
    value: 'Your Whole-Home Wi-Fi devices will be delivered to:',
  },
  changeAddressText: {
    value: 'Need to change your delivery address?',
  },
  chatLinkText: {
    value: 'Chat with us.',
  },
  newServicesList: {
    list: [
      {
        serviceTitle: {
          value: 'eero Secure',
        },
        serviceAmount: {
          value: '$3.00/mo',
        },
        subServiceTitle: {
          value: '',
        },
        subServiceAmount: {
          value: '',
        },
        removeBtnText: {
          value: 'Remove',
        },
      },
      {
        serviceTitle: {
          value: 'HomeShield Elite',
        },
        serviceAmount: {
          value: '$0.99/mo',
        },
        subServiceTitle: {
          value: '3 month discount',
        },
        subServiceAmount: {
          value: '$6.00/mo',
        },
        removeBtnText: {
          value: 'Remove',
        },
      },
    ],
  },
}

const cartData: offersData = {
  sCaseID: 'S-383393',
  IsSalesWorthy: true,
  Offers: [
    {
      ItemCode: 'WWIFI',
      Action: 'Add',
      FeatureGroup: 'WHWIFI_SERVICE',
      Description: 'Whole-Home Wi-Fi',
      ItemSequence: 0,
      IsDisabled: false,
      MaximumQuantity: 1,
      FeatureClass: 'INTERNET',
      AdditionalText: '',
      Type: 'New',
      Recurring: true,
      Price: 10,
      FeatureCategory: 'BROADBAND EQUIPMENT',
    },
  ],
  CartLineItems: [
    {
      Type: 'Existing',
      ItemCode: 'RN004',
      Description: 'FINT 500/500m LOOP',
      Recurring: true,
      ItemSequence: 1,
      Price: 57.99,
      SummaryLevel: 'Services And Equipment Charges',
      FeatureClass: 'INTERNET',
    },
  ],
  Email: 'jefflee2897@yahoo.com',
  ServiceAddress: '17830  LONE RANGER TRL, CHINO HILLS, CA 91709',
  newItemsInCart: [
    {
      Type: 'New',
      ItemCode: 'RNPTP',
      Description: 'My Premium Tech Pro',
      Recurring: true,
      ItemSequence: 0,
      Price: 10,
      SummaryLevel: 'Services And Equipment Charges',
      FeatureClass: 'FRONTIER SECURE',
    },
  ],
  newServicesInCart: [
    {
      Type: 'New',
      ItemCode: 'RNPTP',
      Description: 'My Premium Tech Pro',
      Recurring: true,
      ItemSequence: 0,
      Price: 10,
      SummaryLevel: 'Services And Equipment Charges',
      FeatureClass: 'FRONTIER SECURE',
    },
  ],
  exisitingItemsInCart: [
    {
      Type: 'Existing',
      ItemCode: 'RN004',
      Description: 'FINT 500/500m LOOP',
      Recurring: true,
      ItemSequence: 1,
      Price: 57.99,
      SummaryLevel: 'Services And Equipment Charges',
      FeatureClass: 'INTERNET',
    },
  ],
  oneTimeChargesInCart: [],
  newServicesTotal: 10,
  exisitingServicesTotal: 24.99,
  oneTimeChargesTotal: 0,
  grandTotal: 34.99,
  monthlyRecurringChargesTotal: 34.99,
}

describe('CartDetail', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => siteCoreData)
    const { getByText } = render(
      <CartDetail
        cartData={cartData}
        removeHandler={undefined}
        handlePlaceOrder={undefined}
      />,
    )
    expect(getByText('New services')).toBeInTheDocument()
    expect(getByText(/My Premium Tech Pro/i)).toBeInTheDocument()
    expect(getByText(/Monthly total for new services/i)).toBeInTheDocument()
    expect(screen.queryByText(/One-time charges/i)).toBe(null)
    expect(screen.queryByText(/Total one time charges/i)).toBe(null)
    expect(
      screen.queryByText(/Estimated monthly recurring charges\*/i),
    ).toBeInTheDocument()
    expect(screen.queryByText(/Delivery address/i)).toBe(null)
    expect(screen.queryByText(/Need to change your delivery address\?/i)).toBe(
      null,
    )
  })

  it('should invoke onClick event if user clicks on the button', async () => {
    const { getByText } = render(
      <CartDetail
        cartData={cartData}
        removeHandler={undefined}
        handlePlaceOrder={undefined}
      />,
    )
    const button = getByText('Place order')
    expect(button).toBeInTheDocument()
    await fireEvent.click(button)
  })
})
