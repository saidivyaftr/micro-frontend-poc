import {
  CreatePasswordErrorCode,
  PrimarySearchErrorCode,
  VerifySSNAndDOB,
  VerifySSNErrorCode,
  mfaMethod,
  RegisterStep,
  MFAFailedReason,
  PhoneErrorCode,
  UpdateOrAddNewEmailErrorCode,
} from '../types/registerTypes'
import APIClient from 'src/api-client'
import { registerSlice } from '../slicers/register'
import { State } from '../types'
import { ValidateSecondaryMFAPayload } from 'src/api-client/registerAPI'
import { login } from 'src/utils/loginHelper'

const MAX_OTP_ATTEMPTS_LIMITS = 3

export const setVerifySSNAndDOBData =
  registerSlice.actions.setVerifySSNAndDOBData
export const setStep = registerSlice.actions.setStep
export const setFlowType = registerSlice.actions.setFlowType
export const setCreatePasswordData = registerSlice.actions.setCreatePasswordData
export const setPassword = registerSlice.actions.setPassword
export const setApiErrorModal = registerSlice.actions.setApiErrorModal
export const searchLastNameAndAddressData =
  registerSlice.actions.searchLastNameAndAddressData
const searchEmailOrMobileData = registerSlice.actions.searchEmailOrMobileData
const setIsBusySendingMFA = registerSlice.actions.setIsBusySendingMFA
const setConfirmMFA = registerSlice.actions.setConfirmMFA
const setCssAPIGrantToken = registerSlice.actions.setCssAPIGrantToken
const setEmail = registerSlice.actions.setEmail
const setEmailAddressId = registerSlice.actions.setEmailAddressId
const setUpdateOrAddNewEmailPayload =
  registerSlice.actions.setUpdateOrAddNewEmailPayload
const setPhone = registerSlice.actions.setPhone
const setPhoneId = registerSlice.actions.setPhoneId
const setEmailVerified = registerSlice.actions.setEmailVerified
const setPhoneVerified = registerSlice.actions.setPhoneVerified
const setPartialLogin = registerSlice.actions.setPartialLogin
const setAccountUuid = registerSlice.actions.setAccountUuid
const setTokenForVerificationForMobile =
  registerSlice.actions.setTokenForVerificationForMobile
const setAccountInformation = registerSlice.actions.setAccountInformation
const setTokenForVerificationForEmail =
  registerSlice.actions.setTokenForVerificationForEmail
const setAuthorizationMethods = registerSlice.actions.setAuthorizationMethods
const setAccountVerifiedAddress =
  registerSlice.actions.setAccountVerifiedAddress
const setLastName = registerSlice.actions.setLastName
const setFirstName = registerSlice.actions.setFirstName
const setCompanyName = registerSlice.actions.setCompanyName
const setUpdateOrAddNewPhonePayload =
  registerSlice.actions.setUpdateOrAddNewPhonePayload
const setCssAPIAccountAccessToken =
  registerSlice.actions.setCssAPIAccountAccessToken
const setGigyaUid = registerSlice.actions.setGigyaUid
const setAssociatedEmailId = registerSlice.actions.setAssociatedEmailId
export const setCompleteRegistration =
  registerSlice.actions.setCompleteRegistration

////// ******************* //////
////// CSSAuthorization API's Actions
////// ******************* //////

