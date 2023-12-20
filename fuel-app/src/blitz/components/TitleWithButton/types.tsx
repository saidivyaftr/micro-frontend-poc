import { IColorsName } from '@/shared-ui/theme/colors.types'
import {
  IButtonVariant,
  IButtonHoverVariant,
} from '@/shared-ui/components/Button/types'
export interface ITitleWithButtonProps
  extends React.HTMLAttributes<HTMLElement> {
  title: string
  disclaimerNote?: string
  buttonColor: IColorsName
  hoverVariant?: IButtonHoverVariant
  buttonText: string | JSX.Element
  buttonURL: string
  buttonVariant: IButtonVariant
  backgroundColor: IColorsName
  titleFontColor: IColorsName
  buttonType: IButton
  className?: string
  objectID?: string
}
type IButton = 'button' | 'link'
