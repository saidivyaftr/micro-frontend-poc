import colors from '@/shared-ui/colors'
import {
  OTPInput,
  Typography,
  Button,
  InjectHTML,
} from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useSelectDiscoverIdentity } from 'src/selector-hooks'
import { DiscoverAuthenticate } from 'src/api-client/types'
import APIClient from 'src/api-client'
import { useDispatch } from 'react-redux'
import { fetchAccounts } from 'src/redux/slicers/account'
import { useRouter } from 'next/router'
import { CurrentStep, ModalType } from '../LinkAccountContainer'
import { ActionModal } from 'src/libs/account/shared/modals'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import useAppData from '@/shared-ui/hooks/useAppData'
import { SITE_ERROR } from 'src/constants'

export const VerifyAccessCodeOTPModal = ({
  selectedAccessCodeId,
  setSelectedAccessCodeId,
  isOpen,
  handleClose,
  setCurrentStep,
  setModal,
}: {
  selectedAccessCodeId: { id: string; token: string }
  setSelectedAccessCodeId: (value: { id: string; token: string }) => void
  isOpen: boolean
  handleClose: () => void
  setCurrentStep: (value: CurrentStep) => void
  setModal: (value: ModalType) => void
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const linkAccountData = useAppData('linkAccountData', true)

  const { data } = useSelectDiscoverIdentity()

  const [OTPvalue, setOTPValue] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResendingCode, setIsResendingCode] = useState(false)

  const isOTPValid = OTPvalue.length === 6

  const queryAccountId = router?.query?.account
    ? `${router?.query?.account}`
    : undefined

  useEffect(() => {
    setShowErrorMessage(false)
    setOTPValue('')
  }, [isOpen])

  useEffect(() => {
    if (showErrorMessage) {
      setOTPValue('')
    }
  }, [showErrorMessage])

  const validateOTP = async () => {
    setIsSubmitting(true)
    setShowErrorMessage(false)
    try {
      const body: DiscoverAuthenticate = {
        token: selectedAccessCodeId.token ?? '',
        apiNumber: 3,
        authentication: {
          id: selectedAccessCodeId.id,
          value: OTPvalue,
        },
      }
      await APIClient.discoverAuthenticate(body)
      await dispatch(fetchAccounts(queryAccountId, true, true))
      setSelectedAccessCodeId({ id: '', token: '' })
      setModal(null)
      setCurrentStep('SUCCESS')

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: `account access:account linked:access code`,
        },
        'tl_o',
        `account access:account linked:access code`,
      )
    } catch (error) {
      setShowErrorMessage(true)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'account access:account linked:access code',
          eVar88: 'Failed to authenticate access code',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    setIsSubmitting(false)
  }

  const resendOTP = async () => {
    setIsResendingCode(true)
    try {
      const body: DiscoverAuthenticate = {
        token: data?.token ?? '',
        apiNumber: 2,
        authentication: {
          id: selectedAccessCodeId.id,
        },
      }
      const response = await APIClient.discoverAuthenticate(body)
      setSelectedAccessCodeId({
        id: selectedAccessCodeId.id,
        token: response?.data?.token,
      })
    } catch (error) {}
    setIsResendingCode(false)
  }

  let number =
    data?.authenticationOptions?.find((x) => x.id === selectedAccessCodeId.id)
      ?.telephoneNumber ?? '****'
  number = number.replaceAll('#', '*')

  return (
    <ActionModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={linkAccountData?.enterAccessCode?.value}
      info={
        <div>
          <Typography
            fontType="boldFont"
            styleType="p1"
            className={classes.subTitle}
          >
            {linkAccountData?.enterAccessCodeDescription?.value?.replace(
              '{{NUMBER}}',
              number,
            )}
          </Typography>
          <div>
            <OTPInput
              value={OTPvalue}
              onChange={setOTPValue}
              invalidOTPMessage={linkAccountData?.otpErrorMessage?.value}
              isInvalidOTP={!!showErrorMessage}
              errorMessageFontType="regularFont"
            />
          </div>
          <InjectHTML
            tagType="p"
            styleType="p1"
            value={linkAccountData?.codeExpiry?.value}
            className={classes.codeExpiry}
          />
          <Button
            text={linkAccountData?.submitBtn?.value}
            type="button"
            onClick={validateOTP}
            className={classes.submitBtn}
            disabled={!isOTPValid || isSubmitting}
            isBusy={isSubmitting}
          />
          <Button
            type="button"
            text={linkAccountData?.resendAccessCode?.value}
            onClick={resendOTP}
            variant="tertiary"
            className={classes.resendBtn}
            disabled={isSubmitting || isResendingCode}
            isBusy={isResendingCode}
          />
        </div>
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  subTitle: {
    textAlign: 'left',
    marginBottom: 16,
  },
  codeExpiry: {
    textAlign: 'left',
    marginTop: 32,
    marginBottom: 32,
  },
  submitBtn: {
    display: 'block',
    margin: 'auto',
    marginBottom: 16,
    maxWidth: 'fit-content',
    minWidth: 'fit-content',
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
      minWidth: '100%',
    },
  },
  resendBtn: {
    padding: 0,
    textTransform: 'none',
    border: 'none',
    textDecoration: 'underline',
    color: colors.main.midnightExpress,
    margin: '0 auto',
    height: 'auto',
    fontSize: 18,
    fontFamily: PP_OBJECT_SANS_MEDIUM,
    '&:hover': {
      backgroundColor: `${colors.main.white} !important`,
      color: `${colors.main.brightRed} !important`,
    },
    [breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
}))
