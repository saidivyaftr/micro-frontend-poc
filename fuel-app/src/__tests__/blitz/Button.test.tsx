import { Button } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('Button', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<Button text="test text" type="button" />)

    const testText = getByTestId('test-text')
    expect(testText.textContent).toBe('test text')
  })
})
