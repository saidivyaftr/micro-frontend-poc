import { makeStyles } from '@material-ui/core'
import {
  COMPONENT_WRAPPER,
  SELF_SERVICE_PAGES,
  SESSION_STORAGE,
} from 'src/constants/'
import colors from 'src/styles/theme/colors'
import { useEffect, useState } from 'react'
import { offersData } from 'src/libs/services/shared/types'
import { Loading } from '@/shared-ui/components'
import AdditionalServiceHero from 'src/libs/services/additional-services/AdditionalServiceHero'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setApiErrorCode } from 'src/redux/slicers/apiErrors'
import APIClient from 'src/api-client'
import SystemError from 'src/libs/services/shared/ErrorModal'
import AdditionalOffers from 'src/libs/services/additional-services/AdditionalOffers'
import NoOfferInfo from 'src/libs/services/additional-services/NoOfferInfo'
import PendingOrderInfo from 'src/libs/services/additional-services/PendingOrderInfo'
import {
  removeTokenFromParams,
  shouldRedirect,
  matchICase,
} from 'src/libs/services/shared/miscUtlis'
import ApiErrorModal from 'src/libs/services/shared/ApiErrorModal'
import { handlePageViewAnalytics } from 'src/libs/services/shared/AnalyticsUtlis'
import { useCartDataContext } from 'src/libs/services/CartContextProvider'

