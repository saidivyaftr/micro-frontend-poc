import colors from '@/shared-ui/colors'
import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import {
  CANCEL_SERVICE_PAGE,
  COMPONENT_WRAPPER,
  CTA_BUTTON,
  SITE_INTERACTION,
} from 'src/constants'
import { useAppData } from 'src/hooks'

const InternetCredit = () => {
  const classes = useStyles()
  const { buttonUrl, buttonText, title, description, legalDisclaimer }: any =
    useAppData('InternetCredit', true)
  if (!title?.value) {
    return null
  }
  return (
    <div data-testid="internet-credit" className={classes.root}>
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          {title?.value && (
            <InjectHTML tagType="h2" styleType="h3" value={title?.value} />
          )}
          {legalDisclaimer?.value && (
            <InjectHTML
              className={classes.legalDisclaimer}
              tagType="p"
              data-testid="caption"
              styleType="legal"
              value={legalDisclaimer?.value}
            />
          )}
        </div>

        <div className={classes.rightContainer}>
          {description.value && (
            <>
              <InjectHTML
                tagType="p"
                styleType="h5"
                fontType="boldFont"
                value={description?.value}
              />
              <Button
                type="link"
                href={buttonUrl?.url}
                hoverVariant="primary"
                text={buttonText?.value}
                className={classes.btnLearn}
                triggerEvent={true}
                eventObj={{
                  events: 'event14',
                  eVar14: `${CANCEL_SERVICE_PAGE}: ${CTA_BUTTON}:learn-more`,
                }}
                interactionType={SITE_INTERACTION}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default InternetCredit

const useStyles = makeStyles(({ breakpoints }) => ({
  root: { backgroundColor: colors.main.greenishBlue },
  container: {
    ...COMPONENT_WRAPPER,
    padding: '1rem',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: '5rem',
    paddingBottom: '6rem',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingTop: '3rem',
      paddingBottom: '3rem',
    },
  },
  legalDisclaimer: {
    marginTop: '1rem',
    fontSize: '0.75rem',
    '& sup': { lineHeight: '0' },
  },
  leftContainer: { flex: 1 },
  rightContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
      '& p span': { fontSize: '1.125rem', lineHeight: '1.625rem' },
    },
  },
  btnLearn: {
    marginTop: '2rem',
    width: 'fit-content',
    fontSize: '1.125rem',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))
