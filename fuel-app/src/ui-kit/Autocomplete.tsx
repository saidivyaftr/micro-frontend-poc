import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import Select, { createFilter } from 'react-select'
import colors from '@/shared-ui/colors'

export interface AutoCompleteProps {
  className?: string
  placeholder?: string
  isDisabled?: boolean
  isClearable?: boolean
  isSearchable?: boolean
  isError?: boolean
  options: Option[]
  // eslint-disable-next-line no-unused-vars
  onChange: (value: any) => void
  styles?: any
  value?: any
}

interface Option {
  value: string
  label: string
}

const AutoComplete = ({
  className,
  placeholder,
  isDisabled,
  isClearable,
  isSearchable,
  isError,
  options,
  onChange,
  styles,
  value,
}: AutoCompleteProps) => {
  const filterConfig = {
    matchFrom: 'start' as const,
  }
  const classes = useStyles()
  return (
    <Select
      placeholder={placeholder}
      className={clx(classes.root, className, {
        [classes.error]: isError,
      })}
      filterOption={createFilter(filterConfig)}
      classNamePrefix="select"
      isDisabled={isDisabled}
      isClearable={isClearable}
      isSearchable={isSearchable}
      options={options}
      onChange={onChange}
      styles={styles}
      value={value}
    />
  )
}

const useStyles = makeStyles(() => ({
  root: {
    height: 50,
    '& .select__indicator-separator': {
      display: 'none',
    },
    '& .select__control': {
      height: 50,
    },
  },
  error: {
    '& .select__control': {
      border: `1px solid ${colors.main.primaryRed}`,
    },
  },
}))

export default AutoComplete
