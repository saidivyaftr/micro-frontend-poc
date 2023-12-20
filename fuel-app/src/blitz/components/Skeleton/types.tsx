export interface ISkeleton {
  width?: number | string
  height?: number | string
  backgroundColor?: string
  className?: string
  variant?: ISkeletonVariant
  margin?: any
}
export type ISkeletonVariant = 'rectangular' | 'rounded' | 'circular'
