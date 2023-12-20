import UpdateAppointment from 'src/libs/account/welcome/components/UpdateAppointment'
import { useAppData } from 'src/hooks'
import { useWindowDimensions } from '@/shared-ui/hooks'
import WelcomePageContextProvider from 'src/libs/account/welcome/WelcomePageContext'
import {
  updateAppointment,
  dimensionsData,
  welcomePageData,
} from '../../mock-data'
jest.mock('src/hooks')
import { shallowWithMock } from 'src/__utils__'
import * as redux from 'react-redux'

const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue(updateAppointment)

describe('UpdateAppointment', () => {
  it('should render correctly with context value', () => {
    ;(useAppData as any).mockImplementation(() => updateAppointment)
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)

    const InformationComponent = () => (
      <WelcomePageContextProvider value={welcomePageData}>
        <UpdateAppointment />
      </WelcomePageContextProvider>
    )
    const wrapper = shallowWithMock(InformationComponent, {})
    expect(wrapper.html()).toBeTruthy()

    expect(
      wrapper.find({
        children: updateAppointment.selectDateTitle,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: updateAppointment.selectTimeTitle,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: updateAppointment.reschuduleContent,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: updateAppointment.keepAppointment,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: updateAppointment.technicanArrival,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: updateAppointment.mrngSlot,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: updateAppointment.noonSlot,
      }),
    ).toMatchSnapshot()
    expect(
      wrapper.find({
        children: welcomePageData.orderDetailsData.id,
      }),
    ).toMatchSnapshot()
  })
})
