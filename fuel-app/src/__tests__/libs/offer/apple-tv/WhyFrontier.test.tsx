import { WhyFrontier } from 'src/libs/offer/apple-tv'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')

describe('WhyFrontier', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      title: {
        value: 'TITLE',
      },
      subTitle: {
        value: 'SUB TITLE',
      },
      tiles: {
        list: [
          {
            title: {
              value: 'FIRST_TILE',
            },
          },
        ],
      },
    }))
    const { getByText } = render(<WhyFrontier />)
    expect(getByText('TITLE')).toBeInTheDocument()
    expect(getByText('SUB TITLE')).toBeInTheDocument()
    expect(getByText('FIRST_TILE')).toBeInTheDocument()
  })
})
