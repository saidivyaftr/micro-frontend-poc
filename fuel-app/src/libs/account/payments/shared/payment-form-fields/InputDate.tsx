import DateFnsUtils from '@date-io/date-fns'
import { addDays } from 'date-fns'
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  makeStyles,
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import { FieldProps } from 'formik'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { useRef, useState } from 'react'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { useActiveAccount } from 'src/selector-hooks'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
import { CalendarIcon } from '@/shared-ui/react-icons/index'

type InputDateExcluiveProps = {
  hideToday?: boolean
}

type InputData = FieldProps & InputDateExcluiveProps

const InputDate = (formikFieldProps: InputData) => {
  const { field, form } = formikFieldProps
  const classes = useStyles()
  const inputRef = useRef<any>(null)
  const activeAccount = useActiveAccount().data
  const [open, setOpen] = useState(false)

  const renderInput = (props: TextFieldProps): any => (
    <TextField
      className={clx('px-2 my-2', classes.inputContainer)}
      type="text"
      variant="outlined"
      size="small"
      onClick={props.onClick}
      value={formatDateString(field.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CalendarIcon height={24} width={24} />
          </InputAdornment>
        ),
      }}
    />
  )

  const renderCalendarDay = (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: React.ReactNode,
  ) => {
    if (!day) {
      return <div> </div>
    }
    const dayIsDue = moment(day).isSame(
      activeAccount.bill?.currentBalance?.dueDate
        ? new Date(activeAccount.bill?.currentBalance?.dueDate)
        : new Date(),
      'day',
    )

    const dayClassName = clx({
      [classes.dueDayCell]: dayIsDue,
    })

    return <div className={clx(dayClassName)}>{dayComponent}</div>
  }

  const formatDateString = (dateString: string) => {
    const currentDate = new Date()
    const providedDate = new Date(dateString)

    // Check if the provided date is today's date
    if (
      currentDate.getDate() === providedDate.getDate() &&
      currentDate.getMonth() === providedDate.getMonth() &&
      currentDate.getFullYear() === providedDate.getFullYear()
    ) {
      return `Today - ${dateString}`
    } else {
      return dateString
    }
  }

  return (
    <div ref={inputRef}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          value={formatDateString(field.value)}
          onChange={(val) => {
            form.setFieldValue(field.name, moment(val).format('ll'))
            setOpen(false)
          }}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          TextFieldComponent={renderInput}
          disablePast
          format="MM/dd/yyyy"
          maxDate={addDays(new Date(), 45)}
          minDate={
            formikFieldProps.hideToday ? addDays(new Date(), 1) : undefined
          }
          variant="inline"
          disableToolbar
          PopoverProps={{
            className: classes.datePickerPopover,
            anchorEl: inputRef.current,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            getContentAnchorEl: null,
            style: {
              zIndex: 1000000,
            },
          }}
          renderDay={renderCalendarDay}
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  dueDayCell: {
    '& .MuiPickersDay-day': {
      '& .MuiIconButton-label': {
        marginTop: -6,
      },
      '&::after': {
        content: "'Due'",
        bottom: 4,
        position: 'absolute',
        fontSize: 10,
        lineHeight: '12px',
      },
    },
  },
  inputContainer: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 24,
      height: '3rem',
    },
    '& fieldset': {
      display: 'flex',
      borderColor: colors.main.midnightExpress,
      alignItems: 'center',
    },
    '& ::after': {
      content: "'Expand Calendar'",
      display: "none",
      margin: 'auto',
      padding: 4,
      borderRadius: 4,
      background: colors.main.grey,
      fontFamily: 'PP Object Sans',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: 400,
      right: -100,
    },
    '& :hover::after': {
        display: "block",
        position: "absolute",
    },
  },
  datePickerPopover: {
    '& .MuiPickersDay-daySelected': {
      color: colors.main.greenishBlue,
      backgroundColor: colors.main.dark,
      borderRadius: '0.5rem',
      width: '2.5rem',
    },
    '& .MuiPickersDay-day': {
      height: 40,
      '& .MuiIconButton-label': {
        '& .MuiTypography-root': {
          fontFamily: `${PP_OBJECT_SANS_BOLD} !important`,
        },
      },
    },
    '& .MuiPickersDay-current': {
      '& .MuiIconButton-label': {
        marginTop: -6,
      },
      '&::after': {
        content: "'Today'",
        bottom: 4,
        position: 'absolute',
        fontSize: 8,
      },
    },
    '& .MuiPopover-paper': {
      minHeight: 300,
      maxWidth: 323,
      marginTop: 4,
      borderRadius: 16,
      border: `1px solid ${colors.main.midnightExpress}`,
    },
    '& .MuiPickersBasePicker-pickerView': {
      minHeight: 300,
    },
    '& .MuiPickersCalendarHeader-iconButton': {
      color: colors.main.midnightExpress,
    },
    '& .MuiIconButton-root.Mui-disabled': {
      color: colors.main.borderGrey,
    },
    '& .MuiIconButton-root:hover': {
      backgroundColor: 'inherit',
      color: colors.main.brightRed,
    },
    '& .MuiPickersCalendarHeader-dayLabel': {
      color: colors.main.midnightExpress,
      fontWeight: 700,
      fontSize: 14,
      lineHeight: '1.125rem',
      padding: '0.5rem',
      width: '2.5rem',
      height: '2.5rem',
      margin: 0,
    },
    '& .MuiTypography-body1, .MuiTypography-body2': {
      fontWeight: 700,
      lineHeight: '1.375rem',
    },
    '& .MuiTypography-body2': {
      padding: '0.5rem',
    },
  },
}))

export default InputDate
