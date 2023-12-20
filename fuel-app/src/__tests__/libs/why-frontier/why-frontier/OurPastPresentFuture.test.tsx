import { OurPastPresentFuture } from 'src/libs/why-frontier/why-frontier'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')

describe('OurPastPresentFuture', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      list: {
        targetItems: [
          {
            contentTitle: { value: 'SOME TITLE' },
            contentIntro: { value: 'SOME INTRO' },
          },
        ],
      },
    }))
    const { getByText } = render(<OurPastPresentFuture />)
    expect(getByText('SOME TITLE')).toBeInTheDocument()
    expect(getByText('SOME INTRO')).toBeInTheDocument()
  })
})
