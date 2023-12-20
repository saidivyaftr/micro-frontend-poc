import { ITypographyElement, ITypographyStyleType } from '../Typography'

export interface ITestimonialProps extends React.HTMLAttributes<HTMLElement> {
  backgroundColor?: 'gravity' | 'electricity'
  eyebrowText?: string
  slides: {
    quote: string
    credit: string
  }[]
  quoteClassName?: string
  quoteTagType?: ITypographyElement
  quoteStyleType?: ITypographyStyleType

  creditClassName?: string
  creditTagType?: ITypographyElement
  creditStyleType?: ITypographyStyleType

  className?: string
  eyebrowClassName?: string
  paginationPreviousButtonClass?: string
  paginationNextButtonClass?: string
  swipercontainerClass?: string

  pagination?: boolean
  navigation?: boolean
}
