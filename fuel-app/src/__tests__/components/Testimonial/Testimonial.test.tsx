import { render } from '@testing-library/react'
import { Testimonials } from 'src/components/Testimonials'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')

describe('Testimonials', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      eyebrowText: {
        value: 'title',
      },
      backgroundColor: {
        value: 'gravity',
      },
      list: {
        targetItems: [
          {
            quote: { value: 'SOME TITLE' },
            author: { value: 'SOME INTRO' },
          },
        ],
      },
    }))
    const { getByText } = render(<Testimonials />)
    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('SOME INTRO')).toBeInTheDocument()
  })
})
