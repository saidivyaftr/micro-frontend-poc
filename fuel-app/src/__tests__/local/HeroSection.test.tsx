import HeroSection from 'src/libs/local/components/HeroSection'
import { render } from '@testing-library/react'

const MOCK_DATA = {
  firstTitle: {
    value: 'Hero',
  },
  secondTitle: {
    value: 'Frontier',
  },
  description: {
    value:
      'We’re pushing what’s possible — to go beyond where we’ve been and see what we can achieve, together.',
  },
  primaryButtonText: {
    value: 'LEARN MORE',
  },
  primaryButtonHref: {
    url: '',
  },
  image: {
    src: 'https://frontier.com/~/media/Why-Frontier/images/wf-banner.jpg',
  },
  mobileImage: {
    src: 'https://frontier.com/~/media/Why-Frontier/images/wf-banner-sm.jpg',
  },
}

describe('HeroSection', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<HeroSection data={MOCK_DATA} />)
    expect(getByTestId('local-hero-section')).toBeTruthy()
  })
})
