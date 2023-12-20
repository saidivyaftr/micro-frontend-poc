import { Loading } from 'src/blitz'
import { useEffect, useLayoutEffect } from 'react'
import {
  useWelcomePageData,
} from 'src/selector-hooks'
import { useDispatch } from 'react-redux'
import { WelcomeContainerImpl } from './WelcomeContainerImpl'
import {
  VERIFIED_SERVICE_AREA,
  CUSTOMER,
  WELCOME_PAGE_TECH_INSTALL,
  WELCOME_PAGE_SELF_INSTALL,
  WELCOME_PAGE_NO_INSTALL,
  WELCOME_PAGE_CANCELLED,
  WELCOME_PAGE_ORDER_NOT_FOUND,
  WELCOME_PAGE_NO_APPOINTMENT,
  WELCOME_PAGE_SYSTEM_ERROR,
  COMPONENT_WRAPPER,
} from 'src/constants'
import { makeStyles } from '@material-ui/core'
import TechnicalErrorCard from './components/TechnicalErrorCard'
import OrderNotFoundCard from './components/OrderNotFoundCard'
import { usePageLoadEvents } from '@/shared-ui/hooks/index'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { fetchServiceOrderData, fetchBillingSummary } from 'src/redux/slicers/welcome'

const EVENT88_MESSAGE =
  'Something went wrong on our end. Please try again later.'

const WelcomeContainer = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    selectedService,
    isLoadingServiceOrders,
    unprovisionedServiceOrder,
    errorFetchingUnprovisionedServiceOrder,
    isCancelledOrder,
    isSelfInstallationOrder,
    isNoInstallationOrder,
    hasNoAppointment,
  } = useWelcomePageData()
  console.log(unprovisionedServiceOrder, selectedService)

  useLayoutEffect(() => {
    if (selectedService) {
      dispatch(fetchServiceOrderData(selectedService.id))
    }
  }, [selectedService])

  useLayoutEffect(() => {
    if (selectedService && unprovisionedServiceOrder) {
      dispatch(fetchBillingSummary({
        uuid: selectedService.id,
        environmentCode: selectedService?.address?.environment || '',
        orderNumber: unprovisionedServiceOrder?.OrderNumber,
        status: selectedService.accountStatus,
      }))
    }
  }, [selectedService, unprovisionedServiceOrder])

     

  // Adobe tagging
  let pageName = WELCOME_PAGE_TECH_INSTALL
  let additionalEventData = {}
  const orderStatus = unprovisionedServiceOrder?.status || 'not found'
  if (unprovisionedServiceOrder) {
    pageName = WELCOME_PAGE_SYSTEM_ERROR
    additionalEventData = {
      eVar88: EVENT88_MESSAGE,
      events: 'event88',
    }
  } else if (!unprovisionedServiceOrder) {
    pageName = WELCOME_PAGE_ORDER_NOT_FOUND
  } else if (isSelfInstallationOrder) {
    pageName = WELCOME_PAGE_SELF_INSTALL
  } else if (isNoInstallationOrder) {
    pageName = WELCOME_PAGE_NO_INSTALL
  } else if (isCancelledOrder) {
    pageName = WELCOME_PAGE_CANCELLED
  } else if (hasNoAppointment) {
    pageName = WELCOME_PAGE_NO_APPOINTMENT
  }
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName,
      eVar22: CUSTOMER,
      eVar49: VERIFIED_SERVICE_AREA,
      ...additionalEventData,
    },
  })

  useEffect(() => {
    setTimeout(() => {
      DTMClient.triggerEvent(
        {
          pageName,
          events: 'event44',
          eVar52: `OS|${orderStatus}|${
            unprovisionedServiceOrder?.id || 'no-order-number'
          }`,
        },
        'tl_o',
        'order status check',
      )
    }, 100)
  }, [])

  if (isLoadingServiceOrders) {
    return (
      <div className={classes.loader}>
        <Loading className={classes.loading} />
      </div>
    )
  }
  if (errorFetchingUnprovisionedServiceOrder) {
    return <TechnicalErrorCard />
  }

  if (!unprovisionedServiceOrder) {
    return <OrderNotFoundCard />
  }

  return <WelcomeContainerImpl />
}

const useStyles = makeStyles(() => ({
  loader: {
    ...COMPONENT_WRAPPER,
    minHeight: 'calc(100vh - 195px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    margin: 0,
    width: 'auto',
    height: 'auto',
    display: 'block',
  },
}))

export default WelcomeContainer
