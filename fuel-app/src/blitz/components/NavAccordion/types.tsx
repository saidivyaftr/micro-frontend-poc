export interface NavAccordionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  subItems?: ListItems[]
  isOpen?: boolean
  isClosed?: boolean
  className?: string
  href?: string
  badge?: string
  setOpen?: any
  isMobileOrTablet?: boolean
  index?: number
  // eslint-disable-next-line no-unused-vars
  onDropdownClick?: (title: string, isOpen: boolean) => void
  currentActiveAccordion?: { [title: string]: boolean }
  isAccountDashboard?: boolean
}

export type ListItems = {
  title: string
  subItems?: ListItems[]
  href?: string
  badge?: string
}

export interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {
  menu: NavAccordionProps[]
  isAccountDashboard?: boolean
}
