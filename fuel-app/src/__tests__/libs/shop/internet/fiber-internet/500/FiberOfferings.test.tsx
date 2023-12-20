import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import FiberOfferings from 'src/libs/shop/components/FiberOfferings'

jest.mock('src/hooks')

const mockData = {
  title: {
    value: 'Fiber internet plans',
  },
  legal: {
    value: 'test legal test',
  },
  buttonText: {
    value: 'Check Availability',
  },
  buttonURL: {
    url: '/buy',
  },
}

describe('FiberOfferings', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, getByTestId } = render(<FiberOfferings />)
    expect(getByText(mockData.title.value)).toBeInTheDocument()
    expect(getByTestId('comparison-table')).toBeInTheDocument()
    expect(getByText(mockData.legal.value)).toBeInTheDocument()
    expect(getByText(mockData.buttonText.value)).toHaveAttribute(
      'href',
      mockData.buttonURL.url,
    )
  })
})
