import AddressRenderer from 'src/libs/account/welcome/components/AddressRenderer'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

const address = {
  street: '425 Soledata street',
  city: 'New Brighton',
  state: 'Minneapolis',
  zip: '55112',
}

describe('AddressRenderer', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<AddressRenderer address={address} />)
    expect(getByTestId('test-street')).toHaveTextContent(address.street)
    expect(getByTestId('test-city')).toHaveTextContent(address.city)
    expect(getByTestId('test-zip')).toHaveTextContent(address.zip)
  })
})
