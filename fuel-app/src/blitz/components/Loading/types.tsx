export type IDotColor = 'primary' | 'secondary' | 'black' | 'white'
export type IDotSize = 'small' | 'medium' | 'large' | 'largest'
export interface ILoading {
  dotColor?: IDotColor
  size?: IDotSize
  className?: string
}
