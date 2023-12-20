import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { AutoPlayVideo } from 'src/libs/resources/autopay'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Get help with Auto Pay',
  },
  subTitle: {
    value: 'Get step-by-step help setting up or making changes to Auto Pay.',
  },
  buttonVariant: {
    targetItem: {
      type: {
        value: 'primary',
      },
    },
  },
  buttonHoverVariant: {
    targetItem: {
      type: {
        value: 'secondary',
      },
    },
  },
  buttonhref: {
    url: '/helpcenter/billing/how-to-manage-auto-pay',
  },
  videoId: {
    value: '5027724557001',
  },
  mobilethumbnailImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/autoPay-page/Mobile-thumbnail.png?rev=bf0d23a0c2df49339fb1d3f54c7ae031',
    alt: 'Woman enjoying coffee while on computer receiving help with Frontier Auto Pay',
  },
  thumbnailImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/autoPay-page/thmbnail.png?rev=204eed87e4e8436d9b74541274c6edc6',
    alt: 'Woman enjoying coffee while on computer receiving help with Frontier Auto Pay',
  },
}

describe('AutoPlayVideo', () => {
  it('should render correctly without button', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId } = render(<AutoPlayVideo />)
    const component = getByTestId('auto-play-video')
    expect(
      component.querySelector('[data-testid=auto-play-video-title]')?.innerHTML,
    ).toBe('Get help with Auto Pay')
    expect(
      component.querySelector('[data-testid=auto-play-video-subtitle]')
        ?.innerHTML,
    ).toBe('Get step-by-step help setting up or making changes to Auto Pay.')
    expect(
      component.querySelector('[data-testid=auto-play-video-button]'),
    ).toBeNull()
  })

  it('should render correctly with button', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        buttonText: {
          value: 'learn more',
        },
      }
    })
    const { getByTestId } = render(<AutoPlayVideo />)
    expect(getByTestId('auto-play-video-button')).toBeInTheDocument()
  })
})
