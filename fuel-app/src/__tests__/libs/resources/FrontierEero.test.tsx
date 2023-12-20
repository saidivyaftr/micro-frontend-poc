import { render } from '@testing-library/react'
import FrontierEero from 'src/libs/resources/FrontierEero'

const mockData = {
  heading: {
    value: 'title',
  },
  subHeading: {
    value: 'sub Title',
  },
  butontText: {
    value: 'FrontierEero',
  },
  backgroundContentColor: {
    value: 'black',
  },
}
describe('FrontierEero', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<FrontierEero data={mockData} />)
    expect(getByTestId('main-title')).toHaveTextContent('title')
    expect(getByTestId('sub-title')).toHaveTextContent('sub Title')
    expect(getByTestId('primary')).toHaveTextContent('FrontierEero')
    expect(getByTestId('frontier-eero')).toBeTruthy()
  })
  it('should render primary button', () => {
    const newMockData = {
      ...mockData,
      backgroundContentColor: {
        value: 'red',
      },
    }
    const { getByTestId } = render(<FrontierEero data={newMockData} />)
    expect(getByTestId('secondary')).toHaveTextContent('FrontierEero')
  })
  it('should not render button', () => {
    const newMockData = {
      ...mockData,
      butontText: {
        value: '',
      },
    }
    const { queryByTestId } = render(<FrontierEero data={newMockData} />)
    expect(queryByTestId('primary')).not.toBeInTheDocument()
  })
})
