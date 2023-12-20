import { makeStyles } from '@material-ui/core/styles'
import { Button, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData, useChatState } from 'src/hooks'
import colors from '@/shared-ui/colors'
const PageEndBanner = () => {
  const { description, button, buttonHoverVariant } = useAppData(
    'pageendBanner',
    true,
  )
  const classes = useStyles()
  const { setChatState } = useChatState()
  return (
    <div data-testid="PageEndBanner" className={classes.root}>
      <div className={classes.wrapper}>
        {description?.value && (
          <InjectHTML
            tagType="h6"
            styleType="h6"
            value={description?.value}
            color="tertiary"
            className={classes.description}
            data-testid="page-end-banner-description"
          />
        )}

        {button?.text &&
          (button?.text?.toLowerCase()?.includes('chat') ? (
            <Button
              type="button"
              text={button?.text}
              className={classes.buttonSize}
              hoverVariant={buttonHoverVariant?.targetItem?.type?.value}
              onClick={() => {
                setChatState(true)
              }}
            />
          ) : (
            <Button
              type="link"
              text={button?.text}
              className={classes.buttonSize}
              hoverVariant={buttonHoverVariant?.targetItem?.type?.value}
              href={button?.url}
            />
          ))}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.midnightExpress,
    textAlign: 'center',
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '2rem 1rem',
    [breakpoints.up('md')]: {
      padding: '2rem',
    },
  },
  buttonSize: {
    display: 'inline',
    justifyContent: 'center',
    width: 'unset',
    [breakpoints.down('sm')]: {
      display: 'flex',
      width: '100% !important',
    },
  },
  description: {
    display: 'inline',
    marginRight: '1rem',
    [breakpoints.down('sm')]: {
      display: 'block',
      margin: '0 0 1rem 0',
      textAlign: 'center',
    },
  },
}))

export default PageEndBanner
