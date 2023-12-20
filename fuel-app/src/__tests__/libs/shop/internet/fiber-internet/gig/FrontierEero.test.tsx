import { ImagePerk } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { render } from '@testing-library/react'
import { FrontierEero } from 'src/libs/shop/internet/fiber-internet/gig'
jest.mock('src/hooks')

const mockData = {
  heading: {
    value: 'Uncable Yourself',
  },
  subHeading: {
    value: 'Get Fiber',
  },
  description: {
    value: 'Example',
  },
  btnLabel: {
    value: 'Learn More',
  },
  btnUrl: {
    url: '/why-frontier/get-fiber',
  },
  toolTipText: {
    value: '',
  },
  disclaimerText: {
    value: '',
  },
  backgroundImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/UncableYourself/updated/Uncableyourself-Updated.png?rev=f514e3a0e49049539dc23b9812507ef4',
    alt: 'Uncable Your Self',
  },
  mobileBackgroundImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/UncableYourself/updated/Uncableyourself-Updated.png?rev=f514e3a0e49049539dc23b9812507ef4',
    alt: 'Uncable Your Self',
  },
}
describe('UncableYourself', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { queryByTestId } = render(<FrontierEero />)
    expect(queryByTestId('frontier-eero')).toBeInTheDocument()
  })
})

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
