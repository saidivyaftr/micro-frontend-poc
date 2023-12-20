import { render } from '@testing-library/react'
import { useAppData, useChatState } from 'src/hooks'
import { BannerCarousal } from 'src/libs/home'

const mockData = {
  list: {
    targetItems: [
      {
        title: {
          value: 'Fiber 5 Gig <br/>Internet <br/>Is Here',
        },
        titleDesktopImage: {
          src: null,
          alt: '',
        },
        titleMobileImage: {
          src: null,
          alt: '',
        },
        image: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/5-gig/5Gig-Hero.png?rev=3c99dd4c4d17486a863d0a229cc56099',
          alt: 'Hero',
        },
        mobileImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/5-gig/5G-Hero-Mobile.png?rev=943d0616df624d3cbf0dda6acfe24945',
          alt: 'Hero',
        },
        title2: {
          value: '',
        },
        legalText: {
          value: '',
        },
        primaryButtonText: {
          value: 'Learn more about 5 gig',
        },
        primaryButtonLink: {
          url: '/shop/internet/fiber-internet/5-gig',
        },
        subTitle: {
          value: '',
        },
        description: {
          value: '',
        },
        objectID: {
          value: 'fiber_5_gig_learn_more',
        },
        eventID: {
          value: 'event14',
        },
        rootBackgroundColorLeft: {
          Color: {
            field: {
              value: '#141928',
            },
          },
        },
        rootBackgroundColorRight: {
          Color: {
            field: {
              value: '#120015',
            },
          },
        },
        logoBlock: {
          targetItem: null,
        },
      },
      {
        title: {
          value: 'eero Secure',
        },
        titleDesktopImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Carousel/eero-Secure-title-Img.png?rev=e9631b98d59a4459b7a6361095d33bba',
          alt: 'eero Secure',
        },
        titleMobileImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Carousel/eero-Secure-title-Mobile.png?rev=9e34b639b91f4df485b7f75ac328a8f2',
          alt: 'eero Secure',
        },
        image: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Carousel/eero-Secure-Carousel.png?rev=fdb09c0481dd4ed5bce041debe2496d9',
          alt: 'eero Secure',
        },
        mobileImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Carousel/eero-Secure-Carousel-Mobile.png?rev=575cf9ac992048f5a8540bd55572f07d',
          alt: 'eero Secure',
        },
        title2: {
          value: '',
        },
        legalText: {
          value: '',
        },
        primaryButtonText: {
          value: 'Learn more',
        },
        primaryButtonLink: {
          url: '/offer/eero-secure',
        },
        subTitle: {
          value: '',
        },
        description: {
          value:
            'Keep your family’s personal information, connected <br/> devices and network protected from online threats <br/>for just $3/mo.',
        },
        objectID: {
          value: 'eero_secure_learn_more',
        },
        eventID: {
          value: 'event14',
        },
        rootBackgroundColorLeft: {
          Color: {
            field: {
              value: '#121828',
            },
          },
        },
        rootBackgroundColorRight: {
          Color: {
            field: {
              value: '#FFFFFF',
            },
          },
        },
        logoBlock: {
          targetItem: null,
        },
      },
      {
        title: {
          value: 'Frontier <br/> Secure',
        },
        titleDesktopImage: {
          src: null,
          alt: '',
        },
        titleMobileImage: {
          src: null,
          alt: '',
        },
        image: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Carousel/Frontier-Secure-Carousel.png?rev=3ac8cd87a66944558777460a99a7d467',
          alt: 'Frontier Secure',
        },
        mobileImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/Carousel/Frontier-Secure-Carousel-Mobile.png?rev=7b13bd78022c4e668b848f15d956eb12',
          alt: 'Frontier Secure',
        },
        title2: {
          value: '',
        },
        legalText: {
          value: '',
        },
        primaryButtonText: {
          value: 'Learn more',
        },
        primaryButtonLink: {
          url: '/shop/frontier-secure',
        },
        subTitle: {
          value: '',
        },
        description: {
          value:
            'Keep your devices, digital identity & data safe,<br/> 24/7 with Frontier Secure',
        },
        objectID: {
          value: 'frontier_secure_learn_more',
        },
        eventID: {
          value: 'event14',
        },
        rootBackgroundColorLeft: {
          Color: {
            field: {
              value: '#000000',
            },
          },
        },
        rootBackgroundColorRight: {
          Color: {
            field: {
              value: '#0A090A',
            },
          },
        },
        logoBlock: {
          targetItem: null,
        },
      },
    ],
  },
}

const chatData = {
  isChatOpen: false,
  setChatState: () => null,
}

jest.mock('src/hooks')

jest.mock('@/shared-ui/components/Hero', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Hero" />
  },
}))

describe('BannerCarousal', () => {
  it('should render correctly', () => {
    ;(useChatState as any).mockImplementation(() => chatData)
    // eslint-disable-next-line prettier/prettier
    ;(useAppData as any).mockImplementation(() => mockData)
    const { queryAllByTestId } = render(<BannerCarousal />)

    expect(queryAllByTestId('Mock Hero')).toHaveLength(3)
  })
})
