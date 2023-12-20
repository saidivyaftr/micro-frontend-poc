import { render, fireEvent } from '@testing-library/react'
import { useAppData, useChatState } from 'src/hooks'
import { PageEndBanner } from 'src/libs/resources/autopay'

jest.mock('src/hooks')
const mockData = {
  description: {
    value:
      'Go paperless! An easy, safe, earth-friendly way to view and pay online.',
  },
  buttonHoverVariant: {
    targetItem: {
      type: {
        value: 'secondary',
      },
    },
  },
}

const chatData = {
  isChatOpen: false,
  setChatState: jest.fn(),
}

describe('PageEndBanner', () => {
  it('should render correctly without buttons', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByTestId } = render(<PageEndBanner />)
    const component = getByTestId('PageEndBanner')
    expect(
      component.querySelector('[data-testid=page-end-banner-description]')
        ?.innerHTML,
    ).toBe(
      'Go paperless! An easy, safe, earth-friendly way to view and pay online.',
    )
  })

  it('should render correctly with button', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        button: {
          url: '/login',
          text: 'chat',
        },
      }
    })
    ;(useChatState as any).mockImplementation(() => chatData)
    const { getByRole, queryByRole } = render(<PageEndBanner />)
    const button = getByRole('button', { name: 'chat' })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(chatData.setChatState).toHaveBeenCalledWith(true)
    expect(queryByRole('link')).not.toBeInTheDocument()
  })

  it('should render with link', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        button: {
          url: '/login',
          text: 'enroll',
        },
      }
    })
    const { getByRole, queryByRole } = render(<PageEndBanner />)
    expect(getByRole('link', { name: 'enroll' })).toBeInTheDocument()
    expect(queryByRole('button')).not.toBeInTheDocument()
  })
})
