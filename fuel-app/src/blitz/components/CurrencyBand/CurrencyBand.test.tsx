import { render, screen } from '@testing-library/react'
import CurrencyBand from './CurrencyBand'

describe('CurrencyBand', () => {
  it('should display amount parts in correct tags', () => {
    render(<CurrencyBand amount="143.78" dataTestId="currentBalance" />)
    expect(screen.getByTestId('currentBalance-currency').tagName).toBe('SUP')
    expect(screen.getByTestId('currentBalance-currency')).toHaveTextContent('$')
    expect(screen.getByTestId('currentBalance-whole-amount').tagName).toBe(
      'SPAN',
    )
    expect(screen.getByTestId('currentBalance-whole-amount')).toHaveTextContent(
      '143',
    )
    expect(screen.getByTestId('currentBalance-decimal-amount').tagName).toBe(
      'SUP',
    )
    expect(
      screen.getByTestId('currentBalance-decimal-amount'),
    ).toHaveTextContent('.78')
  })
})
