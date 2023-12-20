import UpsTrackingNumber from 'src/libs/account/welcome/components/UpsTrackingNumber'
import { render, screen } from '@testing-library/react'
import WelcomePageContextProvider from 'src/libs/account/welcome/WelcomePageContext'
import { welcomePageData } from '../../mock-data'
jest.mock('src/hooks')

const mockData = welcomePageData

describe('UpsTrackingNumber', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <WelcomePageContextProvider value={mockData}>
        <UpsTrackingNumber />
      </WelcomePageContextProvider>,
    )
    expect(
      getByText(mockData.orderDetailsData.trackingNumbers[0].id),
    ).toBeInTheDocument()
    expect(
      getByText(mockData.orderDetailsData.trackingNumbers[1].id),
    ).toBeInTheDocument()
    const filterComponent = screen.getByTestId('ups-test')
    expect(filterComponent).toBeInTheDocument()
  })
})
