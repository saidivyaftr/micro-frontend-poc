/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { BillList } from './types/billTypes'

export const addMessagesToBills = (bills: BillList) => {
  const billsWithMessages = bills.map((bill) => {
    bill.messages = []
    if (bill.billInserts && bill.billInserts.billInsert) {
      const date = moment(bill.billInserts.billDate)
      bill.billInserts.billInsert.forEach((i) => {
        const link = `/~/media/bill-inserts/${date.format('MMM-YYYY')}/TR${
          i.insertCode
        }.ashx`
        const text = i.insertCodeDesc
        bill.messages?.push({ text, link })
      })
    }
    return bill
  })
  return billsWithMessages
}

export const delayUntil = async (delay: number) => {
  return new Promise((res) => {
    setTimeout(() => {
      res('timer passed')
    }, delay)
  })
}

export const partitionPayments = (payments: any, isValid: any) => {
  return payments.reduce(
    ([history, scheduled]: any, elem: any) => {
      return isValid(elem)
        ? (history.push(elem), [history, scheduled])
        : (scheduled.push(elem), [history, scheduled])
    },
    [[], []],
  )
}

export const partitionScheduled = (payments: any) => {
  return payments.reduce(
    ([pending, scheduled, cancelled]: any, elem: any) => {
      return elem.status == 'Pending'
        ? (pending.push(elem), [pending, scheduled, cancelled])
        : elem.status == 'Scheduled'
        ? (scheduled.push(elem), [pending, scheduled, cancelled])
        : (cancelled.push(elem), [pending, scheduled, cancelled])
    },
    [[], [], []],
  )
}
