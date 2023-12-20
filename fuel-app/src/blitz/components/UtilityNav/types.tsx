export interface IUtilityNavProps extends React.HTMLAttributes<HTMLElement> {
  sites: {
    site: string
    href: string
  }[]
  languageTitle: string
  languageHref: string
  className?: string
  cart?: {
    title: string
    href: string
  }
  showCartLanguageBanner?: boolean
  isReturningUser?: boolean
  toggleLocaleText?: string
  toggleLocale?: () => void
}
