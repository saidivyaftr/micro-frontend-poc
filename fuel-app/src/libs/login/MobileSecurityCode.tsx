import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import colors from '@/shared-ui/colors'
import { Button, Typography, OTPInput, Modal } from '@/shared-ui/components'
import ActionModal from './ActionModal'
import { registerSlice } from 'src/redux/slicers'
import { useDispatch } from 'react-redux'
import APIClient from 'src/api-client'
import { useAppData } from 'src/hooks'

const MobileSecurityCode = () => {
  const classes = useStyles()
  const {
    title,
    incorrectCodeText,
    info,
    info2,
    incorrectInfoText,
    incorrectInfoText2,
    confirmBtnText,
    UpdateNumberLink,
    supportUrl,
  } = useAppData('OTPMobile', true)
  const securityTimeout = useAppData('securityTimeout', true)

  // State management
  const [OTPvalue, setOTPValue] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isInvalidOTP, setIsInvalidOTP] = useState<boolean>(false)
  const [invalidAttempts, setInvalidAttempts] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const dispatch = useDispatch()

  const maxAttempts = 3

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      await APIClient.validatePrimaryMFACode({
        grantToken: '',
        mfaCode: parseInt(OTPvalue),
      })
    } catch (error) {
      if (maxAttempts > invalidAttempts + 1) {
        setIsInvalidOTP(true)
        setInvalidAttempts(invalidAttempts + 1)
      } else {
        setOpenDialog(true)
      }
    }
    setIsLoading(false)
  }

  const dismissModal = () => {
    setOpenDialog(false)
    dispatch(registerSlice.actions.setStep('REGISTER_WITH_EMAIL_OR_MOBILE'))
  }

  const handleClose = () => {
    setOpenDialog(false)
    dispatch(registerSlice.actions.setStep('REGISTER_WITH_EMAIL_OR_MOBILE'))
  }

  const handleContactUs = () => {
    setOpenDialog(false)
    window.location.href = supportUrl?.value
  }

  return (
    <div>
      <Typography styleType="h4" tagType="h3" className={classes.title}>
        {isInvalidOTP ? incorrectCodeText?.value : title?.value}
      </Typography>
      {isInvalidOTP && (
        <Typography styleType="p1" tagType="p" className={classes.info}>
          {incorrectInfoText?.value.replace(
            '{{count}}',
            (maxAttempts - invalidAttempts).toString(),
          )}
        </Typography>
      )}
      <div className={classes.info}>
        <Typography styleType="p1" tagType="p">
          {isInvalidOTP ? incorrectInfoText2?.value : info?.value}
        </Typography>
        &nbsp;
        <Typography styleType="p1" tagType="p" fontType="boldFont">
          (***) ***-5324
        </Typography>
      </div>
      <form>
        <Typography styleType="p1" tagType="p" className={classes.info}>
          {info2?.value}
        </Typography>
        <OTPInput
          value={OTPvalue}
          onChange={setOTPValue}
          isInvalidOTP={isInvalidOTP}
        />
        <Button
          type="button"
          variant="primary"
          hoverVariant="primary"
          className={classes.continueBtn}
          text={confirmBtnText?.value}
          onClick={onSubmit}
          disabled={OTPvalue.length !== 6 || isLoading}
        />

        <p className={classes.textCenter}>
          <Button
            type="link"
            variant="lite"
            hoverVariant="primary"
            className={classes.updateLinkBtn}
            text={UpdateNumberLink?.value}
          />
        </p>
        {openDialog && (
          <Modal
            modalOpen={openDialog}
            setModalOpen={dismissModal}
            stopDefaultExit={true}
            modalContent={
              <ActionModal
                data={securityTimeout}
                btn1Handler={handleClose}
                btn2Handler={handleContactUs}
              />
            }
          />
        )}
      </form>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
    margin: ' 1rem auto 2rem auto',
  },
  info: {
    margin: '16px 0px',
    display: 'flex',
    flexDirection: 'row',
  },
  error: {
    color: `${colors.main.error}`,
    marginLeft: '8px',
  },
  continueBtn: {
    margin: '2em auto',
    maxWidth: 246,
    display: 'block',
    fontWeight: 700,
    fontSize: '0.875rem',
  },
  textCenter: {
    textAlign: 'center',
  },
  textWrongNo: {
    fontWeight: 500,
  },
  updateLinkBtn: {
    marginLeft: '15px',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 'inherit',
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
}))
export default MobileSecurityCode
