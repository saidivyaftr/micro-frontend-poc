import { IColorsName } from '@/shared-ui/theme/colors.types'
import { IButton } from '../Button/types'
import { IInjectHTML } from '../InjectHTML/types'
import { ITypography } from '../Typography'

export interface ITile {
  className?: string
  descriptionClassName?: string
  title: ITypography
  description?: IInjectHTML
  ctas?: IButton[]
  backgroundColor?: IColorsName
  links?: ILink[]
}
export interface ILink extends React.HTMLProps<HTMLAnchorElement> {
  text: ITypography
}
