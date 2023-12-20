import AppoitmentErrorModalContent from 'src/libs/account/welcome/components/AppoitmentErrorModalContent'
import { useAppData } from 'src/hooks'
import { shallowWithMock } from 'src/__utils__'
import * as redux from 'react-redux'

jest.mock('src/hooks')

const appoitmentErrorModalContent = {
  title: {
    value: 'Appointment Error',
  },
  description: {
    value: 'Appointment Error Reason',
  },
  anotherTime: {
    value: 'Another time ',
  },
}

const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue(appoitmentErrorModalContent)

describe('AppoitmentErrorModalContent', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => appoitmentErrorModalContent)

    const wrapper = shallowWithMock(AppoitmentErrorModalContent, {})
    expect(wrapper.html()).toBeTruthy()
    expect(
      wrapper.find({ children: appoitmentErrorModalContent.title.value }),
    ).toMatchSnapshot()
  })
})
