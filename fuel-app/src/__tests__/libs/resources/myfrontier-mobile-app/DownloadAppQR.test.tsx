import { render, fireEvent } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { DownloadAppQR } from 'src/libs/resources/myfrontier-mobile-app'

jest.mock('src/utils/adobe/dynamicTagManagement/client', () => ({
  triggerEvent: jest.fn(),
}))
;(global as any).s_objectID = ''

jest.mock('src/hooks')
const mockData = {
  appStoreLink: {
    url: 'https://apps.apple.com/us/app/myfrontier/id978439794',
  },
  playStoreLink: {
    url: 'https://play.google.com/store/apps/details?id=com.frontier.selfserve&hl=en_US&gl=US',
  },
  imageQRcodePlayStore: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/myfrontier-mobile-app-page/Google.png?rev=d8b8e6be826e44b8a1d8f51a9a8f1846',
    alt: 'QR code Google Play',
  },
  imageQRcodeAppStore: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/myfrontier-mobile-app-page/Apple.png?rev=9eceb9fad2a74a698821675236a15f7c',
    alt: 'QR code App Store',
  },
}

describe('DownloadAppQR', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getAllByRole, getByAltText, getAllByTestId } = render(
      <DownloadAppQR />,
    )
    expect(getByAltText('QR code Google Play')).toHaveAttribute(
      'src',
      'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/myfrontier-mobile-app-page/Google.png?rev=d8b8e6be826e44b8a1d8f51a9a8f1846',
    )
    expect(getByAltText('QR code App Store')).toHaveAttribute(
      'src',
      'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/myfrontier-mobile-app-page/Apple.png?rev=9eceb9fad2a74a698821675236a15f7c',
    )
    fireEvent.click(getAllByTestId('download-app-store-link')[0])
    fireEvent.click(getAllByTestId('download-app-store-link')[1])
    expect(getAllByRole('link')[0]).toHaveAttribute(
      'href',
      'https://play.google.com/store/apps/details?id=com.frontier.selfserve&hl=en_US&gl=US',
    )
    expect(getAllByRole('link')[1]).toHaveAttribute(
      'href',
      'https://apps.apple.com/us/app/myfrontier/id978439794',
    )
    expect((global as any).s_objectID).toBe('download-app:appstore-link')
  })

  it('should not render component when data is null', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {}
    })
    const { queryByAltText } = render(<DownloadAppQR />)
    expect(queryByAltText('QR code Google Play')).not.toBeInTheDocument()
    expect(queryByAltText('QR code App Store')).not.toBeInTheDocument()
  })

  it('should render without play store buttons', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        imageQRcodePlayStore: {},
        imageQRcodeAppStore: {},
      }
    })
    const { queryByAltText } = render(<DownloadAppQR />)
    expect(queryByAltText('QR code Google Play')).not.toBeInTheDocument()
    expect(queryByAltText('QR code App Store')).not.toBeInTheDocument()
  })

  it('should render without play store links', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        appStoreLink: {
          url: '',
        },
        playStoreLink: {
          url: '',
        },
      }
    })
    const { getAllByRole } = render(<DownloadAppQR />)
    expect(getAllByRole('link')[0]).not.toHaveAttribute(
      'href',
      'https://play.google.com/store/apps/details?id=com.frontier.selfserve&hl=en_US&gl=US',
    )
    expect(getAllByRole('link')[1]).not.toHaveAttribute(
      'href',
      'https://apps.apple.com/us/app/myfrontier/id978439794',
    )
  })
})
