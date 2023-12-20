import { ITypographyStyleType } from '../Typography'
import { ITypographyFontType } from '../Typography/types'

export interface IAlert {
  isSuccess?: boolean
  message: string
  strongText?: string
  handleClose?: () => void
  className?: string
  backgroundColor?: string
  hideClose?: boolean
  textColor?: string
  closeIconColor?: string
  textAlign?: any
  messageStyleType?: ITypographyStyleType
  messageFontType?: ITypographyFontType
}
