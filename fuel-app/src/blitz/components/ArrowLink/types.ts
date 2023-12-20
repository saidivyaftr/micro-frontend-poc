import { ITypography } from '../Typography'

export type ArrowLinkProps = {
  label: string
  /**
   * To add external URL use: url={`http://${myUrl}`}
   */
  url: string
  wrapperClassName?: string
  /**
   * By default the color is primary.
   */
  hoverColor?: 'primary' | 'secondary' | 'tertiary'
  arrowColor?: string
  icon?: JSX.Element | string
  width?: string
  height?: string
  dataTestId?: string
  dtmMessage?: string
} & Omit<ITypography, 'children'>
