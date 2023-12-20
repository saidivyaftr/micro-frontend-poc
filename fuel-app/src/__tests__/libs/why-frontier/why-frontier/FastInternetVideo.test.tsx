import { FastInternetVideo } from 'src/libs/why-frontier/why-frontier'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')

describe('FastInternetVideo', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      heading: {
        value: 'APPLE TITLE',
      },
      videoDetailsaccountId: {
        value: 'TEST',
      },
      videoDetailsplayerId: {
        value: 'TEST',
      },
      videoDetailsvideoId: {
        value: 'TEST',
      },
    }))
    const { getByText } = render(<FastInternetVideo />)
    expect(getByText('APPLE TITLE')).toBeInTheDocument()
  })
})
