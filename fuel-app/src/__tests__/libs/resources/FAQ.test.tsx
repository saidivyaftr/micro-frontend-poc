import { render } from '@testing-library/react'
import { FAQ } from 'src/libs/resources'

const mockData = {
  faqItems: {
    list: [
      {
        title: {
          value: 'Question #1',
        },
        description: {
          value: '',
        },
      },
      {
        title: {
          value: 'Question #2',
        },
        description: {
          value: 'Answer for question to test the content in the page.',
        },
      },
      {
        title: {
          value: 'Question #3',
        },
        description: {
          value: '',
        },
      },
      {
        title: {
          value: 'Question #4',
        },
        description: {
          value: '',
        },
      },
      {
        title: {
          value: 'Question #5',
        },
        description: {
          value: 'Answer for question to test the content in the page.',
        },
      },
      {
        title: {
          value: 'Question #6',
        },
        description: {
          value: 'Answer for question to test the content in the page.',
        },
      },
      {
        title: {
          value: 'Question #7',
        },
        description: {
          value: '',
        },
      },
      {
        title: {
          value: 'Question #8',
        },
        description: {
          value: 'Answer for question to test the content in the page.',
        },
      },
      {
        title: {
          value: 'Question #9',
        },
        description: {
          value: '',
        },
      },
      {
        title: {
          value: 'Question #10',
        },
        description: {
          value: 'Answer for question to test the content in the page.',
        },
      },
      {
        title: {
          value: 'Question #11',
        },
        description: {
          value: 'Answer for question to test the content in the page.',
        },
      },
      {
        title: {
          value: 'Question #12',
        },
        description: {
          value: 'Answer for question to test the content in the page.',
        },
      },
      {
        title: {
          value: 'Question #13',
        },
        description: {
          value: 'Answer for question to test the content in the page.',
        },
      },
      {
        title: {
          value: 'Question #14',
        },
        description: {
          value: '',
        },
      },
      {
        title: {
          value: 'Question #15',
        },
        description: {
          value: '',
        },
      },
    ],
  },
  title: {
    value: 'Large H2 Headline',
  },
  backgroundColor: {
    color: {
      field: {
        value: '#F5F5F5',
      },
    },
  },
  description: {
    value: 'Large H3 Headline',
  },
  maxCap: {
    value: '25',
  },
  showMoreText: {
    value: 'Show More',
  },
  showLessText: {
    value: 'Show Less',
  },
  schema: {
    value: '',
  },
}

describe('FAQ', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<FAQ data={mockData} />)
    expect(getByTestId('HelpCenterFAQ')).toBeVisible()
  })
  it('should render without title', () => {
    const withOutTitle = {
      ...mockData,
      title: {
        value: '',
      },
    }
    const { queryByText } = render(<FAQ data={withOutTitle} />)
    expect(queryByText('Large H2 Headline')).not.toBeInTheDocument()
    expect(queryByText('Large H3 Headline')).toBeInTheDocument()
  })
  it('should render without description', () => {
    const withOutTitle = {
      ...mockData,
      description: {
        value: '',
      },
    }
    const { queryByText } = render(<FAQ data={withOutTitle} />)
    expect(queryByText('Large H2 Headline')).toBeInTheDocument()
    expect(queryByText('Large H3 Headline')).not.toBeInTheDocument()
  })

  it('should not render without data ', () => {
    const { queryByText, queryByTestId } = render(<FAQ data={''} />)
    expect(queryByText('Large H2 Headline')).not.toBeInTheDocument()
    expect(queryByText('Large H3 Headline')).not.toBeInTheDocument()
    expect(queryByTestId('HelpCenterFAQ')).not.toBeInTheDocument()
  })
})
