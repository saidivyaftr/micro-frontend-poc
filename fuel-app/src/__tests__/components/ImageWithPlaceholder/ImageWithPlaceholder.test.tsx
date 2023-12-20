import { render } from '@testing-library/react'
import Image from 'src/components/ImageWithPlaceholder'

jest.mock('src/hooks')

const data = {
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/500Page/Whole-home-Wi-Fi-guarantee.png?rev=62ccac29638547ce9ae606319feb2a2a',
    alt: 'Whole home Wi-Fi guarantee',
  },
}
describe('twoColumnLayout', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <Image
        width="45"
        height="45"
        src={data?.image?.src}
        data-testid="Image-id"
        alt="image"
      />,
    )
    const image = getByTestId('Image-id')
    expect(image.getAttribute('src')).toBe(data?.image?.src)
    expect(image.getAttribute('alt')).toBe('mock image')
  })
})
