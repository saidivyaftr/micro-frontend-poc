import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Button, Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { Input } from 'src/ui-kit'
import { isValidEmail } from 'src/utils/validator'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import { ADD_NEW_EMAIL_ADDRESS, CUSTOMER, SERVICEABLE } from 'src/constants'
import { addNewEmailAction } from 'src/redux/actions/register'
import ActionModal from '../components/ActionModal'
import ModalWrapper from '../components/ModalWrapper'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const AddNewEmailAddress = () => {
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
  const { title, info, addEmailBtnText } = useAppData(
    'AddNewEmailAddress',
    true,
  )
  const alreadyRegisteredEmail = useAppData('alreadyRegisteredEmail', true)
  const dispatch = useDispatch()
  const { email, updateEmail } = useSelector((state: State) => state.register)

  // State management
  const [value, setValue] = useState(email ?? '')
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    if (updateEmail?.failedReason === 'ALREADY_REGISTERED') {
      setOpenDialog(true)
    }
  }, [updateEmail?.failedReason])

  const handleAddEmail = async () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'Registration: Submit Add Email',
      },
      'tl_o',
    )
    dispatch(addNewEmailAction(value))
  }
  const dismissModal = () => {
    setOpenDialog(false)
  }

  const handleExitRegistration = () => {
    window.location.href = '/login'
    //setOpenDialog(false)
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
        data-tid="add-email-title"
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
          data-tid="add-email-input-container"
          fullWidth
          onChange={(e: any) => setValue(e.target.value)}
          className={classes.inputContainer}
          isError={updateEmail?.errorMessage}
          helperText={updateEmail?.errorMessage}
        />
      </div>
      <Button
        type="button"
        variant="primary"
        hoverVariant="primary"
        className={classes.submitBtn}
        onClick={handleAddEmail}
        text={addEmailBtnText?.value}
        disabled={!isValidEmailAddress}
        isBusy={updateEmail?.isBusy}
        data-tid="add-email-submit-btn"
      />
      <ModalWrapper
        isOpen={openDialog}
        handleClose={dismissModal}
        modalContent={
          <ActionModal
            data={ALREADY_REGISTERED_MODAL_DATA}
            btn1Handler={dismissModal}
            btn2Handler={handleExitRegistration}
            handleClose={dismissModal}
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

export default AddNewEmailAddress
