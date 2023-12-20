import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Typography, InjectHTML } from '@/shared-ui/components'
const FormLayout = ({ children, title, description, partDescription }: any) => {
  const classes = formStyles()
  return (
    <div className={`${classes.root}`}>
      <div className={classes.outerWrapper}>
        <Typography tagType="h6" styleType="h6" color="primary">
          {partDescription}
        </Typography>
        <Typography className={classes.headline} tagType="h4" styleType="h4">
          {title}
        </Typography>
        <InjectHTML
          className={classes.description}
          tagType="p"
          styleType="p1"
          value={description}
        />
        {children}
      </div>
    </div>
  )
}

const FormGroup = ({ children, title, description }: any) => {
  const styles = formGroupStyles()
  return (
    <div className={`${styles.root}`}>
      <Typography className={styles.headline} tagType="h6" styleType="h6">
        {title}
      </Typography>
      {description && (
        <InjectHTML
          tagType="p"
          styleType="p1"
          value={description}
          className={styles.description}
        />
      )}
      {children}
    </div>
  )
}

const formStyles = makeStyles(({ typography, breakpoints }) => ({
  root: {
    width: '100%',
  },
  outerWrapper: {
    padding: '80px 88px 56px',
    borderRadius: 32,
    backgroundColor: colors.main.newBackgroundGray,
    width: '100%',
    [breakpoints.down('sm')]: {
      padding: '64px 16px',
      borderRadius: 16,
    },
  },
  headline: {
    marginTop: 8,
    marginBottom: 8,
    [breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  description: {
    margin: 0,
    [breakpoints.down('sm')]: {
      fontSize: typography.pxToRem(16),
    },
  },
}))

const formGroupStyles = makeStyles(({ typography, breakpoints }) => ({
  root: {
    width: '100%',
    marginTop: typography.pxToRem(48),
    [breakpoints.down('md')]: {
      marginTop: typography.pxToRem(40),
    },
  },
  description: {
    margin: '8px 0px 0px',
    [breakpoints.down('sm')]: {
      fontSize: typography.pxToRem(16),
    },
  },
  headline: {
    marginTop: 8,
    marginBottom: 8,
    [breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
}))
export { FormLayout, FormGroup }
