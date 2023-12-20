import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import FrontierEero from 'src/libs/shop/internet/fiber-internet/500/FrontierEero'

jest.mock('src/hooks')

const mockData = {
  imageContentBox: {
    src: null,
    alt: '',
  },
  heading: {
    value: 'Get an Amazon eero Wi-Fi router included',
  },
  subHeading: {
    value: 'test subHeading',
  },
  legal: {
    value: 'test legal',
  },
  buttonUrl: {
    url: '/offer/eero',
  },
  butontText: {
    value: 'LEARN MORE',
  },
}

describe('FrontierEero', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId, getByText } = render(<FrontierEero />)
    expect(getByTestId('frontier-eero')).toBeInTheDocument()
    expect(getByText(mockData.heading.value)).toBeInTheDocument()
    expect(getByText(mockData.subHeading.value)).toBeInTheDocument()
    expect(getByText(mockData.legal.value)).toBeInTheDocument()
    expect(getByText(mockData.butontText.value)).toHaveAttribute(
      'href',
      mockData.buttonUrl.url,
    )
  })
})
