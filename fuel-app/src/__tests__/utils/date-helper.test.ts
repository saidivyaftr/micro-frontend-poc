import {
  ascendingDateComparator,
  descendingDateComparator,
} from 'src/utils/date-helper'

describe('Date Helper', () => {
  describe('descendingDateComparator', () => {
    it('should return dates in descending order when passed dates are of type strings', () => {
      const dates = ['2022-01-10', '2022-02-10', '2022-03-10']
      const expectedDates = dates.slice().reverse()
      const comparator = descendingDateComparator()
      expect(dates.sort(comparator)).toStrictEqual(expectedDates)
    })

    it('should return dates in descending order when passed dates are of different types', () => {
      const dates = ['2022-01-10', new Date('2022-02-10'), '2022-03-10']
      const expectedDates = dates.slice().reverse()
      const comparator = descendingDateComparator()
      expect(dates.sort(comparator)).toStrictEqual(expectedDates)
    })

    it('should return dates in descending order when date format is passed', () => {
      const dates = ['2022-01-10', '2022-03-10', '2022-02-10']
      const comparator = descendingDateComparator('YYYY-DD-MM')
      const expectedDates = ['2022-03-10', '2022-02-10', '2022-01-10']
      expect(dates.sort(comparator)).toStrictEqual(expectedDates)
    })
  })

  describe('ascendingDateComparator', () => {
    it('should return dates in ascending order when passed dates are of type strings', () => {
      const dates = ['2022-02-10', '2022-01-10', '2022-03-10']
      const expectedDates = ['2022-01-10', '2022-02-10', '2022-03-10']
      const comparator = ascendingDateComparator()
      expect(dates.sort(comparator)).toStrictEqual(expectedDates)
    })

    it('should return dates in ascending order when passed dates are of different types', () => {
      const dates = ['2022-04-10', new Date('2022-03-10'), '2022-01-10']
      const expectedDates = dates.slice().reverse()
      const comparator = ascendingDateComparator()
      expect(dates.sort(comparator)).toStrictEqual(expectedDates)
    })

    it('should return dates in ascending order when date format is passed', () => {
      const dates = ['2022-01-10', '2022-03-10', '2022-02-10']
      const comparator = ascendingDateComparator('YYYY-DD-MM')
      const expectedDates = ['2022-01-10', '2022-02-10', '2022-03-10']
      expect(dates.sort(comparator)).toStrictEqual(expectedDates)
    })
  })
})
