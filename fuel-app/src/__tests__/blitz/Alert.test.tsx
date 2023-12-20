import { Alert } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('Alert', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <Alert
        handleClose={() => void 0}
        message="test message"
        strongText="test strongText"
      />,
    )
    const completemessage = getByTestId('test-completemessage')
    expect(completemessage.textContent).toBe('test strongText test message')
  })
})
