import { render } from '@testing-library/react'
import { Understanding } from 'src/libs/resources/wifi-connection'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')
const MOCK_DATA = {
  title: {
    value: 'title',
  },
  description: {
    value: 'description',
  },
  disclaimer: {
    value:
      '<a href="https://blog.frontier.com/2021/01/whats-the-difference-between-using-ethernet-and-wi-fi-to-access-the-internet/">Learn more about the difference</a> between Wi-Fi and ethernet.',
  },
}

describe('Understading component', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => MOCK_DATA)

    const { getByTestId } = render(<Understanding />)

    expect(getByTestId('understanding-title')).toBeTruthy()
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
    const { queryByTestId } = render(<Understanding />)
    expect(queryByTestId('understanding-title')).not.toBeInTheDocument()
  })
})
