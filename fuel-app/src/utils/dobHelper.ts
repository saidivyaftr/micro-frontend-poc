import moment from 'moment'

const MONTHS = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
]

export const getDOBMonths = () => MONTHS

export const getDOBYears = () => {
  // Ages between 18 - 100 years
  const yearStart = new Date().getFullYear() - 100
  const yearOffset = new Date().getFullYear() - 18
  // Generate years
  const years = []
  for (let i = yearOffset; i >= yearStart; i--) {
    years.push({ label: `${i}`, value: `${i}` })
  }
  return years
}

export const getDOBDates = (
  month = '01',
  year = `${new Date().getFullYear()}`,
) => {
  const totalDays = moment(`${month}/01/${year}`).daysInMonth()
  // Generate dates
  const dates = []
  for (let i = 1; i <= totalDays; i++) {
    const dateValue = ('0' + i).slice(-2)
    dates.push({ label: `${i}`, value: `${dateValue}` })
  }
  return dates
}

// Validates age between 18 - 100
export const validateAge = (dob: string) => {
  if (!moment(dob, 'MM/DD/YYYY').isValid()) {
    return false
  }
  return (
    moment().diff(moment(dob), 'years') >= 18 &&
    moment().diff(moment(dob), 'years') <= 100
  )
}
