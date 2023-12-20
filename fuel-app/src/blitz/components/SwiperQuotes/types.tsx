export interface ISwiperQuotesProps extends React.HTMLAttributes<HTMLElement> {
  heading: string
  slides: {
    quote: string
    credit: string
  }[]
  className?: string
  titleClassName?: string
  quoteClassName?: string
  creditClassName?: string
  pagination?: boolean
  paginationPreviousButtonClass?: string
  paginationNextButtonClass?: string
  swipercontainerClass?: string
}
