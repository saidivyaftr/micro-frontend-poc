import { Banner } from 'src/libs/shop/streaming-services'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')

describe('Banner', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      field: {
        Banners: [
          {
            title: {
              value: 'Cable-free live TV',
            },
            subTitle: {
              value:
                'Choose from our YouTube TV, DIRECTV STREAM, and DISH TV packages.',
            },
            image: {
              value:
                'https://frontier.com/~/media/shop/tv/images/frontierTV-hero.png',
            },
            mobileImage: {
              value: '',
            },
          },
        ],
      },
    }))
    const { getByText } = render(<Banner />)
    expect(getByText('Cable-free')).toBeInTheDocument()
    expect(
      getByText(
        'Choose from our YouTube TV, DIRECTV STREAM, and DISH TV packages.',
      ),
    ).toBeInTheDocument()
  })
})
