import { Typography } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('Typography', () => {
  it('should render correctly Heading 1 tag', () => {
    const { getByTestId } = render(
      <Typography tagType="h1" testId="test-heading-1">
        Test Heading 1
      </Typography>,
    )

    const testHeading1 = getByTestId('test-heading-1')
    expect(testHeading1.textContent).toBe('Test Heading 1')
  })

  it('should render correctly Heading 2 tag', () => {
    const { getByTestId } = render(
      <Typography tagType="h2" testId="test-heading-2">
        Test Heading 2
      </Typography>,
    )

    const testHeading2 = getByTestId('test-heading-2')
    expect(testHeading2.textContent).toBe('Test Heading 2')
  })

  it('should render correctly Span tag', () => {
    const { getByTestId } = render(
      <Typography tagType="span" testId="test-span-tag">
        Test Span tag
      </Typography>,
    )

    const testSpan = getByTestId('test-span-tag')
    expect(testSpan.textContent).toBe('Test Span tag')
  })

  it('should render correctly Paragraph tag', () => {
    const { getByTestId } = render(
      <Typography tagType="p" testId="test-paragraph-tag">
        Test Paragraph tag
      </Typography>,
    )

    const testP = getByTestId('test-paragraph-tag')
    expect(testP.textContent).toBe('Test Paragraph tag')
  })

  it('should render correctly Default Div tag', () => {
    const { getByTestId } = render(
      <Typography testId="test-div-tag">Test Div tag</Typography>,
    )

    const testDiv = getByTestId('test-div-tag')
    expect(testDiv.textContent).toBe('Test Div tag')
  })
})
