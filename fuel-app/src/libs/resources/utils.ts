import colors from '@/shared-ui/colors'

export const getBackGroundColor = (color: string) => {
  switch (color) {
    case 'blue':
      return colors.main.blue
    case 'white':
      return colors.main.white
    case 'dark-blue':
      return colors.main.backgroundDarkBlue
    case 'gray':
      return colors.main.newBackgroundGray
    default:
      return ''
  }
}
