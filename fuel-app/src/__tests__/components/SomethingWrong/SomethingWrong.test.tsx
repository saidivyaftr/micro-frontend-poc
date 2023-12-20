import { render } from '@testing-library/react'
import SomethingWrong from 'src/components/SomethingWrong'

describe('SomeThing Wrong', () => {
  it('should render correctly', () => {
    const { getByText } = render(<SomethingWrong />)
    expect(getByText('Something went wrong')).toBeInTheDocument()
    expect(
      getByText(
        'Sorry, Something went wrong. Return to the previous page or go home to get back on the right path.',
      ),
    ).toBeInTheDocument()
  })
  it('should not render correctly', () => {
    const { queryByText } = render(<SomethingWrong />)
    expect(queryByText('Something went')).not.toBeInTheDocument()
  })
})
