import { Hero } from 'src/libs/offer/eero-secure'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Hero title',
  },
  description: {
    value: 'Hero description',
  },
  buttonText: {
    value: 'Button text',
  },
  logoImage: {
    src: 'mock',
  },
}

describe('Hero', () => {
  it('should render correctly without button', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, queryByText } = render(<Hero />)
    expect(getByText('Hero title')).toBeInTheDocument()
    expect(getByText('Hero description')).toBeInTheDocument()
    expect(queryByText('Button text')).not.toBeInTheDocument()
  })

  it('should render correctly with button', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        buttonUrl: {
          value: 'www.google.com',
        },
      }
    })
    const { getByText } = render(<Hero />)
    expect(getByText('Button text')).toBeInTheDocument()
  })

  it('should not render without data', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {}
    })
    const { queryByTestId } = render(<Hero />)
    const firstHero = queryByTestId('hero')
    expect(firstHero).not.toBeInTheDocument()
  })
})
