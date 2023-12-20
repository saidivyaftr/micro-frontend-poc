import { render, screen } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import MobileApp from 'src/libs/home/MobileApp'

const mockData = {
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/HomePage/getMobileApp.png?rev=067d95a891994363a41cb5f96a3253ab',
  },
  title: {
    value: 'Manage your account anytime, anywhere.',
  },
  legalText: {
    value: '',
  },
  subTitle: {
    value: 'Download the MyFrontier<sup>®</sup> Mobile App today.',
  },
  appStoreLink: {
    url: 'https://apps.apple.com/app/apple-store/id978439794?pt=1935966&ct=mobile-app&mt=8',
  },
  playStoreLink: {
    url: 'https://play.google.com/store/apps/details?id=com.frontier.selfserve&referrer=utm_source%3Dwebsite%26utm_campaign%3Dappdownloadv2',
  },
  playStoreImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/MobileApp/Google-Play-New.png?rev=206733a8304240b19c3399a038c16c79',
    alt: 'Google Play',
  },
  appStoreImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/MobileApp/App-Store-New.png?rev=1af68e41c5f0436dbe8afb389b1939fd',
    alt: 'App Store',
  },
}

jest.mock('src/hooks')

const makeSut = () => render(<MobileApp />)

describe('MobileApp', () => {
  beforeEach(() => {
    // eslint-disable-next-line prettier/prettier
    ; (useAppData as any).mockImplementation(() => mockData)
  })
  it('should render correctly', () => {
    const { getByRole, getByTestId, getAllByRole } = makeSut()
    expect(
      getByRole('heading', {
        name: /manage your account anytime, anywhere\./i,
      }),
    ).toBeInTheDocument()
    expect(getByTestId('test-image')).toBeInTheDocument()
    expect(getAllByRole('link')).toHaveLength(2)
    expect(getByTestId('test-image')).toBeInTheDocument()
  })
  it('should have the href for the correct store.', () => {
    makeSut()
    const buttonPlayStore = screen.getByRole('img', {
      name: /google play/i,
    }).parentElement
    const buttonAppStore = screen.getByRole('img', {
      name: /app store/i,
    }).parentElement
    expect(buttonPlayStore).toHaveAttribute(
      'href',
      'https://play.google.com/store/apps/details?id=com.frontier.selfserve&referrer=utm_source%3Dwebsite%26utm_campaign%3Dappdownloadv2',
    )
    expect(buttonAppStore).toHaveAttribute(
      'href',
      'https://apps.apple.com/app/apple-store/id978439794?pt=1935966&ct=mobile-app&mt=8',
    )
  })
  it('should render legalText', () => {
    // eslint-disable-next-line prettier/prettier
    ; (useAppData as any).mockImplementation(() => ({
      ...mockData,
      legalText: {
        value: 'Testing legalText',
      },
    }))
    makeSut()
    expect(screen.getByText(/testing legalText/i)).toBeInTheDocument()
  })
  it('should render without subtitle', () => {
    // eslint-disable-next-line prettier/prettier
    ; (useAppData as any).mockImplementation(() => ({
      ...mockData,
      subTitle: {
        value: '',
      },
    }))
    makeSut()
    expect(
      screen.queryByText(/download the myfrontier mobile app today\./i),
    ).not.toBeInTheDocument()
  })
})
