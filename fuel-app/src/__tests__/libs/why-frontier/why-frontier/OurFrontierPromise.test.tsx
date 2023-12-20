import { OurFrontierPromise } from 'src/libs/why-frontier/why-frontier'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')

describe('OurFrontierPromise', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      title: {
        value: 'APPLE TITLE',
      },
      subTitle: {
        value: 'TEST SUBTITLE',
      },
      tiles: {
        list: [
          {
            title: { value: 'SOME TITLE' },
          },
        ],
      },
    }))
    const { getByText } = render(<OurFrontierPromise />)
    expect(getByText('APPLE TITLE')).toBeInTheDocument()
    expect(getByText('TEST SUBTITLE')).toBeInTheDocument()
    expect(getByText('SOME TITLE')).toBeInTheDocument()
  })
})
