import { InjectHTML } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('InjectHTML', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <InjectHTML
        value="<h1>test html</h1>"
        pureInjection={true}
        enableClick={false}
        testId="test-html"
      />,
    )

    const testHTML = getByTestId('test-html')
    expect(testHTML.textContent).toBe('test html')
  })
})
