import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import FiberInternetFAQ from 'src/libs/shop/internet/fiber-internet/500/FiberInternetFAQ'

jest.mock('src/hooks')

const mockData = {
  faqItems: {
    faqs: [
      {
        title: {
          value: 'title 1',
        },
        description: {
          value: 'descriptin 1',
        },
      },
      {
        title: {
          value: 'title 2',
        },
        description: {
          value: 'descriptin 2',
        },
      },
      {
        title: {
          value: 'title 3',
        },
        description: {
          value: 'description 3',
        },
      },
    ],
  },
  title: {
    value: 'FAQs',
  },
}

describe('FiberInternetFAQ', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId, getByText } = render(<FiberInternetFAQ />)
    expect(getByText(mockData.title.value)).toBeInTheDocument()
    expect(getByTestId('FiberInternetFAQ')).toBeInTheDocument()
    for (let i = 0; i < mockData.faqItems.faqs.length; i++) {
      expect(
        getByText(mockData.faqItems.faqs[i].title.value),
      ).toBeInTheDocument()
      expect(
        getByText(mockData.faqItems.faqs[i].description.value),
      ).toBeInTheDocument()
    }
  })
})
