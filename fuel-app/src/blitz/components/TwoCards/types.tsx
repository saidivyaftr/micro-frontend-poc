export interface ITwoCardsProps extends React.HTMLAttributes<HTMLElement> {
  heading: string
  subheading: string
  copy: string
  cards: {
    image?: {
      srcMobile: string
      srcTablet: string
      // altText must be required if image.src is present
      altText: string
    }
    heading: string
    eyebrow: string
    multiplier: string
    copy: string
  }[]
  disclaimer: string
}
