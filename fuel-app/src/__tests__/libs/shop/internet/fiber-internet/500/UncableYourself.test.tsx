import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import UncableYourself from 'src/libs/shop/internet/fiber-internet/500/UncableYourself'

jest.mock('src/hooks')

const mockData = {
  heading: {
    value: 'Uncable Yourself',
  },
  subHeading: {
    value: 'Get Fiber',
  },
  description: {
    value: 'test description',
  },
  btnLabel: {
    value: 'Learn More',
  },
  disclaimerText: {
    value: 'test disclaimerText',
  },
  btnUrl: {
    url: '/why-frontier/get-fiber',
  },
  backgroundImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/UncableYourself/updated/Uncableyourself-Updated.png?rev=f514e3a0e49049539dc23b9812507ef4',
    alt: 'Uncable Your Self',
  },
  mobileBackgroundImage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/UncableYourself/updated/Uncableyourself-Updated-Mobile.png?rev=2cc869fa08d3420e92801125ab750952',
    alt: 'Uncable Your Self',
  },
}

describe('UncableYourself', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId, getByText } = render(<UncableYourself />)
    expect(getByTestId('uncableYourself')).toBeInTheDocument()
    expect(getByTestId('caption')).toBeInTheDocument()
    expect(getByText(mockData.heading.value)).toBeInTheDocument()
    expect(getByText(mockData.description.value)).toBeInTheDocument()
    expect(getByText(mockData.subHeading.value)).toBeInTheDocument()
    expect(getByText(mockData.btnLabel.value)).toHaveAttribute(
      'href',
      mockData.btnUrl.url,
    )
  })
})
