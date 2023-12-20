import { ComponentStory, ComponentMeta } from '@storybook/react'
import InternetPlansTable from './InternetPlansTable'
import { appDataSlice } from 'src/redux/slicers'
import store from 'src/redux/Store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'

export default {
  title: 'Components/InternetPlansTable',
  component: InternetPlansTable,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof InternetPlansTable>

const Template: ComponentStory<typeof InternetPlansTable> = () => {
  useEffect(() => {
    store.dispatch(
      appDataSlice.actions.setData({
        comparisonTableUpdated: {
          fields: {
            data: {
              datasource: {
                title: {
                  value: 'Tech specs',
                },
                rowHeaderFlag: {
                  value: false,
                },
                yesIcon: {
                  value: null,
                  alt: '',
                },
                legalText: {
                  value: '',
                },
                toolTipText: {
                  value: '',
                },
                tooltipDirection: {
                  targetItem: null,
                },
                buttonText: {
                  value: 'Check Availability',
                },
                buttonURL: {
                  url: '/buy',
                },
                buttonType: {
                  type: null,
                },
                hoverType: {
                  type: null,
                },
                items: {
                  list: [
                    {
                      logo: {
                        src: null,
                      },
                      iconColor: {
                        color: null,
                      },
                      headerDescription: {
                        value: 'Amazon eero Wi-Fi router',
                      },
                      headerDescriptionLink: {
                        url: '',
                      },
                      properties: {
                        list: [
                          {
                            name: {
                              value: 'Frontier<sup>®</sup> Fiber plan',
                            },
                            toolTip: {
                              value: '',
                            },
                            textValue: {
                              value: 'Fiber 500',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                          {
                            name: {
                              value: 'Wireless specs',
                            },
                            toolTip: {
                              value:
                                '<p>Think of frequency bands as highways for your data, with different lengths and lanes. Some bands are wider but shorter, allowing more traffic (data) to be delivered faster across short distances. Other bands can deliver Wi-Fi to more places in your home but have fewer lanes so the data isn’t delivered as fast. </p>\n\n<p>Wi-Fi 6 is like a super highway, allowing for rapid transmission of data. Wi-Fi 6E is like adding a fast lane to that super highway. </p>\n\n<p>Dual- or tri-band equipped routers use different frequency bands to deliver the best Wi-Fi experience for your home.</p>',
                            },
                            textValue: {
                              value: 'Dual-band Wi-Fi 6',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                          {
                            name: {
                              value: 'Number of connected devices',
                            },
                            toolTip: {
                              value: '',
                            },
                            textValue: {
                              value: '75+ devices',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                          {
                            name: {
                              value: 'Device coverage',
                            },
                            toolTip: {
                              value:
                                '<p>Device coverage estimate based on number of eero devices included.</p>\n',
                            },
                            textValue: {
                              value: 'Up to 1,500 sq. ft.',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                          {
                            name: {
                              value: 'Number of eeros included',
                            },
                            toolTip: {
                              value: '',
                            },
                            textValue: {
                              value: '1',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                        ],
                      },
                    },
                    {
                      logo: {
                        src: null,
                      },
                      iconColor: {
                        color: null,
                      },
                      headerDescription: {
                        value: 'Amazon eero Wi-Fi router',
                      },
                      headerDescriptionLink: {
                        url: '',
                      },
                      properties: {
                        list: [
                          {
                            name: {
                              value: 'Frontier<sup>®</sup> Fiber plan',
                            },
                            toolTip: {
                              value: '',
                            },
                            textValue: {
                              value: 'Fiber 1 Gig',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                          {
                            name: {
                              value: 'Wireless specs',
                            },
                            toolTip: {
                              value:
                                '<p>Think of frequency bands as highways for your data, with different lengths and lanes. Some bands are wider but shorter, allowing more traffic (data) to be delivered faster across short distances. Other bands can deliver Wi-Fi to more places in your home but have fewer lanes so the data isn’t delivered as fast. </p>\n\n<p>Wi-Fi 6 is like a super highway, allowing for rapid transmission of data. Wi-Fi 6E is like adding a fast lane to that super highway. </p>\n\n<p>Dual- or tri-band equipped routers use different frequency bands to deliver the best Wi-Fi experience for your home.</p>',
                            },
                            textValue: {
                              value: 'Tri-band Wi-Fi 6',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                          {
                            name: {
                              value: 'Number of connected devices',
                            },
                            toolTip: {
                              value: '',
                            },
                            textValue: {
                              value: '75+ devices',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                          {
                            name: {
                              value: 'Device coverage',
                            },
                            toolTip: {
                              value:
                                '<p>Device coverage estimate based on number of eero devices included.</p>\n',
                            },
                            textValue: {
                              value: 'Up to 2,000 sq. ft.',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                          {
                            name: {
                              value: 'Number of eeros included',
                            },
                            toolTip: {
                              value: '',
                            },
                            textValue: {
                              value: '1',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                        ],
                      },
                    },
                    {
                      logo: {
                        src: null,
                      },
                      iconColor: {
                        color: null,
                      },
                      headerDescription: {
                        value: 'Amazon eero Wi-Fi Pro 6E router',
                      },
                      headerDescriptionLink: {
                        url: '',
                      },
                      properties: {
                        list: [
                          {
                            name: {
                              value: 'Frontier<sup>®</sup> Fiber plan',
                            },
                            toolTip: {
                              value: '',
                            },
                            textValue: {
                              value: 'Fiber 2 Gig',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                          {
                            name: {
                              value: 'Wireless specs',
                            },
                            toolTip: {
                              value:
                                '<p>Think of frequency bands as highways for your data, with different lengths and lanes. Some bands are wider but shorter, allowing more traffic (data) to be delivered faster across short distances. Other bands can deliver Wi-Fi to more places in your home but have fewer lanes so the data isn’t delivered as fast. </p>\n\n<p>Wi-Fi 6 is like a super highway, allowing for rapid transmission of data. Wi-Fi 6E is like adding a fast lane to that super highway. </p>\n\n<p>Dual- or tri-band equipped routers use different frequency bands to deliver the best Wi-Fi experience for your home.</p>',
                            },
                            textValue: {
                              value: 'Tri-band Wi-Fi 6E',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                          {
                            name: {
                              value: 'Number of connected devices',
                            },
                            toolTip: {
                              value: '',
                            },
                            textValue: {
                              value: '100+ devices',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                          {
                            name: {
                              value: 'Device coverage',
                            },
                            toolTip: {
                              value:
                                '<p>Device coverage estimate based on number of eero devices included.</p>\n',
                            },
                            textValue: {
                              value: 'Up to 2,000 sq. ft.',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                          {
                            name: {
                              value: 'Number of eeros included',
                            },
                            toolTip: {
                              value: '',
                            },
                            textValue: {
                              value: '1',
                            },
                            value: {
                              value: false,
                            },
                            isPrimary: {
                              value: false,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      }),
    )
  }, [])

  return (
    <Provider store={store}>
      <InternetPlansTable />
    </Provider>
  )
}

export const InternetPlansTableExample = Template.bind({})
