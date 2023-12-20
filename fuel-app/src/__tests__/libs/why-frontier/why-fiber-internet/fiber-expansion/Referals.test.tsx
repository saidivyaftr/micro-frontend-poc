import { render, fireEvent } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import Referals from 'src/libs/why-frontier/why-fiber-internet/fiber-expansion/Referals'
jest.mock('src/hooks')

const referalsMockData = {
  heading: {
    value: 'Share the joy of fiber and earn some cash.',
  },
  button: {
    link: 'https://www.frontiercustomerreferral.com/',
    text: 'REFER A CUSTOMER',
  },
}

describe('Referals', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => referalsMockData)
    const { getByText } = render(<Referals />)

    expect(
      getByText('Share the joy of fiber and earn some cash.'),
    ).toBeInTheDocument()
  })

  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => referalsMockData)
    const { getByText } = render(<Referals />)

    const referCustomerBtn = getByText('REFER A CUSTOMER')
    fireEvent.click(referCustomerBtn)
  })
})
