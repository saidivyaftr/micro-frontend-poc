export type IFooterSubLink = {
  title: string
  href: string
}

export type IFooterCategory = {
  title: string
  children: IFooterSubLink[]
}

export type ISocialMediaLink = {
  icon: JSX.Element
  href: string
  title?: string
}

export type IFooter = {
  links: IFooterCategory[]
  legalText?: string
  copyRights?: string
  bottomLinks: IFooterSubLink[]
  socialMediaLinks: ISocialMediaLink[]
  miniFooter?: boolean
  // eslint-disable-next-line no-unused-vars
  onClickCallback: (title: string) => void | undefined
}
