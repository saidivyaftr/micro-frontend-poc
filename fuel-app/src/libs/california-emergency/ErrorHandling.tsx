import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'

interface PageProps {
  outageError: string
  serviceOutageError: string
  disasterError: string
}

const ErrorHandling = (props: PageProps): JSX.Element => {
  const classes = useStyles()()
  const { outageError, serviceOutageError, disasterError } = props
  return (
    <>
      {outageError != '' && (
        <div className={classes.error}>
          <Typography
            tagType="h5"
            styleType="h5"
            fontType="regularFont"
            className={classes.errorText}
          >
            {outageError}
          </Typography>
        </div>
      )}
      {serviceOutageError != '' && (
        <div className={classes.error}>
          <Typography
            tagType="h5"
            styleType="h5"
            fontType="regularFont"
            className={classes.errorText}
          >
            {serviceOutageError}
          </Typography>
        </div>
      )}
      {disasterError != '' && (
        <div className={classes.error}>
          <Typography
            tagType="h5"
            styleType="h5"
            fontType="regularFont"
            className={classes.errorText}
          >
            {disasterError}
          </Typography>
        </div>
      )}
    </>
  )
}

const useStyles = () =>
  makeStyles(({}) => ({
    error: {
      display: 'flex',
      background: colors.main.palePink,
      marginBottom: '1rem',
      border: `1px solid ${colors.main.palePink}`,
      borderRadius: '0.25rem',
      justifyContent: 'center',
      padding: '1rem',
    },
    errorText: {
      color: colors.main.antiqueRuby,
    },
  }))

export default ErrorHandling
