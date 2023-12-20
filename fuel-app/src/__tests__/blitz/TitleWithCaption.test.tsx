import { TitleWithCaption } from '@/shared-ui/components'
import { render } from '@testing-library/react'
import { useChatState } from 'src/hooks'
jest.mock('src/hooks')

const chatData = {
  isChatOpen: false,
  setChatState: () => null,
}

describe('TitleWithCaption', () => {
  it('should render correctly', () => {
    ;(useChatState as any).mockImplementation(() => chatData)

    const { getByTestId } = render(
      <TitleWithCaption
        title="test title"
        backgroundColor="dark-blue"
        fontColor="white"
        disclaimerText="test caption"
      />,
    )

    const caption = getByTestId('test-caption')
    expect(caption.textContent).toBe('test caption')
    const title = getByTestId('test-title')
    expect(title.textContent).toBe('test title')
  })
})
