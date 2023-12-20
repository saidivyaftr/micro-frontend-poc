import { render } from '@testing-library/react'
import PageEndBanner from 'src/libs/resources/PageEndBanner'
import { useChatState } from 'src/hooks'
jest.mock('src/hooks')
const chatData = {
  isChatOpen: false,
  setChatState: () => null,
}
const mockData = {
  title: {
    value: 'Posuere duis semper tristique elit, maecenas nibh sed pellentesque',
  },
  titleColor: {
    Color: {
      field: {
        value: 'default',
      },
    },
  },
  buttonUrl: {
    value: '/',
  },
  buttonText: {
    value: 'BUTTON TEXT',
  },
  backgroundColor: {
    Color: {
      field: {
        value: '#d9272d',
      },
    },
  },
}

describe('PageEndBanner', () => {
  it('should render correctly', () => {
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByTestId } = render(<PageEndBanner data={mockData} />)
    expect(getByTestId('PageEndBanner')).toBeVisible()
  })
  it('should render correctly with Title', () => {
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByTestId, getByText } = render(<PageEndBanner data={mockData} />)
    expect(getByTestId('PageEndBanner')).toBeVisible()
    expect(
      getByText(
        'Posuere duis semper tristique elit, maecenas nibh sed pellentesque',
      ),
    ).toBeInTheDocument()
  })
  it('should render correctly with Button', () => {
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByTestId } = render(<PageEndBanner data={mockData} />)
    expect(getByTestId('normal-button')).toBeInTheDocument()
    expect(getByTestId('PageEndBanner')).toBeVisible()
  })
  it('should render correctly with Chat Button', () => {
    ;(useChatState as any).mockImplementation(() => chatData)
    const chatMockData = {
      ...mockData,
      buttonText: {
        value: 'Chat',
      },
    }
    const { getByTestId, getByText } = render(
      <PageEndBanner data={chatMockData} />,
    )
    expect(getByText('Chat')).toBeInTheDocument()
    expect(getByTestId('PageEndBanner')).toBeVisible()
  })
  it('should render correctly with out title', () => {
    ;(useChatState as any).mockImplementation(() => chatData)
    const chatMockData = {
      ...mockData,
      title: {
        value: '',
      },
    }
    const { getByTestId, queryByText } = render(
      <PageEndBanner data={chatMockData} />,
    )
    expect(
      queryByText(
        'Posuere duis semper tristique elit, maecenas nibh sed pellentesque',
      ),
    ).not.toBeInTheDocument()
    expect(getByTestId('PageEndBanner')).toBeVisible()
  })
  it('should render correctly with out Buttons', () => {
    ;(useChatState as any).mockImplementation(() => chatData)
    const chatMockData = {
      ...mockData,
      buttonText: {
        value: '',
      },
    }
    const { getByTestId, queryByTestId } = render(
      <PageEndBanner data={chatMockData} />,
    )
    expect(queryByTestId('normal-button')).not.toBeInTheDocument()
    expect(getByTestId('PageEndBanner')).toBeVisible()
  })
})
