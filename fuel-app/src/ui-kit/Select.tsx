import {
  makeStyles,
  Theme,
  TextField,
  MenuItem,
  createStyles,
} from '@material-ui/core'
import clx from 'classnames'
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput'
import colors from '@/shared-ui/colors'
export type ISelectProps = {
  label: string
  value: string
  name: string
  // eslint-disable-next-line no-unused-vars
  setValue: (val: string) => void
  options: IOption[]
  required?: boolean
  info?: string
  helperText?: string
  isError?: boolean
  disabled?: boolean
  className?: string
  onBlur?: any
}

export type IOption = {
  label: string
  value: string
}
const Select = (props: ISelectProps) => {
  const classes = useStylesReddit()
  const {
    label,
    value,
    setValue,
    name,
    options,
    required,
    helperText = '',
    isError = false,
    disabled,
    className,
    ...otherProps
  } = props
  return (
    <TextField
      select
      label={label}
      name={name}
      value={value}
      fullWidth
      variant="filled"
      disabled={disabled}
      onChange={(e) => setValue(e.target.value)}
      className={classes.textField}
      required={required}
      InputProps={
        {
          classes: {
            root: clx(
              classes.inputRoot,
              { [classes.borderPrimary]: isError },
              className,
            ),
            focused: classes.inputFocused,
          },
          disableUnderline: true,
        } as Partial<OutlinedInputProps>
      }
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused,
        },
      }}
      helperText={helperText}
      {...otherProps}
    >
      {options?.map((option, key) => (
        <MenuItem key={`${option?.value}_${key}`} value={option.value}>
          {option?.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      border: `1px solid ${colors.main.borderGrey}`,
      overflow: 'hidden',
      borderRadius: 8,
      height: 50,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {},
      '&$focused': {
        borderColor: theme.palette.text.primary,
      },
    },
    borderPrimary: {
      border: `1px solid ${colors.main.primaryRed}`,
    },
    inputFocused: {},
    labelRoot: {
      '&$labelFocused': {
        color: theme.palette.text.primary,
      },
    },
    labelFocused: {},
    textField: {
      '& p': {
        color: colors.main.blackRock,
        marginLeft: 0,
        marginRight: 0,
      },
    },
  }),
)
export default Select
