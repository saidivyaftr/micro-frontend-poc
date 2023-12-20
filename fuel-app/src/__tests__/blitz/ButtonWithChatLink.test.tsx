import { ButtonWithChatLink } from '@/shared-ui/components'
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
      <ButtonWithChatLink
        buttonName="test button"
        hoverVariant="primary"
        buttonLink="#"
        bgType="dark"
        labelLinkText="test link"
        labelName="test label"
        labelNameColor="black"
        labelLinkTextColor="red"
        labelTagType="p"
        labelStyleType="p1"
      />,
    )
    const caption = getByTestId('test-label-name')
    expect(caption.textContent).toBe('test label')
    const title = getByTestId('test-label-link-name')
    expect(title.textContent).toBe('test link')
  })
})
