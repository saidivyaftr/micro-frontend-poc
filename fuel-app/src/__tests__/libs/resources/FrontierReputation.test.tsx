import { render } from '@testing-library/react'
import FrontierReputation from 'src/libs/resources/FrontierReputation'
const mockData = {
  title: {
    value: 'Example 1',
  },
  disclaimerText: {
    value: 'Example here title',
  },
  backgroundColor: {
    value: 'red',
  },
  fontColor: {
    value: 'primary',
  },
}
describe('FrontierReputation', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<FrontierReputation data={mockData} />)
    expect(getByTestId('reputationData-info')).toBeVisible()
  })
  it('should render correctly with Title', () => {
    const { getByTestId, getByText } = render(
      <FrontierReputation data={mockData} />,
    )
    expect(getByTestId('reputationData-info')).toBeVisible()
    expect(getByText('Example 1')).toBeInTheDocument()
  })
  it('should render correctly with disclaimerNote', () => {
    const { getByTestId, getByText } = render(
      <FrontierReputation data={mockData} />,
    )
    expect(getByText('Example 1')).toBeInTheDocument()
    expect(getByText('Example here title')).toBeInTheDocument()
    expect(getByTestId('reputationData-info')).toBeVisible()
  })
  it('should render correctly with out disclaimerNote', () => {
    const withOutDisclaimerNotes = {
      ...mockData,
      disclaimerText: {
        value: '',
      },
    }
    const { getByTestId, getByText, queryByText } = render(
      <FrontierReputation data={withOutDisclaimerNotes} />,
    )
    expect(getByText('Example 1')).toBeInTheDocument()
    expect(getByTestId('reputationData-info')).toBeVisible()
    expect(queryByText('Example here title')).not.toBeInTheDocument()
  })
})
