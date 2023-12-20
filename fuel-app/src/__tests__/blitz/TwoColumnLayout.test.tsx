import { TwoColumnLayout } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('TwoColumnLayout', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <TwoColumnLayout
        image="testsrc"
        title="test title"
        testId="layoutimage"
        content="Test content"
      />,
    )
    const image = getByTestId('layoutimage')
    const content = getByTestId('content')
    expect(image.getAttribute('src')).toBe('testsrc')
    expect(image.getAttribute('alt')).toBe('test title')
    expect(content.innerHTML).toBe('Test content')
  })
})
