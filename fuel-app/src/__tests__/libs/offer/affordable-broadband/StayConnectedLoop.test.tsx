import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { StayConnectedLoop } from 'src/libs/offer/affordable-broadband'
import { useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Stay connected',
  },
  subTitle: {
    value: 'Stay connected subtitle',
  },
  list: {
    targetItems: [
      {
        title: {
          value: 'School',
        },
        description: {
          value: 'Target item 1',
        },
        legalText: {
          value: '',
        },
        toolTipText: {
          value: '',
        },
        image: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/stayConnected/xl_email.png?rev=07ea26d06cb34fcca512fb6cb079f293',
          alt: 'Email',
        },
        mobileImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/stayConnected/email_xs-1.png?rev=0243524686df48caa8885ce14c10c9bd',
          alt: 'Email',
        },
        direction: {
          item: {
            value: {
              value: 'row-reverse',
            },
          },
        },
      },
      {
        title: {
          value: 'Work',
        },
        description: {
          value: 'Target item 2',
        },
        legalText: {
          value: '',
        },
        toolTipText: {
          value: '',
        },
        image: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/stayConnected/work_xl.png?rev=61a2392aeff544a6a76454252ae0603b',
          alt: 'Work',
        },
        mobileImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/stayConnected/work_xs.png?rev=2b03cfcca90a41cabb48e6b9624744e8',
          alt: 'Work',
        },
        direction: {
          item: {
            value: {
              value: 'row',
            },
          },
        },
      },
      {
        title: {
          value: 'Home',
        },
        description: {
          value: 'Target item 3',
        },
        legalText: {
          value: '',
        },
        toolTipText: {
          value: '',
        },
        image: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/stayConnected/home_xl.png?rev=d00ce76f10c3482aaaa339f13d0bb713',
          alt: 'Home',
        },
        mobileImage: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/stayConnected/home_xs.png?rev=ef30505c8ec141ef862a7ea34bbb2f43',
          alt: 'Home',
        },
        direction: {
          item: {
            value: {
              value: 'row-reverse',
            },
          },
        },
      },
    ],
  },
}

const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

describe('StayConnectedLoop', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByText, getAllByTestId } = render(<StayConnectedLoop />)
    expect(getByText('Stay connected')).toBeInTheDocument()
    expect(getByText('Stay connected subtitle')).toBeInTheDocument()
    expect(getAllByTestId('stay-connected-list-image').length).toBe(3)
    expect(getByText('School')).toBeInTheDocument()
    expect(getByText('Home')).toBeInTheDocument()
    expect(getByText('Work')).toBeInTheDocument()
  })

  it('should render only 1 list item', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        list: {
          targetItems: [
            {
              title: {
                value: 'Home',
              },
              description: {
                value: 'Target item 3',
              },
              legalText: {
                value: '',
              },
              toolTipText: {
                value: '',
              },
              image: {
                src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/stayConnected/home_xl.png?rev=d00ce76f10c3482aaaa339f13d0bb713',
                alt: 'Home',
              },
              mobileImage: {
                src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/stayConnected/home_xs.png?rev=ef30505c8ec141ef862a7ea34bbb2f43',
                alt: 'Home',
              },
              direction: {
                item: {
                  value: {
                    value: 'row-reverse',
                  },
                },
              },
            },
          ],
        },
      }
    })
    ;(useWindowDimensions as any).mockImplementation(() => {
      return { ...dimensionsData, width: 375 }
    })

    const { getByText, getAllByTestId, queryByText } = render(
      <StayConnectedLoop />,
    )
    expect(getByText('Stay connected')).toBeInTheDocument()
    expect(getByText('Stay connected subtitle')).toBeInTheDocument()
    expect(getAllByTestId('stay-connected-list-image').length).toBe(1)
    expect(getByText('Home')).toBeInTheDocument()
    expect(queryByText('School')).not.toBeInTheDocument()
    expect(queryByText('Work')).not.toBeInTheDocument()
  })

  it('should not render without data', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        list: {
          targetItems: [],
        },
      }
    })
    const { queryByTestId } = render(<StayConnectedLoop />)
    const component = queryByTestId('stay-connected')
    expect(component).not.toBeInTheDocument()
  })
})
