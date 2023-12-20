import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  makeStyles,
} from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { CheckboxIcon } from '@/shared-ui/react-icons'
export type ISelectProps = {
  label: any
  checked: boolean
  name: string
  setValue: any
  required?: boolean
  helperText?: string
  isError?: boolean
}

const Consent = (props: ISelectProps) => {
  const classes = useStyles()
  const {
    label,
    checked,
    setValue,
    name,
    required,
    helperText = '',
    isError = false,
  } = props

  return (
    <FormControl component="fieldset" className={classes.container}>
      <FormControlLabel
        control={
          <Checkbox
            icon={<CheckboxIcon />}
            checkedIcon={<CheckboxIcon checked />}
            checked={checked}
            required={required}
            onChange={setValue}
            name={name}
            color="primary"
          />
        }
        className={classes.consentText}
        label={label}
      />
      {isError && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    [breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  consentText: {
    textAlign: 'initial',
    alignItems: 'flex-start',
    margin: 0,
    '& .MuiButtonBase-root': {
      padding: 0,
      paddingRight: 16,
      color: colors.main.greenishBlue,
      [breakpoints.down('xs')]: {
        paddingRight: 8,
      },
    },
    '& span': {
      fontSize: '14px !important',
    },
  },
}))

export default Consent
