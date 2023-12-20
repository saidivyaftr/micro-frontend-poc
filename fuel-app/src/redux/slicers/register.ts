/* eslint-disable @typescript-eslint/indent */
import { createSlice } from '@reduxjs/toolkit'
import {
  Register,
  RegisterStep,
  SearchIpaddress,
  SearchEmailOrMobile,
  SearchLastNameAndAddress,
  VerifySSNAndDOB,
  CreatePassword,
  FlowType,
  ConfirmMFA,
} from '../types/registerTypes'
import { scrollToTop } from 'src/utils/register'
import { State } from '../types'

export const initialState: Register = {
  //step: 'REGISTER_WITH_EMAIL_OR_MOBILE',
  step: 'SEARCH_BY_IPADDRESS',
  flowType: 'WIFI',
  hasApiFailed: false,

  accountUuid: undefined,
  cssAPIGrantToken: undefined,
  cssAPIAccountAccessToken: undefined,
  authorizationMethods: [],
  tokenForVerificationForEmail: undefined,
  tokenForVerificationForMobile: undefined,

  firstName: '',
  lastName: '',
  companyName: '',
  accountInformation: undefined,
  accountVerifiedAddress: undefined,
  email: undefined,
  phone: undefined,
  emailAddressId: undefined,
  phoneId: undefined,
  isEmailVerified: false,
  isPhoneVerified: false,
  isPartialLogin: false,
  gigyaUid: undefined,
  associatedEmailId: undefined,

  searchIpaddress: undefined,
  searchEmailOrMobile: undefined,
  searchLastNameAndAddress: undefined,
  verifySSNAndDOB: undefined,
  isBusySendingMFA: false,
  confirmMFA: undefined,
  updateEmail: undefined,
  updatePhone: undefined,
  isAddressVerified: false,
  isIPAddressVerified: false,
  createPassword: undefined,
  password: undefined,
  completeRegistration: undefined,
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setStep: (state, action: { payload: RegisterStep }) => {
      scrollToTop()
      return {
        ...state,
        hasApiFailed: false,
        step: action.payload,
        flowType: getInitialFlowType(action.payload, state.flowType),
      }
    },
    setFlowType: (state, action: { payload: FlowType }) => ({
      ...state,
      flowType: action.payload,
    }),
    setApiErrorModal: (state, action) => ({
      ...state,
      hasApiFailed: action.payload,
    }),
    setAccountUuid: (state, action) => ({
      ...state,
      accountUuid: action.payload,
    }),
    setTokenForVerificationForMobile: (state, action) => ({
      ...state,
      tokenForVerificationForMobile: action.payload,
    }),
    setCssAPIGrantToken: (state, action) => ({
      ...state,
      cssAPIGrantToken: action.payload,
    }),
    setCssAPIAccountAccessToken: (state, action) => ({
      ...state,
      cssAPIAccountAccessToken: action.payload,
    }),
    setAuthorizationMethods: (state, action) => ({
      ...state,
      authorizationMethods: action.payload,
    }),
    setFirstName: (state, action) => ({
      ...state,
      firstName: action.payload,
    }),
    setLastName: (state, action) => ({
      ...state,
      lastName: action.payload,
    }),
    setCompanyName: (state, action) => ({
      ...state,
      companyName: action.payload,
    }),
    setAccountInformation: (state, action) => ({
      ...state,
      accountInformation: action.payload,
    }),
    setTokenForVerificationForEmail: (state, action) => ({
      ...state,
      tokenForVerificationForEmail: action.payload,
    }),
    setAccountVerifiedAddress: (state, action) => ({
      ...state,
      accountVerifiedAddress: action.payload,
    }),
    setEmail: (state, action) => ({
      ...state,
      email: action.payload,
    }),
    setPhone: (state, action) => ({
      ...state,
      phone: action.payload,
    }),
    setEmailAddressId: (state, action) => ({
      ...state,
      emailAddressId: action.payload,
    }),
    setAssociatedEmailId: (state, action) => ({
      ...state,
      associatedEmailId: action.payload,
    }),
    setPhoneId: (state, action) => ({
      ...state,
      phoneId: action.payload,
    }),
    setEmailVerified: (state, action) => ({
      ...state,
      isEmailVerified: action.payload,
    }),
    setPhoneVerified: (state, action) => ({
      ...state,
      isPhoneVerified: action.payload,
    }),
    setPartialLogin: (state, action) => ({
      ...state,
      isPartialLogin: action.payload,
    }),
    setGigyaUid: (state, action) => ({
      ...state,
      gigyaUid: action.payload,
    }),
    searchIpAddressData: (state, action: { payload: SearchIpaddress }) => ({
      ...state,
      searchIpaddress: action.payload,
    }),
    searchEmailOrMobileData: (
      state,
      action: { payload: SearchEmailOrMobile },
    ) => ({
      ...state,
      searchEmailOrMobile: action.payload,
    }),
    searchLastNameAndAddressData: (
      state,
      action: { payload: SearchLastNameAndAddress },
    ) => ({
      ...state,
      searchLastNameAndAddress: action.payload,
    }),
    setVerifySSNAndDOBData: (state, action: { payload: VerifySSNAndDOB }) => ({
      ...state,
      verifySSNAndDOB: action.payload,
    }),
    setIsBusySendingMFA: (state, action: { payload: boolean }) => ({
      ...state,
      isBusySendingMFA: action.payload,
    }),
    setConfirmMFA: (state, action: { payload: ConfirmMFA | undefined }) => ({
      ...state,
      confirmMFA: action.payload,
    }),
    setUpdateOrAddNewEmailPayload: (state, action) => ({
      ...state,
      updateEmail: action.payload,
    }),
    setUpdateOrAddNewPhonePayload: (state, action) => ({
      ...state,
      updatePhone: action.payload,
    }),
    setIPAddressVerified: (state, action) => ({
      ...state,
      isIPAddressVerified: action.payload,
    }),
    setAddressVerified: (state, action) => ({
      ...state,
      isAddressVerified: action.payload,
    }),
    setCreatePasswordData: (state, action: { payload: CreatePassword }) => ({
      ...state,
      createPassword: action.payload,
    }),
    setPassword: (state, action) => ({
      ...state,
      password: action?.payload,
    }),
    resetRegistrationFlow: (_, action: { payload: Register | undefined }) => ({
      ...initialState,
      ...(action.payload || {}),
    }),
    setCompleteRegistration: (state, action) => ({
      ...state,
      completeRegistration: action.payload,
    }),
  },
})

const getInitialFlowType = (
  step: RegisterStep,
  prevFlowType: FlowType,
): FlowType => {
  if (step === 'REGISTER_WITH_NAME_AND_ADDRESS') {
    return 'LAST_NAME_AND_ADDRESS'
  }
  if (step === 'REGISTER_WITH_EMAIL_OR_MOBILE') {
    return 'EMAIL'
  }
  return prevFlowType
}

export const getPhoneNumber = (state: State) => state.register.phone
