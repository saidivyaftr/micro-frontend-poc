export interface IPictureProps extends React.HTMLAttributes<HTMLElement> {
  desktop: {
    image: string
    webp?: string
  }
  tablet?: {
    image?: string
    webp?: string
  }
  mobile?: {
    image?: string
    webp?: string
  }
  width?: string
  height?: string
  className?: string
  testId?: string
  altText: string
}
