import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import PendingOrderInfo from 'src/libs/services/additional-services/PendingOrderInfo'
import { useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')

const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

const appData = {
  pendingOrderTitle: {
    value: 'You already have an order in progress',
  },
  pendingOrderInfo: {
    value: 'Please check back when your current order is complete.',
  },
  viewOrderStatusCta: {
    value: 'View order status',
  },
  viewOrderStatusLink: {
    value: 'account#/orders',
  },
}

describe('PendingOrderInfo', () => {
  it('should render correctly', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    ;(useAppData as any).mockImplementation(() => appData)
    const { getByText, container } = render(<PendingOrderInfo />)
    expect(
      getByText('You already have an order in progress'),
    ).toBeInTheDocument()
    expect(
      getByText('Please check back when your current order is complete.'),
    ).toBeInTheDocument()
    expect(getByText('View order status')).toBeInTheDocument()
    expect(container.querySelector('a')?.href).toEqual(
      'http://localhost/account#/orders',
    )
  })
})