// Search with EMAIL or MOBILE
export const searchEmailOrMobileAction = (payload: any, method: mfaMethod) => {
  return async (dispatch: any) => {
    //clear data from previous search
    dispatch(
      searchLastNameAndAddressData({
        isBusy: false,
        failedReason: undefined,
        isFound: false,
      }),
    )
    dispatch(
      searchEmailOrMobileData({
        isBusy: true,
        failedReason: undefined,
        isFound: false,
      }),
    )
    let isFound = false
    let failedReason: PrimarySearchErrorCode = undefined
    // Search with email or phone API
    try {
      let response = null
      if (method === 'EMAIL') {
        response = await APIClient.authorizeByEmail({
          emailId: payload,
        })
        if (response?.data?.partialLogin === true) {
          dispatch(setPartialLogin(true))
          dispatch(setGigyaUid(response?.data?.uid))
        }
      } else {
        response = await APIClient.searchEmailOrMobile({
          contactTelephoneNumber: {
            contactTelephoneNumber: payload,
            primaryContactTelephoneOnly: true,
          },
        })
      }
      // setting grant token
      const grantToken = response?.data?.grantToken
      dispatch(setCssAPIGrantToken(grantToken))
      dispatch(setAuthorizationMethods(response?.data?.methods || []))

      isFound = true
      if (method === 'EMAIL') {
        dispatch(setEmail(payload))
        dispatch(setEmailVerified(true))
        dispatch(setStep('VERIFY_EMAIL_OTP'))
        dispatch(setFlowType('EMAIL'))
      } else {
        await APIClient.sendPrimaryMFAByPhone({ grantToken })
        dispatch(setPhone(payload))
        dispatch(setPhoneVerified(true))
        dispatch(setStep('VERIFY_MOBILE_OTP'))
        dispatch(setFlowType('PHONE'))
      }
    } catch (error: any) {
      if (error?.response?.status === 409) {
        failedReason = 'ALREADY_REGISTERED'
      } else if (error?.response?.status === 404) {
        const errorCode = error?.response?.data?.errorCode || 2
        if (errorCode === 3) {
          failedReason = 'MULTI_ACCOUNT_FOUND'
        } else {
          failedReason = 'ACCOUNT_NOT_FOUND'
        }
      } else {
        dispatch(setApiErrorModal(true))
      }
    }
    dispatch(
      searchEmailOrMobileData({
        isBusy: false,
        failedReason,
        isFound,
      }),
    )
  }
}

// Search with Last Name and Address Number
export const searchLastNameAndAddressAction = (payload: any) => {
  return async (dispatch: any) => {
    //clear data from previous search
    dispatch(
      searchEmailOrMobileData({
        isBusy: false,
        failedReason: undefined,
        isFound: false,
      }),
    )
    dispatch(
      searchLastNameAndAddressData({
        isBusy: true,
        failedReason: undefined,
        isFound: false,
      }),
    )
    let isFound = false
    let failedReason: PrimarySearchErrorCode = undefined
    try {
      const response = await APIClient.searchWithLastNameAndAddress(payload)
      isFound = true
      dispatch(setCssAPIGrantToken(response?.data?.grantToken))
      dispatch(setFlowType('LAST_NAME_AND_ADDRESS'))
      dispatch(registerSlice.actions.setStep('VERIFY_WITH_SSN'))
    } catch (error: any) {
      if (error?.response?.status === 404) {
        const errorCode = error?.response?.data?.errorCode || 2
        if (errorCode === 1) {
          failedReason = 'ALREADY_REGISTERED'
        } else {
          failedReason = 'ACCOUNT_NOT_FOUND'
        }
      } else {
        dispatch(setApiErrorModal(true))
      }
    }
    dispatch(
      searchLastNameAndAddressData({
        isBusy: false,
        failedReason,
        isFound,
      }),
    )
  }
}

