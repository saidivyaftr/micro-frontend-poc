import { render } from '@testing-library/react'
import { useChatState } from 'src/hooks'
import FrontierInfo from 'src/libs/resources/FrontierInfo'
jest.mock('src/hooks')
const chatData = {
  isChatOpen: false,
  setChatState: () => null,
}
const mockData = {
  title: {
    value: 'title',
  },
  lists: {
    list: [
      {
        title: {
          value: 'First tile',
        },
        subTitle: {
          value: 'First tile',
        },
        options: {
          option: [
            {
              text: {
                value: 'option Text',
              },
              icon: {
                value: 'icon Text',
              },
              buttonText: {
                value: 'Sign Up',
              },
            },
            {
              text: {
                value: 'option Text1',
              },
              icon: {
                value: 'icon Text1',
              },
              buttonText: {
                value: 'Sign Up1',
              },
            },
          ],
        },
      },
    ],
  },
}
describe('FrontierInfo', () => {
  it('should render correctly', () => {
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByText } = render(<FrontierInfo data={mockData} />)
    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('option Text1')).toBeInTheDocument()
  })
})
