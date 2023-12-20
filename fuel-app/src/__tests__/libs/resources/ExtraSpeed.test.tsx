import { render } from '@testing-library/react'
import ExtraSpeed from 'src/libs/resources/ExtraSpeed'
const mockData = {
  title: {
    value: 'Example 1',
  },
  buttonURL: {
    value: '/buy',
  },
  buttonText: {
    value: 'Sign Up',
  },
  disclaimerNote: {
    value: 'Example here title',
  },
  backgroundColor: {
    value: 'red',
  },
  titleFontColor: {
    value: 'primary',
  },
  hoverVariant: {
    value: 'primary',
  },
  buttonVariant: {
    value: 'primary',
  },
  buttonColor: {
    value: 'primary',
  },
}
describe('ExtraSpeed', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<ExtraSpeed data={mockData} />)
    expect(getByTestId('extraSpeedData-info')).toBeVisible()
  })
  it('should render correctly with Title', () => {
    const { getByTestId, getByText } = render(<ExtraSpeed data={mockData} />)
    expect(getByTestId('extraSpeedData-info')).toBeVisible()
    expect(getByText('Example 1')).toBeInTheDocument()
  })
  it('should render correctly with Button', () => {
    const { getByTestId, getByText } = render(<ExtraSpeed data={mockData} />)
    expect(getByText('Example 1')).toBeInTheDocument()
    expect(getByText('Sign Up')).toBeInTheDocument()
    expect(getByTestId('extraSpeedData-info')).toBeVisible()
  })
  it('should render correctly with disclaimerNote', () => {
    const { getByTestId, getByText } = render(<ExtraSpeed data={mockData} />)
    expect(getByText('Example 1')).toBeInTheDocument()
    expect(getByText('Sign Up')).toBeInTheDocument()
    expect(getByText('Example here title')).toBeInTheDocument()
    expect(getByTestId('extraSpeedData-info')).toBeVisible()
  })
  it('should render correctly with out disclaimerNote', () => {
    const withOutDisclaimerNotes = {
      ...mockData,
      disclaimerNote: {
        value: '',
      },
    }
    const { getByTestId, getByText, queryByText } = render(
      <ExtraSpeed data={withOutDisclaimerNotes} />,
    )
    expect(getByText('Example 1')).toBeInTheDocument()
    expect(getByText('Sign Up')).toBeInTheDocument()
    expect(queryByText('Example here title')).not.toBeInTheDocument()
    expect(getByTestId('extraSpeedData-info')).toBeVisible()
  })
})
