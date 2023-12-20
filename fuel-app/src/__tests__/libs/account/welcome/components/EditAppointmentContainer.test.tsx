import EditAppointmentContainer from 'src/libs/account/welcome/components/EditAppointmentContainer'
import {
  editAppointmentInfo,
  welcomePageModalContext,
  updateAppointment,
} from '../../mock-data'
import WelcomePageContextProvider from 'src/libs/account/welcome/WelcomePageContext'
import { shallowWithMock } from 'src/__utils__'
import * as redux from 'react-redux'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')
const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue(editAppointmentInfo)

describe('EditAppointmentContainer', () => {
  it('should render correctly with context values', () => {
    ;(useAppData as any).mockImplementation(() => editAppointmentInfo)
    ;(useAppData as any).mockImplementation(() => updateAppointment)
    const TestComponent = () => (
      <WelcomePageContextProvider value={welcomePageModalContext}>
        <EditAppointmentContainer />
      </WelcomePageContextProvider>
    )
    const wrapper = shallowWithMock(TestComponent, {})
    expect(wrapper.html()).toBeTruthy()
  })
})
