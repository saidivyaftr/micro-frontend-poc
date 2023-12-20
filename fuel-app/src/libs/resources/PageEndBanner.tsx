import { makeStyles } from '@material-ui/core/styles'
import { Button, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useChatState } from 'src/hooks'
import colors from '@/shared-ui/colors'
const PageEndBanner = ({ data }: any) => {
  const {
    title,
    titleColor,
    buttonText,
    buttonUrl,
    backgroundColor,
    buttonHover,
    buttonColor,
  } = data
  const classes = customStyles({
    backgroundColor: backgroundColor?.Color?.field?.value,
  })()

  const { setChatState } = useChatState()
  return (
    <div data-testid="PageEndBanner" className={classes.root}>
      <div className={classes.wrapper}>
        {title?.value && (
          <InjectHTML
            tagType="h6"
            value={title?.value}
            color={titleColor?.Color?.field?.value || 'default'}
            className={classes.title}
          />
        )}

        {buttonText?.value &&
          (buttonText?.value?.toLowerCase()?.includes('chat') ? (
            <Button
              type="button"
              data-testid="chat-button"
              text={buttonText?.value}
              className={classes.buttonSize}
              hoverVariant={buttonHover?.Color?.field?.value || 'secondary'}
              variant={buttonColor?.Color?.field?.value || 'primary'}
              onClick={() => {
                setChatState(true)
              }}
            />
          ) : (
            <Button
              type="link"
              data-testid="normal-button"
              text={buttonText?.value}
              className={classes.buttonSize}
              href={buttonUrl?.value}
              hoverVariant={buttonHover?.Color?.field?.value || 'secondary'}
              variant={buttonColor?.Color?.field?.value || 'primary'}
            />
          ))}
      </div>
    </div>
  )
}

const customStyles = ({ backgroundColor }: any) =>
  makeStyles(({ breakpoints }) => ({
    root: {
      backgroundColor: backgroundColor || colors.main.midnightExpress,
      textAlign: 'center',
    },
    wrapper: { ...COMPONENT_WRAPPER, padding: '2rem' },
    buttonSize: {
      display: 'inline',
      justifyContent: 'center',
      width: 'unset',
      [breakpoints.down('sm')]: {
        display: 'flex',
        width: '100% !important',
      },
    },
    title: {
      display: 'inline',
      marginRight: '2rem',
      [breakpoints.down('sm')]: {
        display: 'block',
        margin: '1rem 0',
        textAlign: 'center',
      },
    },
  }))

export default PageEndBanner
