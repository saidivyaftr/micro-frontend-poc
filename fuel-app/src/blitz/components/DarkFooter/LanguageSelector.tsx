import { locales } from 'src/locales'
import Select from 'react-select'
import colors from '@/shared-ui/colors'

const LanguageSelector = ({ selectedLanguage, toggleLocale }: any) => (
  <Select
    isSearchable={false}
    placeholder={selectedLanguage}
    components={{ IndicatorSeparator: () => null }}
    options={locales?.map(({ name: label, code: value }: any) => ({
      label,
      value,
    }))}
    onChange={toggleLocale}
    styles={customStyles}
  />
)

export default LanguageSelector

const customStyles = {
  control: (base: any) => ({
    ...base,
    height: 35,
    minHeight: 35,
    backgroundColor: colors.main.midnightExpress,
    borderColor: colors.main.grayOpacity50,
    boxShadow: `0 0 0 1px ${colors.main.midnightExpress}`,
    '&:hover': {
      ...base[':hover'],
      borderColor: colors.main.grayOpacity50,
    },
  }),
  menu: (base: any) => ({
    ...base,
    color: colors.main.white,
    backgroundColor: colors.main.midnightExpress,
    border: `1px solid ${colors.main.grayOpacity50}`,
    borderRadius: '4px',
  }),
  option: (base: any, { isFocused }: any) => ({
    ...base,
    backgroundColor: isFocused ? colors.main.darkBlue : null,
    color: isFocused ? colors.main.white : null,
  }),
  dropdownIndicator: (base: any, { isFocused }: any) => ({
    ...base,
    transition: 'all .2s ease',
    transform: isFocused ? 'rotate(180deg)' : null,
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: colors.main.white,
  }),
  placeholder: (base: any) => ({
    ...base,
    color: colors.main.white,
    '&:hover': {
      color: colors.main.white,
    },
  }),
  dropdown: (base: any) => ({
    ...base,
    color: colors.main.white,
    '&:hover': {
      color: colors.main.white,
    },
  }),
}
