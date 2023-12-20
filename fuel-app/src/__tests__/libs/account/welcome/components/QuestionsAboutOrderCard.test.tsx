import QuestionsAboutOrderCard from 'src/libs/account/welcome/components/QuestionsAboutOrderCard'
import { useAppData, useChatState } from 'src/hooks'
import * as redux from 'react-redux'
import { shallowWithMock } from 'src/__utils__'
jest.mock('src/hooks')

const chatData = {
  isChatOpen: false,
  setChatState: () => null,
}
const questionsAboutOrderCard = {
  title: {
    value: 'Questions About Order',
  },
  description: {
    value: 'Have any Questions about order',
  },
  chatNow: {
    value: 'Chat Now',
  },
}

const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue(questionsAboutOrderCard)

describe('QuestionsAboutOrderCard', () => {
  it('should render correctly', () => {
    ;(useChatState as any).mockImplementation(() => chatData)
    ;(useAppData as any).mockImplementation(() => questionsAboutOrderCard)
    const wrapper = shallowWithMock(QuestionsAboutOrderCard, {})
    expect(wrapper.html()).toBeTruthy()
    expect(
      wrapper.find({ children: questionsAboutOrderCard.title.value }),
    ).toMatchSnapshot()
  })
})
