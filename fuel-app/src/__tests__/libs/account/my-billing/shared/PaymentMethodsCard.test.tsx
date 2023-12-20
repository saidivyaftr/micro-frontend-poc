import { getByTestId, render, screen } from '@testing-library/react'
import { mockPaymentMethodsData } from 'src/redux/mock-data/oneTimePaymentMock'
import { TStore } from 'src/redux/Store'
import { useSelector } from 'react-redux'
import { PaymentMethodsData } from 'src/redux/types/payments'
import { fetchPaymentMethods } from 'src/redux/slicers/payment'
import { AccountDetails } from 'src/redux/types/accountTypes'
import PaymentMethodsCard from 'src/libs/account/my-billing/shared/payment-methods-card/PaymentMethodsCard'
import mockBillingConstants from 'src/redux/mock-data/billing-constants'

const activeAccountId = '123xyz'

const mockState = () =>
  ({
    account: {
      activeAccount: {
        details: {
          data: {
            id: activeAccountId,
          },
        },
      },
    },
    payment: {
      paymentMethods: {
        data: mockPaymentMethodsData,
        isLoading: false,
        error: false,
      },
    },
  } as TStore)

const mockUseSelector = useSelector as jest.Mock<any, any>
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}))
jest.mock('src/redux/slicers/payment', () => ({
  fetchPaymentMethods: jest.fn(),
}))

jest.mock('src/hooks/useAppData', () =>
  jest.fn().mockImplementation(() => mockBillingConstants.billing),
)

afterAll(() => {
  jest.unmock('react-redux')
  jest.unmock('src/redux/slicers/payment')
  jest.unmock('src/hooks/useAppData')
})

