import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { GreenCircleCheckOverlay } from '@/shared-ui/react-icons'

interface IInfoMessage {
  data: {
    successTitle: { value: string }
    successSubtitle: { value: string }
  }
}

const SuccessMessage = ({ data }: IInfoMessage) => {
  const classes = useStyles()
  const { successTitle, successSubtitle } = data

  if (!successTitle || !successSubtitle) {
    return null
  }

  return (
    <section className={classes.root}>
      <div className={classes.checkIconWrapper}>
        <GreenCircleCheckOverlay />
      </div>
      <Typography tagType="div" styleType="h5">
        {successTitle?.value}
      </Typography>

      <Typography className={classes.contentStyle} tagType="div" styleType="p1">
        {successSubtitle?.value}
      </Typography>
    </section>
  )
}
const useStyles = makeStyles((theme) => ({
  root: {
    ...COMPONENT_WRAPPER,
    background: colors.main.newBackgroundGray,
    display: 'flex',
    gap: theme.typography.pxToRem(9),
    paddingTop: theme.typography.pxToRem(64),
    paddingBottom: theme.typography.pxToRem(64),
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '1rem',
    margin: '3rem 8.125rem 6.6875rem 8.125rem',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '3rem 2.25rem',
      margin: '0 0 6rem 0',
    },
  },
  checkIconWrapper: {
    borderRadius: '32px',
    backgroundColor: colors.main.white,
    display: 'inline-flex',
    padding: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '16px',
  },
  contentStyle: {
    textAlign: 'center',
  },
}))

export default SuccessMessage
