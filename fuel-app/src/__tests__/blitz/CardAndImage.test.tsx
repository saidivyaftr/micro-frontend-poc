import { CardAndImage } from '@/shared-ui/components'
import { render } from '@testing-library/react'
import { useWindowDimensions } from 'src/hooks'
jest.mock('src/hooks')

const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

describe('CardAndImage', () => {
  it('should render correctly', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByTestId } = render(
      <CardAndImage
        heading="test heading"
        copy="test copy"
        imageMobile=""
        imageTablet=""
        altText=""
      />,
    )

    const testHeading = getByTestId('test-heading')
    expect(testHeading.textContent).toBe('test heading')

    const testCopy = getByTestId('test-copy')
    expect(testCopy.textContent).toBe('test copy')
  })
})
