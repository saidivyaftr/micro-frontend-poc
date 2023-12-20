import { FAQ } from 'src/libs/offer/eero-secure'
import { fireEvent, render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')
const mockData = {
  faqItems: {
    faqs: [
      {
        title: {
          value: 'FAQ 1',
        },
        description: {
          value: '<div><p>FAQ description 1</p></div>',
        },
      },
      {
        title: {
          value: 'FAQ 2',
        },
        description: {
          value: '<div><p>FAQ description 2</p></div>',
        },
      },
    ],
  },
}

describe('FAQ', () => {
  it('should render without title', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, getAllByTestId, getAllByRole } = render(<FAQ />)
    const firstFaq = getAllByTestId('faq')[0]
    expect(firstFaq.querySelector('[data-testid=faqTitle]')?.innerHTML).toBeNull
    expect(getByText('FAQ 1')).toBeInTheDocument()
    fireEvent.click(getAllByRole('button')[0])
    expect(getByText('FAQ description 1')).toBeInTheDocument()
    expect(getAllByRole('button').length).toBe(2)
  })

  it('should render correctly with title', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        title: {
          value: 'FAQ title',
        },
      }
    })
    const { getAllByTestId } = render(<FAQ />)
    const firstFaq = getAllByTestId('faq')[0]
    expect(firstFaq.querySelector('[data-testid=faqTitle]')?.innerHTML).toBe(
      'FAQ title',
    )
  })

  it('should not render without data', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {}
    })
    const { queryByTestId } = render(<FAQ />)
    const firstFaq = queryByTestId('faq')
    expect(firstFaq).not.toBeInTheDocument()
  })
})