describe('PaymentMethodsCard', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should render a card with payment methods title', () => {
    mockUseSelector.mockImplementation((cb) => {
      return cb(mockState())
    })
    render(<PaymentMethodsCard />)
    expect(screen.getByTestId('payment-methods-card')).toBeInTheDocument()
    expect(screen.getByTestId('payment-methods-card-title')).toHaveTextContent(
      mockBillingConstants.billing.fields.paymentMethods.value,
    )
  })

  it('should invoke fetch payment methods on load', () => {
    mockUseSelector.mockImplementation((cb) => {
      return cb(mockState())
    })
    render(<PaymentMethodsCard />)
    expect(fetchPaymentMethods).toBeCalledWith(activeAccountId)
  })

  it('should not invoke fetch payment methods on load when active account Id is not available', () => {
    mockUseSelector.mockImplementation((cb) => {
      const state = { ...mockState() }
      state.account.activeAccount.details = {
        ...state.account.activeAccount.details,
        data: { id: '' } as AccountDetails,
      }
      return cb(state)
    })
    render(<PaymentMethodsCard />)
    expect(fetchPaymentMethods).not.toBeCalled()
  })

  it('should render loader while fetching payment methods', () => {
    mockUseSelector.mockImplementation((cb) => {
      const state = { ...mockState() }
      state.payment.paymentMethods = {
        ...state.payment.paymentMethods,
        isLoading: true,
      }
      return cb(state)
    })
    render(<PaymentMethodsCard />)
    expect(
      screen.getByTestId('payment-methods-card-loader'),
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('payment-methods-card-list'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('payment-methods-card-error'),
    ).not.toBeInTheDocument()
  })

  it('should render error when there is an error fetching payment methods', () => {
    mockUseSelector.mockImplementation((cb) => {
      const state = { ...mockState() }
      state.payment.paymentMethods = {
        ...state.payment.paymentMethods,
        error: true,
      }
      return cb(state)
    })
    render(<PaymentMethodsCard />)
    expect(screen.getByTestId('payment-methods-card-error')).toBeInTheDocument()
    expect(
      screen.queryByTestId('payment-methods-card-list'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('payment-methods-card-loader'),
    ).not.toBeInTheDocument()
  })

  it('should render manage payment methods link', () => {
    mockUseSelector.mockImplementation((cb) => {
      return cb(mockState())
    })
    render(<PaymentMethodsCard />)
    expect(
      screen.getByTestId('manage-payment-methods-label'),
    ).toHaveTextContent(
      mockBillingConstants.billing.fields.managePaymentMethods.value,
    )
    expect(
      screen.getByTestId('manage-payment-methods-go-icon'),
    ).toBeInTheDocument()
  })

  it('should render no saved methods message when there are no saved payment methods', () => {
    mockUseSelector.mockImplementation((cb) => {
      const state = { ...mockState() }
      state.payment.paymentMethods = {
        data: { paymentMethods: [] } as unknown as PaymentMethodsData,
        isLoading: false,
        error: false,
      }
      return cb(state)
    })
    render(<PaymentMethodsCard />)
    expect(screen.getByTestId('no-saved-methods-text')).toHaveTextContent(
      mockBillingConstants.billing.fields.noSavedMethods.value,
    )
  })

  it('should render maximum of 3 payment methods', () => {
    mockUseSelector.mockImplementation((cb) => {
      return cb(mockState())
    })
    render(<PaymentMethodsCard />)
    expect(screen.getAllByTestId('payment-method-row')).toHaveLength(3)
  })

  it('should render payment method nickname', () => {
    mockUseSelector.mockImplementation((cb) => {
      const state = { ...mockState() }
      state.payment.paymentMethods = {
        data: {
          paymentMethods: mockPaymentMethodsData.paymentMethods.filter(
            (p) => p.default,
          ),
        } as unknown as PaymentMethodsData,
        isLoading: false,
        error: false,
      }
      return cb(state)
    })
    render(<PaymentMethodsCard />)
    const paymentMethodRow = screen.getByTestId('payment-method-row')
    expect(
      getByTestId(paymentMethodRow, 'payment-method-row-nickname'),
    ).toHaveTextContent(mockPaymentMethodsData.paymentMethods[0].nickName)
  })

  it('should render default label for default payment method', () => {
    mockUseSelector.mockImplementation((cb) => {
      const state = { ...mockState() }
      state.payment.paymentMethods = {
        data: {
          paymentMethods: mockPaymentMethodsData.paymentMethods.filter(
            (p) => p.default,
          ),
        } as unknown as PaymentMethodsData,
        isLoading: false,
        error: false,
      }
      return cb(state)
    })
    render(<PaymentMethodsCard />)
    const paymentMethodRow = screen.getByTestId('payment-method-row')

    expect(
      getByTestId(paymentMethodRow, 'payment-method-row-default'),
    ).toHaveTextContent(mockBillingConstants.billing.fields.default.value)
  })

  it('should render expired label for an expired payment method', () => {
    mockUseSelector.mockImplementation((cb) => {
      const state = { ...mockState() }
      state.payment.paymentMethods = {
        data: {
          paymentMethods: mockPaymentMethodsData.paymentMethods.filter(
            (p) => p.status.toLowerCase() === 'expired',
          ),
        } as unknown as PaymentMethodsData,
        isLoading: false,
        error: false,
      }
      return cb(state)
    })
    render(<PaymentMethodsCard />)
    const paymentMethodRow = screen.getByTestId('payment-method-row')

    expect(
      getByTestId(paymentMethodRow, 'payment-method-row-expired'),
    ).toHaveTextContent(mockBillingConstants.billing.fields.expired.value)
  })

  it('should render no default message when there is no default saved methods', () => {
    mockUseSelector.mockImplementation((cb) => {
      const state = { ...mockState() }
      state.payment.paymentMethods = {
        data: {
          paymentMethods: mockPaymentMethodsData.paymentMethods.filter(
            (p) => !p.default,
          ),
        } as unknown as PaymentMethodsData,
        isLoading: false,
        error: false,
      }
      return cb(state)
    })
    render(<PaymentMethodsCard />)
    expect(screen.getByTestId('no-default-method-text')).toHaveTextContent(
      mockBillingConstants.billing.fields.noDefaultMethod.value,
    )
  })
})
