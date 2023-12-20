import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { TicketCancel } from '@/shared-ui/react-icons'
import { OrderPageModals } from './types'
import APIClient from 'src/api-client'
import { useState } from 'react'
import { useAppData } from 'src/hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { HELP_CENTER, VISITOR } from 'src/constants'
import { setOrderModal, setOrders } from 'src/redux/slicers/orderTicket'
import { useDispatch } from 'react-redux'
import { useAccountTickets, useOrderData } from 'src/selector-hooks'
import { Order } from 'src/redux/types/OrderTicketTypes'
import {
  TICKET_NUMBER,
  ticketStatusBadgeMapping,
  orderStatusBadgeMapping,
} from './helper'

const CancelTicketModalContent = () => {
  const { data: orders } = useAccountTickets()
  const orderData = useOrderData()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  const { ticketNumber, ticketType, uuid } = orderData
  const { cancelYourTicket, cancelYourTicketContent, yescancel, dontcancel } =
    useAppData('resultScenario', true)
  const handleSubmit = async () => {
    const events =
      ticketType === TICKET_NUMBER ? 'event51, event14' : 'event57, event14'
    const type = ticketType === TICKET_NUMBER ? 'TTS' : 'SO'
    DTMClient.triggerEvent(
      {
        events,
        eVar52: `${type}|user canceled|${ticketNumber}`,
        eVar22: VISITOR,
      },
      'tl_o',
    )
    try {
      setLoading(true)
      await APIClient.cancelOrderTicket(
        {
          ticketNumber,
          ticketType,
          action: 'Cancel',
        },
        uuid,
      )
      const updateOrders = orders.map((orderData: Order) => {
        const order = { ...orderData }
        if (ticketNumber === order?.ticketNumber) {
          const badge =
            ticketType === TICKET_NUMBER
              ? ticketStatusBadgeMapping(`Ticket canceled`)
              : orderStatusBadgeMapping(`Ticket canceled`)
          order.badge = {
            ...badge,
          }
          order.hasAppointment = false
          order.appointment = undefined
          order.allowCancel = false
          order.isReschedulable = false
          order.isMissedAppointment = false
        }
        return order
      })
      dispatch(
        setOrders({
          type: 'Success',
          data: updateOrders,
        }),
      )
      dispatch(setOrderModal(OrderPageModals.Init))
    } catch (error) {
      dispatch(setOrderModal(OrderPageModals.TechnicalError))
    }
    setLoading(false)
  }
  return (
    <div className={classes.container}>
      <TicketCancel />
      <Typography styleType="h5" className={classes.title} testId="test-title">
        {cancelYourTicket?.value}
      </Typography>
      <div className={classes.description}>
        <Typography styleType="p1" testId="test-warning">
          {cancelYourTicketContent?.value}
        </Typography>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          type="button"
          text={yescancel?.value}
          onClick={handleSubmit}
          isBusy={loading}
        />
        <Button
          variant="tertiary"
          type="button"
          hoverVariant="secondary"
          text={dontcancel?.value}
          disabled={loading}
          onClick={() => {
            DTMClient.triggerEvent(
              {
                events: 'event14',
                eVar14: `${HELP_CENTER}/order-ticket-status:dont-cancel`,
              },
              'tl_o',
            )
            dispatch(setOrderModal(OrderPageModals.Init))
          }}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    padding: '2rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    [breakpoints.down('xs')]: {
      padding: '0rem',
    },
  },
  title: {
    marginTop: '1.5rem',
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  description: {
    marginTop: '1rem',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    margin: '1.5rem 0 0',
    flexDirection: 'row',
    '& button': {
      [breakpoints.down('sm')]: {
        width: '17rem',
      },
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}))

export default CancelTicketModalContent
