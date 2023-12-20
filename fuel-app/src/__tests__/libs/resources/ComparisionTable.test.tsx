import { render } from '@testing-library/react'
import { CompareTable } from 'src/libs/resources'
jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Large H2 Headline',
  },
  rowHeaderFlag: {
    value: true,
  },
  yesIcon: {
    value: null,
    alt: '',
  },
  legal: {
    value: 'legal content',
  },
  buttonText: {
    value: 'Sign Up Now',
  },
  buttonURL: {
    url: '/',
  },
  buttonType: {
    type: {
      field: {
        value: 'link',
      },
    },
  },
  hoverType: {
    type: {
      field: {
        value: 'primary',
      },
    },
  },
  items: {
    list: [
      {
        headerDescription: 'test headerDescription',
        headerDescriptionLink: 'test headerDescriptionLink',
        logo: 'test logo',
        properties: [
          {
            name: 'test name property 1',
            textValue: 'test textValue property 1',
            value: false,
          },
          {
            name: 'test name property 2',
            textValue: 'test textValue property 2',
            value: false,
          },
        ],
      },
    ],
  },
}
describe('ComparisonTable', () => {
  it('should render correctly', () => {
    const { queryByText, getByTestId } = render(
      <CompareTable data={mockData} />,
    )
    expect(queryByText('Large H2 Headline')).toBeInTheDocument()
    expect(getByTestId('compare-dynamic-table')).toBeVisible()
  })

  it('should render without title', () => {
    const withOutTitle = {
      ...mockData,
      title: {
        value: '',
      },
    }
    const { queryByText, getByTestId } = render(
      <CompareTable data={withOutTitle} />,
    )
    expect(queryByText('Large H2 Headline')).not.toBeInTheDocument()
    expect(getByTestId('compare-dynamic-table')).toBeVisible()
  })
  it('should render without legal content', () => {
    const withOutTitle = {
      ...mockData,
      legal: {
        value: '',
      },
    }
    const { queryByText, getByTestId } = render(
      <CompareTable data={withOutTitle} />,
    )
    expect(queryByText('legal content')).not.toBeInTheDocument()
    expect(getByTestId('compare-dynamic-table')).toBeVisible()
  })
  it('should render without button', () => {
    const withOutTitle = {
      ...mockData,
      buttonText: {
        value: '',
      },
    }
    const { queryByText, getByTestId } = render(
      <CompareTable data={withOutTitle} />,
    )
    expect(queryByText('Sign Up Now')).not.toBeInTheDocument()
    expect(getByTestId('compare-dynamic-table')).toBeVisible()
  })
  it('should render without data', () => {
    const { queryByText } = render(<CompareTable data={''} />)
    expect(queryByText('Sign Up Now')).not.toBeInTheDocument()
  })
})
