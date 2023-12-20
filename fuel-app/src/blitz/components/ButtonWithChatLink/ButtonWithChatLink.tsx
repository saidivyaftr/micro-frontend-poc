import { Typography, Button, InjectHTML } from '@/shared-ui/components'
import clx from 'classnames'
import { IButtonWithChatLinkProps } from './index'
import css from './ButtonWithChatLink.module.scss'
import { useChatState } from 'src/hooks'
const ButtonWithChatLink = (props: IButtonWithChatLinkProps) => {
  const {
    hoverVariant = 'primary',
    buttonName = 'VIEW INTERNET PLANS',
    buttonLink = 'https://internet.frontier.com/youtubetv/',
    labelName = '',
    labelLinkText = '',
    bgType = 'white',
    labelNameColor = 'black',
    labelLinkTextColor = 'red',
    labelFontType = 'regularFont',
    labelStyleType = 'p1',
    labelTagType = 'div',
    chatClassName = '',
    buttonTarget = '_self',
    btnClassName = '',
    isReturningUser,
    chatParams,
  } = props
  const { setChatState, setChatParams } = useChatState()
  return (
    <div
      className={clx(css.root, {
        [css.white]: bgType === 'white',
        [css.dark]: bgType === 'cark',
        [css.lightGray]: bgType === 'light-gray',
      })}
    >
      {isReturningUser ? (
        <Button
          type="link"
          target={buttonTarget}
          hoverVariant={hoverVariant}
          text={buttonName}
          onClick={() => {
            if (chatParams) setChatParams(chatParams)
            setChatState(true)
          }}
          className={clx(btnClassName)}
        />
      ) : (
        <Button
          type="link"
          target={buttonTarget}
          hoverVariant={hoverVariant}
          text={buttonName}
          href={buttonLink}
          className={clx(btnClassName)}
        />
      )}
      {labelName && (
        <div
          className={clx(chatClassName, css.customChatContainer, {
            [css.isReturningUser]: isReturningUser,
          })}
        >
          <InjectHTML
            tagType={labelTagType}
            styleType={labelStyleType}
            fontType={labelFontType}
            color="tertiary"
            testId="test-label-name"
            value={labelName}
            className={clx({
              [css.blackFont]: labelNameColor === 'black',
              [css.whiteFont]: labelNameColor === 'white',
            })}
          />
          <button
            className={css.chatNowButton}
            onClick={() => {
              if (chatParams) setChatParams(chatParams)
              setChatState(true)
            }}
          >
            <Typography
              className={clx(css.chatNowButtonText, {
                [css.redFont]: labelLinkTextColor === 'red',
                [css.whiteFont]: labelLinkTextColor === 'white',
                [css.blackFont]: labelLinkTextColor === 'black',
              })}
              styleType={labelStyleType}
              fontType="boldFont"
              testId="test-label-link-name"
            >
              {labelLinkText}
            </Typography>
          </button>
        </div>
      )}
    </div>
  )
}

export default ButtonWithChatLink
