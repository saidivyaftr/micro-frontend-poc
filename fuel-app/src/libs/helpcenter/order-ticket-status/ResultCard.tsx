import { makeStyles } from '@material-ui/core'
import { useMemo, useEffect } from 'react'
import CardWrapper from './CardWrapper'
import AppointmentDetail from './AppointmentDetail'
import { Typography, Button, InjectHTML } from '@/shared-ui/components'
import { CircleCheckMark } from 'src/blitz/assets/react-icons'
import { TICKET_NUMBER } from './helper'
import clsx from 'classnames'
import colors from '@/shared-ui/colors'
import ContactNumber from './ContactNumber'
import UpsTrackingNumber from './UpsTrackingNumber'
import { OrderPageModals } from './types'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import moment from 'moment'
import { useAppData } from 'src/hooks'
import {
  HELP_CENTER,
  SITE_INTERACTION,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useDispatch, useSelector } from 'react-redux'
import {
  setOrders,
  setOrderData,
  setOrderModal,
} from 'src/redux/slicers/orderTicket'
import { useAccountTickets } from 'src/selector-hooks'
import { Order } from 'src/redux/types/OrderTicketTypes'

const COMPLETED = 'Completed'
export const LOADING = 'loading'

//** Fields Components Start*/
export const RenderField = ({ children, className }: any) => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.orderInline, classes.orderSpace, [className])}>
      {children}
    </div>
  )
}

const Services = ({ label = '', products = [], status }: any) => {
  const classes = useStyles()
  const filteredProducts = useMemo(() => {
    return products?.filter((product: any) => product.Name)
  }, [products])
  if (products?.length === 0 || status === COMPLETED) return null
  return (
    <RenderField>
      <Typography tagType="p" styleType="p2" fontType="boldFont">
        {label}
      </Typography>
      <div className={classes.products}>
        {filteredProducts.map((item: any) => (
          <div className={classes.productsList} key={item.id}>
            <CircleCheckMark height={24} width={24} />
            <Typography fontType="regularFont" styleType="p2" tagType="p">
              {item.Name}
            </Typography>
          </div>
        ))}
      </div>
    </RenderField>
  )
}

const CompletionDate = ({ label = '', completionDate = '', status }: any) => {
  if (!completionDate || status !== COMPLETED) return null
  return (
    <RenderField>
      <Typography tagType="p" styleType="p2" fontType="boldFont">
        {label}
      </Typography>
      <Typography tagType="p" styleType="p2">
        {moment(completionDate).format('ll')}
      </Typography>
    </RenderField>
  )
}

const ServiceDate = ({ label = '', createDate = '' }: any) => {
  if (!createDate) return null
  return (
    <RenderField>
      <Typography tagType="p" styleType="p2" fontType="boldFont">
        {label}
      </Typography>
      <Typography tagType="p" styleType="p2">
        {moment(createDate).format('ll')}
      </Typography>
    </RenderField>
  )
}

const ServiceAddress = ({
  label = '',
  serviceAddress,
  addressClassName = '',
}: any) => {
  if (!serviceAddress?.[0] || !serviceAddress?.[1]) return null
  return (
    <RenderField>
      <Typography tagType="p" styleType="p2" fontType="boldFont">
        {label}
      </Typography>
      <Typography
        tagType="p"
        styleType="p2"
        data-tid="service-address"
        className={addressClassName}
      >
        <>
          {serviceAddress[0]}, <br /> {serviceAddress[1]}
        </>
      </Typography>
    </RenderField>
  )
}

const CancelTicket = ({ label, orderData }: any) => {
  const dispatch = useDispatch()
  if (!orderData?.allowCancel) return null
  return (
    <Button
      type="button"
      text={label}
      onClick={() => {
        dispatch(setOrderModal(OrderPageModals.CancelOrder))
        dispatch(setOrderData(orderData))
        DTMClient.triggerEvent({
          pageName: `${HELP_CENTER}/order-ticket-status/cancel ticket`,
        })
      }}
      variant="secondary"
    />
  )
}

//** Fields Components End */

