import css from './Loading.module.scss'
import { IDotColor, IDotSize } from './types'

export const getDotColor = (color: IDotColor) => {
  switch (color) {
    case 'primary':
      return css.dotPrimary
    case 'secondary':
      return css.dotSecondary
    case 'black':
      return css.dotBlack
    case 'white':
      return css.dotWhite
    default:
      return css.dotPrimary
  }
}

export const getDotSize = (size?: IDotSize) => {
  switch (size) {
    case 'small':
      return css.smallDot
    case 'medium':
      return css.mediumDot
    case 'largest':
      return css.largestDot
    case 'large':
    default:
      return css.largeDot
  }
}
