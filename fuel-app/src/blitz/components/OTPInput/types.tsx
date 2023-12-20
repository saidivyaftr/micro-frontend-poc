import { ITypographyFontType, ITypographyStyleType } from '../Typography/types'

export interface OTPInputProps {
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
  className?: string
  isInvalidOTP?: boolean
  invalidOTPMessage?: string
  errorMessageFontType?: ITypographyFontType
  errorMessageStyleType?: ITypographyStyleType
}