// Verifies SSN and DOB and moves to next step
export const verifySSNAndDOBAction = (payload: VerifySSNAndDOB['data']) => {
  return async (dispatch: any, getState: any) => {
    const state: State = getState()
    dispatch(
      setVerifySSNAndDOBData({
        isBusy: true,
        failedReason: undefined,
        isVerified: false,
        remainingAttempts: undefined,
      }),
    )
    let isVerified = false
    let failedReason: VerifySSNErrorCode = undefined
    let remainingAttempts: number | undefined = undefined
    let isAccountLocked: boolean | undefined = undefined
    let accountLockedUntil: string | undefined = undefined
    try {
      const response = await APIClient.verifySSNAndDOB({
        ...payload,
        grantToken: state?.register?.cssAPIGrantToken,
      })
      const userDetailsResponse = await APIClient.fetchUserDetails(
        response?.data?.account?.accountUuid,
      )
      const email = userDetailsResponse?.data?.email
      const phone = userDetailsResponse?.data?.phone
      if (email) {
        dispatch(setEmail(email?.address))
        dispatch(setEmailAddressId(email?.id))
      }
      if (phone) {
        dispatch(setPhone(phone?.number))
        dispatch(setPhoneId(phone?.id))
      }
      const isRegisteredResponse = await APIClient.searchEmailStatus(
        email?.address,
      )
      if (isRegisteredResponse?.data?.emailExists) {
        if (isRegisteredResponse?.data?.isBlankPassword) {
          dispatch(setPartialLogin(true))
          dispatch(setGigyaUid(isRegisteredResponse?.data?.uid))
        } else {
          dispatch(
            setVerifySSNAndDOBData({
              isBusy: false,
              failedReason: 'ACCOUNT_REGISTERED',
              isVerified: false,
              remainingAttempts: 0,
              isAccountLocked: false,
            }),
          )
          return
        }
      }
      dispatch(setFirstName(response?.data?.account?.accountName?.givenName))
      dispatch(setLastName(response?.data?.account?.accountName?.familyName))
      dispatch(
        setCompanyName(response?.data?.account?.accountName?.companyName),
      )
      dispatch(setAccountVerifiedAddress(userDetailsResponse?.data?.address))
      dispatch(setAccountUuid(response?.data?.account?.accountUuid))
      const isPhoneVerified = Boolean(
        phone?.verified?.dateTime && phone?.verified?.channel,
      )
      const isEmailVerified = Boolean(
        email?.verified?.dateTime && email?.verified?.channel,
      )
      dispatch(setPhoneVerified(isPhoneVerified))
      dispatch(setEmailVerified(isEmailVerified))
      dispatch(
        setCssAPIAccountAccessToken(
          response?.data?.authorization?.authorizationToken,
        ),
      )
      dispatch(setAccountInformation(response?.data))
      isVerified = true
      dispatch(setStep('CONFIRM_ADDRESS'))
    } catch (error: any) {
      if (error?.response?.status === 401) {
        const errorMessage = error?.response?.data?.message
        if (errorMessage?.includes('locked')) {
          isAccountLocked = true
          accountLockedUntil = getLocalDateTime(error?.response?.data?.message)
        } else {
          remainingAttempts = getRemainingAttempts(errorMessage)
        }
        failedReason = 'ACCOUNT_NOT_FOUND'
      } else {
        dispatch(setApiErrorModal(true))
        failedReason = 'API_ERROR'
      }
      isVerified = false
    }
    dispatch(
      setVerifySSNAndDOBData({
        isBusy: false,
        failedReason,
        isVerified,
        remainingAttempts,
        isAccountLocked,
        accountLockedUntil,
      }),
    )
  }
}

// Trigger OTP via email for Primary verification
export const sendPrimaryMFAByEmailAction = (callback?: () => void) => {
  return async (dispatch: any, getState: any) => {
    const state: State = getState()
    dispatch(setIsBusySendingMFA(true))
    try {
      await APIClient.sendPrimaryMFAByEmail({
        grantToken: state.register.cssAPIGrantToken ?? '',
      })
      dispatch(setStep('VERIFY_EMAIL_OTP'))
      if (callback) {
        callback()
      }
    } catch (error) {
      dispatch(setApiErrorModal(true))
    }
    dispatch(setIsBusySendingMFA(false))
  }
}

// Trigger OTP via phone for primary verification
export const sendPrimaryMFAByPhoneAction = (callback?: () => void) => {
  return async (dispatch: any, getState: any) => {
    const state: State = getState()
    dispatch(setIsBusySendingMFA(true))
    try {
      await APIClient.sendPrimaryMFAByPhone({
        grantToken: state.register.cssAPIGrantToken ?? '',
      })
      dispatch(setStep('VERIFY_MOBILE_OTP'))
      if (callback) {
        callback()
      }
    } catch (error) {
      dispatch(setApiErrorModal(true))
    }
    dispatch(setIsBusySendingMFA(false))
  }
}

