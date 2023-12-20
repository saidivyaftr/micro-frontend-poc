import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import CartDisclaimer from 'src/libs/services/cart/CartDisclaimer'

jest.mock('src/hooks')

describe('CartDisclaimer', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      description: {
        value:
          'Frontier Services are sold on a monthly subscription basis and billed one full month in advance. Your next bill will include both a prorated charge from the time of order to the end of the current billing cycle, plus the next full billing period. Services are subject to applicable taxes, surcharges, and partial month charges',
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
    const { getByText } = render(<CartDisclaimer />)
    expect(
      getByText(
        /Frontier Services are sold on a monthly subscription basis and billed one full month in advance. Your next bill will include both a prorated charge from the time of order to the end of the current billing cycle, plus the next full billing period. Services are subject to applicable taxes, surcharges, and partial month charges/i,
      ),
    ).toBeInTheDocument()
  })
})
