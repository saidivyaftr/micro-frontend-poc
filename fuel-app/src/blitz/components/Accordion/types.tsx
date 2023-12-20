export type IAccordionItemString = {
  title: string | JSX.Element
  description: string | JSX.Element
  borderUnderDescription?: boolean
}

export type IAccordionItemInjectHTML = {
  title: string | JSX.Element
  description: string
  borderUnderDescription?: boolean
}

export type IAccordionTable = {
  title: string
  tableList: TableList[]
}

export type TableList = {
  properties: Property[]
  header: string
  logo: string
  headerLink: string
}

export type Property = {
  name?: string
  textValue: string
  value: boolean
  isPrimary: boolean
  toolTip: string
}
export type IAccordionItem =
  | IAccordionItemString
  | IAccordionItemInjectHTML
  | IAccordionTable

export type IAccordion = {
  list?: IAccordionItem[]
  titleClassName?: string
  descriptionClassName?: string
  borderUnderDescription?: boolean
  isSingleItemOpen?: boolean
  shouldTruncate?: boolean
  maxCap?: number
  showMoreText?: string
  showLessText?: string
  chevronColor?: string
  accordionClickHandler?: (
    // eslint-disable-next-line no-unused-vars
    showDescription: boolean,
    // eslint-disable-next-line no-unused-vars
    title: string | JSX.Element,
  ) => void | undefined
  openFirstItemOnLoad?: boolean
  headerNameTitle?: string
  roundedBorders?: boolean
}