// Verifies OTP for primary verification
export const verifyPrimaryOTPAction = (
  code: number,
  type: 'EMAIL' | 'PHONE',
  nextStep: RegisterStep,
) => {
  return async (dispatch: any, getState: any) => {
    const state: State = getState()
    dispatch(
      setConfirmMFA({
        isBusy: true,
        failedReason: undefined,
        remainingAttempts: undefined,
      }),
    )
    let failedReason: MFAFailedReason | undefined = undefined
    let remainingAttempts: number | undefined = undefined
    let isAccountLocked: boolean | undefined = undefined
    let accountLockedUntil: string | undefined = undefined
    try {
      // validate and get primary user info
      const { data: userPrimaryInfo } = await APIClient.validatePrimaryMFACode({
        grantToken: state.register.cssAPIGrantToken ?? '',
        mfaCode: code,
      })

      // get secondary user info
      const { data: userSecondaryInfo } = await APIClient.fetchUserDetails(
        userPrimaryInfo?.account?.accountUuid,
      )

      // if secondary MTN is found
      if (userSecondaryInfo?.phone?.number) {
        dispatch(setPhone(userSecondaryInfo?.phone?.number))
        dispatch(setPhoneId(userSecondaryInfo?.phone?.id))
      }

      //if secondary email is found
      if (userSecondaryInfo?.email?.address) {
        dispatch(setEmail(userSecondaryInfo?.email?.address))
        dispatch(setEmailAddressId(userSecondaryInfo?.email?.id))
      }

      // mark the email or mtn verfied after validating the MFA
      if (type === 'PHONE') {
        const isEmailAlredyRegistered = await APIClient.searchEmailStatus(
          userSecondaryInfo?.email?.address,
        )

        if (isEmailAlredyRegistered?.data?.emailExists) {
          if (isEmailAlredyRegistered?.data?.isBlankPassword) {
            dispatch(setPartialLogin(true))
            dispatch(setGigyaUid(isEmailAlredyRegistered?.data?.uid))
          } else {
            dispatch(
              setConfirmMFA({
                isBusy: false,
                failedReason: 'MOBILE_ALREADY_REGISTERED',
                remainingAttempts: 0,
                isAccountLocked: false,
              }),
            )
            return
          }
        }
        const associatedPhoneId = `${userPrimaryInfo?.account?.phoneInformation?.phoneId}`
        await APIClient.markPhoneVerified({
          accountUuid: userPrimaryInfo?.account?.accountUuid,
          phoneId: associatedPhoneId,
          cssAPIAccountAccessToken:
            userPrimaryInfo?.authorization?.authorizationToken,
          payload: {
            verified: true,
          },
        })
        dispatch(setPhoneVerified(true))
        const isVerified = Boolean(
          userSecondaryInfo?.email?.verified?.dateTime &&
            userSecondaryInfo?.email?.verified?.channel,
        )
        dispatch(setEmailVerified(isVerified))
      } else {
        const associatedEmailId =
          `${userPrimaryInfo?.account?.emailInformation?.emailId}`.trim()
        setAssociatedEmailId(associatedEmailId)
        await APIClient.markEmailVerified({
          accountUuid: userPrimaryInfo?.account?.accountUuid,
          emailId: associatedEmailId,
          cssAPIAccountAccessToken:
            userPrimaryInfo?.authorization?.authorizationToken,
          payload: {
            verified: true,
          },
        })
        dispatch(setEmailVerified(true))
        const isVerified = Boolean(
          userSecondaryInfo?.phone?.verified?.dateTime &&
            userSecondaryInfo?.phone?.verified?.channel,
        )
        dispatch(setPhoneVerified(isVerified))
      }

      dispatch(setFirstName(userPrimaryInfo?.account?.accountName?.givenName))
      dispatch(setLastName(userPrimaryInfo?.account?.accountName?.familyName))
      dispatch(
        setCompanyName(userPrimaryInfo?.account?.accountName?.companyName),
      )
      dispatch(setAccountUuid(userPrimaryInfo?.account?.accountUuid))
      dispatch(
        setCssAPIAccountAccessToken(
          userPrimaryInfo?.authorization?.authorizationToken,
        ),
      )
      dispatch(setAccountVerifiedAddress(userSecondaryInfo?.address))
      dispatch(setAccountInformation(userPrimaryInfo))
      if (nextStep) {
        dispatch(registerSlice.actions.setStep(nextStep))
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        failedReason = 'INVALID_OTP'
        const errorMessage = error?.response?.data?.message
        if (errorMessage?.includes('locked')) {
          isAccountLocked = true
          accountLockedUntil = getLocalDateTime(error?.response?.data?.message)
        } else {
          remainingAttempts = getRemainingAttempts(errorMessage)
        }
      } else {
        dispatch(setApiErrorModal(true))
      }
    }
    dispatch(
      setConfirmMFA({
        isBusy: false,
        failedReason,
        remainingAttempts,
        isAccountLocked,
        accountLockedUntil,
      }),
    )
  }
}

