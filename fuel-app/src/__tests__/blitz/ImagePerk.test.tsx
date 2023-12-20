import { ImagePerk } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('ImagePerk', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <ImagePerk
        backgroundColor="primary"
        content={<div>test content</div>}
        contentAlign="right"
        tabletBackgroundImage={{
          alt: 'test backgroundImage alt',
          src: 'test backgroundImage src',
        }}
      />,
    )
    const content = getByTestId('test-imageperk-content')
    expect(content.textContent).toBe('test content')

    const image = getByTestId('test-image')
    expect(image.getAttribute('src')).toBe('test backgroundImage src')
    expect(image.getAttribute('alt')).toBe('test backgroundImage alt')
  })
})
