import EditAppointmentInfo from 'src/libs/account/welcome/components/EditAppointmentInfo'
import { useAppData } from 'src/hooks'
import WelcomePageContextProvider from 'src/libs/account/welcome/WelcomePageContext'
import { editAppointmentInfo, welcomePageData } from '../../mock-data'
jest.mock('src/hooks')
import { shallowWithMock } from 'src/__utils__'

describe('EditAppointmentInfo', () => {
  it('should render correctly with context value', () => {
    ;(useAppData as any).mockImplementation(() => editAppointmentInfo)
    const InformationComponent = () => (
      <WelcomePageContextProvider value={welcomePageData}>
        <EditAppointmentInfo />
      </WelcomePageContextProvider>
    )
    const wrapper = shallowWithMock(InformationComponent, {})
    expect(wrapper.html()).toBeTruthy()

    expect(
      wrapper.find({
        children: editAppointmentInfo.title,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: editAppointmentInfo.appointmentScheduleContent,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: editAppointmentInfo.selectDateandTimeContent,
      }),
    ).toMatchSnapshot()
  })
})
