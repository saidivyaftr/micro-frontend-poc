/* eslint-disable @typescript-eslint/indent */
import { useState, useEffect } from 'react'
//import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import APIClient from 'src/api-client'
import { useWindowDimensions } from 'src/hooks'
import { State } from 'src/redux/types'
import { Typography, Loading } from '@/shared-ui/components'
import { Logo, LeftArrowIcon } from '@/shared-ui/react-icons'
import { AppRoutes, COMPONENT_WRAPPER } from 'src/constants/'
import customStaticProps from 'src/utils/appData'
import SessionTimeout from 'src/libs/services/shared/SessionTimeout'
import MainLayout from 'src/layouts/MainLayout'
import colors from 'src/styles/theme/colors'
import FrontierAppBanner from 'src/libs/register/components/FrontierAppBanner'
import {
  getPageNameForAnalytics,
  stateConstant,
  prop10Constant,
} from 'src/constants/contact'
import ContactVerificationWelcome from 'src/libs/contact-verification/ContactVerificationWelcome'
import ContactVerificationEmailWelcome from 'src/libs/contact-verification/ContactVerificationEmailWelcome'
import VerifyNow from 'src/libs/contact-verification/VerifyNow'
import AddNewMtn from 'src/libs/contact-verification/addNewMtn'
import AddNewEmail from 'src/libs/contact-verification/AddNewEmail'
import EnterSecurityCode from '../../libs/contact-verification/EnterSecurityCode'
import YouAllSetPage from 'src/libs/contact-verification/YouAreAllSet'
import SystemError from 'src/libs/services/shared/ErrorModal'
import ApiErrorModal from 'src/libs/services/shared/ApiErrorModal'
import { setApiErrorCode } from 'src/redux/slicers/apiErrors'
import { handlePageViewAnalytics } from 'src/libs/contact-verification/AnalyticUtilsMTN'
import UnableToVerify from 'src/libs/contact-verification/UnableToVerify'
import EmailRemainderPage from 'src/libs/contact-verification/EmailRemainderPage'
import EnterEmailSecurityCode from 'src/libs/contact-verification/EnterEmailSecurityCode'
import { useAppData } from 'src/hooks'
import { formatUrl } from 'src/utils/urlHelpers'

interface PageProps {
  data: any
  success: boolean
}

type phoneData = {
  id?: string
  isPrimary?: boolean
  number?: string
  type?: string
}

