import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Button, Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { Input } from 'src/ui-kit'
import { isValidEmail } from 'src/utils/validator'
import { useDispatch, useSelector } from 'react-redux'
import { updateEmailAction } from 'src/redux/actions/register'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import {
  WIFI,
  ADD_NEW_EMAIL_ADDRESS,
  CUSTOMER,
  SERVICEABLE,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { State } from 'src/redux/types'
import ModalWrapper from '../components/ModalWrapper'
import ActionModal from '../components/ActionModal'

const UpdateEmailAddress = () => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: ADD_NEW_EMAIL_ADDRESS,
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
      events: 'event68',
      eVar68: ADD_NEW_EMAIL_ADDRESS,
    },
  })

  const classes = useStyles()
  const { title, info, addEmailBtnText, wifiAddEmailCTA } = useAppData(
    'AddEmailAddress',
    true,
  )
  const dispatch = useDispatch()
  const { email, updateEmail, flowType } = useSelector(
    (state: State) => state.register,
  )
  const isWIFI = flowType === WIFI
  const alreadyRegisteredEmail = useAppData('alreadyRegisteredEmail', true)

  // State management
  const [value, setValue] = useState(email ?? '')
  const [showAlreadyRegisteredErrorModal, setShowAlreadyRegisteredErrorModal] =
    useState(false)

  useEffect(() => {
    if (updateEmail?.failedReason === 'ALREADY_REGISTERED') {
      setShowAlreadyRegisteredErrorModal(true)
    }
  }, [updateEmail?.failedReason])

  const handleUpdateEmail = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Submit Update Email',
      },
      'tl_o',
    )
    dispatch(updateEmailAction(value))
  }

  const handleExitRegistration = () => {
    window.location.href = '/login'
  }

  const isValidEmailAddress = isValidEmail(value)

  const ALREADY_REGISTERED_MODAL_DATA = {
    title: alreadyRegisteredEmail?.title,
    info: alreadyRegisteredEmail?.info,
    info1: alreadyRegisteredEmail?.info1,
    btn1: {
      text: alreadyRegisteredEmail?.btn1,
    },
    btn2: {
      text: alreadyRegisteredEmail?.btn2,
    },
    supportInfo: alreadyRegisteredEmail?.supportInfo,
    supportLink: alreadyRegisteredEmail?.supportLink,
    supportUrl: alreadyRegisteredEmail?.supportUrl,
  }

  return (
    <div>
      <Typography
        styleType="h4"
        tagType="h3"
        className={classes.title}
        data-tid="update-email-title"
      >
        {title?.value}
      </Typography>
      <div className={classes.row}>
        <label>
          <Typography>{info?.value}</Typography>
        </label>
        <Input
          value={value}
          name="email address"
          fullWidth
          onChange={(e: any) => setValue(e.target.value)}
          className={classes.inputContainer}
          isError={updateEmail?.errorMessage}
          helperText={updateEmail?.errorMessage}
          data-tid="update-email-input-container"
        />
      </div>
      <Button
        type="button"
        variant="primary"
        hoverVariant="primary"
        className={classes.submitBtn}
        onClick={handleUpdateEmail}
        text={isWIFI ? wifiAddEmailCTA?.value : addEmailBtnText?.value}
        disabled={!isValidEmailAddress}
        isBusy={updateEmail?.isBusy}
        data-tid="update-email-submit-btn"
      />
      <ModalWrapper
        isOpen={showAlreadyRegisteredErrorModal}
        handleClose={() => {
          setShowAlreadyRegisteredErrorModal(false)
        }}
        modalContent={
          <ActionModal
            data={ALREADY_REGISTERED_MODAL_DATA}
            btn1Handler={() => setShowAlreadyRegisteredErrorModal(false)}
            btn2Handler={handleExitRegistration}
            handleClose={() => setShowAlreadyRegisteredErrorModal(false)}
          />
        }
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
    maxWidth: 250,
    display: 'block',
  },
}))

export default UpdateEmailAddress
