import { makeStyles } from '@material-ui/core'
import Card from 'src/blitz/components/Card/Card'
import { ArrowLink, Typography } from '@/shared-ui/components'
import { InjectHTML } from '@/shared-ui/components'
import { useAccountTickets } from 'src/selector-hooks'
import colors from 'src/styles/theme/colors'
import { useAppData } from 'src/hooks'
import {
  formatSchedule,
  ticketStatusBadgeMapping,
  orderStatusBadgeMapping,
} from 'src/libs/helpcenter/order-ticket-status/helper'

const MyOrdersTickets = ({ className = '' }: { className?: string }) => {
  const classes = useStyles()
  let cardTitle
  const myOrdersTicketsData = useAppData('myOrdersTicketsData', true)
  const {
    title,
    pTitle,
    linkLabel,
    linkUrl,
    troubleTicketLabel,
    serviceOrderLabel,
  } = myOrdersTicketsData
  const accountTickets = useAccountTickets().data
  const ordersTicketsDisplayInfo: any = []
  const statusLabelFormatter = (
    ticket: any,
    eventCode: string,
    mappingFn: any,
  ) => {
    let label = mappingFn(
      ticket.StatusTracker?.Stages.slice(-1)[0]?.StageLabel,
      eventCode,
    ).ticketStatus
    if (label.includes('{{appointment}}')) {
      const appointmentFormatted = formatSchedule(
        ticket.customer?.appointment?.arrivalWindow,
      )
      const appointmentSlot = `${appointmentFormatted.fullDay}, ${appointmentFormatted.month} ${appointmentFormatted.day} at ${appointmentFormatted.startTime} - ${appointmentFormatted.endTime}`
      label = label.replace('{{appointment}}', appointmentSlot)
    }
    return label
  }

  accountTickets.forEach((ticket: any) => {
    if (Object.keys(ticket).includes('troubleTicket')) {
      ordersTicketsDisplayInfo.push({
        issueType: 'TroubleTicket',
        id: ticket.troubleTicket?.id?.TroubleTicketNumber,
        status: statusLabelFormatter(
          ticket,
          ticket.troubleTicket?.VXEventCode,
          ticketStatusBadgeMapping,
        ),
      })
    }
    if (Object.keys(ticket).includes('serviceOrder')) {
      ordersTicketsDisplayInfo.push({
        issueType: 'ServiceOrder',
        id: ticket.serviceOrder?.id?.OrderNumber,
        status: statusLabelFormatter(
          ticket,
          ticket.serviceOrder?.VXEventCode,
          orderStatusBadgeMapping,
        ),
      })
    }
  })

  if (ordersTicketsDisplayInfo.length > 1) {
    cardTitle = pTitle?.value?.replace(
      '{{value}}',
      ordersTicketsDisplayInfo.length,
    )
  } else {
    cardTitle = title?.value?.replace(
      '{{value}}',
      ordersTicketsDisplayInfo.length,
    )
  }

  const orderTickets = ordersTicketsDisplayInfo?.map(
    (ticket: any, index: number) => {
      return (
        <div
          className={classes.ticketContainer}
          key={`account-tickets-${index}`}
        >
          <Typography
            styleType="p2"
            fontType="boldFont"
            className={classes.ticketTitle}
          >
            {ticket.issueType === 'TroubleTicket'
              ? `${troubleTicketLabel?.value} #${ticket.id}`
              : `${serviceOrderLabel?.value} #${ticket.id}`}
          </Typography>
          <InjectHTML
            className={classes.ticketStatus}
            tagType="p"
            styleType="p2"
            value={ticket.status}
            addAnchorStyles
          />
        </div>
      )
    },
  )

  return (
    <Card className={className}>
      <>
        <div className={classes.cardTitle}>
          <Typography styleType="p1" fontType="boldFont">
            {cardTitle}
          </Typography>
          <ArrowLink
            styleType="p2"
            fontType="boldFont"
            label={linkLabel?.value}
            url={linkUrl?.href}
            hoverColor="primary"
          ></ArrowLink>
        </div>
        <div className={classes.cardContent}>{orderTickets}</div>
      </>
    </Card>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  cardTitle: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '8px',
    marginBottom: '32px',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  ticketContainer: {
    display: 'flex',
    gap: '32px',
    padding: '16px 32px',
    backgroundColor: colors.main.grey,
    borderRadius: 16,
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: '16px',
      padding: '16px',
    },
  },
  ticketTitle: {
    [breakpoints.up('sm')]: {
      width: '33.33%',
    },
  },
  ticketStatus: {
    [breakpoints.up('sm')]: {
      width: '67.77%',
    },
  },
}))

export default MyOrdersTickets