function ContactVerification(props: PageProps): JSX.Element {
  const unableToVerify = useAppData('unableToVerify', true) || {}
  const dispatch = useDispatch()
  const { accountInfoOnLoad } =
    useSelector((state: State) => state?.account) || {}
  //const router = useRouter()
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const isMobile = width <= 812
  const [showBackBtn, setShowBackBtn] = useState<boolean>(false)
  const [currentState, setCurrentState] = useState<string>('')
  const [backState, setBackState] = useState<string[]>([])
  const [incorrectAttemptsCount, setIncorrectAttemptsCount] = useState<number>()
  const [showAppBanner, setShowAppBanner] = useState<boolean>(false)
  //const [primaryPhoneId, setPhoneId] = useState<string>('')
  const [primaryPhoneData, setPrimaryPhoneData] = useState<phoneData>()
  const [mobileNumberError, setMobileNumberError] = useState<string>('')
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [showLoading, setShowLoading] = useState<boolean>(true)
  const [tokenForVerification, setTokenForVerification] = useState<string>('') //TODO - Remove this static token once API working fine
  const [currentStatus, setCurrentStatus] = useState<string>('')

  const [emailIdError, setEmailIdError] = useState<string>('')
  const [verifyEmailAddress, setVerifyEmailAddress] = useState<string>('')
  const [primaryEmail, setPrimaryEmail] = useState<any>('')

  const hasDTMLLoaded = useSelector(
    (state: any) => state?.appConfig?.configs?.['DTM'],
  )
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)

  const deeplinkRedirect = (url: string | '') => {
    const redirectTo = redirectUrl || url
    window.location.href = formatUrl(redirectTo)
  }

  useEffect(() => {
    setRedirectUrl(localStorage.getItem('redirectTo'))
  }, [])

  useEffect(() => {
    if (
      redirectUrl &&
      (currentState === stateConstant?.YOU_ALL_SET_PAGE ||
        currentState === stateConstant?.YOU_ALL_SET_EMAIL_PAGE)
    ) {
      setShowLoading(true)
      deeplinkRedirect('')
    }
  }, [currentState, redirectUrl])

  useEffect(() => {
    if (hasDTMLLoaded && currentState !== undefined && currentState !== '') {
      handlePageViewAnalytics(
        getPageNameForAnalytics(currentState),
        prop10Constant[currentStatus as keyof typeof prop10Constant],
      )
    }
  }, [hasDTMLLoaded, currentState])

  useEffect(() => {
    if (
      accountInfoOnLoad?.data?.accountHolderFirstName &&
      accountInfoOnLoad?.data?.accountHolderLastName
    ) {
      getAccountDetails()
    } else if (
      accountInfoOnLoad?.data?.uuid &&
      (!accountInfoOnLoad?.data?.accountHolderFirstName ||
        !accountInfoOnLoad?.data?.accountHolderLastName)
    ) {
      window.location.href = formatUrl(AppRoutes.AccountDashboard)
    }
  }, [
    accountInfoOnLoad,
    accountInfoOnLoad?.data,
    accountInfoOnLoad?.data?.uuid,
  ])

  const skipVerification = async (
    url: string,
    uuid: string,
    phoneId?: string,
    emailId?: string,
  ) => {
    try {
      if (phoneId && uuid) {
        await APIClient.skipPhone({ uuid, phoneId })
      } else if (emailId && uuid) {
        await APIClient.skipEmail({ uuid, emailId })
      }

      deeplinkRedirect(url)
    } catch (error: any) {
      dispatch(
        setApiErrorCode({
          module: 'contactVerification',
          errorCode: error?.data?.status,
        }),
      )
    }
  }

  const getAccountDetails = async () => {
    //get all phoneNumbers on account
    try {
      const { data }: any = await APIClient.getAccountPhones({
        uuid: accountInfoOnLoad?.data?.uuid,
      })

      const { data: verification }: any = await APIClient.getVerificationStatus(
        {
          uuid: accountInfoOnLoad?.data?.uuid,
        },
      )
      const verificationStatus = verification.status
      setPrimaryEmail(verification?.primaryEmail)
      setCurrentStatus(verificationStatus)

      // Verification completed OR No verification Required flow
      if (
        verificationStatus === 'NO_VERIFICATION_REQUIRED' ||
        verificationStatus === 'PRIMARY_LOGIN_EMAIL_VERIFIED'
      ) {
        window.location.href = formatUrl(AppRoutes.AccountDashboard)
      } else {
        // MTN Verfication Starting Here
        if (
          verificationStatus === 'NO_PRIMARY_MTN' ||
          verificationStatus === 'VERIFY_PRIMARY_MTN'
        ) {
          // Checking  Primary Phone
          const primaryPhone = data.accountPhones.find(function (
            item: phoneData,
          ) {
            return item.isPrimary === true
          })

          if (!primaryPhone) {
            setShowLoading(false)
            setCurrentState(stateConstant?.SHOW_WELCOME_PAGE)
          } else {
            const isPhoneVerified = Boolean(
              primaryPhone?.verified?.dateTime &&
                primaryPhone?.verified?.channel,
            )
            setShowLoading(false)
            setPrimaryPhoneData(primaryPhone)
            if (isPhoneVerified) {
              // window.location.href = formatUrl(AppRoutes.AccountDashboard)
            } else {
              setBackState([...backState, currentState])
              setCurrentState(stateConstant?.SHOW_WELCOME_PAGE_WITH_PHONE)
            }
            // console.log(primaryPhoneData)
          }
        }
        if (
          verificationStatus === 'VERIFY_PRIMARY_LOGIN_EMAIL' ||
          verificationStatus === 'VERIFY_PRIMARY_UNIQUE_EMAIL' ||
          verificationStatus === 'NO_PRIMARY_EMAIL'
        ) {
          setShowLoading(false)
          setBackState([...backState, currentState])
          setCurrentState(stateConstant?.SHOW_EMAIL_WELCOME_PAGE)
        }
      }
    } catch (error: any) {
      dispatch(
        setApiErrorCode({
          module: 'contactVerification',
          errorCode: error?.data?.status,
        }),
      )
    }
  }
  const backClickHandler = () => {
    const back = backState.pop() || ''
    setCurrentState(back)
  }
  // const test = async () => {
  //   await APIClient.getVerificationStatus({
  //     uuid: accountInfoOnLoad.data.uuid,
  //   })
  //   Complete verification with OTP and tokenForVerification
  //   await APIClient.completeVerification({
  //     uuid: accountInfoOnLoad.data.uuid,
  //     tokenForVerification: 'd71e2f83-6304-4c47-847d-92505fdb0af8',
  //     verificationPin: '695332',
  //   })
  //   add new phoneNumber
  //   await APIClient.addPhoneNumber({
  //     uuid: accountInfoOnLoad.data.uuid,
  //     phoneNumber: '0000000005',
  //     givenName: accountInfoOnLoad.data.accountHolderFirstName,
  //     familyName: accountInfoOnLoad.data.accountHolderLastName,
  //     isPrimary: false,
  //   })
  //   update and replace phoneNumber with new number
  //   await APIClient.updatePhoneNumber({
  //     uuid: accountInfoOnLoad.data.uuid,
  //     phoneId: '{phoneId}',
  //     phoneNumber: '{phoneNumber}',
  //     givenName: accountInfoOnLoad.data.accountHolderFirstName,
  //     familyName: accountInfoOnLoad.data.accountHolderLastName,
  //     isPrimary: true,
  //   })
  //   delete phoneNumber
  //   await APIClient.deletePhoneNumber({
  //     uuid: accountInfoOnLoad.data.uuid,
  //     phoneId: '{phoneId}',
  //   })
  //   Send OTP to phoneNumber via phoneId
  //   await APIClient.verifyPhoneNumber({
  //     uuid: accountInfoOnLoad.data.uuid,
  //     phoneId: primaryPhoneId,
  //   })
  //   add new email
  //   await APIClient.addEmail({
  //     uuid: accountInfoOnLoad.data.uuid,
  //     emailAddress: '{emailId}',
  //     givenName: accountInfoOnLoad.data.accountHolderFirstName,
  //     familyName: accountInfoOnLoad.data.accountHolderLastName,
  //     isPrimary: true,
  //   })
  //   update and replace email with new email
  //   await APIClient.updateEmail({
  //     uuid: accountInfoOnLoad.data.uuid,
  //     emailId: '{emailId}',
  //     emailAddress: '{emailAddress',
  //     givenName: accountInfoOnLoad.data.accountHolderFirstName,
  //     familyName: accountInfoOnLoad.data.accountHolderLastName,
  //     isPrimary: true,
  //   })
  //   await APIClient.deleteEmail({
  //     uuid: accountInfoOnLoad.data.uuid,
  //     emailId: '{emailId}',
  //   })
  //   Send OTP to email via emailId
  //   await APIClient.verifyEmail({
  //     uuid: accountInfoOnLoad.data.uuid,
  //     emailId: primaryEmailId,
  //   })
  // }

  const getMobileNumber = (mobileNumber: string) => {
    // If Number not there or No Primary Number
    // Showing Add Number Screen - Call Add API
    // If Number there with Primary true
    // Show With Number Screen with pencil Icon
    // If Number is there and user added same number
    // Call Direct OTP API call and Show Security Code Screen  - Call Verification API
    // If Number is there + primary but not verified
    // Call Direct OTP API call and Show Security Code Screen  - Call Verification API
    // If user update new number to primary
    // Call Update API - then show Security code
    setShowLoading(true)
    if (primaryPhoneData) {
      if (primaryPhoneData?.number === mobileNumber) {
        // Direct OTP Call
        getDirectOTP()
      } else if (primaryPhoneData?.number !== mobileNumber) {
        // Udate API Call
        addUpdatePhone(mobileNumber, 'UPDATE')
      }
    } else {
      // Add API Call
      addUpdatePhone(mobileNumber, 'ADD')
    }
    setShowLoading(false)
  }

  const addUpdatePhone = async (mobileNumber: string, action: string) => {
    try {
      let response: any
      if (action === 'UPDATE') {
        response = await APIClient.updatePhoneNumberAuthorized({
          uuid: accountInfoOnLoad?.data?.uuid,
          phoneNumber: mobileNumber,
          givenName: accountInfoOnLoad?.data?.accountHolderFirstName,
          familyName: accountInfoOnLoad?.data?.accountHolderLastName,
          isPrimary: true,
          phoneId: primaryPhoneData?.id,
        })
      } else if (action === 'ADD') {
        response = await APIClient.addPhoneNumberAuthorized({
          uuid: accountInfoOnLoad?.data?.uuid,
          phoneNumber: mobileNumber,
          givenName: accountInfoOnLoad?.data?.accountHolderFirstName,
          familyName: accountInfoOnLoad?.data?.accountHolderLastName,
          isPrimary: true,
        })
      }
      setMobileNumber(mobileNumber)
      setTokenForVerification(response?.data?.tokenForVerification)
      setBackState([...backState, currentState])
      setCurrentState(stateConstant?.SHOW_SECURITY_CODE)
      const updatedPrimaryData = {
        id: response?.data?.phoneId,
        isPrimary: true,
        number: mobileNumber,
        type: 'Mobile',
      }
      setPrimaryPhoneData(updatedPrimaryData)
    } catch (error: any) {
      setMobileNumberError(error?.response?.data?.errors?.data?.detail)
      dispatch(
        setApiErrorCode({
          module: 'contactVerification',
          errorCode: error?.data?.status,
        }),
      )
    }
  }

  const getDirectOTP = async () => {
    // Send OTP to phoneNumber via phoneId
    try {
      const response: any = await APIClient.verifyPhoneNumberAuthorized({
        uuid: accountInfoOnLoad?.data?.uuid,
        phoneId: primaryPhoneData?.id,
      })
      setTokenForVerification(response?.data?.response?.tokenForVerification)
      setBackState([...backState, currentState])
      setCurrentState(stateConstant?.SHOW_SECURITY_CODE)
    } catch (error: any) {
      dispatch(
        setApiErrorCode({
          module: 'contactVerification',
          errorCode: error?.data?.status,
        }),
      )
    }
  }

  const statusUpdate = async () => {
    try {
      const { data: verification }: any = await APIClient.getVerificationStatus(
        {
          uuid: accountInfoOnLoad?.data?.uuid,
        },
      )
      const verificationStatus = verification.status
      setPrimaryEmail(verification?.primaryEmail)
      setCurrentStatus(verificationStatus)
    } catch (error: any) {
      dispatch(
        setApiErrorCode({
          module: 'contactVerification',
          errorCode: error?.data?.status,
        }),
      )
    }
  }

  // ~~~~~~~~~~ Email Flow Start ~~~~~~~~~~~~~~~~~~ //

  const getEmailOTP = (email: string) => {
    setShowLoading(true)
    setVerifyEmailAddress(email)
    const action = primaryEmail?.email ? 'UPDATE' : 'ADD'

    // IF : Same Email Address already registered to send OTP
    // ELSE : Different Email- UPDATE, No PRIMARY Email - ADD
    if (primaryEmail?.email === email) {
      resendOtp()
    } else {
      addEmailAddress(email, action)
    }
    setShowLoading(false)
  }

  const addEmailAddress = async (email: string, action: string) => {
    try {
      let response: any

      if (action === 'ADD') {
        response = await APIClient.addEmailAuthorized({
          uuid: accountInfoOnLoad?.data?.uuid,
          emailAddress: email,
          givenName: accountInfoOnLoad?.data?.accountHolderFirstName,
          familyName: accountInfoOnLoad?.data?.accountHolderLastName,
          isPrimary: true,
        })
      }
      if (action === 'UPDATE') {
        response = await APIClient.updateEmailAuthorized({
          uuid: accountInfoOnLoad?.data?.uuid,
          emailAddress: email,
          emailId: primaryEmail?.id,
          givenName: accountInfoOnLoad?.data?.accountHolderFirstName,
          familyName: accountInfoOnLoad?.data?.accountHolderLastName,
          isPrimary: true,
        })
      }
      // Update the Status
      statusUpdate()
      setTokenForVerification(response?.data?.tokenForVerification)
      setBackState([...backState, currentState])
      setCurrentState(stateConstant?.SHOW_EMAIL_SECURITY_CODE)
    } catch (error: any) {
      if (error?.response?.data?.httpStatusCode === 409) {
        setEmailIdError(error?.response?.data?.message)
      } else {
        setEmailIdError(error?.response?.data?.errors?.data?.detail)

        dispatch(
          setApiErrorCode({
            module: 'contactVerification',
            errorCode: error?.data?.status,
          }),
        )
      }
    }
  }
  const resendOtp = async () => {
    // Send OTP to phoneNumber via phoneId
    try {
      getEmailDirectOTP(verifyEmailAddress)
    } catch (error: any) {
      dispatch(
        setApiErrorCode({
          module: 'contactVerification',
          errorCode: error?.data?.status,
        }),
      )
    }
  }
  const getEmailDirectOTP = async (email: string) => {
    try {
      if (primaryEmail?.id) {
        const response: any = await APIClient.verifyEmail({
          uuid: accountInfoOnLoad?.data?.uuid,
          emailId: primaryEmail?.id,
        })

        setTokenForVerification(response?.data?.response?.tokenForVerification)
        setBackState([...backState, currentState])
        setCurrentState(stateConstant?.SHOW_EMAIL_SECURITY_CODE)
      } else {
        addEmailAddress(email, 'ADD')
      }
    } catch (error: any) {
      dispatch(
        setApiErrorCode({
          module: 'contactVerification',
          errorCode: error?.data?.status,
        }),
      )
    }
  }

  return (
    <SessionTimeout>
      <MainLayout {...props} miniFooter>
        <SystemError />
        <ApiErrorModal showCloseBtn={true} />

        {incorrectAttemptsCount === 0 && (
          <UnableToVerify unableToVerify={unableToVerify} />
        )}
        <div className={classes.wrapper}>
          <div className={classes.innerWrapper}>
            {!isMobile && (
              <div className={classes.redLogo}>
                <Logo
                  fill={colors?.main?.brightRed}
                  width="64px"
                  height="64px"
                />
              </div>
            )}
            {showBackBtn && (
              <div className={classes.backButton}>
                <a
                  href="javascript:void(0)"
                  className={classes.backButtonLink}
                  onClick={backClickHandler}
                >
                  <LeftArrowIcon /> <Typography tagType="span">Back</Typography>
                </a>
              </div>
            )}
            {showLoading ? (
              <Loading className={classes.loaderArea} />
            ) : (
              <div className={classes.container}>
                {currentState === stateConstant?.SHOW_WELCOME_PAGE && (
                  <ContactVerificationWelcome
                    setShowBackBtn={setShowBackBtn}
                    setShowAppBanner={setShowAppBanner}
                    onSubmitState={() => {
                      setBackState([...backState, currentState])
                      setCurrentState(stateConstant?.ADD_NEW_MTN)
                    }}
                    phoneId={primaryPhoneData?.id}
                    skipVerification={skipVerification}
                  />
                )}
                {currentState ===
                  stateConstant?.SHOW_WELCOME_PAGE_WITH_PHONE && (
                  <VerifyNow
                    setShowBackBtn={setShowBackBtn}
                    setShowAppBanner={setShowAppBanner}
                    getMobileNumber={getMobileNumber}
                    mobileNumber={primaryPhoneData?.number}
                    onEditicon={() => {
                      setBackState([...backState, currentState])
                      setCurrentState(stateConstant?.ADD_NEW_MTN)
                    }}
                    phoneId={primaryPhoneData?.id}
                    skipVerification={skipVerification}
                  />
                )}
                {currentState === stateConstant?.ADD_NEW_MTN && (
                  <AddNewMtn
                    setShowBackBtn={setShowBackBtn}
                    setShowAppBanner={setShowAppBanner}
                    getMobileNumber={getMobileNumber}
                    mobileNumberError={mobileNumberError}
                  />
                )}
                {currentState === stateConstant?.SHOW_SECURITY_CODE && (
                  <EnterSecurityCode
                    setShowBackBtn={setShowBackBtn}
                    setShowAppBanner={setShowAppBanner}
                    onSubmitState={() => {
                      setBackState([...backState, currentState])
                      setCurrentState(stateConstant?.YOU_ALL_SET_PAGE)
                      //setCurrentState(stateConstant?.SHOW_EMAIL_WELCOME_PAGE)
                    }}
                    mobileNumber={
                      mobileNumber ? mobileNumber : primaryPhoneData?.number
                    }
                    accountInfoOnLoad={accountInfoOnLoad}
                    tokenForVerification={tokenForVerification}
                    getDirectOTP={getDirectOTP}
                    incorrectAttemptsCount={incorrectAttemptsCount}
                    setIncorrectAttemptsCount={setIncorrectAttemptsCount}
                  />
                )}

                {(currentState === stateConstant?.YOU_ALL_SET_PAGE ||
                  currentState === stateConstant?.YOU_ALL_SET_EMAIL_PAGE) &&
                  !redirectUrl && (
                    <YouAllSetPage
                      setShowBackBtn={setShowBackBtn}
                      currentState={currentState}
                    />
                  )}

                {/*Web Email Components Start*/}
                {currentState === stateConstant?.SHOW_EMAIL_WELCOME_PAGE && (
                  <ContactVerificationEmailWelcome
                    setShowBackBtn={setShowBackBtn}
                    setShowAppBanner={setShowAppBanner}
                    getEmailOTP={getEmailOTP}
                    currentStatus={currentStatus}
                    setCurrentState={setCurrentState}
                    backState={backState}
                    setBackState={setBackState}
                    currentState={currentState}
                    setVerifyEmailAddress={setVerifyEmailAddress}
                    primaryEmail={primaryEmail}
                    skipVerification={skipVerification}
                  />
                )}

                {currentState === stateConstant?.EMAIL_REMAINDER_PAGE && (
                  <EmailRemainderPage
                    setShowBackBtn={setShowBackBtn}
                    setShowAppBanner={setShowAppBanner}
                    currentStatus={currentStatus}
                    setCurrentState={setCurrentState}
                    backState={backState}
                    setBackState={setBackState}
                    currentState={currentState}
                    getEmailOTP={getEmailOTP}
                    setVerifyEmailAddress={setVerifyEmailAddress}
                    primaryEmail={primaryEmail}
                  />
                )}

                {currentState === stateConstant?.ADD_NEW_EMAIL && (
                  <AddNewEmail
                    setShowBackBtn={setShowBackBtn}
                    setShowAppBanner={setShowAppBanner}
                    getEmailOTP={getEmailOTP}
                    emailIdError={emailIdError}
                  />
                )}

                {currentState === stateConstant?.SHOW_EMAIL_SECURITY_CODE && (
                  <EnterEmailSecurityCode
                    setShowBackBtn={setShowBackBtn}
                    setShowAppBanner={setShowAppBanner}
                    onSubmitState={() => {
                      setBackState([...backState, currentState])
                      setCurrentState(stateConstant?.YOU_ALL_SET_EMAIL_PAGE)
                    }}
                    verifyEmailAddress={verifyEmailAddress}
                    accountInfoOnLoad={accountInfoOnLoad}
                    tokenForVerification={tokenForVerification}
                    resendOtp={resendOtp}
                    incorrectAttemptsCount={incorrectAttemptsCount}
                    setIncorrectAttemptsCount={setIncorrectAttemptsCount}
                  />
                )}

                {/*Web Email Components End*/}
              </div>
            )}
          </div>
        </div>
        {!isMobile && showAppBanner && <FrontierAppBanner />}
      </MainLayout>
    </SessionTimeout>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    background: colors?.main?.lightBorderGrey,
    padding: '16px',
    [breakpoints.up('sm')]: {
      padding: '32px',
    },
  },
  innerWrapper: {
    padding: '40px 0px 40px 0px',
    width: '100%',
    margin: 'auto',
    [breakpoints.up('sm')]: {
      position: 'relative',
      padding: 0,
      width: 'min-content',
      margin: 'auto',
    },
    [breakpoints.up('md')]: {
      position: 'relative',
      padding: '152px 16px 205px 16px',
      width: 'min-content',
      margin: 'auto',
    },
  },
  container: {
    background: colors?.main?.white,
    borderRadius: '32px',
    padding: '40px 16px',
    [breakpoints.up('sm')]: {
      position: 'relative',
      padding: 48,
      width: 'min-content',
      margin: 'auto',
    },
  },
  redLogo: {
    display: 'none',
    [breakpoints.up('sm')]: {
      display: 'block',
      margin: '40px auto',
      textAlign: 'center',
      top: 0,
      right: 0,
      left: 0,
      position: 'absolute',
    },
  },
  backButton: {
    paddingBottom: 16,
  },
  backButtonLink: {
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    '& span': {
      marginLeft: 10,
    },
  },
  loaderArea: {
    ...COMPONENT_WRAPPER,
    background: colors?.main?.white,
    borderRadius: '32px',
    width: '100%',
    height: 400,
    [breakpoints.up('sm')]: {
      width: 700,
    },
  },
}))

export const getStaticProps = customStaticProps(
  AppRoutes.ContactVerificationPage,
)

export default ContactVerification