////// ******************* //////
////// My Frontier API's Actions
////// ******************* //////

// Add mew email action
export const addNewEmailAction = (email: string) => {
  return async (dispatch: any, getState: any) => {
    dispatch(
      setUpdateOrAddNewEmailPayload({
        isBusy: true,
        failedReason: undefined,
      }),
    )
    const state: State = getState()
    let failedReason: UpdateOrAddNewEmailErrorCode = undefined
    try {
      // TODO: checking email existence in our system
      const { data }: any = await APIClient.addNewEmail({
        accountUuid: state?.register?.accountUuid ?? '',
        cssAPIAccountAccessToken:
          state?.register?.cssAPIAccountAccessToken ?? '',
        payload: {
          givenName: state?.register?.firstName,
          familyName: state?.register?.lastName,
          companyName: state?.register?.companyName,
          emailAddress: email,
        },
      })
      dispatch(setTokenForVerificationForEmail(data?.tokenForVerification))
      dispatch(setEmailAddressId(data?.emailId))
      dispatch(setEmail(email))
      dispatch(setEmailVerified(false))
      dispatch(setConfirmMFA(undefined))
      dispatch(setStep('VERIFY_EMAIL_OTP'))
    } catch (error: any) {
      if (error?.response?.status === 400 || error?.response?.status === 404) {
        failedReason = 'INVALID_EMAIL'
      } else if (error?.response?.status === 409) {
        failedReason = 'ALREADY_REGISTERED'
      } else {
        failedReason = 'API_ERROR'
        dispatch(setApiErrorModal(true))
      }
    }
    dispatch(
      setUpdateOrAddNewEmailPayload({
        isBusy: false,
        failedReason: failedReason,
      }),
    )
  }
}

// Update Email
export const updateEmailAction = (email: string) => {
  return async (dispatch: any, getState: any) => {
    const state: State = getState()
    dispatch(
      setUpdateOrAddNewEmailPayload({
        isBusy: true,
        failedReason: undefined,
      }),
    )
    let failedReason: UpdateOrAddNewEmailErrorCode = undefined
    let errorMessage = undefined
    try {
      const { data }: any = await APIClient.updateEmail({
        accountUuid: state?.register?.accountUuid ?? '',
        cssAPIAccountAccessToken:
          state?.register?.cssAPIAccountAccessToken ?? '',
        emailAddressId: state?.register?.emailAddressId ?? '',
        payload: {
          givenName: state?.register?.firstName,
          familyName: state?.register?.lastName,
          companyName: state?.register?.companyName,
          emailAddress: email,
        },
      })
      failedReason = undefined
      dispatch(setTokenForVerificationForEmail(data?.tokenForVerification))
      dispatch(setEmailAddressId(data?.emailId))
      dispatch(setEmail(email))
      dispatch(setEmailVerified(false))
      dispatch(setConfirmMFA(undefined))
      dispatch(setStep('VERIFY_EMAIL_OTP'))
    } catch (error: any) {
      if (error?.response?.status === 400 || error?.response?.status === 404) {
        failedReason = 'INVALID_EMAIL'
        errorMessage = error?.response?.data?.message
      } else if (error?.response?.status === 409) {
        failedReason = 'ALREADY_REGISTERED'
      } else {
        failedReason = 'API_ERROR'
        dispatch(setApiErrorModal(true))
      }
    }
    dispatch(
      setUpdateOrAddNewEmailPayload({
        isBusy: false,
        failedReason: failedReason,
        errorMessage,
      }),
    )
  }
}

