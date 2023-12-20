export interface IPriceCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  price: string
  subText: string
  ctaText: string
  ctaLink: string
  bottomDescription: string
  mostPopular: string
  triggerAnalytics?: boolean
  interactionType?: string
  eventObj?: any
}
