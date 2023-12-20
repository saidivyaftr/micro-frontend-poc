import { WhyFrontierComponent } from 'src/libs/why-frontier/why-frontier'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')

describe('WhyFrontierComponent', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      heading: {
        value: 'title',
      },
      cards: {
        list: [
          {
            title: { value: 'SOME TITLE' },
            description: { value: 'SOME DESCRIPTION' },
          },
        ],
      },
    }))
    const { getByText } = render(<WhyFrontierComponent />)
    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('SOME TITLE')).toBeInTheDocument()
  })
})
