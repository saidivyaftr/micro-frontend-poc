import AppointmentDetailsMissing from 'src/libs/account/welcome/components/AppointmentDetailsMissing'
import { useAppData, useChatState } from 'src/hooks'
import * as redux from 'react-redux'
import { shallowWithMock } from 'src/__utils__'

jest.mock('src/hooks')

const chatData = {
  isChatOpen: false,
  setChatState: () => null,
}
const appointmentDetailsMissingInfo = {
  noAppointmentDetail: {
    value: 'Detail',
  },

  chatWithUs: {
    value: 'Chat ',
  },
}
const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue(appointmentDetailsMissingInfo)

describe('AppointmentDetailsMissing', () => {
  it('should render correctly', () => {
    ;(useChatState as any).mockImplementation(() => chatData)
    ;(useAppData as any).mockImplementation(() => appointmentDetailsMissingInfo)

    const wrapper = shallowWithMock(AppointmentDetailsMissing, {})
    expect(wrapper.html()).toBeTruthy()
    expect(
      wrapper.find({
        children: appointmentDetailsMissingInfo.noAppointmentDetail.value,
      }),
    ).toMatchSnapshot()
  })
})
