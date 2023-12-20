import { RedeemCard } from 'src/libs/offer/apple-tv'
import { render } from '@testing-library/react'
import { useAppData, useChatState } from 'src/hooks'

jest.mock('src/hooks')
const mockData = {
  title: { value: 'TITLE' },
  items: {
    list: [
      {
        title: {
          value: 'LIST TITLE',
        },
        buttonText: {
          value: 'BUTTON NAME',
        },
        buttonURL: {
          url: '',
        },
        image: {
          src: '',
        },
      },
    ],
  },
}

const chatData = {
  isChatOpen: false,
  setChatState: () => null,
}

describe('RedeemCard', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByText } = render(<RedeemCard />)
    expect(getByText('TITLE')).toBeInTheDocument()
    expect(getByText('LIST TITLE')).toBeInTheDocument()
    expect(getByText('BUTTON NAME')).toBeInTheDocument()
  })
})
