export type ISocialMediaLink = {
  icon: JSX.Element
  href: string
  title?: string
}

export type ISocialMediaLinks = {
  socialMediaLinks: ISocialMediaLink[]
  wrapperClassName?: string
}
