import InternetDetails from 'src/libs/shop/components/InternetDetails'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
jest.mock('src/hooks')

describe('InternetDetails', () => {
  const initialState = {
    title: { value: 'Test Title' },
    subTitle: { value: 'Test sub Title' },
  }

  it('should render correctly with store', () => {
    ;(useAppData as any).mockImplementation(() => initialState)
    const { getByTestId } = render(<InternetDetails />)
    const testTitle = getByTestId('title')
    expect(testTitle.textContent).toBe('Test Title')
    expect(getByTestId('subtitle')).toHaveTextContent('Test sub Title')
  })
})
