import { CheckAvailability } from '@/shared-ui/components'
import { render } from '@testing-library/react'
import { useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')

const dimensionsData = {
  width: 500,
}

describe('Competition', () => {
  it('should render correctly', () => {
    jest.mock('next/router', () => ({
      useRouter: jest.fn().mockReturnValue({
        asPath: '',
      }),
    }))
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByText } = render(
      <CheckAvailability
        titleText="Enter your address to see if Frontier Fiber is available for your home"
        titleColorCode="default"
        buttonVariant="primary"
        buttonText="Check availability"
      />,
    )
    expect(
      getByText(
        'Enter your address to see if Frontier Fiber is available for your home',
      ),
    ).toBeInTheDocument()
    expect(getByText('Check availability')).toBeInTheDocument()
  })
})
