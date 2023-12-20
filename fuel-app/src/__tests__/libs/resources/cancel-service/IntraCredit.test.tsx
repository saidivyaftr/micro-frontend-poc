import { render } from '@testing-library/react'
import { InternetCredit } from 'src/libs/resources/cancel-service'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')
const MOCK_DATA = {
  title: {
    value: 'You may qualify for a $30/mo. internet credit',
  },
  legalDisclaimer: {
    value:
      'per month for qualified Federal Affordable Connectivity Program households*',
  },
  description: {
    value:
      'We’re proud to participate in the Federal Affordable Connectivity Program. Because everyone deserves fast, low-cost internet.',
  },
  button: {
    text: 'LEARN MORE',
    url: '/',
  },
}

describe('IntraCredit component', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => MOCK_DATA)

    const { getByTestId } = render(<InternetCredit />)

    expect(getByTestId('internet-credit')).toBeTruthy()
  })

  it('should not render correctly', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...MOCK_DATA,
        title: {
          value: '',
        },
      }
    })
    const { queryByTestId } = render(<InternetCredit />)
    expect(queryByTestId('understanding-title')).not.toBeInTheDocument()
  })
})
