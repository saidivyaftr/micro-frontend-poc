import css from './Skeleton.module.scss'
import { ISkeleton } from './types'
import clx from 'classnames'

const Skeleton: React.FunctionComponent<ISkeleton> = ({
  width = '100%',
  height = 'auto',
  variant = 'rectangular',
  margin,
  backgroundColor,
  className,
}) => {
  return (
    <span
      className={clx(css.root, className, {
        [css.rounded]: variant === 'rounded',
        [css.circular]: variant === 'circular',
      })}
      style={{ width, height, backgroundColor, margin }}
    ></span>
  )
}

export default Skeleton
