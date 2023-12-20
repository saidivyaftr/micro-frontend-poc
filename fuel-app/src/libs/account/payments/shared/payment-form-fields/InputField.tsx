/* eslint-disable @typescript-eslint/indent */
import * as React from 'react'
import { TextField, TextFieldProps, makeStyles } from '@material-ui/core'
import { FieldProps, getIn } from 'formik'
import clx from 'classnames'
import colors from '@/shared-ui/colors'

export const InputField: React.FC<
  FieldProps & TextFieldProps & { restrictToNumber?: boolean }
> = (props) => {
  const { error, helperText, field, form, restrictToNumber, ...rest } = props
  const isTouched = getIn(form.touched, props.field.name)
  const errorMessage = getIn(form.errors, props.field.name)
  const classes = useStyles()
  const handlechange = (event: any) => {
    if (restrictToNumber && isNaN(event.target.value)) {
      event.preventDefault()
    } else {
      field.onChange(event)
    }
  }

  return (
    <TextField
      className={clx('px-2 my-2', classes.inputContainer)}
      variant="outlined"
      error={error ?? Boolean(errorMessage)}
      helperText={
        helperText ?? (isTouched && errorMessage ? errorMessage : undefined)
      }
      {...rest}
      {...field}
      onChange={handlechange}
    />
  )
}

const useStyles = makeStyles(() => ({
  inputContainer: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 24,
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: colors.main.inputError,
      },
    },
  },
}))