// Add new phone number
export const addNewPhoneNumberAction = (
  phoneNumber: string,
  setApiErrorModal: any,
) => {
  return async (dispatch: any, getState: any) => {
    const state: State = getState()
    dispatch(
      setUpdateOrAddNewPhonePayload({
        isBusy: true,
        failedReason: undefined,
        data: undefined,
      }),
    )
    let failedReason: PhoneErrorCode = undefined
    let errorMessage = undefined
    try {
      const { data }: any = await APIClient.addNewPhoneNumber({
        accountUuid: state?.register?.accountUuid ?? '',
        cssAPIAccountAccessToken:
          state?.register?.cssAPIAccountAccessToken ?? '',
        payload: {
          givenName: state?.register?.firstName,
          familyName: state?.register?.lastName,
          companyName: state?.register?.companyName,
          number: phoneNumber,
        },
      })
      dispatch(setTokenForVerificationForMobile(data?.tokenForVerification))
      dispatch(setPhone(phoneNumber))
      dispatch(setPhoneVerified(false))
      dispatch(setPhoneId(data?.phoneId))
      dispatch(setConfirmMFA(undefined))
      dispatch(setStep('VERIFY_MOBILE_OTP'))
    } catch (error: any) {
      if (error?.response?.status === 400 || error?.response?.status === 404) {
        failedReason = 'INVALID_PHONE'
        errorMessage = error?.response?.data?.message
      } else if (error?.response?.status === 409) {
        errorMessage = error?.response?.data?.message
        failedReason = 'ALREADY_REGISTERED'
      } else {
        failedReason = 'API_ERROR'
        dispatch(setApiErrorModal(true))
      }
    }
    dispatch(
      setUpdateOrAddNewPhonePayload({
        isBusy: false,
        failedReason: failedReason,
        data: undefined,
        errorMessage,
      }),
    )
  }
}

// Update existing phone number
export const updatePhoneNumberAction = (
  phoneNumber: string,
  setApiErrorModal: any,
) => {
  return async (dispatch: any, getState: any) => {
    const state: State = getState()
    dispatch(
      setUpdateOrAddNewPhonePayload({
        isBusy: true,
        failedReason: undefined,
        data: undefined,
      }),
    )
    let failedReason: PhoneErrorCode = undefined
    let errorMessage = undefined
    try {
      const { data }: any = await APIClient.updatePhoneNumber({
        accountUuid: state?.register?.accountUuid ?? '',
        cssAPIAccountAccessToken:
          state?.register?.cssAPIAccountAccessToken ?? '',
        phoneId: state?.register?.phoneId ?? '',
        payload: {
          givenName: state?.register?.firstName,
          familyName: state?.register?.lastName,
          companyName: state?.register?.companyName,
          number: phoneNumber,
        },
      })
      dispatch(setTokenForVerificationForMobile(data?.tokenForVerification))
      dispatch(setPhoneId(data?.phoneId))
      dispatch(setPhoneVerified(false))
      dispatch(setPhone(phoneNumber))
      dispatch(setConfirmMFA(undefined))
      dispatch(setStep('VERIFY_MOBILE_OTP'))
    } catch (error: any) {
      if (error?.response?.status === 400 || error?.response?.status === 404) {
        failedReason = 'INVALID_PHONE'
        errorMessage = error?.response?.data?.message
      } else if (error?.response?.status === 409) {
        errorMessage = error?.response?.data?.message
        failedReason = 'ALREADY_REGISTERED'
      } else {
        failedReason = 'API_ERROR'
        dispatch(setApiErrorModal(true))
      }
    }
    dispatch(
      setUpdateOrAddNewPhonePayload({
        isBusy: false,
        failedReason: failedReason,
        data: undefined,
        errorMessage,
      }),
    )
  }
}

