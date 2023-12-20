import WarningOutline from '@/shared-ui/react-icons/warning-outline'
import { Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import {
  ITypographyElement,
  ITypographyStyleType,
} from '@/shared-ui/components/Typography'
import clx from 'classnames'

type IMessage = {
  message?: string
  tagType?: ITypographyElement
  styleType?: ITypographyStyleType
  messageClass?: string
  className?: string
}

const ErrorMessage = ({
  message = '',
  tagType = 'p',
  styleType = 'p2',
  messageClass = '',
  className = '',
}: IMessage) => {
  const classes = useStyles()
  return (
    <div className={className}>
      <Typography
        tagType={tagType}
        styleType={styleType}
        className={classes.wrapper}
      >
        <span className={classes.errorWrapper}>
          <WarningOutline
            height={32}
            width={32}
            color={colors.main.brightRed}
            className={classes.icon}
          />
          <span className={clx(classes.message, messageClass)}>{message}</span>
        </span>
      </Typography>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    margin: 0,
  },
  errorWrapper: {
    display: 'flex',
    gap: 16,
    margin: 0,
  },
  icon: {
    height: 32,
    width: 32,
  },
  message: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
}))

export default ErrorMessage
