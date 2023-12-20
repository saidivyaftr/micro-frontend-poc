import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { YtvFaq } from 'src/libs/shop/tv'

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

describe('YtvFaq', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      faqItems: {
        faqs: [getFAQData(1), getFAQData(2), getFAQData(3)],
      },
      title: {
        value: 'test faqTitle',
      },
    }))
    const { getByText } = render(<YtvFaq />)
    expect(getByText('test faqTitle')).toBeInTheDocument()
    expect(getByText('1 title')).toBeInTheDocument()
    expect(getByText('1 description')).toBeInTheDocument()
  })
  it('Should not display any YtvFaq where there is no data provided', () => {
    ;(useAppData as any).mockImplementation(() => [])
    const { queryAllByTestId } = render(<YtvFaq />)
    expect(queryAllByTestId('faqTitle').length).toBe(0)
  })
})
