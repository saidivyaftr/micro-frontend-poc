import CustomerService from 'src/libs/local/components/CustomerService'
import { render, cleanup } from '@testing-library/react'

const customerServiceData = {
  leftContent: { value: 'left content' },
  rightContent: { value: 'right content' },
}

describe('CustomerService', () => {
  afterEach(cleanup)
  it('should render correctly', () => {
    const { getByText, asFragment } = render(
      <CustomerService data={customerServiceData} />,
    )
    expect(asFragment()).toMatchSnapshot()
    expect(getByText(customerServiceData.leftContent.value)).toBeInTheDocument()
    expect(
      getByText(customerServiceData.rightContent.value),
    ).toBeInTheDocument()
  })

  it('should not render correctly', () => {
    const { queryByText, asFragment } = render(<CustomerService data={''} />)
    expect(asFragment()).toMatchSnapshot()
    expect(
      queryByText(customerServiceData.leftContent.value),
    ).not.toBeInTheDocument()
    expect(
      queryByText(customerServiceData.rightContent.value),
    ).not.toBeInTheDocument()
  })
})
