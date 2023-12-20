import { Cards } from 'src/libs/shop/streaming-services'
import { render, screen } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')

describe('Cards', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      optionCards: {
        cards: [
          {
            title: { value: 'TITLE_1' },
            description: {
              value: 'DESC_1',
            },
            image: {
              src: 'https://frontier.com/~/media/shop/tv/images/frontierTV-hero.png',
              alt: 'ALT_IMAGE',
            },
          },
          {
            title: { value: 'TITLE_2' },
            description: {
              value: 'DESC_2',
            },
          },
        ],
      },
    }))
    const { getByText } = render(<Cards />)
    expect(getByText('TITLE_1')).toBeInTheDocument()
    expect(getByText('TITLE_2')).toBeInTheDocument()

    const img = screen.getAllByRole('img')
    expect(img[0]).toHaveAttribute(
      'src',
      'https://frontier.com/~/media/shop/tv/images/frontierTV-hero.png',
    )
    expect(img[0]).toHaveAttribute('alt', 'ALT_IMAGE')
  })
})
