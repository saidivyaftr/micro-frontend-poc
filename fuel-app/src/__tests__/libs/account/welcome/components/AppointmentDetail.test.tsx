import AppointmentDetail from 'src/libs/account/welcome/components/AppointmentDetail'
import { useAppData } from 'src/hooks'
import WelcomePageContextProvider from 'src/libs/account/welcome/WelcomePageContext'
import { orderDetails, welcomeContext } from '../../mock-data'
import { shallowWithMock } from 'src/__utils__'
jest.mock('src/hooks')

describe('AppointmentDetail', () => {
  it('should render correctly with context values', () => {
    ;(useAppData as any).mockImplementation(() => orderDetails)
    const AppointmentDetailComponent = () => (
      <WelcomePageContextProvider value={welcomeContext}>
        <AppointmentDetail />
      </WelcomePageContextProvider>
    )
    const wrapper = shallowWithMock(AppointmentDetailComponent, {})
    expect(wrapper.html()).toBeTruthy()
    expect(
      wrapper.find({ children: orderDetails?.technicianArrival?.value }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({ children: orderDetails?.editAppointment?.value }),
    ).toMatchSnapshot()
  })
})
