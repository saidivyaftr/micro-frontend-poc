import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core'
import TwoColumnLayout from './TwoColumnLayout'

const CustomerService = ({ data }: any) => {
  const classes = useStyles()
  const { leftContent, rightContent }: any = data || {}

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div id="customer-service" className={classes.root}>
      <div className={classes.wrapper}>
        <TwoColumnLayout
          leftContent={leftContent?.value}
          rightContent={rightContent?.value}
          leftClass={classes.leftClass}
          rightClass={classes.rightClass}
          wrapperClass={classes.wrapperClass}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: colors.main.greenishBlue,
  },
  wrapper: {
    boxSizing: 'content-box',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '3.25rem 1rem',
    [theme.breakpoints.up('md')]: {
      padding: '7.625rem 4rem 5rem',
    },
  },
  leftClass: {
    [theme.breakpoints.up('md')]: {
      flex: 'unset',
      minWidth: '32%',
    },
  },
  rightClass: {
    [theme.breakpoints.up('md')]: {
      flex: 'unset',
      paddingLeft: '40px',
    },
  },
  wrapperClass: {
    alignItems: 'center',
  },
}))

export default CustomerService