const ResultCardTitle = ({ totalOrders }: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { title1, title2, subTitle, searchAgain } = useAppData(
    'resultScenario',
    true,
  )
  const { loggedInState } = useSelector((state: any) => state?.session) || {}
  const searchAgainHandler = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: `${HELP_CENTER}/order-ticket-status:search-again`,
      },
      'tl_o',
    )
    dispatch(
      setOrders({
        type: 'Reset',
      }),
    )
  }

  return (
    <div className={classes.titleWrapper}>
      <Typography tagType="h3" styleType="h4" className={classes.title}>
        {totalOrders === 1
          ? title1?.value.replace('{total}', totalOrders)
          : title2?.value.replace('{total}', totalOrders)}
      </Typography>
      {!loggedInState && (
        <Typography tagType="p" styleType="p1" className={classes.subTitle}>
          <>
            {subTitle?.value} &nbsp;
            <Button
              className={classes.searchAgainLink}
              type="link"
              variant="lite"
              text={searchAgain?.value}
              onClick={searchAgainHandler}
            />
            {'.'}
          </>
        </Typography>
      )}
    </div>
  )
}

const ResultCardBody = ({ orderData }: any) => {
  const classes = useStyles()
  const {
    ticketType,
    troubleTicket = {},
    serviceOrder = {},
    serviceAddress: address = [],
    ticketNumber,
    createdDate,
    badge,
  } = orderData
  const {
    serviceAddress,
    dateCreated,
    dateCompleted,
    serviceOrdered,
    upsTrackingNumber,
    cancelTicket,
  } = useAppData('resultScenario', true)
  let techStatusInfo = null

  if (orderData.appointmentFormatted) {
    const appointmentSlot = `${orderData.appointmentFormatted.fullDay}, ${orderData.appointmentFormatted.month} ${orderData.appointmentFormatted.day} at ${orderData.appointmentFormatted.startTime} - ${orderData.appointmentFormatted.endTime}`
    techStatusInfo = badge.ticketStatus?.replace(
      '{{appointment}}',
      appointmentSlot,
    )
  }

  const displayName =
    (ticketType?.charAt(0)?.toUpperCase() || '') +
    (ticketType?.slice(1)?.toLowerCase() || '')
  return (
    <div className={classes.outerWrapper}>
      <div className={classes.sectionWrapper}>
        <div className={classes.orderTitleWrapper}>
          <Typography tagType="h4" styleType="h5" className={classes.h5}>
            {`${displayName} #${ticketNumber}`}
          </Typography>
          <Typography className={classes.orderStatus} fontType="boldFont">
            {badge.badgeCopy}
          </Typography>
        </div>
        <InjectHTML
          testId="test-download-myfrontier-app"
          tagType="p"
          styleType="p1"
          className={classes.techStatusInfo}
          value={techStatusInfo}
        />
      </div>
      <AppointmentDetail data={orderData} />
      <div className={classes.orderInfo}>
        <ServiceAddress
          addressClassName={classes.address}
          label={serviceAddress?.value}
          serviceAddress={address}
        />
        <UpsTrackingNumber
          orderData={orderData}
          label={upsTrackingNumber?.value}
        />
        <ServiceDate label={dateCreated?.value} createDate={createdDate} />
        <Services
          label={serviceOrdered?.value}
          products={
            ticketType === TICKET_NUMBER
              ? troubleTicket?.ServicesOrdered
              : serviceOrder?.ServicesOrdered
          }
          status={orderData?.status}
        />
        <CompletionDate
          label={dateCompleted?.value}
          completionDate={orderData?.completionDate}
          status={orderData?.status}
        />
        <ContactNumber orderData={orderData} />
      </div>
      <CancelTicket orderData={orderData} label={cancelTicket?.value} />
    </div>
  )
}

const ResultCard = () => {
  const { data: orders } = useAccountTickets()
  const dispatch = useDispatch()
  const totalOrders: any = orders?.length || 0
  useEffect(() => {
    window.scrollTo(0, 200)
    const middedAptOrder: any = orders?.find((order: Order) => {
      return order.isMissedAppointment && order.isReschedulable
    })
    const orderInfo = orders?.[0]
    const status = orderInfo?.badge?.badgeCopy?.toLowerCase()
    const pageName = middedAptOrder
      ? `${HELP_CENTER}/order-ticket-status/missed appointment`
      : `${HELP_CENTER}/order-ticket-status/${status}`
    const { TTS, SO } = orders?.reduce(
      (allTickets: any, o: any) => {
        const status = o?.badge?.badgeCopy?.toLowerCase()
        const ticketNumber = o?.ticketNumber
        if (o.ticketType === TICKET_NUMBER) {
          allTickets.TTS.status.push(status)
          allTickets.TTS.ticketNumber.push(ticketNumber)
        } else {
          allTickets.SO.status.push(status)
          allTickets.SO.ticketNumber.push(ticketNumber)
        }
        return allTickets
      },
      {
        TTS: {
          status: [],
          ticketNumber: [],
        },
        SO: {
          status: [],
          ticketNumber: [],
        },
      },
    )
    const eventTriggered = TTS.status.length > 0 ? 'TTS' : 'SO'
    DTMClient.triggerEvent({
      pageName,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
      events: TTS.status.length > 0 ? 'event43' : 'event44',
      eVar52:
        TTS.status.length > 0
          ? `TTS|${TTS.status.join()}|${TTS.ticketNumber.join()}`
          : `SO|${SO.status.join()}|${SO.ticketNumber.join()}`,
    })
    if (TTS.status.length > 0 && eventTriggered !== 'TTS') {
      DTMClient.triggerEvent(
        {
          events: 'event43',
          eVar52: `TTS|${TTS.status.join()}|${TTS.ticketNumber.join()}`,
          eVar22: VISITOR,
          eVar49: UNVERIFIED_SERVICE_AREA,
        },
        'tl_o',
        SITE_INTERACTION,
      )
    }
    if (SO.status.length > 0 && eventTriggered !== 'SO') {
      DTMClient.triggerEvent(
        {
          events: 'event44',
          eVar52: `SO|${SO.status.join()}|${SO.ticketNumber.join()}`,
          eVar22: VISITOR,
          eVar49: UNVERIFIED_SERVICE_AREA,
        },
        'tl_o',
        SITE_INTERACTION,
      )
    }
    if (middedAptOrder) onEditAppointmentHandler(middedAptOrder)
  }, [orders])

  const onEditAppointmentHandler = (data: any) => {
    dispatch(setOrderModal(OrderPageModals.EditAppointment))
    dispatch(setOrderData(data))
  }

  if (totalOrders === 0) return null
  return (
    <CardWrapper>
      <ResultCardTitle totalOrders={totalOrders} />
      {orders?.map(
        (orderData: any): JSX.Element => (
          <ResultCardBody orderData={orderData} key={orderData.ticketNumber} />
        ),
      )}
    </CardWrapper>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    display: 'flex',
    marginTop: '1rem',
    flexDirection: 'column',
    gap: '0.5rem',
    [breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  searchAgainLink: {
    fontStyle: 'normal',
    fontWeight: 600,
    height: 'unset',
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    textDecoration: 'underline',
    color: colors.main.black,
    fontFamily: PP_OBJECT_SANS,
    [breakpoints.down('sm')]: {
      marginTop: 4,
    },
  },
  leftCol: {
    [breakpoints.up('md')]: {
      flex: '0 0 170px',
    },
  },
  title: {
    width: '100%',
  },
  subTitle: {
    margin: 0,
  },
  orderTitleWrapper: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    marginBottom: '0.5rem',
    [breakpoints.down('sm')]: {
      gap: '1rem',
      justifyContent: 'space-between',
    },
  },
  h5: {
    [breakpoints.down('sm')]: {
      width: '60%',
    },
  },
  orderStatus: {
    backgroundColor: colors.main.tile,
    padding: '0.5rem 1rem',
    borderRadius: '3rem',
    [breakpoints.down('sm')]: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'center',
    },
  },
  orderDesc: {
    margin: 0,
  },
  orderSubTitle: {
    width: '70%',
    [breakpoints.down('sm')]: {
      width: '76%',
    },
  },
  address: {},
  orderInfo: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  orderInline: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    gap: '1rem',
    '& p': {
      margin: 0,
      minWidth: '168px',
    },
    [breakpoints.down('sm')]: {
      gap: '0.5rem',
      flex: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  orderSpace: {
    marginBottom: '2rem',
  },
  productsList: {
    display: 'flex',
    '& p': {
      margin: 0,
      marginLeft: '1rem',
    },
  },
  products: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    background: colors.main.white,
    padding: '3rem 4rem',
    borderRadius: '1rem',
    margin: '2rem 0 0',
    [breakpoints.down('sm')]: {
      padding: '2rem 1rem',
    },
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '2rem',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  modalCloseBtn: {
    display: 'none',
    top: '1rem',
    right: '.5rem',
  },
  modalContentWrapper: {
    textAlign: 'center',
  },
  modalCloseIconWrapper: {
    textAlign: 'end',
  },
  closeIcon: {
    width: '1.5rem',
    height: '1.5rem',
    cursor: 'pointer',
    [breakpoints.down('sm')]: {
      width: '1rem',
      height: '1rem',
    },
    '&:hover *': {
      fill: colors.main.red,
      stroke: colors.main.red,
      color: colors.main.red,
    },
  },
  techStatusInfo: {
    '& a': {
      textDecoration: 'underline',
      fontWeight: 600,
    },
  },
}))

export default ResultCard
