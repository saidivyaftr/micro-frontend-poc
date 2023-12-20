import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { CreateAccount } from 'src/libs/resources/frontier-id-registration'

jest.mock('src/hooks')
const mockData = {
  componentName: 'CreateAccount',
  title: {
    value: 'How to create your account',
  },
  list: {
    targetItems: [
      {
        step: {
          value:
            "<p><a href='https://frontier.com/register/'>Create your online account</a> with our secure step-by-step process.</p>",
        },
      },
      {
        step: {
          value:
            '<p>Verify your account using your email or mobile phone number. Then, confirm your contact information.</p>',
        },
      },
      {
        step: {
          value:
            '<p>Create a password to use with your email when you sign in. You’re all set!</p>',
        },
      },
    ],
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

describe('CreateAccount', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId } = render(<CreateAccount />)
    const component = getByTestId('createAccount-play-video')
    expect(
      component.querySelector('[data-testid=create-account-video-title]')
        ?.innerHTML,
    ).toBe(mockData?.title?.value)
    expect(getByTestId('video-listItem')).toBeInTheDocument()
    expect(getByTestId('video-model')).toBeInTheDocument()
  })

  it('should not render correctly with out list', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        title: {
          value: '',
        },
      }
    })
    const { queryByTestId } = render(<CreateAccount />)
    expect(queryByTestId('video-listItem')).not.toBeInTheDocument()
    expect(queryByTestId('video-model')).not.toBeInTheDocument()
  })
})
