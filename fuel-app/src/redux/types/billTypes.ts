/* eslint-disable @typescript-eslint/indent */
//TODO: Add other bill statuses here
export type BillStatus = 'BILLED'

export type BillInsert = {
  insertCode: string
  insertCodeDesc: string
  insertType: string
}

export type BillInserts = {
  billDate: string
  billInsert: Array<BillInsert | Record<string, never>>
}

export type MessageLink = {
  text: string
  link: string
}

export type Bill = {
  amount: string
  billInserts: Partial<BillInserts> | Record<string, never>
  date: string
  pdfLink: string
  statementId: string
  status: BillStatus
  messages?: Array<MessageLink>
}

export type SectionRow = {
  description: string
  value: string
  value2?: string
}

export type Section = {
  heading: string
  heading_value: string
  heading_value2?: string
  rows: Array<SectionRow>
}

export type DueAmount = {
  amount: string
  amount2?: string
  date: string
}

export type BillDateInsert = {
  fromDate: string
  toDate: string
  success: boolean
}

export type BillDetails =
  | {
      accountNumber: string
      statementDate: string
      statementPeriod: string
      billInserts: BillDateInsert
      totals: {
        current: string
        prior: string
        current2?: string
        prior2?: string
      }
      due: DueAmount
      sections: Array<Section>
    }
  | Record<string, never>

export type BillDetailList = Array<BillDetails>

export type BillList = Array<Bill>

export type BillsState = {
  billList: {
    isLoading: boolean
    data: BillList
    error?: any
  }
  billDetailsByDate: {
    isLoading: boolean
    data: Record<string, BillDetails>
    error?: any
  }
  currentBill: {
    data: BillDetails
    isLoading: boolean
    error?: boolean
  }
  selectedBillDatesForCompare: Array<string>
}
