export type ILinksAccordionItem = {
  title: string
  children: ILinksAccordionSubLink[]
  darkMode?: boolean
}

export type ILinksAccordionSubLink = {
  title: string
  href: string
}

export type ILinksAccordion = {
  darkMode?: boolean
  list?: ILinksAccordionItem[]
  titleClassName?: string
  childrenClassName?: string
}
