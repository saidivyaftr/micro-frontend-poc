import { ComponentStory, ComponentMeta } from '@storybook/react'
import { appDataSlice } from 'src/redux/slicers'
import store from 'src/redux/Store'
import { Provider } from 'react-redux'
import SwiperContent from './SwiperContent'
import { useEffect } from 'react'

export default {
  title: 'Components/SwiperContent',
  component: SwiperContent,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SwiperContent>

const Template: ComponentStory<typeof SwiperContent> = () => {
  useEffect(() => {
    store.dispatch(
      appDataSlice.actions.setData({
        tabsWithImageGlobal: {
          fields: {
            data: {
              datasource: {
                title: {
                  value: 'Enhance your Frontier Fiber experience',
                },
                subTitle: {
                  value: 'Pair fiber internet with these add-ons and services.',
                },
                disclaimer: {
                  value: '',
                },
                toolTipText: {
                  value: '',
                },
                tooltipDirection: {
                  targetItem: null,
                },
                list: {
                  targetItems: [
                    {
                      title: {
                        value: 'eero Secure',
                      },
                      titleImg: {
                        src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/TabsWithImageGobal/TitleImg.png?rev=abf229c5751e4bac8a531d2e3da46c59',
                        alt: 'eero Secure',
                      },
                      slideToggle: {
                        value: false,
                      },
                      disclaimer: {
                        value: '',
                      },
                      image: {
                        src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/TabsWithImageGobal/Updated/Eero-secure-image.png?rev=29f4e91d7554472dba745cfa3eee1b47',
                        alt: 'eero Fiber 500 Image',
                      },
                      mobileImage: {
                        src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/TabsWithImageGobal/Updated/Eero-secure-mobile-image.png?rev=907c8d3c60ae4c9ea58c08aa41ab0353',
                        alt: 'eero Fiber 500 Image',
                      },
                      heading: {
                        value: '',
                      },
                      primaryButtonText: {
                        value: 'Learn more',
                      },
                      primaryButtonLink: {
                        url: 'https://frontier.com/offer/eero-secure',
                      },
                      variant: {
                        targetItem: {
                          type: {
                            value: 'tertiary',
                          },
                        },
                      },
                      hoverState: {
                        targetItem: null,
                      },
                      description: {
                        value: '',
                      },
                      subTitle: {
                        value:
                          'Keep your family’s personal information, connected devices and network protected from online threats for just $3/mo.',
                      },
                    },
                    {
                      title: {
                        value: 'HomeShield Elite',
                      },
                      titleImg: {
                        src: null,
                        alt: '',
                      },
                      slideToggle: {
                        value: true,
                      },
                      disclaimer: {
                        value: '',
                      },
                      image: {
                        src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/TabsWithImageGobal/Updated/HomeShield-Elite-image.png?rev=943e3bc0c62f4d4b968f78f57daa099c',
                        alt: 'HomeShield Elite',
                      },
                      mobileImage: {
                        src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/TabsWithImageGobal/Updated/HomeShield-Elite-mobile-image.png?rev=ff9340e9a340490c9f390b02678ae744',
                        alt: 'HomeShield Elite',
                      },
                      heading: {
                        value: 'Get HomeShield Elite',
                      },
                      primaryButtonText: {
                        value: 'Learn more',
                      },
                      primaryButtonLink: {
                        url: 'https://frontier.com/shop/frontier-secure',
                      },
                      variant: {
                        targetItem: {
                          type: {
                            value: 'tertiary',
                          },
                        },
                      },
                      hoverState: {
                        targetItem: null,
                      },
                      description: {
                        value: '',
                      },
                      subTitle: {
                        value:
                          'Safeguard your online experience with Multi-Device Security, Identity Protection and Password Manager for $6/mo.',
                      },
                    },
                    {
                      title: {
                        value: 'My Premium Tech Pro',
                      },
                      titleImg: {
                        src: null,
                        alt: '',
                      },
                      slideToggle: {
                        value: false,
                      },
                      disclaimer: {
                        value: '',
                      },
                      image: {
                        src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/TabsWithImageGobal/Updated/My-Premium-Tech-Pro-image.png?rev=1e0ae67839424dcfbbb7967fbe988acf',
                        alt: 'My Premium Tech Pro',
                      },
                      mobileImage: {
                        src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/TabsWithImageGobal/Updated/My-Premium-Tech-Pro-mobile-image.png?rev=4d6062caa9a14540b6d64759f83ac3e8',
                        alt: 'My Premium Tech Pro',
                      },
                      heading: {
                        value: 'Get My Premium Tech Pro',
                      },
                      primaryButtonText: {
                        value: 'Learn more',
                      },
                      primaryButtonLink: {
                        url: 'https://frontier.com/shop/frontier-secure',
                      },
                      variant: {
                        targetItem: {
                          type: {
                            value: 'tertiary',
                          },
                        },
                      },
                      hoverState: {
                        targetItem: null,
                      },
                      description: {
                        value: '',
                      },
                      subTitle: {
                        value:
                          'Get expert support when you install, use or troubleshoot your tech for just $5/mo. Our U.S.-based tech experts are available 7 a.m. to midnight ET, 365 days a year.',
                      },
                    },
                  ],
                },
              },
            },
          },
          params: {},
        },
      }),
    )
  }, [])

  return (
    <Provider store={store}>
      <SwiperContent />
    </Provider>
  )
}

export const SwiperContentExample = Template.bind({})
