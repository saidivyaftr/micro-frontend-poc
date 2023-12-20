import colors from '@/shared-ui/colors'
import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import {
  COMPONENT_WRAPPER,
  CTA_BUTTON,
  SITE_INTERACTION,
  WIFI_CONNECTION_PAGE,
} from 'src/constants'
import { useAppData } from 'src/hooks'

const NeedMoreHelp = () => {
  const classes = useStyles()
  const data = useAppData('needMoreHelp', true)
  const { title, description, buttonText, buttonUrl } = data

  if (!title?.value) {
    return null
  }

  return (
    <div data-testid="need-more-help" className={classes.root}>
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          {title?.value && (
            <InjectHTML
              tagType="h2"
              styleType="h4"
              fontType="boldFont"
              value={title?.value}
              color="tertiary"
            />
          )}
        </div>
        <div className={classes.rightContainer}>
          {description?.value && (
            <InjectHTML
              tagType="div"
              styleType="p1"
              value={description?.value}
              color="tertiary"
            />
          )}
          <Button
            variant="white"
            type="link"
            hoverVariant="secondary"
            href={buttonUrl?.value}
            text={buttonText?.value}
            className={classes.btn}
            triggerEvent={true}
            eventObj={{
              events: 'event14',
              eVar14: `${WIFI_CONNECTION_PAGE}:${CTA_BUTTON}:get-help`,
            }}
            interactionType={SITE_INTERACTION}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.dark,
    marginTop: '5rem',
    [breakpoints.down('xs')]: {
      marginTop: '2.5rem',
    },
  },
  container: {
    ...COMPONENT_WRAPPER,
    padding: '5rem 1rem',
    display: 'flex',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '3rem 2.5rem',
    },
  },
  leftContainer: {
    flex: 1,
    width: '100%',
    [breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  rightContainer: {
    flex: 1.5,
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
    },
  },
  btn: {
    marginTop: '2rem',
    fontSize: '1rem',
    [breakpoints.down('xs')]: {
      marginTop: '0.625rem',
    },
  },
}))

export default NeedMoreHelp
