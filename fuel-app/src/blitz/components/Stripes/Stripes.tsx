import React from 'react'
import { IStripes } from './types'
import css from './stripes.module.scss'
import clx from 'classnames'
import { getStripeColor } from './stripes.helper'

const Stripes: React.FunctionComponent<IStripes> = ({
  stripeColor = 'initial',
  className,
}: IStripes) => {
  return (
    <div className={clx(className, getStripeColor(stripeColor))}>
      <div className={clx(css.stripe, css.stripeOne)}></div>

      <div className={clx(css.stripe, css.stripeTwo)}></div>

      <div className={clx(css.stripe, css.stripeThree)}></div>
    </div>
  )
}

export default Stripes
