import { AppleExperiance } from 'src/libs/offer/apple-tv'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')
const mockData = {
  title: { value: 'Test Title' },
  description: {
    value: 'Test Description',
  },
}

describe('AppleExperiance', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText } = render(<AppleExperiance />)
    expect(getByText('Test Title')).toBeInTheDocument()
    expect(getByText('Test Description')).toBeInTheDocument()
  })
})
