import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { MobileApp } from 'src/libs/resources/myfrontier-mobile-app'
jest.mock('src/utils/adobe/dynamicTagManagement/client', () => ({
  triggerEvent: jest.fn(),
}))

jest.mock('src/hooks')
const mockData = {
  list: {
    targetItems: [
      {
        title: {
          value: 'Make a payment',
        },
        imagePosition: {
          value: 'left',
        },
        description: {
          value:
            'You can make a payment right from your phone. View your current bill and payment history, or make changes to scheduled payments when it’s convenient for you.',
        },
        stripesColor: {
          Color: {
            field: {
              value: '#141928',
            },
          },
        },
        backgroundColor: {
          Color: {
            field: {
              value: '#ff0037',
            },
          },
        },
        image: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/myfrontier-mobile-app-page/Make-A-Payment-Mobile-Screen.png?rev=4e35be74d4bc45f3aff40bde73455a93',
          alt: 'Make A Payment Mobile Screen',
        },
      },
      {
        title: {
          value: 'Manage your account',
        },
        imagePosition: {
          value: 'right',
        },
        description: {
          value:
            'Make life easier by managing your Frontier account on the go. Easily and securely access your account settings or change your services from anywhere.',
        },
        stripesColor: {
          Color: {
            field: {
              value: '#FFFFFF',
            },
          },
        },
        backgroundColor: {
          Color: {
            field: {
              value: '#141928',
            },
          },
        },
        image: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/myfrontier-mobile-app-page/Manage-your-account-Mobile-Screen.png?rev=f48ec394babd41ccb2d711aff8dc01e7',
          alt: 'Manage your account Mobile Screen',
        },
      },
    ],
  },
}

describe('MobileApp', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getAllByTestId, getByAltText } = render(<MobileApp />)
    expect(getAllByTestId('mobile-app').length).toBe(2)
    expect(getByAltText('Make A Payment Mobile Screen')).toHaveAttribute(
      'src',
      'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/myfrontier-mobile-app-page/Make-A-Payment-Mobile-Screen.png?rev=4e35be74d4bc45f3aff40bde73455a93',
    )
    expect(getByAltText('Manage your account Mobile Screen')).toHaveAttribute(
      'src',
      'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/myfrontier-mobile-app-page/Manage-your-account-Mobile-Screen.png?rev=f48ec394babd41ccb2d711aff8dc01e7',
    )
  })

  it('should not render without list data', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        list: {},
      }
    })
    const { queryAllByTestId } = render(<MobileApp />)
    expect(queryAllByTestId('mobile-app').length).toBe(0)
  })

  it('should render without images', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        list: {
          targetItems: [
            {
              title: {
                value: 'Make a payment',
              },
              imagePosition: {
                value: 'left',
              },
              description: {
                value:
                  'You can make a payment right from your phone. View your current bill and payment history, or make changes to scheduled payments when it’s convenient for you.',
              },
            },
            {
              title: {
                value: 'Manage your account',
              },
              imagePosition: {
                value: 'right',
              },
              description: {
                value:
                  'Make life easier by managing your Frontier account on the go. Easily and securely access your account settings or change your services from anywhere.',
              },
            },
          ],
        },
      }
    })
    const { queryByAltText } = render(<MobileApp />)
    expect(
      queryByAltText('Make A Payment Mobile Screen'),
    ).not.toBeInTheDocument()
    expect(
      queryByAltText('Manage your account Mobile Screen'),
    ).not.toBeInTheDocument()
  })
})
