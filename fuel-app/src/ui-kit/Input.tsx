import { TextField } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput'
import clx from 'classnames'
import ReactInputMask from 'react-input-mask'
const FrontierInputField = ({
  isError = false,
  className,
  inputClassName,
  endAdornment = undefined,
  ...otherProps
}: any) => {
  const classes = useStylesReddit()
  const inputComp = (
    <TextField
      variant="filled"
      className={clx(classes.textField, className)}
      size="small"
      InputProps={
        {
          classes: {
            root: clx(classes.inputRoot, inputClassName, {
              [classes.borderPrimary]: isError,
            }),
            focused: classes.inputFocused,
          },
          disableUnderline: true,
          endAdornment,
        } as Partial<OutlinedInputProps>
      }
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused,
        },
      }}
      inputProps={{
        'aria-label': otherProps?.name || 'input',
      }}
      {...otherProps}
    />
  )
  return otherProps.mask ? (
    <ReactInputMask
      mask={otherProps.mask}
      value={otherProps.value}
      onChange={otherProps.onChange}
      onBlur={otherProps.onBlur}
      disabled={otherProps.disabled}
    >
      {/* @ts-ignore */}
      {() => inputComp}
    </ReactInputMask>
  ) : (
    inputComp
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
      border: `1px solid ${colors.main.primaryRed} !important`,
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
      '& .Mui-disabled': {
        opacity: 0.9,
      },
    },
  }),
)
export default FrontierInputField