// Trigger OTP via email for secondary verification
export const sendSecondaryMFAByEmailAction = (callback?: () => void) => {
  return async (dispatch: any, getState: any) => {
    const state: State = getState()
    dispatch(setIsBusySendingMFA(true))
    try {
      const response = await APIClient.sendSecondaryMFAByEmail({
        accountUuid: state?.register?.accountUuid ?? '',
        emailAddressId: state?.register?.emailAddressId ?? '',
        cssAPIAccountAccessToken:
          state?.register?.cssAPIAccountAccessToken ?? '',
        payload: {
          familyName: state?.register?.lastName,
          givenName: state?.register?.firstName,
          companyName: state?.register?.companyName,
        },
      })
      dispatch(
        setTokenForVerificationForEmail(response?.data?.tokenForVerification),
      )
      dispatch(setStep('VERIFY_EMAIL_OTP'))
      if (callback) {
        callback()
      }
    } catch (error) {
      dispatch(setApiErrorModal(true))
    }
    dispatch(setIsBusySendingMFA(false))
  }
}

// Trigger OTP via phone for secondary verification
export const sendSecondaryMFAByPhoneAction = (callback?: () => void) => {
  return async (dispatch: any, getState: any) => {
    const state: State = getState()
    dispatch(setIsBusySendingMFA(true))
    try {
      const response = await APIClient.sendSecondaryMFAByPhone({
        accountUuid: state?.register?.accountUuid ?? '',
        phoneId: state?.register?.phoneId ?? '',
        cssAPIAccountAccessToken:
          state?.register?.cssAPIAccountAccessToken ?? '',
        payload: {
          familyName: state?.register?.lastName,
          givenName: state?.register?.firstName,
          companyName: state?.register?.companyName,
        },
      })
      dispatch(
        setTokenForVerificationForMobile(response?.data?.tokenForVerification),
      )
      dispatch(setStep('VERIFY_MOBILE_OTP'))
      if (callback) {
        callback()
      }
    } catch (error) {
      dispatch(setApiErrorModal(true))
    }
    dispatch(setIsBusySendingMFA(false))
  }
}

// Verifies OTP for secondary verification
export const validateSecondaryMFACodeAction = (
  code: string,
  type: 'EMAIL' | 'PHONE',
  nextStep: RegisterStep,
) => {
  return async (dispatch: any, getState: any) => {
    const state: State = getState()
    dispatch(
      setConfirmMFA({
        isBusy: true,
        failedReason: undefined,
        remainingAttempts: undefined,
        isAccountLocked: false,
        hasReachedMaxEmailAttempts: undefined,
        emailFailedReason: undefined,
      }),
    )
    let failedReason: MFAFailedReason | undefined = undefined
    let remainingAttempts: number | undefined = undefined
    let isAccountLocked: boolean | undefined = undefined
    let accountLockedUntil: string | undefined = undefined
    let hasReachedMaxEmailAttempts: boolean | undefined = undefined
    let emailFailedReason: MFAFailedReason | undefined = undefined
    let payload: ValidateSecondaryMFAPayload
    if (type === 'EMAIL') {
      payload = {
        accountUuid: state?.register?.accountUuid || '',
        cssAPIAccountAccessToken:
          state?.register?.cssAPIAccountAccessToken || '',
        emailAddressId: state?.register?.emailAddressId || '',
        payload: {
          tokenForVerification:
            state?.register?.tokenForVerificationForEmail || '',
          verificationPin: code,
        },
      }
    } else {
      payload = {
        accountUuid: state?.register?.accountUuid || '',
        cssAPIAccountAccessToken:
          state?.register?.cssAPIAccountAccessToken || '',
        phoneId: state?.register?.phoneId || '',
        payload: {
          tokenForVerification:
            state?.register?.tokenForVerificationForMobile || '',
          verificationPin: code,
        },
      }
    }
    try {
      await APIClient.validateSecondaryMFACode(payload)
      if (type === 'EMAIL') {
        dispatch(setEmailVerified(true))
      } else {
        dispatch(setPhoneVerified(true))
      }
      if (nextStep) {
        dispatch(setStep(nextStep))
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        failedReason = 'INVALID_OTP'
        if (type === 'EMAIL') {
          emailFailedReason = 'INVALID_OTP'
        }
        const errorMessage = error?.response?.data?.message
        if (errorMessage?.includes('locked')) {
          isAccountLocked = true
          accountLockedUntil = getLocalDateTime(error?.response?.data?.message)
          if (type === 'EMAIL') {
            hasReachedMaxEmailAttempts = true
          }
        } else {
          remainingAttempts = parseInt(error?.response?.data?.remainingAttempts)
        }
      } else {
        dispatch(setApiErrorModal(true))
      }
    }
    dispatch(
      setConfirmMFA({
        isBusy: false,
        failedReason,
        remainingAttempts,
        isAccountLocked,
        hasReachedMaxEmailAttempts,
        emailFailedReason,
        accountLockedUntil,
      }),
    )
  }
}

