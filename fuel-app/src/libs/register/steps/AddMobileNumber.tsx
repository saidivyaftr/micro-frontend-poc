import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { Button, Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { Input } from 'src/ui-kit'
import { isValidMobileNumber } from 'src/utils/validator'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPhoneNumberAction } from 'src/redux/actions/register'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import {
  ADD_NEW_MOBILE_NUMBER,
  CUSTOMER,
  SERVICEABLE,
  WIFI,
  WIFI_REGISTRATION,
} from 'src/constants'
import { setApiErrorModal } from 'src/redux/actions/register'
import { State } from 'src/redux/types'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const AddMobileNumber = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const addMobileContent = useAppData('AddMobileNumber', true) || {}

  const { phone, updatePhone, flowType } = useSelector(
    (state: State) => state.register,
  )
  const isWIFI = flowType === WIFI
  const pageStr = isWIFI
    ? WIFI_REGISTRATION.ADD_NEW_MOBILE_NUMBER
    : ADD_NEW_MOBILE_NUMBER

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: pageStr,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68',
      eVar68: pageStr,
    },
  })

  // State management
  const [value, setValue] = useState(phone ?? '')

  const handleSubmitNumber = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: submit Add Mobile Number',
      },
      'tl_o',
    )
    const parsedValue = value.replace(/\D/g, '')
    dispatch(addNewPhoneNumberAction(parsedValue, setApiErrorModal))
  }
  const isValidNumber = isValidMobileNumber(value)

  return (
    <div>
      <Typography
        styleType="h4"
        tagType="h3"
        className={classes.title}
        data-tid="add-mobile-title"
      >
        {addMobileContent.title?.value}
      </Typography>
      <div className={classes.row}>
        <label>
          <Typography>
            {isWIFI
              ? addMobileContent.wifiInfo?.value
              : addMobileContent.info?.value}
          </Typography>
        </label>
        <Input
          data-tid="add-mobile-input-container"
          name="mobile number"
          value={value}
          fullWidth
          onChange={(e: any) => setValue(e.target.value)}
          className={classes.inputContainer}
          mask={!isWIFI ? '(999) 999-9999' : ''}
          isError={updatePhone?.errorMessage}
          helperText={updatePhone?.errorMessage}
        />
      </div>
      <Button
        type="button"
        variant="primary"
        hoverVariant="primary"
        className={classes.submitBtn}
        text={
          isWIFI
            ? addMobileContent.wifiAddMobileCTA?.value
            : addMobileContent.addMobileBtnText?.value
        }
        disabled={!isValidNumber}
        isBusy={updatePhone?.isBusy}
        data-tid="add-mobile-submit-btn"
        onClick={handleSubmitNumber}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
  },
  row: {
    width: '100%',
    marginBottom: 16,
    marginTop: 32,
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
    margin: '10px 0px',
    width: '100%',
    fontWeight: 'bolder',
    fontFamily: 'PP Object Sans',
  },
  submitBtn: {
    margin: '32px auto',
    width: 'max-content',
    display: 'block',
  },
}))

export default AddMobileNumber
