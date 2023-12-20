import { SwiperQuotes } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('SwiperQuotes', () => {
  it('should render correctly', () => {
    const { getByTestId, getAllByTestId } = render(
      <SwiperQuotes
        heading="test heading"
        slides={[
          {
            quote: 'test quote 1',
            credit: 'test credit 1',
          },
          {
            quote: 'test quote 2',
            credit: 'test credit 2',
          },
        ]}
      />,
    )
    const heading = getByTestId('swiperquote-heading')
    const swiperslides = getAllByTestId('swiperquote-slide')
    for (let i = 0; i < swiperslides.length; i++) {
      const content = getByTestId('swiperquote-quote-' + i)
      const credit = getByTestId('swiperquote-credit-' + i)
      expect(content.innerHTML).toBe('test quote ' + (i + 1))
      expect(credit.innerHTML).toBe('test credit ' + (i + 1))
    }
    expect(heading.innerHTML).toBe('test heading')
  })
})
