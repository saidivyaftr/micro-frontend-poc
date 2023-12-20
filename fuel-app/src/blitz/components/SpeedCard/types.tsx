import { IColorsName } from '@/shared-ui/theme/colors.types'
export interface ISpeedCardProps extends React.HTMLAttributes<HTMLElement> {
  perks: {
    title: string
    subtitle: string
    targetItems: {
      name: string
    }[]
  }[]
  title: string
  backgroundColor?: IColorsName
  titleFontColor?: IColorsName
}
