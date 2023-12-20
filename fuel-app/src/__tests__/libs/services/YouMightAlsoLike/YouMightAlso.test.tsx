import { render } from '@testing-library/react'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { offersData } from 'src/libs/services/shared/types'
import YouMightAlsoLike from 'src/libs/services/shared/YouMightAlsoLike'

jest.mock('src/hooks')

const dimensionsData = { width: 1024 }

const tilesData = {
  title: { value: 'you might also like' },
  tileList: {
    list: [
      {
        title: { value: 'Whole Home Wi-Fi' },
        subTitle: { value: '$10.00/mo.' },
        description: {
          value: 'Get guaranteed coverage in every room of your home',
        },
        icon: {
          rendered:
            '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0003 0.666656C7.21386 0.666656 3.33366 4.54686 3.33366 9.33332V12.7333C1.81217 13.0422 0.666992 14.3874 0.666992 16V18.6667C0.666992 20.2793 1.81217 21.6245 3.33366 21.9333V22.6667C3.33366 25.244 5.423 27.3333 8.00033 27.3333H15.3337V24.6667H8.00033C6.89576 24.6667 6.00033 23.7712 6.00033 22.6667V21.9333C7.52182 21.6245 8.66699 20.2793 8.66699 18.6667V16C8.66699 14.3874 7.52182 13.0422 6.00033 12.7333V9.33332C6.00033 6.01961 8.68662 3.33332 12.0003 3.33332H16.0003C19.314 3.33332 22.0003 6.01961 22.0003 9.33332V12.7333C20.4788 13.0422 19.3337 14.3874 19.3337 16V18.6667C19.3337 20.5076 20.826 22 22.667 22H24.0003C25.8413 22 27.3337 20.5076 27.3337 18.6667V16C27.3337 14.3874 26.1885 13.0422 24.667 12.7333V9.33332C24.667 4.54686 20.7868 0.666656 16.0003 0.666656H12.0003ZM4.00033 15.3333H5.33366C5.70185 15.3333 6.00033 15.6318 6.00033 16V18.6667C6.00033 19.0348 5.70185 19.3333 5.33366 19.3333H4.00033C3.63214 19.3333 3.33366 19.0348 3.33366 18.6667V16C3.33366 15.6318 3.63214 15.3333 4.00033 15.3333ZM24.0003 15.3333H22.667C22.2988 15.3333 22.0003 15.6318 22.0003 16V18.6667C22.0003 19.0348 22.2988 19.3333 22.667 19.3333H24.0003C24.3685 19.3333 24.667 19.0348 24.667 18.6667V16C24.667 15.6318 24.3685 15.3333 24.0003 15.3333Z" fill="white"/>\n<path d="M14.6342 7.28469C14.4347 6.67048 13.5657 6.67048 13.3662 7.28469L12.5034 9.93988H9.71162C9.0658 9.93988 8.79729 10.7663 9.31976 11.1459L11.5784 12.7869L10.7157 15.4421C10.5161 16.0563 11.2191 16.567 11.7416 16.1874L14.0002 14.5464L16.2588 16.1874C16.7813 16.567 17.4843 16.0563 17.2847 15.4421L16.422 12.7869L18.6807 11.1459C19.2031 10.7663 18.9346 9.93988 18.2888 9.93988H15.497L14.6342 7.28469Z" fill="white"/>\n</svg>',
        },
        productLink: { value: 'https://www.google.com' },
        learnMoreText: { value: 'Learn more & add' },
        id: { value: 'WWIFI' },
      },
      {
        title: { value: 'My Premium Tech Pro' },
        subTitle: { value: '$10.00/mo.' },
        description: {
          value: 'Get guaranteed coverage in every room of your home',
        },
        icon: {
          rendered:
            '<svg width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M20.3337 9.66671L22.3337 11.6667L12.3337 21.6667L7.33366 16.6667L9.33366 14.6667L12.3337 17.6667L20.3337 9.66671Z" fill="white"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M27.3337 3.66671L24.6245 3.93762C22.0549 4.19458 19.4709 3.61574 17.2565 2.28709L14.0003 0.333374L10.7441 2.28709C8.52971 3.61574 5.94575 4.19458 3.37614 3.93762L0.666992 3.66671V14.7842C0.666992 19.4677 3.12431 23.8078 7.14038 26.2174L14.0003 30.3334L20.8603 26.2174C24.8763 23.8078 27.3337 19.4677 27.3337 14.7842V3.66671ZM24.667 6.61163C21.6001 6.87114 18.527 6.15924 15.8845 4.57374L14.0003 3.44322L12.1161 4.57374C9.47362 6.15924 6.40057 6.87114 3.33366 6.61163V14.7842C3.33366 18.531 5.29951 22.003 8.51237 23.9308L14.0003 27.2235L19.4883 23.9308C22.7011 22.003 24.667 18.531 24.667 14.7842V6.61163Z" fill="white"/>\n</svg>\n',
        },
        productLink: { value: 'https://www.google.com' },
        learnMoreText: { value: 'Learn more & add' },
        id: { value: 'RNPTP' },
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
    {
      ItemCode: 'RNPTP',
      Action: 'add',
      FeatureGroup: 'PREMIUM TECHNICAL SUPPORT',
      Description: 'My Premium Tech Pro',
      ItemSequence: 0,
      IsDisabled: false,
      MaximumQuantity: 1,
      FeatureClass: 'FRONTIER SECURE',
      AdditionalText: '',
      Type: 'New',
      Recurring: true,
      Price: 10,
      FeatureCategory: 'FRONTIER SECURE',
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
    {
      Type: 'Existing',
      ItemCode: 'RNCRF',
      Description: 'Promotional Credit',
      Recurring: true,
      ItemSequence: 1,
      Price: -13,
      SummaryLevel: 'Services And Equipment Charges',
      FeatureClass: 'INTERNET',
    },
    {
      Type: 'Existing',
      ItemCode: 'EERO',
      Description: 'Frontier Provided eero',
      Recurring: true,
      ItemSequence: 1,
      Price: 0,
      SummaryLevel: 'Services And Equipment Charges',
      FeatureClass: 'INTERNET',
    },
    {
      Type: 'Existing',
      ItemCode: 'RNCFS',
      Description: 'F-Secure Credit',
      Recurring: true,
      ItemSequence: 1,
      Price: -6,
      SummaryLevel: 'Services And Equipment Charges',
      FeatureClass: 'FRONTIER SECURE',
    },
    {
      Type: 'Existing',
      ItemCode: 'RNMDS',
      Description: 'Multi-Device Security',
      Recurring: true,
      ItemSequence: 1,
      Price: 6,
      SummaryLevel: 'Services And Equipment Charges',
      FeatureClass: 'FRONTIER SECURE',
    },
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
    {
      Type: 'Existing',
      ItemCode: 'AUTOP',
      Description: 'Auto Pay Customer',
      Recurring: true,
      ItemSequence: 2,
      Price: -5,
      SummaryLevel: 'Other Charges and Credits',
      FeatureClass: 'MISCELLANEOUS',
    },
    {
      Type: 'Existing',
      ItemCode: 'CRHBC',
      Description: '$15 6Mo Cust App Credit',
      Recurring: true,
      ItemSequence: 1,
      Price: -15,
      SummaryLevel: 'Other Charges and Credits',
      FeatureClass: 'MISCELLANEOUS',
    },
    {
      Type: '',
      ItemCode: '',
      Description: 'No install required',
      Recurring: false,
      ItemSequence: 0,
      Price: 0,
      SummaryLevel: 'One Time Charges',
      FeatureClass: '',
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
    {
      Type: 'Existing',
      ItemCode: 'RNCRF',
      Description: 'Promotional Credit',
      Recurring: true,
      ItemSequence: 1,
      Price: -13,
      SummaryLevel: 'Services And Equipment Charges',
      FeatureClass: 'INTERNET',
    },
    {
      Type: 'Existing',
      ItemCode: 'EERO',
      Description: 'Frontier Provided eero',
      Recurring: true,
      ItemSequence: 1,
      Price: 0,
      SummaryLevel: 'Services And Equipment Charges',
      FeatureClass: 'INTERNET',
    },
    {
      Type: 'Existing',
      ItemCode: 'RNCFS',
      Description: 'F-Secure Credit',
      Recurring: true,
      ItemSequence: 1,
      Price: -6,
      SummaryLevel: 'Services And Equipment Charges',
      FeatureClass: 'FRONTIER SECURE',
    },
    {
      Type: 'Existing',
      ItemCode: 'RNMDS',
      Description: 'Multi-Device Security',
      Recurring: true,
      ItemSequence: 1,
      Price: 6,
      SummaryLevel: 'Services And Equipment Charges',
      FeatureClass: 'FRONTIER SECURE',
    },
    {
      Type: 'Existing',
      ItemCode: 'AUTOP',
      Description: 'Auto Pay Customer',
      Recurring: true,
      ItemSequence: 2,
      Price: -5,
      SummaryLevel: 'Other Charges and Credits',
      FeatureClass: 'MISCELLANEOUS',
    },
    {
      Type: 'Existing',
      ItemCode: 'CRHBC',
      Description: '$15 6Mo Cust App Credit',
      Recurring: true,
      ItemSequence: 1,
      Price: -15,
      SummaryLevel: 'Other Charges and Credits',
      FeatureClass: 'MISCELLANEOUS',
    },
  ],
  oneTimeChargesInCart: [],
  newServicesTotal: 10,
  exisitingServicesTotal: 24.99,
  oneTimeChargesTotal: 0,
  grandTotal: 34.99,
  monthlyRecurringChargesTotal: 34.99,
}

describe('YouMightAlsoLike', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => tilesData)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByText } = render(
      <YouMightAlsoLike
        pdpOffersData={cartData?.Offers}
        loading={false}
        pageCode="RNPTP"
      />,
    )
    expect(getByText('you might also like')).toBeInTheDocument()
    expect(
      getByText('Get guaranteed coverage in every room of your home'),
    ).toBeInTheDocument()
  })
})
