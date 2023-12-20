import css from './stripes.module.scss'
import { IColorName } from './types'

export const getStripeColor = (color: IColorName) => {
  switch (color) {
    case 'primary':
      return css.stripePrimary
    case 'secondary':
      return css.stripeSecondary
    case 'white':
      return css.stripeWhite
    case 'black':
      return css.stripeBlack
    case 'none':
      return css.stripeNone
    default:
      return ''
  }
}
