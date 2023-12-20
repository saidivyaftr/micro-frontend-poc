import { FiberInternetFAQ } from 'src/libs/shop/internet/fiber-internet/2-gig'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

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

describe('FiberInternetFAQ', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      faqItems: {
        faqs: [getFAQData(1), getFAQData(2), getFAQData(3)],
      },
      title: {
        value: 'test faqTitle',
      },
    }))
    const { getByText } = render(<FiberInternetFAQ />)
    expect(getByText('test faqTitle')).toBeInTheDocument()
    expect(getByText('1 title')).toBeInTheDocument()
    expect(getByText('1 description')).toBeInTheDocument()
  })
  it('Should not display any FiberInternetFAQ where there is no data provided', () => {
    ;(useAppData as any).mockImplementation(() => [])
    const { queryAllByTestId } = render(<FiberInternetFAQ />)
    expect(queryAllByTestId('faqTitle').length).toBe(0)
  })
})
