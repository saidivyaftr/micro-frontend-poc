import { NeedMoreHelp } from 'src/libs/resources/wifi-connection'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')
const MOCK_DATA = {
  title: {
    value: 'title',
  },
  description: {
    value: 'description',
  },
  button: {
    text: 'GET HELP',
    url: '/helpcenter',
  },
}

describe('Need more help component', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => MOCK_DATA)

    const { getByTestId, getAllByRole, getByText } = render(<NeedMoreHelp />)
    expect(getAllByRole('link')).toHaveLength(1)
    expect(getAllByRole('link')[0]).toHaveAttribute('href', '/helpcenter')
    expect(getByText('GET HELP')).toBeInTheDocument()
    expect(getByTestId('need-more-help')).toBeTruthy()
  })

  it('should not render correctly', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...MOCK_DATA,
        title: {
          value: '',
        },
      }
    })
    const { queryByTestId } = render(<NeedMoreHelp />)
    expect(queryByTestId('need-more-help')).not.toBeInTheDocument()
  })
})
