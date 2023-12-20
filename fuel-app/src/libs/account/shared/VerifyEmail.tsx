/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import { VerificationToken } from '../profile/contact-information/types'
import { useAppData } from 'src/hooks'
import { useActiveAccountId } from 'src/selector-hooks'
import APIClient from 'src/api-client'
import { useDispatch } from 'react-redux'
import { fetchEmailAddresses } from 'src/redux/slicers/profile'
import VerifyEmailOTPModal from './modals/VerifyPhoneNumberOTPModal'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
const VerifyEmail = (props: any) => {
  const activeAccountId = useActiveAccountId()
  const contactInformationData = useAppData('contactInformationData', true)
  const { contactId, isContactPrimary, updateEditState, contactValue } = props
  const dispatch = useDispatch()
  const [tokenOptions, setTokenOptions] = useState<any>(undefined)
  const [verifyEmail, setVerifyEmail] = useState('')
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>('')
  const [OTPDialogOpen, setOTPDialogOpen] = useState(false)
  const [isSubmitLoading, setSubmitLoading] = useState(false)
  const [isResendOptLoading, setResendOptLoading] = useState(false)
  const [isVerifySuccess, setVerifySuccess] = useState(false)

  useEffect(() => {
    if (contactValue.length > 0) {
      triggerOTPtoEmail(contactValue)
    }
  }, [contactValue])

  const dismissOTPModal = () => {
    setOTPDialogOpen(false)
    if (isVerifySuccess) {
      dispatch(fetchEmailAddresses(activeAccountId))
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
  const getOTPToken = async (emailAddress: any) => {
    const requestBody =
      contactId.length > 0
        ? { details: emailAddress, type: 'Email', contactId: contactId }
        : { details: emailAddress, type: 'Email', skipSearch: true }
    const { data = {} } = await APIClient.verifyEmailAddresses(
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
      (item: any) => item?.type === 'email',
    )?.id
    return {
      token,
      authentication: {
        id,
      },
    }
  }

  const generateAndValidateOTP = async (values: any) => {
    const { data = {} } = await APIClient.verifyEmailAddresses(
      activeAccountId,
      values,
    )
    const tokenData: VerificationToken = data
    const updatedToken = getAuthenticationToken(tokenData)
    setTokenOptions(updatedToken)
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
          type: 'Email',
          details: verifyEmail,
          authentication: { id, value: OTPvalue },
        }
    return requestBody
  }
  const validateOTP = async (OTPvalue: number) => {
    setSubmitLoading(true)
    setOtpErrorMessage('')
    setHasApiFailed(false)
    try {
      await generateAndValidateOTP(getValidateOtpRequestBody(OTPvalue))
      setVerifySuccess(true)
      setOTPDialogOpen(true)

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'my profile:contact information:verify email address',
        },
        'tl_o',
        'my profile:contact information:verify email address',
      )
    } catch (e: any) {
      setOtpErrorMessage(
        contactInformationData?.verifyNumber?.targetItem?.invalidOtp?.value || '',
      )
      setHasApiFailed(true)
      setSubmitLoading(false)
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
          eVar14: 'my profile:contact information:resend OTP email address',
        },
        'tl_o',
        'my profile:contact information:resend OTP email address',
      )
    } catch (e) {
      setHasApiFailed(true)
      setResendOptLoading(false)
    }
    setResendOptLoading(false)
  }

  const triggerOTPtoEmail = async (email: string) => {
    setVerifyEmail(email)
    setHasApiFailed(false)
    try {
      const tokenOptions = await getOTPToken(email)
      await generateAndValidateOTP({
        step: 1,
        ...tokenOptions,
      })
      setOTPDialogOpen(true)
    } catch (e) {
      setHasApiFailed(true)
    }
  }

  return (
    <VerifyEmailOTPModal
      dismissOTPModal={dismissOTPModal}
      OTPDialogOpen={OTPDialogOpen}
      phoneNumber={verifyEmail}
      validateOTP={validateOTP}
      isSubmitLoading={isSubmitLoading}
      resendOTP={resendOTP}
      errorMessage={otpErrorMessage}
      isResendOptLoading={isResendOptLoading}
      isTypeEmail={true}
      isVerifySuccess={isVerifySuccess}
    />
  )
}

export default VerifyEmail
