import { HeroSection } from 'src/libs/why-frontier/why-frontier'
import { fireEvent, render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { useRouter } from 'next/router'

jest.mock('src/hooks')
jest.mock('next/router')

describe('HeroSection', () => {
  it('should render correctly', () => {
    const mockPush = jest.fn()
    ;(useRouter as any).mockImplementation(() => ({
      push: mockPush,
    }))
    ;(useAppData as any).mockImplementation(() => ({
      firstTitle: {
        value: 'FIRST',
      },
      secondTitle: {
        value: 'SECOND',
      },
      description: {
        value: 'TEST DESC',
      },
      primaryButtonText: {
        value: 'LEARN MORE',
      },
    }))
    const { getByText, getByRole } = render(<HeroSection />)
    expect(getByText('FIRST')).toBeInTheDocument()
    expect(getByText('SECOND')).toBeInTheDocument()
    const learnMoreBtn = getByRole('button')
    fireEvent.click(learnMoreBtn)
    expect(mockPush).toHaveBeenCalled()
  })
})
