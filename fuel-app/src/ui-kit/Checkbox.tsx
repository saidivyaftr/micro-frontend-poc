import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import { ChangeEvent } from 'react'
import { Typography } from '@/shared-ui/components'

export type ISelectProps = {
  label: string | JSX.Element
  checked: boolean
  name: string
  // eslint-disable-next-line no-unused-vars
  setValue: (val: ChangeEvent<HTMLInputElement>) => string
  required?: boolean
  helperText?: string
  isError?: boolean
  checkedIcon?: any
  uncheckedIcon?: any
}

const FrontierCheckbox = (props: ISelectProps) => {
  const {
    label,
    checked,
    setValue,
    name,
    required,
    helperText = '',
    isError = false,
    checkedIcon,
    uncheckedIcon,
  } = props
  return (
    <FormControl component="fieldset">
      <FormControlLabel
        className="sss label"
        control={
          <Checkbox
            checkedIcon={checkedIcon}
            icon={uncheckedIcon}
            checked={checked}
            required={required}
            onChange={setValue}
            name={name}
            color="primary"
          />
        }
        label={<Typography>{label}</Typography>}
      />
      {isError && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default FrontierCheckbox
