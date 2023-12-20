import { GetSupport } from 'src/libs/resources/wifi-connection'
import { render } from '@testing-library/react'
import { useAppData, useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')
const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

const MOCK_DATA = {
  title: {
    value: 'title',
  },
  list: {
    targetItems: [
      {
        desktopImage: {
          src: 'https://i.postimg.cc/fRzmHmpQ/eero-xl-wifi-1-D.png',
        },
        mobileImage: {
          src: 'https://i.postimg.cc/J03HxzQh/eero-xs-wifi-1-M.png',
        },
        backgroundColor: {
          color: '#f3f4f4',
        },
        title: {
          value: 'title 1',
        },
        description: {
          value: 'description 1',
        },
        toolTip: {
          value: 'any value',
        },
        button: {
          text: 'Get eero support',
          url: '/helpcenter/internet/install-and-manage-eero-devices',
        },
      },
      {
        desktopImage: {
          src: 'https://i.postimg.cc/ZnL03DTB/archer-xl-wifi-1-D.png',
        },
        mobileImage: {
          src: 'https://i.postimg.cc/8z7PPCrr/archer-wifi-xs-1-M.png',
        },
        backgroundColor: {
          color: '',
        },
        title: {
          value: 'title 2',
        },
        description: {
          value: 'description 2',
        },
        toolTip: {
          value: 'any value',
        },
        button: {
          text: 'Get TP-Link Archer AXE300 6E support ',
          url: '/[to come - upcoming HC page]',
        },
      },
    ],
  },
}

describe('Get Support component', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => MOCK_DATA)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)

    const { getByTestId, getAllByTestId } = render(<GetSupport />)

    expect(getByTestId('get-support')).toBeTruthy()
    expect(getAllByTestId('image-tile').length).toBe(2)

    const title = getAllByTestId('test-title')
    const description = getAllByTestId('test-description')
    for (let i = 0; i < description.length; i++) {
      expect(title[i].textContent).toBe('title ' + (i + 1))
      expect(description[i].textContent).toBe('description ' + (i + 1))
    }
  })

  it('should not render correctly', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...MOCK_DATA,
        title: {
          value: '',
        },
      }
    })
    const { queryByTestId } = render(<GetSupport />)
    expect(queryByTestId('get-support')).not.toBeInTheDocument()
  })
})
