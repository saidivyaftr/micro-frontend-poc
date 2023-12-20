import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import HeroSection from 'src/libs/shop/internet/fiber-internet/500/HeroSection'

jest.mock('src/hooks')

const mockData = {
  firstTitle: {
    value: 'BETTER FASTER',
  },
  secondTitle: {
    value: '100% FIBER',
  },
  description: {
    value: 'test description',
  },
  legalInfo: {
    value: 'Frontier Fiber Internet available in select areas.',
  },
  btnText: {
    value: 'CHECK AVAILABILITY',
  },
  btnUrl: {
    url: '/buy',
  },
}

describe('HeroSection', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, getByTestId } = render(<HeroSection />)
    expect(getByTestId('heroSection500')).toBeInTheDocument()
    expect(getByText(mockData.firstTitle.value)).toBeInTheDocument()
    expect(getByText(mockData.secondTitle.value)).toBeInTheDocument()
    expect(getByText(mockData.legalInfo.value)).toBeInTheDocument()
    expect(getByText(mockData.btnText.value)).toHaveAttribute(
      'href',
      mockData.btnUrl.url,
    )
    expect(getByText(mockData.description.value)).toBeInTheDocument()
  })
})
