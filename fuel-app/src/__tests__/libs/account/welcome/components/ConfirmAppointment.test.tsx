import ConfirmAppointment from 'src/libs/account/welcome/components/ConfirmAppointment'
import { useAppData } from 'src/hooks'
import WelcomePageContextProvider from 'src/libs/account/welcome/WelcomePageContext'
import { confirmAppointment, welcomePageData } from '../../mock-data'
jest.mock('src/hooks')
import { shallowWithMock } from 'src/__utils__'

describe('ConfirmAppointment', () => {
  it('should render correctly with context value', () => {
    ;(useAppData as any).mockImplementation(() => confirmAppointment)
    const InformationComponent = () => (
      <WelcomePageContextProvider value={welcomePageData}>
        <ConfirmAppointment />
      </WelcomePageContextProvider>
    )
    const wrapper = shallowWithMock(InformationComponent, {})
    expect(wrapper.html()).toBeTruthy()

    expect(
      wrapper.find({
        children: confirmAppointment.title,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: confirmAppointment.description,
      }),
    ).toMatchSnapshot()
  })
})
