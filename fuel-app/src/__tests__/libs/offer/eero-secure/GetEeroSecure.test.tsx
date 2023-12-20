import GetEeroSecure from 'src/libs/offer/eero-secure/GetEeroSecure'
import { render } from '@testing-library/react'
import { useAppData, useChatState } from 'src/hooks'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Get eero Secure title',
  },
  tiles: {
    list: [
      {
        title: {
          value: 'Tile 1 title',
        },
        description: {
          value: 'Tile 1 description',
        },
        button: {
          value: 'Button text',
        },
      },
      {
        title: {
          value: 'Tile 2 title',
        },
        description: {
          value: 'Tile 2 description',
        },
        icon: {
          value: '2',
        },
      },
    ],
  },
}

const chatData = {
  isChatOpen: true,
  setChatState: () => null,
}

describe('GetEeroSecure', () => {
  it('should render correctly without store buttons', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByText, getAllByTestId } = render(<GetEeroSecure />)
    const firstEeroSecure = getAllByTestId('getEeroSecure')[0]
    expect(
      firstEeroSecure.querySelector('[data-testid=getEeroSecure-Title]')
        ?.innerHTML,
    ).toBe('Get eero Secure title')
    expect(getByText('Get eero Secure title')).toBeInTheDocument()
    expect(getByText('Tile 2 title')).toBeInTheDocument()
    expect(getByText('Tile 1 description')).toBeInTheDocument()
    expect(getByText('Tile 2 description')).toBeInTheDocument()
    expect(getByText('Button text')).toBeInTheDocument()
    expect(
      firstEeroSecure.querySelector('[data-testid=getEeroSecure-AppButtons]'),
    ).toBeNull()
  })

  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        tiles: {
          list: [
            {
              title: {
                value: 'Tile 1 title',
              },
              description: {
                value: 'Tile 1 description',
              },
              button: {
                value: 'Button text',
              },
            },
            {
              title: {
                value: 'Tile 2 title',
              },
              description: {
                value: 'Tile 2 description',
              },
              icon: {
                value: '2',
              },
              playStoreButtonUrl: {
                url: 'https://play.google.com/store/apps/details?id=com.frontier.selfserve&hl=en_US&gl=US',
              },
              playStoreButtonImage: {
                src: 'wwww',
                alt: 'Google Play',
              },
              appStoreButtonUrl: {
                url: 'https://apps.apple.com/us/app/myfrontier/id978439794',
              },
              appStoreButtonImage: {
                src: 'www',
                alt: 'App Store',
              },
            },
          ],
        },
      }
    })
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByAltText } = render(<GetEeroSecure />)
    expect(getByAltText('Google Play')).toBeInTheDocument()
    expect(getByAltText('App Store')).toBeInTheDocument()
  })

  it('should not render without data', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {}
    })
    const { queryByTestId } = render(<GetEeroSecure />)
    const firstGetEeroSecure = queryByTestId('getEeroSecure')
    expect(firstGetEeroSecure).not.toBeInTheDocument()
  })

  it('should not render without tiles', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        tiles: {},
      }
    })
    const { queryByTestId } = render(<GetEeroSecure />)
    const firstGetEeroSecure = queryByTestId('getEeroSecure')
    expect(firstGetEeroSecure).not.toBeInTheDocument()
  })
})
