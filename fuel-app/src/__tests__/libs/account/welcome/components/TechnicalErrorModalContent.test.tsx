import TechnicalErrorModalContent from 'src/libs/account/welcome/components/TechnicalErrorModalContent'
import { useAppData } from 'src/hooks'
import { shallowWithMock } from 'src/__utils__'
import * as redux from 'react-redux'

jest.mock('src/hooks')

const technicalErrorModalContent = {
  title: {
    value: 'Technical Error',
  },
  warning: {
    value: 'Error Warning',
  },
  message: {
    value: 'Technical Error Message ',
  },
}

const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue(technicalErrorModalContent)

describe('TechnicalErrorModalContent', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => technicalErrorModalContent)

    const wrapper = shallowWithMock(TechnicalErrorModalContent, {})
    expect(wrapper.html()).toBeTruthy()
    expect(
      wrapper.find({ children: technicalErrorModalContent.title.value }),
    ).toMatchSnapshot()
  })
})
