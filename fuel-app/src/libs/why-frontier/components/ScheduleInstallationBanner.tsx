import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
const ScheduleInstallationBanner = () => {
  const classes = useStyles()
  const { heading, buttonText, buttonSrc }: any = useAppData(
    'scheduleCall',
    true,
  )

  const headingWithDate = {
    value: heading?.value.replace(
      '[date]',
      `${new Date().toLocaleString('default', {
        month: 'long',
      })} ${new Date().getDate()}`,
    ),
  }
  return (
    <div id="schedule-install-banner" className={classes.root}>
      <div className={classes.wrapper}>
        {headingWithDate?.value && (
          <Typography
            tagType="h6"
            styleType="h6"
            fontType="boldFont"
            color="tertiary"
            className={classes.heading}
          >
            {headingWithDate?.value}
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
      gap: '0rem',
    },
  },
  heading: {
    [breakpoints.down('sm')]: {
      margin: '0 0 1rem',
      textAlign: 'center',
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
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

export default ScheduleInstallationBanner
