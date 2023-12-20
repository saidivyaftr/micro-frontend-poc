import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER, CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { IShopComponents } from './types'
const InternetCredit = ({ styles }: IShopComponents) => {
  const { buttonText, buttonUrl, title, description, legalDisclaimer } =
    useAppData('InternetCredit', true)
  const classes = useStyles()

  return (
    <div
      id="internet-credit"
      className={classes.root}
      data-testid="internet-credit"
    >
      <div className={classes.container} style={styles}>
        <div className={classes.leftContainer}>
          {title?.value && (
            <InjectHTML tagType="h2" styleType="h3" value={title?.value} />
          )}
        </div>

        <div className={classes.rightContainer}>
          <div>
            <InjectHTML
              tagType="p"
              styleType="h5"
              fontType="boldFont"
              value={description?.value}
            />
          </div>
          {legalDisclaimer?.value && (
            <InjectHTML
              className={classes.legalDisclaimer}
              tagType="p"
              data-testid="caption"
              styleType="legal"
              value={legalDisclaimer?.value}
            />
          )}
          <Button
            type="link"
            href={buttonUrl?.url}
            text={buttonText?.value}
            className={classes.btnLearn}
            triggerEvent={true}
            eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
            interactionType={SITE_INTERACTION}
          />
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
    paddingTop: '5rem',
    paddingBottom: '5rem',
    alignItems: 'flex-start',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingTop: '2.5rem',
      paddingBottom: '2.5rem',
    },
  },
  legalDisclaimer: {
    marginTop: '1rem',
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
