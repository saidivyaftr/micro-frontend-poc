import { render } from '@testing-library/react'
import { HeroSection } from 'src/libs/resources/'

describe('Hero', () => {
  it('should render correctly', () => {
    const MOCK_DATA = {
      title: {
        value: 'Hero',
      },
      subTitle: {
        value: 'Hero Subtitle',
      },
      backgroundImage:
        'https://frontier.com/~/media/Why-Frontier/images/wf-banner.jpg',
      backgroundMobileImage:
        'https://frontier.com/~/media/Why-Frontier/images/wf-banner-sm.jpg',
    }
    const { getByTestId } = render(<HeroSection data={MOCK_DATA} />)
    expect(getByTestId('hero-banner-section')).toBeTruthy()
  })
})
