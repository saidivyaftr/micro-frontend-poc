/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import { VerificationToken } from '../profile/contact-information/types'
import { useAppData } from 'src/hooks'
import { useActiveAccountId } from 'src/selector-hooks'
import APIClient from 'src/api-client'
import { useDispatch } from 'react-redux'
import VerifyPhoneOTPModal from './modals/VerifyPhoneNumberOTPModal'
import { removeDashes } from 'src/utils/mobile-helpers'
import { fetchPhoneNumbers } from 'src/redux/slicers/profile'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const VerifyPhone = (props: any) => {
  const activeAccountId = useActiveAccountId()
  const contactInformationData = useAppData('contactInformationData', true)
  const { contactId, isContactPrimary, updateEditState, contactValue } = props
  const dispatch = useDispatch()
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>('')
  const [verifyNumber, setVerifyNumber] = useState('')
  const [OTPDialogOpen, setOTPDialogOpen] = useState(false)
  const [tokenOptions, setTokenOptions] = useState<any>(undefined)
  const [isSubmitLoading, setSubmitLoading] = useState(false)
  const [isResendOptLoading, setResendOptLoading] = useState(false)
  const [isVerifySuccess, setVerifySuccess] = useState(false)

  useEffect(() => {
    if (contactValue.length > 0) {
      triggerOTPtoPhone(contactValue)
    }
  }, [contactValue])

  const dismissOTPModal = () => {
    setOTPDialogOpen(false)
    if (isVerifySuccess) {
      dispatch(fetchPhoneNumbers(activeAccountId))
    }
    updateEditState({
      verifyContact: false,
      verifyContactValue: '',
      verifyContactId: '',
      isEditing: true,
      isAddingNewContactItem: false,
    })
  }
  const setHasApiFailed = (status: boolean) => {
    updateEditState({ hasApiFailed: status })
  }

  const getOTPToken = async (phoneNumber: any) => {
    const requestBody =
      contactId.length > 0
        ? { details: phoneNumber, type: 'Mobile', contactId: contactId }
        : { details: phoneNumber, type: 'Mobile', skipSearch: true }

    const { data = {} } = await APIClient.verifyPhoneNumber(
      activeAccountId,
      requestBody,
    )
    const tokenData: VerificationToken = data
    const updatedToken = getAuthenticationToken(tokenData)
    return updatedToken
  }

  const getAuthenticationToken = (tokenData: VerificationToken) => {
    const { token, authenticationOptions }: any = tokenData
    const id = authenticationOptions?.find(
      (item: any) => item?.type === 'sms',
    )?.id
    return {
      token,
      authentication: {
        id,
      },
    }
  }

  const generateAndValidateOTP = async (values: any) => {
    const { data = {} } = await APIClient.verifyPhoneNumber(
      activeAccountId,
      values,
    )
    const tokenData: VerificationToken = data
    const updatedToken = getAuthenticationToken(tokenData)
    setTokenOptions(updatedToken)
  }

  const triggerOTPtoPhone = async (phoneNumber: any) => {
    const formattedNumber = removeDashes(phoneNumber)
    setHasApiFailed(false)
    setVerifyNumber(formattedNumber)
    try {
      const tokenOptions = await getOTPToken(phoneNumber)
      setTokenOptions(tokenOptions)
      await generateAndValidateOTP({
        step: 1,
        ...tokenOptions,
      })
      setOTPDialogOpen(true)
    } catch (e) {
      setHasApiFailed(true)
    }
  }

  const getValidateOtpRequestBody = (OTPvalue: number) => {
    const {
      authentication: { id },
      token,
    }: any = tokenOptions

    const requestBody =
      contactId.length > 0
        ? {
          step: 2,
          isPrimary: null,
          token,
          contactId: contactId,
          authentication: { id, value: OTPvalue },
        }
        : {
          step: 2,
          isPrimary: isContactPrimary,
          token,
          skipSearch: true,
          type: 'Mobile',
          details: verifyNumber,
          authentication: { id, value: OTPvalue },
        }
    return requestBody
  }

  const validateOTP = async (OTPvalue: number) => {
    setSubmitLoading(true)
    setHasApiFailed(false)
    setOtpErrorMessage('')
    try {
      await generateAndValidateOTP(getValidateOtpRequestBody(OTPvalue))
      setVerifySuccess(true)
      setOTPDialogOpen(true)

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'my profile:contact information:verify phone number',
        },
        'tl_o',
        'my profile:contact information:verify phone number',
      )
    } catch (e: any) {
      setOtpErrorMessage(
        contactInformationData?.verifyNumber?.targetItem?.invalidOtp?.value || '',
      )
      setHasApiFailed(true)
    }
    setSubmitLoading(false)
  }
  const resendOTP = async () => {
    setResendOptLoading(true)
    setHasApiFailed(false)
    try {
      await generateAndValidateOTP({
        step: 1,
        ...tokenOptions,
      })

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'my profile:contact information:resend OTP phone number',
        },
        'tl_o',
        'my profile:contact information:resend OTP phone number',
      )
    } catch (e) {
      setResendOptLoading(false)
      setHasApiFailed(true)
    }
    setResendOptLoading(false)
  }

  return (
    <VerifyPhoneOTPModal
      dismissOTPModal={dismissOTPModal}
      OTPDialogOpen={OTPDialogOpen}
      phoneNumber={verifyNumber}
      validateOTP={validateOTP}
      isSubmitLoading={isSubmitLoading}
      resendOTP={resendOTP}
      errorMessage={otpErrorMessage}
      isResendOptLoading={isResendOptLoading}
      isTypeEmail={false}
      isVerifySuccess={isVerifySuccess}
    />
  )
}

export default VerifyPhone