function AdditionalServicesComponent(): JSX.Element {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()
  const { t, i, s } = router.query
  const [accountBtn, setBtn] = useState<any>()
  const [authorizationToken, setAuthorizationToken] = useState<string>('')
  const [icaseId, setICaseId] = useState<string>('')
  const [sourceId, setSourceId] = useState<string>('')
  const [pdpOffersData, setPdpOffersData] = useState<offersData>()
  const [showLoading, setShowLoading] = useState<boolean>(false)
  const [removeParams, setRemoveParams] = useState(false)
  const [errorCode, setErrorCode] = useState<number>(0)
  const [cartData, setCartData] = useState<any>()
  const [pageLoadProductString, setPageLoadProductString] = useState<string>('')
  const { setCartDataFromSession } = useCartDataContext()
  const hasDTMLLoaded = useSelector(
    (state: any) => state?.appConfig?.configs?.['DTM'],
  )
  useEffect(() => {
    if (hasDTMLLoaded && pageLoadProductString !== '') {
      if (pageLoadProductString !== SELF_SERVICE_PAGES.SELF_SERVICE_PAGE) {
        // Handling PageView Call only if we do not have Products list
        // If we have Products list, we will merge this call in VAS analytics
        handlePageViewAnalytics(pageLoadProductString)
      }
    }
  }, [hasDTMLLoaded, pageLoadProductString])

  useEffect(() => {
    /** 
      Adding/Updating Session Storage to check A user visit count for a VAS Product Detail Page. 
    **/
    if (router.isReady) {
      const authFromSession = sessionStorage.getItem(
        SESSION_STORAGE.TOKEN,
      ) as string
      const icaseIdSession = sessionStorage.getItem(
        SESSION_STORAGE.ICID,
      ) as string
      const sourceIdSession = sessionStorage.getItem(
        SESSION_STORAGE.SID,
      ) as string
      const authToken = (t || authFromSession) as string
      const iCase = matchICase(i as string)
        ? ((i || icaseIdSession) as string)
        : ''
      const sId = (s || sourceIdSession) as string
      setAuthorizationToken(authToken)
      setICaseId(iCase)
      setSourceId(sId)
      shouldRedirect(authFromSession)
      setCartData(
        JSON.parse(sessionStorage.getItem(SESSION_STORAGE.CART_DATA) || '{}'),
      )
    }
  }, [router.isReady])

  useEffect(() => {
    if (errorCode === 403) {
      setPageLoadProductString(SELF_SERVICE_PAGES.ORDER_IN_PROGRESS)
    }
  }, [errorCode])

  useEffect(() => {
    // Once pdpOffersData Set either from API or sessionStorage, we will update Analytics
    if (pdpOffersData) {
      if (pdpOffersData?.Offers?.length > 0) {
        setPageLoadProductString(SELF_SERVICE_PAGES.SELF_SERVICE_PAGE)
      } else {
        setPageLoadProductString(SELF_SERVICE_PAGES.NOT_ELIGIBLE)
      }
    }
  }, [pdpOffersData])

  useEffect(() => {
    const getValidation = async () => {
      setShowLoading(true)
      const response = await validateToken(authorizationToken)
      if (response?.redirectToLogin) {
        sessionStorage.clear()
        window.location.href = '../login'
      } else {
        setBtn(response)
        sessionStorage.setItem(SESSION_STORAGE.VALID, response)
        setShowLoading(false)
      }
    }

    if (authorizationToken) {
      const btn = sessionStorage.getItem(SESSION_STORAGE.VALID) || null
      const storedToken = sessionStorage.getItem(SESSION_STORAGE.TOKEN)
      if (!storedToken) {
        sessionStorage.setItem(SESSION_STORAGE.TOKEN, authorizationToken)
        sessionStorage.setItem(SESSION_STORAGE.ICID, icaseId)
        sessionStorage.setItem(SESSION_STORAGE.SID, sourceId)
      }

      if (btn && storedToken === authorizationToken) setBtn(btn)
      else {
        sessionStorage.removeItem(SESSION_STORAGE.VALID)
        sessionStorage.setItem(SESSION_STORAGE.TOKEN, authorizationToken)
        getValidation()
      }
      setRemoveParams(true)
    }
  }, [authorizationToken, icaseId, sourceId])

  useEffect(() => {
    if (removeParams) removeTokenFromParams()
  }, [removeParams])

  useEffect(() => {
    const getData = async () => {
      setShowLoading(true)
      const response = await getOffersSelfService(accountBtn, icaseId, sourceId)

      if (response?.redirectToLogin) {
        sessionStorage.clear()
        window.location.href = '../login'
      } else {
        setShowLoading(false)

        setPdpOffersData(response)
        sessionStorage.setItem(
          SESSION_STORAGE.CART_DATA,
          JSON.stringify(response || {}),
        )
        setCartDataFromSession(response)
      }
    }
    accountBtn && !cartData.CartLineItems && getData()
  }, [accountBtn])

  const validateToken = async (authorizationToken: string) => {
    try {
      const response: any = await APIClient.validateToken(authorizationToken)
      return response.data
    } catch (error: any) {
      dispatch(
        setApiErrorCode({
          module: 'validateToken',
          errorCode: error?.response?.status,
        }),
      )
    }
  }

  const getOffersSelfService = async (
    accountBtn: string,
    icaseId: string,
    sourceId: string,
  ) => {
    try {
      const response: any = await APIClient.getOffersSelfService(
        accountBtn,
        icaseId,
        sourceId,
      )
      return response.data
    } catch (error: any) {
      setErrorCode(error?.response?.status)
      dispatch(
        setApiErrorCode({
          module: 'getProducts',
          errorCode: error?.response?.status,
        }),
      )
    }
  }

  useEffect(() => {
    if (cartData?.CartLineItems) {
      setPdpOffersData(cartData)
    }
  }, [cartData])

  return (
    <>
      <SystemError />
      <ApiErrorModal hideFor403={true} />
      <AdditionalServiceHero />
      {errorCode !== 403 ? (
        <>
          {showLoading ? (
            <Loading className={classes.loaderArea} />
          ) : pdpOffersData && pdpOffersData?.Offers?.length > 0 ? (
            <AdditionalOffers
              pageCode={''}
              pdpOffersData={pdpOffersData?.Offers}
            />
          ) : (
            pdpOffersData && <NoOfferInfo />
          )}
        </>
      ) : (
        <PendingOrderInfo />
      )}
    </>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: '6rem',
    [breakpoints.down('md')]: {
      paddingBottom: '3rem',
    },
  },
  tileRoot: {
    backgroundColor: colors.main.white,
    paddingTop: '3rem',
    paddingBottom: '3rem',
  },
  tileWrapper: {
    ...COMPONENT_WRAPPER,
  },
  loaderArea: {
    ...COMPONENT_WRAPPER,
    height: 500,
  },
}))

export default AdditionalServicesComponent
