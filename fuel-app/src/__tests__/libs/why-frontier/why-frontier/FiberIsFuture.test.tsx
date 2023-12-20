import { FiberIsFuture } from 'src/libs/why-frontier/why-frontier'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')

describe('FiberIsFuture', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      title: {
        value: 'APPLE TITLE',
      },
      subTitle: {
        value: 'TEST SUBTITLE',
      },
    }))
    const { getByText } = render(<FiberIsFuture />)
    expect(getByText('APPLE TITLE')).toBeInTheDocument()
    expect(getByText('TEST SUBTITLE')).toBeInTheDocument()
  })
})
