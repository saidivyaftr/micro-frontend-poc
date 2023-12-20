import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { Button, Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { Input } from 'src/ui-kit'
import { isValidMobileNumber } from 'src/utils/validator'
import { useDispatch, useSelector } from 'react-redux'
import { updatePhoneNumberAction } from 'src/redux/actions/register'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import {
  ADD_NEW_MOBILE_NUMBER,
  CUSTOMER,
  SERVICEABLE,
  WIFI,
} from 'src/constants'
import { setApiErrorModal } from 'src/redux/actions/register'
import { State } from 'src/redux/types'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const UpdateMobileNumber = () => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: ADD_NEW_MOBILE_NUMBER,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68',
      eVar68: ADD_NEW_MOBILE_NUMBER,
    },
  })

  const classes = useStyles()
  const dispatch = useDispatch()

  const { title, info, addNewNumberBtnText } = useAppData(
    'AddMobileNumber',
    true,
  )
  const { phone, updatePhone, flowType } = useSelector(
    (state: State) => state.register,
  )
  const isWIFI = flowType === WIFI
  // State management
  const [value, setValue] = useState(`${phone ?? ''}`)

  const handleSubmitNumber = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: submit Update Mobile Number',
      },
      'tl_o',
    )
    const parsedValue = value.replace(/\D/g, '')
    dispatch(updatePhoneNumberAction(parsedValue, setApiErrorModal))
  }

  const isValidNumber = isValidMobileNumber(value)

  return (
    <div>
      <Typography
        styleType="h4"
        tagType="h3"
        className={classes.title}
        data-tid="update-mobile-title"
      >
        {title?.value}
      </Typography>
      <div className={classes.row}>
        <label>
          <Typography>{info?.value}</Typography>
        </label>
        <Input
          name="mobile number"
          value={value}
          fullWidth
          onChange={(e: any) => setValue(e.target.value)}
          className={classes.inputContainer}
          mask={!isWIFI ? '(999) 999-9999' : ''}
          isError={updatePhone?.errorMessage}
          helperText={updatePhone?.errorMessage}
          data-tid="mobile-input-container"
        />
      </div>
      <Button
        type="button"
        variant="primary"
        hoverVariant="primary"
        className={classes.submitBtn}
        text={addNewNumberBtnText?.value}
        disabled={!isValidNumber}
        isBusy={updatePhone?.isBusy}
        onClick={handleSubmitNumber}
        data-tid="update-mobile-submit-btn"
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  title: {
    textAlign: 'center',
  },
  row: {
    marginBottom: 16,
    marginTop: 32,
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  inputContainer: {
    '& .MuiFormHelperText-root': {
      color: colors.main.error,
      marginLeft: 4,
      marginTop: 8,
    },
    '& .MuiFilledInput-root': {
      borderRadius: 32,
      marginTop: 8,
    },
    '& input': {
      borderRadius: 32,
      padding: '8px 16px',
      height: 40,
    },
    [breakpoints.down('xs')]: {
      margin: '10px 0px',
      width: `100%`,
    },
    fontWeight: 'bolder',
    fontFamily: 'PP Object Sans',
  },
  submitBtn: {
    margin: '32px auto',
    width: 'max-content',
    display: 'block',
  },
}))

export default UpdateMobileNumber
