import { IColorsName } from '@/shared-ui/theme/colors.types'
export interface ITitleWithCaptionProps
  extends React.HTMLAttributes<HTMLElement> {
  disclaimerText?: string
  title: string
  backgroundColor?: IColorsName
  fontColor?: IColorsName
}
