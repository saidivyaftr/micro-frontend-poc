import colors from '@/shared-ui/colors'
import { CheckMarkBlackCell } from '@/shared-ui/react-icons'
import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import Select from 'react-select'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

const Dropdown = ({
  placeholder = '',
  isSearchable = false,
  isLoading = false,
  isDisabled = false,
  value,
  options,
  onChange,
  className,
  styles,
  onMenuOpen,
  onMenuClose,
}: {
  placeholder?: string
  isSearchable?: boolean
  value: { label: any; value: any }
  options: { label: any; value: any }[]
  onChange: (value: any) => void
  className?: string
  styles?: {
    controlStyles?: any
    menuStyles?: any
    optionStyles?: any
    dropdownIndicatorStyles?: any
    singleValueStyles?: any
  }
  onMenuOpen?: any
  onMenuClose?: any
  isLoading?: boolean
  isDisabled?: boolean
}) => {
  const classes = useStyles()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const customOptionLabel = ({ label, value: currentValue }: any) => {
    return (
      <span className={`menu-item ${classes.menuItem}`}>
        <span>{label}</span>
        {value?.value === currentValue && (
          <span className="menu-item-checkmark">
            <CheckMarkBlackCell height={18} width={18} />
          </span>
        )}
      </span>
    )
  }
  return (
    <Select
      isSearchable={isSearchable}
      placeholder={placeholder}
      value={value}
      components={{ IndicatorSeparator: () => null }}
      options={options as any}
      onChange={onChange}
      styles={customStyles(styles, isMenuOpen)}
      formatOptionLabel={customOptionLabel}
      className={className}
      onMenuOpen={() => {
        setIsMenuOpen(true)
        if (onMenuOpen) {
          onMenuOpen()
        }
      }}
      onMenuClose={() => {
        setIsMenuOpen(false)
        if (onMenuClose) {
          onMenuClose()
        }
      }}
      isLoading={isLoading}
      isDisabled={isDisabled}
    />
  )
}

export default Dropdown

export const customStyles = (styles: any, isMenuOpen: boolean) => ({
  control: (base: any) => ({
    ...base,
    height: 50,
    backgroundColor: colors.main.white,
    borderColor: colors.main.dark,
    color: colors.main.black,
    borderRadius: 30,
    marginBottom: 0,
    cursor: 'pointer',
    boxShadow: '0px !important',
    '&:hover': {
      outline: 0,
    },
    '& .menu-item': {
      '&:hover': {
        color: `inherit !important`,
      },
      '& svg': {
        display: 'none',
      },
    },
    '& svg': {
      height: 24,
      width: 24,
    },
    ...(styles?.controlStyles && { ...(styles?.controlStyles || {}) }),
  }),
  menu: (base: any) => ({
    ...base,
    color: colors.main.dark,
    border: `1px solid ${colors.main.dark}`,
    borderRadius: '16px',
    top: 48,
    ...(styles?.menuStyles && { ...(styles?.menuStyles || {}) }),
  }),
  option: (base: any) => ({
    ...base,
    backgroundColor: colors.main.white,
    color: null,
    cursor: 'pointer',
    width: 'calc(100% - 32px)',
    marginLeft: '16px',
    marginRight: '16px',
    height: 35,
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    ...(styles?.optionStyles && { ...(styles?.optionStyles || {}) }),
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    transition: 'all .2s ease',
    color: colors.main.dark,
    '&:hover': {
      color: colors.main.dark,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    ...(styles?.dropdownIndicatorStyles && {
      ...(styles?.dropdownIndicatorStyles || {}),
    }),
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: colors.main.dark,
    ...(styles?.singleValueStyles && { ...(styles?.singleValueStyles || {}) }),
  }),
})

const useStyles = makeStyles(() => ({
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    fontFamily: PP_OBJECT_SANS,
    lineHeight: '24px',
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
}))
