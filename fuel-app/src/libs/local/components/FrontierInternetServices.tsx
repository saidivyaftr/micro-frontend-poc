import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core'
import TwoColumnLayout from './TwoColumnLayout'

const FrontierInternetServices = ({ data }: any) => {
  const classes = useStyles()
  const { leftContent, rightContent }: any = data || {}

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div id="frontier-internet-service" className={classes.root}>
      <div className={classes.wrapper}>
        <TwoColumnLayout
          leftContent={leftContent?.value}
          rightContent={rightContent?.value}
          wrapperClass={classes.wrapperClass}
          leftClass={classes.leftClass}
          rightClass={classes.rightClass}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: colors.main.newBackgroundGray,
    marginTop: 0,
    [theme.breakpoints.up('md')]: {
      marginTop: '-5.15rem',
    },
  },
  wrapper: {
    boxSizing: 'content-box',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '3rem 1rem',
    [theme.breakpoints.up('md')]: {
      padding: '9rem 4rem 5rem',
    },
  },
  wrapperClass: {
    [theme.breakpoints.up('md')]: {
      gridGap: '4rem',
    },
  },
  leftClass: {
    fontSize: '1.875rem',
    lineHeight: '2.375rem',
    flex: '40%',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      flex: 1,
    },
  },
  rightClass: {
    flex: '51%',
    [theme.breakpoints.down('xs')]: {
      flex: 1,
    },
  },
}))

export default FrontierInternetServices
