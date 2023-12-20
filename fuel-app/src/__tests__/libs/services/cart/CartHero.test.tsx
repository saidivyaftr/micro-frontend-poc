import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import CartHero from 'src/libs/services/cart/CartHero'

jest.mock('src/hooks')

describe('CartHero', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      title: {
        value: 'title',
      },
      path: {
        targetItems: [
          {
            href: {
              url: 'frontier.com',
            },
            pageName: {
              value: 'Cart',
            },
          },
        ],
      },
    }))
    const { getByText } = render(<CartHero />)
    expect(getByText('title')).toBeInTheDocument()
  })
})
