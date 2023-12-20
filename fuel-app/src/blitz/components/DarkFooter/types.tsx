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
  onClickCallback: (title: string) => void | undefined
  shouldShowTranslations?: boolean
  toggleLocale: () => void
  selectedLanguage?: string
  miniFooter?: boolean
}
