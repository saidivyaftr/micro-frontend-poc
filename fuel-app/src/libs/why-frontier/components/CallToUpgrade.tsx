import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
const CallToUpgrade = () => {
  const classes = useStyles()
  const { heading, buttonText, buttonSrc }: any = useAppData(
    'callToUpgrade',
    true,
  )

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {heading?.value && (
          <Typography
            tagType="h6"
            styleType="h6"
            fontType="boldFont"
            className={classes.heading}
            color="tertiary"
          >
            {heading?.value}
          </Typography>
        )}
        <div className={classes.btnWrapper}>
          {buttonText?.value && (
            <Button
              type="link"
              href={buttonSrc?.url}
              text={buttonText?.value}
              hoverVariant="secondary"
            />
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: { background: colors.main.midnightExpress },
  wrapper: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
      padding: '2rem',
      gap: 0,
    },
  },
  heading: {
    [breakpoints.down('sm')]: {
      margin: '0 0 1rem',
      textAlign: 'center',
    },
  },
  btnWrapper: {
    padding: '2rem 0',
    '& a': {
      display: 'flex',
    },
    [breakpoints.down('sm')]: {
      padding: 0,
    },
    [breakpoints.down('xs')]: {
      width: '100%',
      '& a': {
        justifyContent: 'center',
      },
    },
  },
}))

export default CallToUpgrade