// Create password and link accounts
export const createPasswordAction = (password: string) => {
  return async (dispatch: any, getState: any) => {
    const state: State = getState()
    dispatch(
      setCreatePasswordData({
        isBusy: true,
        failedReason: undefined,
        isCreated: false,
      }),
    )
    // Creating password
    let failedReason: CreatePasswordErrorCode = undefined
    let isCreated = false
    try {
      // TODO: update fields
      const accountAccessToken = state.register?.cssAPIAccountAccessToken ?? ''
      if (state.register?.isPartialLogin) {
        const body: any = {
          uid: state.register?.gigyaUid ?? '',
          emailId: state.register?.email ?? '',
          password,
          accountAccessToken,
        }
        await APIClient.updatePassword(body)
      } else {
        await APIClient.createPassword({
          username: state.register?.email ?? '',
          password,
        })
      }

      await APIClient.linkAccount({
        username: state.register?.email ?? '',
        password,
        accountAccessToken,
        partialLogin: state.register?.isPartialLogin,
      })

      failedReason = undefined
      isCreated = true
      dispatch(setPassword(password))
      dispatch(setStep('REGISTER_SUCCESS'))
    } catch (error) {
      failedReason = 'API_ERROR'
      isCreated = true
      dispatch(setApiErrorModal(true))
    }
    dispatch(
      setCreatePasswordData({
        isBusy: false,
        failedReason,
        isCreated,
      }),
    )
  }
}

export const loginUserPostRegistration = (
  loginId: string,
  password: string,
  recaptcha: string,
  loginType: string,
) => {
  return async (dispatch: any) => {
    try {
      await login(
        {
          loginId: loginId || '',
          password: password || '',
          rememberMe: false,
          token: recaptcha,
        },
        undefined,
        loginType,
      )
    } catch (error) {
      dispatch(setApiErrorModal(true))
    }
  }
}

////// ******************* //////
////// Helper Methods
////// ******************* //////

const getRemainingAttempts = (message: string): number | undefined => {
  if (!message) {
    return undefined
  }
  const splitString = message?.split('.')
  for (const str of splitString) {
    if (str?.includes('Failed attempts:')) {
      const attempts = str?.split(': ')?.[1]
      if (attempts) {
        const leftOutAttempts = MAX_OTP_ATTEMPTS_LIMITS - parseInt(attempts)
        if (leftOutAttempts > 0) {
          return leftOutAttempts
        }
      }
      return undefined
    }
  }
}

const getLocalDateTime = (message: string) => {
  const utcDateTime = message.match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2} UTC/)?.[0]
  const date = new Date(utcDateTime ?? '')
  const localDateTime = date.toLocaleString()
  return localDateTime
}
