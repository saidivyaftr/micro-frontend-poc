import React from 'react'
import {
  TextField,
  TextFieldProps,
  MenuItem,
  makeStyles,
} from '@material-ui/core'
import { FieldProps, getIn } from 'formik'
import { IOption } from '../types'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { CheckMarkBlackCell, ChevronDown } from '@/shared-ui/react-icons'

export type OptionProps = {
  options: IOption[]
  newValue?: string
}

const InputSelect: React.FC<FieldProps & TextFieldProps & OptionProps> = (
  props,
) => {
  const { error, helperText, field, form, options, ...rest } = props
  const isTouched = getIn(form.touched, props.field.name)
  const errorMessage = getIn(form.errors, props.field.name)
  const classes = useStyles()

  return (
    <TextField
      className={clx('px-2 my-2', classes.inputContainer)}
      variant="outlined"
      size="small"
      select
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={
        helperText ?? (isTouched && errorMessage ? errorMessage : undefined)
      }
      {...rest}
      {...field}
      SelectProps={{
        IconComponent: ChevronDown,
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          PaperProps: {
            style: {
              marginTop: '4px',
            },
            className: classes.menuOptionContainer,
          },
        },
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.id}
          value={option.value}
          className={classes.menuCustom}
        >
          {option.displayLabel}
          {option.value === field.value && (
            <CheckMarkBlackCell height={18} width={18} />
          )}
        </MenuItem>
      ))}
    </TextField>
  )
}

const useStyles = makeStyles(() => ({
  inputContainer: {
    width: '100%',
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '1rem',
      height: '3rem',
    },
    '& .MuiSelect-select:focus': {
      background: 'transparent',
    },
    '& .MuiSelect-select.MuiSelect-select': {
      height: 28,
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        display: 'none',
      },
    },
    '& fieldset': {
      borderRadius: 24,
      borderColor: colors.main.midnightExpress,
      borderWidth: '1px !important',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.main.midnightExpress,
      borderWidth: '1px !important',
    },
    '& .MuiSelect-icon': {
      height: 16,
      width: 16,
      marginRight: 8,
      marginTop: 4,
      color: colors.main.dark,
    },
    '& ::after': {
      content: "'Expand'",
      display: 'none',
      margin: 'auto',
      padding: 4,
      borderRadius: 4,
      background: colors.main.grey,
      fontFamily: 'PP Object Sans',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: 400,
      right: -40,
    },
    '& :hover::after': {
      display: 'block',
      position: 'absolute',
    },
  },
  menuCustom: {
    backgroundColor: 'inherit !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
  menuOptionContainer: {
    borderRadius: 16,
    border: `1px solid ${colors.main.dark}`,
    '& .MuiTouchRipple-root': {
      display: 'none',
    },
  },
}))

export default InputSelect
