import { TwoCards } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('TwoCards', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <TwoCards
        heading="Test Heading"
        subheading="Test subheading"
        copy="Test Copy"
        disclaimer="test disclaimer"
        cards={[
          {
            image: {
              srcMobile: 'test src',
              srcTablet: 'test srcTablet',
              altText: 'test altText',
            },
            heading: 'test card heading',
            eyebrow: 'test card eyebrow',
            multiplier: 'test card multiplier',
            copy: 'test card copy',
          },
        ]}
      />,
    )
    const mainHeading = getByTestId('test-heading')
    const copy = getByTestId('test-copy')
    const disclaimer = getByTestId('test-disclaimer')
    const imageContent = getByTestId('image-content')
    const cardHeading = getByTestId('test-card-heading')
    const cardRyebrow = getByTestId('test-card-eyebrow')
    const cardMultiplier = getByTestId('test-card-multiplier')
    const cardCopy = getByTestId('test-card-copy')

    expect(imageContent.getAttribute('src')).toBe('test src')
    expect(imageContent.getAttribute('alt')).toBe('test altText')

    expect(mainHeading.textContent).toBe('Test Heading')
    expect(copy.textContent).toBe('Test Copy')
    expect(disclaimer.textContent).toBe('test disclaimer')

    expect(cardHeading.textContent).toBe('test card heading')
    expect(cardRyebrow.textContent).toBe('test card eyebrow')
    expect(cardMultiplier.textContent).toBe('test card multiplier')
    expect(cardCopy.textContent).toBe('test card copy')
  })
})
