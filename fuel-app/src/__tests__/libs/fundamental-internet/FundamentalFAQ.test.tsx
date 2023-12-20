import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import FundamentalFAQ from 'src/libs/fundamental-internet/FundamentalFAQ'

jest.mock('src/hooks')

const getFAQData = (index: number) => {
  return {
    title: {
      value: `${index} title`,
    },
    description: {
      value: `${index} description`,
    },
  }
}

describe('FundamentalInternetFAQ', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      faqItems: {
        faqs: [getFAQData(1), getFAQData(2), getFAQData(3)],
      },
      title: {
        value: 'Frequently asked questions',
      },
    }))
    const { getByText } = render(<FundamentalFAQ />)
    expect(getByText('Frequently asked questions')).toBeInTheDocument()
    expect(getByText('1 title')).toBeInTheDocument()
    expect(getByText('1 description')).toBeInTheDocument()
  })
  it('Should not display any FiberInternetFAQ where there is no data provided', () => {
    ;(useAppData as any).mockImplementation(() => [])
    const { queryAllByTestId } = render(<FundamentalFAQ />)
    expect(queryAllByTestId('faqTitle').length).toBe(0)
  })
})
