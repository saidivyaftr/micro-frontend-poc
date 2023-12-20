export type IBreadcrumb = {
  variant: 'primary' | 'secondary'
  links: {
    pageName: string
    href: string
    isCurrent?: boolean
    useHistory?: boolean
  }[]
  hoverEffect?: boolean
  breadCrumbClassName?: string
}
