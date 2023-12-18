import { ITypography } from '@/shared-ui/components/Typography/types'

export interface IInjectHTML extends ITypography {
  value: string
  pureInjection?: boolean
  enableClick?: boolean
  addAnchorStyles?: boolean
  style?: any
}
