import OrderNotFoundCard from 'src/libs/account/welcome/components/OrderNotFoundCard'
import { render } from '@testing-library/react'
import { useAppData, useChatState } from 'src/hooks'
jest.mock('src/hooks')

const chatData = {
  isChatOpen: false,
  setChatState: () => null,
}
const orderNotFoundCardInfo = {
  title: {
    value: 'Order Not Found',
  },
  description: {
    value: 'No Orders Found',
  },
  chatWithUs: {
    value: 'Chat',
  },
}
describe('OrderNotFoundCard', () => {
  it('should render correctly', () => {
    ;(useChatState as any).mockImplementation(() => chatData)
    ;(useAppData as any).mockImplementation(() => orderNotFoundCardInfo)
    const { getByText } = render(<OrderNotFoundCard />)
    expect(getByText(orderNotFoundCardInfo.title.value)).toBeInTheDocument()
    expect(
      getByText(orderNotFoundCardInfo.chatWithUs.value),
    ).toBeInTheDocument()
  })
})

describe('OrderNotFoundCard', () => {
  it('should not render correctly', () => {
    const { asFragment } = render(<OrderNotFoundCard />)
    expect(asFragment()).toMatchSnapshot()
  })
})
