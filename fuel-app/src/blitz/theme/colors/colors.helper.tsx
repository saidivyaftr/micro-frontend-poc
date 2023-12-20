import css from './colors.module.scss'
import { IColorsName } from './colors.types'

export const getFontColor = (color: IColorsName = 'initial') => {
  switch (color) {
    case 'primary':
      return css.fontColorPrimary
    case 'secondary':
      return css.fontColorSecondary
    case 'white':
      return css.fontColorWhite
    case 'black':
      return css.fontColorBlack
    default:
      return ''
  }
}

export const getBackgroundColor = (color: IColorsName = 'initial') => {
  switch (color) {
    case 'primary':
      return css.backgroundColorPrimary
    case 'secondary':
      return css.backgroundColorSecondary
    case 'white':
      return css.backgroundColorWhite
    case 'black':
      return css.backgroundColorBlack
    case 'gray':
      return css.backgroundColorGray
    case 'dark-blue':
      return css.backgroundColorBlue
    case 'light-gray':
      return css.backgroundColorLightGray
    case 'light-secondary':
      return css.backgroundColorLightSecondary
    default:
      return ''
  }
}
