import WelcomePageModal from 'src/libs/account/welcome/components/WelcomePageModal'
import { confirmAppointment, welcomePageModalContext } from '../../mock-data'
import WelcomePageContextProvider from 'src/libs/account/welcome/WelcomePageContext'
import { shallowWithMock } from 'src/__utils__'

jest.mock('src/hooks')

describe('WelcomePageModal', () => {
  it('should render correctly with context values', () => {
    const welcomePageModalComponent = () => (
      <WelcomePageContextProvider value={welcomePageModalContext}>
        <WelcomePageModal />
      </WelcomePageContextProvider>
    )
    const wrapper = shallowWithMock(welcomePageModalComponent, {})
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
