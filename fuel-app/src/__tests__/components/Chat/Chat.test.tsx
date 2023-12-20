import { fireEvent, render } from '@testing-library/react'
import Chat from 'src/components/Chat'
import { useChatState, useWindowDimensions } from 'src/hooks'
jest.mock('src/hooks')

const dimensionsData = {
  width: 500,
}
const chatData = {
  isChatOpen: false,
  setChatState: () => null,
}
describe('SomeThing Wrong', () => {
  it('should render correctly', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByText } = render(<Chat />)
    expect(getByText('Chat')).toBeInTheDocument()
  })
  it('should open chat', () => {
    const chatDataOpen = {
      isChatOpen: true,
      setChatState: () => null,
    }
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    ;(useChatState as any).mockImplementation(() => chatDataOpen)
    const { queryByText } = render(<Chat />)
    expect(queryByText('Chat')).not.toBeInTheDocument()
  })

  it('should click event chat', () => {
    const chatDataOpen = {
      isChatOpen: false,
      setChatState: () => null,
    }
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    ;(useChatState as any).mockImplementation(() => chatDataOpen)
    const { getByRole, queryByText } = render(<Chat />)
    fireEvent.click(getByRole('button'))
    expect(queryByText('Chat')).toBeInTheDocument()
  })
})
