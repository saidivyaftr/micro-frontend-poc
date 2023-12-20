import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import AdditionalOffers from 'src/libs/services/additional-services/AdditionalOffers'
import { useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')

const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

const props = {
  pageCode: '',
  pdpOffersData: [
    {
      ItemCode: 'RNPTP',
      Action: 'Add',
      FeatureGroup: 'PREMIUM TECHNICAL SUPPORT',
      Description: 'My Premium Tech Pro',
      ItemSequence: 0,
      IsDisabled: false,
      MaximumQuantity: 1,
      FeatureClass: 'FRONTIER SECURE',
      AdditionalText: '',
      Type: 'New',
      Recurring: true,
      Price: 5,
      FeatureCategory: 'FRONTIER SECURE',
    },
  ],
}

const appData = {
  title: {
    value: 'Available upgrades',
  },
  tileList: {
    list: [
      {
        id: {
          value: 'WWIFI',
        },
        title: {
          value: 'Whole Home Wi-Fi',
        },
        subTitle: {
          value: '$10.00/mo.',
        },
        description: {
          value:
            'Get coverage in every room of your home. Add up to two additional Mesh Wi-Fi devices to blanket your home with coverage.',
        },
        buttonText: {
          value: 'Learn more',
        },
        href: {
          value: '/pages/services/whole-home-wifi',
        },
        icon: {
          rendered:
            '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.9571 5.98094C23.5973 5.58969 24.4027 5.58969 25.0429 5.98094L39.0429 14.5365C39.6374 14.8998 40 15.5463 40 16.2431V36.9998H43.8C43.9311 36.3535 44 35.6847 44 34.9997V16.2431C44 14.1529 42.9122 12.2133 41.1287 11.1234L27.1287 2.56781C25.208 1.39406 22.792 1.39406 20.8713 2.56781L6.8713 11.1234C5.08777 12.2133 4 14.1529 4 16.2431V34.9997C4 35.6847 4.06886 36.3535 4.20004 36.9998H8V16.2431C8 15.5463 8.36259 14.8998 8.9571 14.5365L22.9571 5.98094Z" fill="#FF0037"/><path d="M42.0007 40.9998H32C31.9971 40.9998 31.9941 40.9997 31.9912 40.9997H17.0088L17 40.9998H5.9993C7.82371 43.4286 10.7284 44.9997 14 44.9997H34C37.2716 44.9997 40.1763 43.4286 42.0007 40.9998Z" fill="#FF0037"/><path d="M10.4893 19.4898C13.5173 16.7021 17.56 14.9997 22.0003 14.9997H26.0003C30.4407 14.9997 34.4834 16.7021 37.5114 19.4898L35.1651 22.7798C32.8148 20.4435 29.5762 18.9997 26.0003 18.9997H22.0003C18.4245 18.9997 15.1859 20.4435 12.8355 22.7798L10.4893 19.4898Z" fill="#FF0037"/><path d="M32.552 26.4441C30.7185 24.3339 28.0152 22.9997 25.0003 22.9997H23.0003C19.9854 22.9997 17.2821 24.3339 15.4487 26.4441L17.8856 29.8613C18.9413 28.1445 20.8371 26.9997 23.0003 26.9997H25.0003C27.1635 26.9997 29.0594 28.1445 30.1151 29.8613L32.552 26.4441Z" fill="#FF0037"/><path d="M21 33.9997C21 32.3429 22.3431 30.9997 24 30.9997C25.6569 30.9997 27 32.3429 27 33.9997C27 35.6566 25.6569 36.9997 24 36.9997C22.3431 36.9997 21 35.6566 21 33.9997Z" fill="#FF0037"/></svg>',
        },
      },
      {
        id: {
          value: 'RNPTP',
        },
        title: {
          value: 'My Premium Tech Pro',
        },
        subTitle: {
          value: '$10.00/mo.',
        },
        description: {
          value:
            'Our team of U.S.-based tech experts are ready to help you install, use and troubleshoot all your devices, technology and online services.',
        },
        buttonText: {
          value: 'Learn more',
        },
        href: {
          value: '/pages/services/premium-tech-pro',
        },
        icon: {
          rendered:
            '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 0C9.8203 0 4 5.8203 4 13V18.1C1.71776 18.5633 0 20.581 0 23V27C0 29.419 1.71776 31.4367 4 31.9V33C4 36.866 7.13401 40 11 40H22V36H11C9.34315 36 8 34.6569 8 33V31.9C10.2822 31.4367 12 29.419 12 27V23C12 20.581 10.2822 18.5633 8 18.1V13C8 8.02944 12.0294 4 17 4H23C27.9706 4 32 8.02944 32 13V18.1C29.7178 18.5633 28 20.581 28 23V27C28 29.7614 30.2386 32 33 32H35C37.7614 32 40 29.7614 40 27V23C40 20.581 38.2822 18.5633 36 18.1V13C36 5.8203 30.1797 0 23 0H17ZM5 22H7C7.55228 22 8 22.4477 8 23V27C8 27.5523 7.55228 28 7 28H5C4.44772 28 4 27.5523 4 27V23C4 22.4477 4.44772 22 5 22ZM35 22H33C32.4477 22 32 22.4477 32 23V27C32 27.5523 32.4477 28 33 28H35C35.5523 28 36 27.5523 36 27V23C36 22.4477 35.5523 22 35 22Z" fill="#FF0037"/><path d="M20.9509 9.92705C20.6515 9.00574 19.3481 9.00574 19.0488 9.92705L17.7547 13.9098H13.5669C12.5982 13.9098 12.1954 15.1494 12.9792 15.7188L16.3671 18.1803L15.073 22.1631C14.7737 23.0844 15.8282 23.8506 16.6119 23.2812L19.9998 20.8197L23.3878 23.2812C24.1715 23.8506 25.226 23.0844 24.9266 22.1631L23.6325 18.1803L27.0205 15.7188C27.8042 15.1494 27.4014 13.9098 26.4327 13.9098H22.245L20.9509 9.92705Z" fill="#FF0037"/></svg>',
        },
      },
      {
        id: {
          value: 'EERO',
        },
        title: {
          value: 'eero Secure',
        },
        subTitle: {
          value: '$3.00/mo.',
        },
        description: {
          value:
            'Keep your family’s personal information, connected devices and network protected from online threats.',
        },
        buttonText: {
          value: 'Learn more',
        },
        href: {
          value: '/pages/services/eero-secure',
        },
        icon: {
          rendered:
            '<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32.4399 17.0801C29.7938 15.1434 26.5304 14 23 14H21C17.5225 14 14.3042 15.1094 11.6795 16.9936L9.3064 13.7729C12.595 11.3989 16.6342 10 21 10H23C27.431 10 31.5254 11.4409 34.8402 13.8797L32.4399 17.0801Z" fill="#FF0037"/><path d="M30.0395 20.2806C28.0622 18.846 25.6299 18 23 18H21C18.4109 18 16.0133 18.82 14.0527 20.2144L16.4262 23.4356C17.7225 22.5307 19.2993 22 21 22H23C24.7293 22 26.3305 22.5487 27.6389 23.4815L30.0395 20.2806Z" fill="#FF0037"/><path d="M18 30C18 27.7909 19.7909 26 22 26C24.2091 26 26 27.7909 26 30C26 32.2091 24.2091 34 22 34C19.7909 34 18 32.2091 18 30Z" fill="#FF0037"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 13C0 5.8203 5.8203 0 13 0H31C38.1797 0 44 5.8203 44 13V31C44 38.1797 38.1797 44 31 44H13C5.8203 44 0 38.1797 0 31V13ZM13 4H31C35.9706 4 40 8.02944 40 13V31C40 35.9706 35.9706 40 31 40H13C8.02944 40 4 35.9706 4 31V13C4 8.02944 8.02944 4 13 4Z" fill="#FF0037"/></svg>',
        },
      },
      {
        id: {
          value: 'YTTV',
        },
        title: {
          value: 'YouTube TV',
        },
        subTitle: {
          value: '$10.00/mo.',
        },
        description: {
          value:
            'Enjoying 100+ channels of live sports, breaking news, and must-see shows and movies for one all-in price billed through Frontier.2',
        },
        buttonText: {
          value: 'Learn more',
        },
        href: {
          value: '/pages/services/you-tube-tv',
        },
        icon: {
          rendered:
            '<svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.4777 2.65459C24.1903 1.60964 23.3432 0.786819 22.2675 0.507533C20.3177 -1.35707e-07 12.5 0 12.5 0C12.5 0 4.68228 -1.35707e-07 2.73248 0.507533C1.65699 0.786819 0.809767 1.60964 0.522315 2.65459C0 4.5485 0 8.50014 0 8.50014C0 8.50014 0 12.4517 0.522315 14.3454C0.809767 15.3904 1.65699 16.2134 2.73248 16.4927C4.68228 17 12.5 17 12.5 17C12.5 17 20.3177 17 22.2675 16.4927C23.3432 16.2134 24.1903 15.3904 24.4777 14.3454C25 12.4517 25 8.50014 25 8.50014C25 8.50014 25 4.5485 24.4777 2.65459ZM9.99987 12.143V4.85719L16.495 8.50014L9.99987 12.143Z" fill="white"/></svg>',
        },
      },
    ],
  },
}

describe('AdditionalOffers', () => {
  it('should render correctly', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    ;(useAppData as any).mockImplementation(() => appData)
    const { getByText, container } = render(<AdditionalOffers {...props} />)
    expect(getByText('Available upgrades')).toBeInTheDocument()
    expect(getByText('My Premium Tech Pro')).toBeInTheDocument()
    expect(
      getByText(
        'Our team of U.S.-based tech experts are ready to help you install, use and troubleshoot all your devices, technology and online services.',
      ),
    ).toBeInTheDocument()

    expect(container.querySelector('#special-about-fiber')).toBeTruthy()
  })

  it('should not render if no pdp offer data is present', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    ;(useAppData as any).mockImplementation(() => appData)
    const updatedProps = { ...props, pdpOffersData: [] }
    const { container } = render(<AdditionalOffers {...updatedProps} />)
    expect(container.querySelector('#special-about-fiber')).toBeFalsy()
  })
})
