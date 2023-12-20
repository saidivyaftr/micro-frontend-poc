import { useAppData } from 'src/hooks'
import { render } from '@testing-library/react'
import { InternetCredit } from 'src/libs/shop/internet/fiber-internet/gig'
jest.mock('src/hooks')

const mockData = {
  title: {
    value: 'Uncable Yourself',
  },
  description: {
    value: 'Get Fiber',
  },

  buttonText: {
    value: 'Learn More',
  },
  buttonUrl: {
    url: '/why-frontier/get-fiber',
  },
  legalDisclaimer: {
    value: 'per month for qualified',
  },
  toolTipText: {
    value: 'Tooltip Text',
  },
}
describe('InternetCredit', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { queryByTestId } = render(<InternetCredit />)
    expect(queryByTestId('internet-credit')).toBeInTheDocument()
  })
})
