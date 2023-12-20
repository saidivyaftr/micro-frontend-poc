import { ITypographyElement } from '../Typography/types'
export interface ITrackOrders {
  title: string
  subTitle: string
  imgSrc: any
  points: string[]
  playStoreUrl: string
  appStoreUrl: string
  wrapperClassName?: string
  showMobileQRCode?: boolean
  titleTagType?: ITypographyElement
}
