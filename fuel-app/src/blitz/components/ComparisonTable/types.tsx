import { ITypographyElement, ITypographyStyleType } from '../Typography/types'

export interface IComparisonProperty {
  name?: string
  textValue?: string | JSX.Element
  textValueLink?: string
  value?: string | boolean | JSX.Element
  iconSource?: string
  isPrimary?: boolean
  toolTip?: string
}

export interface IComparison {
  logo?: string
  headerDescription?: string
  headerDescriptionLink?: string
  header?: string
  properties?: IComparisonProperty[]
  headerLink?: string
}

export interface IComparisonTableProps {
  items?: IComparison[]
  addBorderToHeader?: boolean
  headerNameTitle?: string
  toolTipIcon?: JSX.Element
  dropShadowForTooltip?: boolean
  hideBorderForTooltip?: boolean
  rowHeaderLabelVisibleFlag?: boolean
  rowHeaderTagType?: ITypographyElement
  rowHeaderstyleType?: ITypographyStyleType
  styleModifier?: {
    header?: string
    firstColumnStyles?: string
    showRedCheckMarks?: boolean
    textStyleType?: ITypographyStyleType
    textAlignCenter?: boolean
    hidePreferredRowValue?: boolean
    valueTextCSS?: string
    rowClassName?: string
    rowValueClassName?: string
    tableHeaderClassName?: string
    rowHeaderLabel?: string
    backgroundEvenRow?: boolean
    roundedBorders?: boolean
    backgroundColor?: string
    headerClassName?: string
    primaryCellClassName?: string
    tooltipStyles?: string
    blackCloseIcon?: string
    headerNameTitleStyle?: string
    tableLeftHeader?: string
  }
}
