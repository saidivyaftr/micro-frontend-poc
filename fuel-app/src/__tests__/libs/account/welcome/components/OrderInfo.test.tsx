import OrderInfo from 'src/libs/account/welcome/components/OrderInfo'
import { useAppData } from 'src/hooks'
import WelcomePageContextProvider from 'src/libs/account/welcome/WelcomePageContext'
import { orderInfo, welcomePageData } from '../../mock-data'
jest.mock('src/hooks')
import { shallowWithMock } from 'src/__utils__'

describe('OrderInfo', () => {
  it('should render correctly with context value', () => {
    ;(useAppData as any).mockImplementation(() => orderInfo)
    const InformationComponent = () => (
      <WelcomePageContextProvider value={welcomePageData}>
        <OrderInfo />
      </WelcomePageContextProvider>
    )
    const wrapper = shallowWithMock(InformationComponent, {})
    expect(wrapper.html()).toBeTruthy()

    expect(
      wrapper.find({
        children: orderInfo.orderNumber,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: orderInfo.status,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: orderInfo.cancelled,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: orderInfo.serviceReadyDate,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: orderInfo.upsTrackingNumber,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: orderInfo.servicesOrdered,
      }),
    ).toMatchSnapshot()
  })
})
