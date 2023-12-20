import { RightArrowIcon } from 'src/blitz/assets/react-icons'
import Typography from '../Typography'
import clx from 'classnames'
import css from './ArrowLink.module.scss'
import InjectHTML from '../InjectHTML'
import { ArrowLinkProps } from './types'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const ArrowLink = ({
  wrapperClassName = '',
  hoverColor = 'primary',
  label,
  url,
  arrowColor,
  color = 'default',
  icon,
  width = '20.91',
  height = '14.08',
  styleType = 'p1',
  dataTestId = 'arrow-link',
  dtmMessage = '',
  ...props
}: ArrowLinkProps) => {
  const handleIcon = () => {
    if (!icon) {
      return ''
    }

    if (typeof icon === 'string') {
      return <InjectHTML addAnchorStyles value={icon} />
    }
    return icon
  }

  const DTMHandler = () => {
    if (dtmMessage)
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: dtmMessage,
        },
        'tl_o',
        dtmMessage,
      )
  }

  return (
    <a
      className={clx(css.wrapper, wrapperClassName, {
        [css[`${hoverColor}-hover`]]: true,
      })}
      onClick={DTMHandler}
      href={url}
    >
      {icon && handleIcon()}
      <Typography
        styleType={styleType}
        color={color}
        className={clx(css.text, wrapperClassName)}
        testId={`${dataTestId}-label`}
        {...props}
      >
        {label}
      </Typography>
      <RightArrowIcon
        width={width}
        height={height}
        color={arrowColor}
        data-testid={`${dataTestId}-go-icon`}
      />
    </a>
  )
}

export default ArrowLink
