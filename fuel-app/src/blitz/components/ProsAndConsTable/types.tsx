export interface IPropsAndCons {
  title: string
  pros?: string[]
  cons?: string[]
}

export interface IProsAndConsTableProps {
  backgroundColor: string
  headers?: string[]
  columns?: IPropsAndCons[]
}
