import TrackOrdersCard from 'src/libs/account/welcome/components/TrackOrdersCard'
import { useAppData } from 'src/hooks'
import { trackOrderData, welcomeContext } from '../../mock-data'
import WelcomePageContextProvider from 'src/libs/account/welcome/WelcomePageContext'
import { shallowWithMock } from 'src/__utils__'
jest.mock('src/hooks')
describe('TrackOrdersCard', () => {
  it('should render correctly with context values', () => {
    ;(useAppData as any).mockImplementation(() => trackOrderData)
    const YourInformationComponent = () => (
      <WelcomePageContextProvider value={welcomeContext}>
        <TrackOrdersCard />
      </WelcomePageContextProvider>
    )
    const wrapper = shallowWithMock(YourInformationComponent, {})
    expect(wrapper.html()).toBeTruthy()
    expect(
      wrapper.find({
        children: trackOrderData.techInstall.targetItem.title.value,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: trackOrderData.techInstall.targetItem.description.value,
      }),
    ).toMatchSnapshot()
  })
})
