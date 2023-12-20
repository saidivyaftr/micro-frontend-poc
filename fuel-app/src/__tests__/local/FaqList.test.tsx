import FaqList from 'src/libs/local/components/FaqList'
import { render, cleanup } from '@testing-library/react'

const data = {
  faqItems: {
    faqs: [
      {
        title: {
          value: 'Question 1',
        },
        description: {
          value: 'Answer 1',
        },
      },
      {
        title: {
          value: 'Question 2',
        },
        description: {
          value: 'Answer 2',
        },
      },
    ],
  },
  title: {
    value: 'FAQ',
  },
  schema: {
    value: '{ "test": "test" }',
  },
  maxCap: {
    value: 100,
  },
  showMoreText: {
    value: 'Show more',
  },
  showLessText: {
    value: 'Show less',
  },
}

describe('FaqList', () => {
  afterEach(cleanup)
  it('should render correctly', () => {
    const { getAllByTestId, container } = render(<FaqList data={data} />)
    expect(container).toMatchSnapshot()
    expect(getAllByTestId('test-description').length).toBe(2)
    expect(getAllByTestId('test-title')[0]).toHaveTextContent('Question 1')
  })

  it('returns null if faqList is empty', () => {
    const updatedList = { ...data, faqItems: { faqs: [] } }

    const { container } = render(<FaqList data={updatedList} />)

    expect(container.firstChild).toBeNull()
  })
})
