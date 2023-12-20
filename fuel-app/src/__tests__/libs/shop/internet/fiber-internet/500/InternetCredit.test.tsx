import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import InternetCredit from 'src/libs/shop/internet/fiber-internet/500/InternetCredit'

jest.mock('src/hooks')

const mockData = {
  title: {
    value: 'test title',
  },
  description: {
    value: 'test description',
  },
  buttonText: {
    value: 'Learn More',
  },
  legalDisclaimer: {
    value:
      'per month for qualified Federal Affordable Connectivity Program households*',
  },
  buttonUrl: {
    url: 'https://frontier.com/discount-programs/affordable-connectivity-program?icid=22aug29_national_2gig_discountprograms_acp_banner',
  },
}

describe('InternetCredit', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId, getByText } = render(<InternetCredit />)
    expect(getByTestId('internet-credit')).toBeInTheDocument()
    expect(getByText(mockData.title.value)).toBeInTheDocument()
    expect(getByText(mockData.description.value)).toBeInTheDocument()
    expect(getByText(mockData.legalDisclaimer.value)).toBeInTheDocument()
    expect(getByText(mockData.buttonText.value)).toHaveAttribute(
      'href',
      mockData.buttonUrl.url,
    )
  })
})
