import 'date-fns'
import MomentUtils from '@date-io/moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import colors from '@/shared-ui/colors'
import { CalendarIcon } from '@/shared-ui/react-icons'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput'
import clx from 'classnames'
const DatePicker = ({
  isError = false,
  readOnly = true,
  ...otherProps
}: any) => {
  const styles = useStylesReddit()
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        keyboardIcon={<CalendarIcon className={styles.calendarIcon} />}
        fullWidth
        variant="inline"
        className={styles.textField}
        size="small"
        KeyboardButtonProps={{
          'aria-label': 'change date',
          classes: {
            root: styles.button,
          },
        }}
        autoOk
        inputVariant="filled"
        InputProps={
          {
            readOnly,
            classes: {
              root: clx(styles.inputRoot, { [styles.borderPrimary]: isError }),
              focused: styles.inputFocused,
            },
            placeholder: readOnly ? undefined : 'MM/DD/YYYY',
            disableUnderline: true,
          } as Partial<OutlinedInputProps>
        }
        InputLabelProps={{
          classes: {
            root: styles.labelRoot,
            focused: styles.labelFocused,
          },
        }}
        {...otherProps}
      />
    </MuiPickersUtilsProvider>
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
      backgroundColor: colors.main.white,
      paddingRight: 0,
      '&:hover': {
        backgroundColor: colors.main.white,
      },
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
      '& .Mui-disabled': {
        opacity: 0.9,
      },
    },
    button: {
      '&:hover': {
        backgroundColor: colors.main.white,
      },
    },
    calendarIcon: {
      fill: colors.main.midnightExpress,
      '&:hover': {
        fill: colors.main.primaryRed,
      },
    },
  }),
)

export default DatePicker
