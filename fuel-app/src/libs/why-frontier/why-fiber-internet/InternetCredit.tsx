import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const InternetCredit = () => {
  const { buttonText, buttonUrl, heading, description, legalDisclaimer } =
    useAppData('QualifyForACP', true)
  const classes = useStyles()

  return (
    <div id="internet-credit" className={classes.root}>
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          {heading?.value && (
            <InjectHTML tagType="h3" styleType="h3" value={heading?.value} />
          )}
        </div>
        <div className={classes.rightContainer}>
          {description?.value && (
            <InjectHTML
              tagType="h5"
              styleType="h5"
              fontType="boldFont"
              value={description?.value}
            />
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
          <Button
            type="link"
            href={buttonUrl?.url}
            text={buttonText?.value}
            className={classes.btnLearn}
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
    maxWidth: 1232,
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
    '& sup': { lineHeight: '0' },
  },
  leftContainer: { flex: 1 },
  rightContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
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
