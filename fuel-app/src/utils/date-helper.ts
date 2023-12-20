/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'

type SortOrder = 'ASC' | 'DESC'
const dateComparator =
  (order: SortOrder) =>
  (format?: moment.MomentFormatSpecification) =>
  (date1: moment.MomentInput, date2: moment.MomentInput) => {
    let date1Moment = moment(date1)
    let date2Moment = moment(date2)
    if (format && typeof date1 === 'string' && typeof date2 === 'string') {
      date1Moment = moment(date1, format)
      date2Moment = moment(date2, format)
    }
    const diff = date1Moment.valueOf() - date2Moment.valueOf()
    return order === 'ASC' ? diff : -diff
  }

export const descendingDateComparator = dateComparator('DESC')

export const ascendingDateComparator = dateComparator('ASC')
