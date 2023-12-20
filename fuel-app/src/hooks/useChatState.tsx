import { useSelector, useDispatch } from 'react-redux'
import { State } from 'src/redux/types'
import { appConfigSlice } from 'src/redux/slicers/appConfigSlice'
import APIClient from 'src/api-client'

declare global {
  interface Window {
    KOREDATA: any
  }
}

const useChatState = (): UseChatState => {
  const isChatOpen = useSelector(
    (state: State) => state?.appConfig?.configs?.isChatOpen,
  )
  const { loggedInState, services } =
    useSelector((state: any) => state?.session) || {}
  const dispatch = useDispatch()

  // Used to toggle chatbot
  const setChatState = (value: boolean) => {
    try {
      dispatch(appConfigSlice.actions.setConfig({ isChatOpen: value }))
    } catch (error) {
      console.log(error)
    }
  }

  // Used to set the chatbot params - Koredata
  const setChatParams = (params: KoreParamsType) => {
    if (window !== undefined) {
      window.KOREDATA = window.KOREDATA || {}
      window.KOREDATA = {
        ...window.KOREDATA,
        ...params,
      }
    }
  }

  // Used to set the accessCode to chatbot params
  const getAuthCodeAndSetKoreData = async () => {
    try {
      const code = await APIClient.getChatAccessCode()
      setChatParams({
        uid: code?.data?.uid,
        accessCode: code?.data?.code,
        accessCodeStatus: 'SUCCESS',
      })
    } catch (error) {
      setChatParams({
        uid: undefined,
        accessCode: undefined,
        accessCodeStatus: 'FAILED',
      })
    }
  }

  // Used to set the logged in status to chatbot params
  const loadLoggedInUserDetailsToKoreData = () => {
    const BANS =
      services?.reduce((arrayOfBANS: [], currentAccount: any) => {
        if (currentAccount.type == 'BILLING') {
          const BAN = currentAccount.ref
          return [...arrayOfBANS, BAN]
        }
        return arrayOfBANS
      }, []) || []

    if (loggedInState?.email) {
      const fullName = `${loggedInState?.firstName} ${loggedInState?.lastName}`
      const data: KoreParamsType = {
        emailId: loggedInState?.email,
        mobile: loggedInState?.contactPhone,
        name: fullName,
        timeZoneOffset: 300,
        accountId: BANS,
      }
      setChatParams(data)
    }
  }

  const loadLoggedInUserStateToChatbotProps = () => {
    getAuthCodeAndSetKoreData()
    loadLoggedInUserDetailsToKoreData()
  }

  return {
    isChatOpen,
    setChatState,
    setChatParams,
    getAuthCodeAndSetKoreData,
    loadLoggedInUserDetailsToKoreData,
    loadLoggedInUserStateToChatbotProps,
  }
}

export type KoreParamsType = {
  launchOption?: string
  iCaseId?: string
  sCaseID?: string
  btn?: string
  serviceAddress?: string
  errorCode?: string
  pageUrl?: string
  mobile?: string
  existingInternetPlan?: {
    dataNetwork?: string
    dataspeed?: { upMbps?: number; downMbps?: number }
    hasEeroRouter?: boolean
    itemCode?: string
    productName?: string
    productType?: string
    signedUpDate?: string
  }
  samRecords?: any[]
  uid?: string
  accessCode?: string
  accessCodeStatus?: 'SUCCESS' | 'FAILED'
  emailId?: string
  name?: string
  timeZoneOffset?: number
  accountId?: string[]
}

type UseChatState = {
  isChatOpen: boolean
  setChatState: (value: boolean) => void
  setChatParams: (params: KoreParamsType) => void
  getAuthCodeAndSetKoreData: () => void
  loadLoggedInUserDetailsToKoreData: () => void
  loadLoggedInUserStateToChatbotProps: () => void
}

export default useChatState
