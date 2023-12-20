import { AppleOriginals } from 'src/libs/offer/apple-tv'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')

describe('AppleOriginals', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      title: {
        value: 'TITLE',
      },
      subTitle: {
        value: 'SUB TITLE',
      },
    }))
    const { getByText } = render(<AppleOriginals />)
    expect(getByText('TITLE')).toBeInTheDocument()
    expect(getByText('SUB TITLE')).toBeInTheDocument()
  })
})
