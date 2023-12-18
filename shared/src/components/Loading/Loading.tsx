import React from 'react'
import { ILoading } from './types'
import css from './Loading.module.scss'
import clx from 'classnames'
import { getDotColor, getDotSize } from './Loading.helper'

const Loading: React.FunctionComponent<ILoading> = ({
  dotColor = 'primary',
  className,
  size,
  ...rest
}: ILoading) => {
  return (
    <div
      className={clx(css.loading, getDotColor(dotColor), className)}
      {...rest}
    >
      <span className={clx(css.loading__dot, getDotSize(size))}></span>
      <span className={clx(css.loading__dot, getDotSize(size))}></span>
      <span className={clx(css.loading__dot, getDotSize(size))}></span>
    </div>
  )
}

export default Loading
