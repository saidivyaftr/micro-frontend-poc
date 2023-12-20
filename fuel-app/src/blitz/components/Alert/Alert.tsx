import { useMemo } from 'react'
import clx from 'classnames'
import { InjectHTML } from '@/shared-ui/components'
import { Success, Close } from '@/shared-ui/react-icons'
import { IAlert } from './types'
import css from './Alert.module.scss'

const Alert: React.FC<IAlert> = ({
  className,
  handleClose,
  isSuccess,
  message,
  strongText = '',
  backgroundColor = '',
  hideClose = false,
  textColor = '',
  closeIconColor = '',
  textAlign = 'center',
  messageStyleType = 'p2',
  messageFontType = '',
}) => {
  const icon = useMemo(() => {
    if (isSuccess) {
      return <Success className={css.alertIcon} />
    }
    return null
  }, [isSuccess])
  return (
    <div
      className={clx(css.alertContainer, className)}
      style={{ backgroundColor, color: textColor, textAlign }}
    >
      <div className={css.alertWrapper}>
        {icon}
        <InjectHTML
          testId="test-completemessage"
          className={css.message}
          value={strongText ? `<b>${strongText}</b> ${message}` : message}
          styleType={messageStyleType}
          fontType={messageFontType}
        />
        {!hideClose && (
          <button
            className={css.closeBtn}
            onClick={handleClose}
            aria-label="Close Alert"
          >
            <Close color={closeIconColor} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert
