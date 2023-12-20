/* eslint-disable @typescript-eslint/indent */
import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'
import { CheckMark } from 'src/blitz/assets/react-icons'
import UpsTrackingNumber from './UpsTrackingNumber'
import AddressRenderer from './AddressRenderer'
import {
  getDayFromDate,
  getFormattedDate,
  hasUPSTrackingNumber,
  getFormattedServiceAddress,
} from '../helper'
import { CancelIcon } from 'src/blitz/assets/react-icons'
import useAppData from '@/shared-ui/hooks/useAppData'
import useChatState from '@/shared-ui/hooks/useChatState'
import { useWelcomePageData } from 'src/selector-hooks'

const OrderInfo = () => {
  const { setChatState, setChatParams } = useChatState()
  const classes = useStyles()

  const {
    isCancelledOrder,
    isNoInstallationOrder,
    isSelfInstallationOrder,
    unprovisionedServiceOrder,
  } = useWelcomePageData()
  const {
    orderNumber: orderNo,
    orderInstallationType,
    status,
    cancelled,
    upsTrackingNumber,
    servicesOrdered,
    serviceStartDate,
    orderTypeSelfInstall,
    selfInstallServiceStatus,
    voiceOnlyNoInstallServiceStatus,
    anyQuestions,
    chatWithUs,
  } = useAppData('OrderDetails', true)
  const { serviceAddress: serviceAddressTitle } = useAppData(
    'YourInformation',
    true,
  )

  const handleOpenChat = () => {
    setChatParams({ launchOption: 'WelcomePage_NewServiceOrderInquiry' })
    setChatState(true)
  }

  if (!unprovisionedServiceOrder) {
    return null
  }
  const {
    id: orderNumber,
    productsAdded,
    dueDate,
    serviceAddress,
  } = unprovisionedServiceOrder

  const showUPSTrackingNumber =
    isSelfInstallationOrder &&
    hasUPSTrackingNumber(unprovisionedServiceOrder.trackingNumbers)
  return (
    <>
      <div className={classes.container}>
        <div className={classes.leftCol}>
          <Typography fontType="boldFont" styleType="p2">
            {orderNo?.value}
          </Typography>
        </div>

        <div>
          <Typography fontType="regularFont" styleType="p2">
            {orderNumber}
          </Typography>
        </div>
      </div>

      {unprovisionedServiceOrder &&
        isSelfInstallationOrder &&
        !isCancelledOrder && (
          <div className={classes.container}>
            <div className={classes.leftCol}>
              <Typography fontType="boldFont" styleType="p2">
                {orderInstallationType?.value}
              </Typography>
            </div>
            <div>
              <Typography fontType="regularFont" styleType="p2">
                {orderTypeSelfInstall?.value}
              </Typography>
            </div>
          </div>
        )}

      {unprovisionedServiceOrder &&
        (isSelfInstallationOrder || isNoInstallationOrder) &&
        !isCancelledOrder &&
        dueDate && (
          <div className={classes.container}>
            <div className={classes.leftCol}>
              <Typography fontType="boldFont" styleType="p2">
                {serviceStartDate?.value}
              </Typography>
            </div>
            <div>
              <Typography fontType="regularFont" styleType="p2">
                {`${getDayFromDate(dueDate)},
                ${getFormattedDate(dueDate)}`}
              </Typography>
              {isSelfInstallationOrder && (
                <Typography
                  fontType="regularFont"
                  styleType="p3"
                  className={classes.serviceStatus}
                >
                  {selfInstallServiceStatus?.value}
                </Typography>
              )}
              {isNoInstallationOrder && (
                <Typography
                  fontType="regularFont"
                  styleType="p2"
                  className={classes.serviceStatus}
                >
                  {voiceOnlyNoInstallServiceStatus?.value}
                </Typography>
              )}
            </div>
          </div>
        )}

      {isCancelledOrder && (
        <div className={classes.container}>
          <div className={classes.leftCol}>
            <Typography fontType="boldFont" styleType="p2">
              {status?.value}
            </Typography>
          </div>

          <div className={classes.orderStatus}>
            <CancelIcon height={24} width={24} />
            <Typography fontType="regularFont" styleType="p2">
              {cancelled?.value}
            </Typography>
          </div>
        </div>
      )}
      {!isCancelledOrder && showUPSTrackingNumber && (
        <div className={classes.container}>
          <div className={classes.leftCol}>
            <Typography fontType="boldFont" styleType="p2">
              {upsTrackingNumber?.value}
            </Typography>
          </div>
          <UpsTrackingNumber />
        </div>
      )}

      <div className={classes.container}>
        <div className={classes.leftCol}>
          <Typography fontType="boldFont" styleType="p2">
            {servicesOrdered?.value}
          </Typography>
        </div>

        <div>
          {productsAdded.map((item: any) => (
            <div className={classes.productsList} key={item.id}>
              {!isCancelledOrder && <CheckMark />}
              <Typography fontType="regularFont" styleType="p2">
                {item.filteredDescription}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.leftCol}>
          <Typography fontType="boldFont" styleType="p2">
            {serviceAddressTitle?.value}
          </Typography>
        </div>
        <div>
          {serviceAddress && (
            <AddressRenderer
              address={getFormattedServiceAddress(serviceAddress)}
            />
          )}
        </div>
      </div>
      {isCancelledOrder && (
        <div className={classes.container}>
          <Typography styleType="p2" tagType="span">
            <span>
              <span>{anyQuestions?.value}</span>
              &nbsp;
              <Typography
                styleType="p2"
                className={classes.chatWithUs}
                tagType="span"
                fontType="mediumFont"
                onClick={handleOpenChat}
              >
                {chatWithUs?.value}
              </Typography>
            </span>
          </Typography>
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  chat: {
    display: 'flex',
  },
  chatWithUs: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    marginTop: '1rem',
    flexDirection: 'column',
    gap: '0.5rem',
    [breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  leftCol: {
    [breakpoints.up('md')]: {
      flex: '0 0 224px',
    },
  },
  productsList: {
    marginBottom: '0.5rem',
    display: 'flex',
    gap: '0.5rem',
  },
  orderStatus: {
    display: 'flex',
    gap: '.5rem',
    alignItems: 'center',
  },
  serviceStatus: {
    marginTop: '8px',
  },
}))

export default OrderInfo
