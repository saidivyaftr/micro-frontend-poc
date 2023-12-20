import YourInformationCard from 'src/libs/account/welcome/components/YourInformationCard'
import * as redux from 'react-redux'
import { useAppData } from 'src/hooks'
import { orderDetailsData, welcomeContext } from '../../mock-data'
import WelcomePageContextProvider from 'src/libs/account/welcome/WelcomePageContext'
import { shallowWithMock } from 'src/__utils__'
jest.mock('src/hooks')
const appData = {
  title: {
    value: 'Your information',
  },
  serviceAddress: {
    value: 'Service address',
  },
  email: {
    value: 'Email',
  },
}
const profileData = {
  email: 'david@gmail.com',
}
const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue(profileData)
describe('YourInformationCard', () => {
  it('should render correctly with context values', () => {
    ;(useAppData as any).mockImplementation(() => appData)
    const YourInformationComponent = () => (
      <WelcomePageContextProvider value={welcomeContext}>
        <YourInformationCard />
      </WelcomePageContextProvider>
    )
    const wrapper = shallowWithMock(YourInformationComponent, {})
    expect(wrapper.html()).toBeTruthy()
    expect(
      wrapper.find({
        children: orderDetailsData.appointment.canBeReachedTelephoneNumber,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({ children: orderDetailsData.serviceAddress.streetNumber }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({ children: orderDetailsData.serviceAddress.streetName }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({ children: orderDetailsData.serviceAddress.cityName }),
    ).toMatchSnapshot()
    expect(wrapper.find({ children: profileData.email })).toMatchSnapshot()
    expect(wrapper.find({ children: appData.title.value })).toMatchSnapshot()
    expect(
      wrapper.find({ children: appData.serviceAddress.value }),
    ).toMatchSnapshot()
    expect(wrapper.find({ children: appData.email.value })).toMatchSnapshot()
  })
})
