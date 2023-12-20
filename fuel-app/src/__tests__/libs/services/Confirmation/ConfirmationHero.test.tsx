import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import ConfirmationHero from 'src/libs/services/Confirmation/ConfirmationHero'

jest.mock('src/hooks')

describe('ConfirmationHero', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      title: {
        value: 'THANK YOU',
      },
      subTitle: {
        value: 'We have received your order',
      },
    }))
    const { getByText } = render(<ConfirmationHero />)
    expect(getByText(/THANK YOU/i)).toBeInTheDocument()
    expect(getByText(/We have received your order/i)).toBeInTheDocument()
  })
})
