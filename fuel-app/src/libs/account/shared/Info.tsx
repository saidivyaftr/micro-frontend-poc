import { makeStyles } from '@material-ui/core'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import colors from 'src/styles/theme/colors'

type InfoProps = {
  type?: 'info' | 'warning' | 'error'
  message: string
}

export const Info: React.FC<InfoProps> = ({
  type = 'info',
  message,
  ...rest
}) => {
  const classes = useStyles()
  return (
    <div className={`${classes.infoCtr} ${classes[type]}`} {...rest}>
      {message}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  infoCtr: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2rem 0',
    padding: '2rem',
    fontFamily: PP_OBJECT_SANS,
  },
  info: {},
  warning: {
    backgroundColor: colors.main.accentYellow,
  },
  error: {
    color: colors.main.white,
    backgroundColor: colors.main.brightRed,
  },
}))
