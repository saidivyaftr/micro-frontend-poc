import { render, screen } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import OrderSummary from 'src/libs/services/Confirmation/OrderSummary'

jest.mock('src/hooks')

const orderSummaryData = {
  newService: {
    value: 'Your order details',
  },
  monthlyTotalText: {
    value: 'Monthly total for new services',
  },
  oneTimeChargesText: {
    value: 'One-time charges',
  },
  totalOneTimeChargeText: {
    value: 'Total one time charges',
  },
  currentServices: {
    value: 'Current services',
  },
  estimatedMonthlyRecurringCharges: {
    value: 'Estimated monthly recurring charges*',
  },
}

describe('OrderSummary', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => orderSummaryData)
    const { getByText } = render(
      <OrderSummary
        newServices={[]}
        monthlyRecurringCharges={0}
        newServicesTotal={0}
        oneTimeChargesTotal={0}
        existingServicesTotal={0}
      />,
    )
    expect(getByText(/Your order details/i)).toBeInTheDocument()
    expect(getByText(/Monthly total for new services/i)).toBeInTheDocument()
    expect(screen.queryByText(/One-time charges/i)).toBe(null)
    expect(screen.queryByText(/Total one time charges/i)).toBe(null)
    expect(getByText(/Current services/i)).toBeInTheDocument()
    expect(
      getByText(/Estimated monthly recurring charges\*/i),
    ).toBeInTheDocument()
    expect(getByText(/Current services/i)).toBeInTheDocument()
  })
})
