import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import NextSteps from 'src/libs/services/Confirmation/NextSteps'

jest.mock('src/hooks')

describe('NextSteps', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      title: {
        value: 'Next steps',
      },
      description: {
        value: 'sample description',
      },
    }))
    const { getByText } = render(<NextSteps emailAddress={'test@test.com'} />)
    expect(getByText(/Next steps/i)).toBeInTheDocument()
  })
})
