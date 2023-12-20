import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import AccountInformation from 'src/libs/services/Confirmation/AccountInformation'

jest.mock('src/hooks')

const confirmationPageAccountInfo = {
  title: {
    value: 'Account information',
  },
  serviceAddress: {
    value: 'Service address',
  },
  paymentMethod: {
    value: 'Payment method',
  },
  emailLabel: {
    value: 'Email',
  },
}

describe('AccountInformation', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => confirmationPageAccountInfo)
    const { getByText } = render(
      <AccountInformation serviceAddressValue="" emailAddress="" />,
    )
    expect(getByText(/Account information/i)).toBeInTheDocument()
    expect(getByText(/Service address/i)).toBeInTheDocument()
    expect(getByText(/Payment method/i)).toBeInTheDocument()
    expect(getByText(/Email/i)).toBeInTheDocument()
  })
})
