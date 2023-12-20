import { render } from '@testing-library/react'
import { CheckAvailabilityInfo } from 'src/components/CheckAvailabilityInfo'
import { useAppData, useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')

const dimensionsData = {
  width: 500,
}

const checkAvailabilityInfo = {
  componentName: 'CheckAvailabilityInfo',
  buttonTitle: {
    value:
      'Enter your address to see if Fiber 500 Internet is available for your home',
  },
  buttonURL: {
    value: '/buy',
  },
  buttonText: {
    value: 'Check Availability',
  },
  signIn: {
    url: '/contact-us',
    text: 'Already a customer?',
  },
  buttonVariant: {
    type: null,
  },
  buttonhoverVariant: {
    type: null,
  },
  titleColorCode: {
    targetItem: null,
  },
  linkColorCode: {
    targetItem: null,
  },
  linkOnHoverColorCode: {
    targetItem: null,
  },
  boxShadowColorCode: {
    targetItem: null,
  },
  mobileBoxShadowColorCode: {
    targetItem: null,
  },
  backgroundColor: {
    targetItem: null,
  },
  mobileBackgroundColor: {
    targetItem: null,
  },
}
describe('Competition', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => checkAvailabilityInfo)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByText } = render(<CheckAvailabilityInfo />)
    expect(
      getByText(checkAvailabilityInfo.buttonText.value),
    ).toBeInTheDocument()
  })

  it('should not render correctly title', () => {
    const withoutTitle = {
      ...CheckAvailabilityInfo,
      buttonTitle: {
        value: '',
      },
    }
    ;(useAppData as any).mockImplementation(() => withoutTitle)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { queryByText } = render(<CheckAvailabilityInfo />)
    expect(
      queryByText(
        'Enter your address to see if Fiber 500 Internet is available for your home',
      ),
    ).not.toBeInTheDocument()
  })
  it('should render correctly checking the href', () => {
    const dimensionsDataWeb = {
      width: 1200,
    }
    ;(useAppData as any).mockImplementation(() => checkAvailabilityInfo)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsDataWeb)
    const { getAllByRole, getByTestId } = render(<CheckAvailabilityInfo />)
    expect(getAllByRole('link')[0]).toHaveAttribute(
      'href',
      checkAvailabilityInfo?.buttonURL?.value,
    )
    expect(getByTestId('check-availability')).toHaveClass('makeStyles-root-57')
  })
})
