import colors from '@/shared-ui/colors'
import DoneIcon from '@material-ui/icons/Done'
import { Calendar, Loading } from '@/shared-ui/components'
import { IAppointment, IDates, ITimes, OrderPageModals } from './types'
import { Button, Typography } from '@/shared-ui/components'
import { makeStyles, Button as MaterialButton } from '@material-ui/core'
import { useEffect, useState } from 'react'
import moment from 'moment'
import clx from 'classnames'
import APIClient from 'src/api-client'
import { ChevronLeft, ChevronRight } from '@/shared-ui/react-icons/index'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import {
  TICKET_NUMBER,
  formatSchedule,
  getDates,
  sortFunction,
  ticketStatusBadgeMapping,
  orderStatusBadgeMapping,
} from './helper'
import { useAppData } from 'src/hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { HELP_CENTER } from 'src/constants'
import { useDispatch } from 'react-redux'
import {
  setOrderData,
  setOrderModal,
  setOrders,
} from 'src/redux/slicers/orderTicket'
import { useAccountTickets, useOrderData } from 'src/selector-hooks'
const UpdateAppointment = () => {
  const dispatch = useDispatch()
  const { data: orders } = useAccountTickets()
  const serviceOrderDetails = useOrderData()
  const [dates, setdates] = useState<IDates[]>([])
  const [times, setTimes] = useState<ITimes>({
    slot1: { available: false, selected: false },
    slot2: { available: false, selected: false },
  })
  const [appointments, setAppointments] = useState<IAppointment[]>([])
  const [isBusy, setIsBusy] = useState<boolean>(false)
  const {
    selectDateTitle,
    selectTimeTitle,
    rescheduleContent,
    keepAppointment,
    technicanArrival,
    mrngSlot,
    noonSlot,
  } = useAppData('editAppointmentModal', true)
  const { isMissedAppointment, appointment, uuid, ticketNumber, ticketType } =
    serviceOrderDetails
  const TabScrollButton = (props: any) => {
    const { direction, ...other } = props
    return (
      <MaterialButton
        aria-label={direction === 'left' ? ' left arrow' : 'right arrow'}
        className={classes.scrollBtn}
        variant="link"
        style={{ display: other.disabled ? 'none' : 'flex' }}
        {...other}
      >
        {direction === 'left' ? (
          <ChevronLeft className={classes.scrollIcon} />
        ) : (
          <ChevronRight className={classes.scrollIcon} />
        )}
      </MaterialButton>
    )
  }

  const onSlotClickHandler = (slot: string) => {
    const temp: any = { ...times }
    if (!temp[slot].available) return
    temp[slot].selected = !temp[slot].selected
    Object.keys(temp).map((x: string) => {
      if (x !== slot) {
        temp[x].selected = false
      }
    })
    setTimes(temp)
  }

  const getAppointmentDetails = async () => {
    try {
      const payload = {
        ticketType,
        startDate: moment().format('YYYY-MM-DD'),
        numberOfDaysToSearch: 14,
        ticketNumber,
      }
      const availableAppointmentDetails =
        await APIClient.getOrderTicketAppointments(payload, uuid)
      return Array.isArray(
        availableAppointmentDetails?.data?.AppointmentList,
      ) &&
        availableAppointmentDetails?.data?.AppointmentList[0]
          ?.AppointmentStartDate !== ''
        ? availableAppointmentDetails?.data?.AppointmentList
        : []
    } catch (e) {
      dispatch(setOrderModal(OrderPageModals.TechnicalError))
    }
  }

  const setAppointmentsDateRange = async (
    appointmentDetails: IAppointment[],
  ) => {
    const sortDates = appointmentDetails?.sort(
      (x: IAppointment, y: IAppointment) => sortFunction(x, y),
    )
    const startDate =
      (sortDates && sortDates[0]?.AppointmentStartDate) || new Date()
    const endDate = sortDates && sortDates.slice(-1)[0]?.AppointmentEndDate
    const dateRange = getDates(startDate, endDate)
    const appointStartDate = appointment?.start
    const scheduledDate = appointStartDate
      ? moment(appointStartDate).format('YYYY-MM-DD')
      : moment()
    const dateRangeFormatted = dateRange.map((x, index) => {
      const onlyDate = moment(x).format('YYYY-MM-DD')
      let available = false
      if (
        sortDates?.find((y: any) =>
          y?.AppointmentStartDate?.startsWith(onlyDate),
        )
      ) {
        available = true
      }
      return {
        date: x,
        available,
        selected: isMissedAppointment
          ? index === 0
          : onlyDate === scheduledDate,
      }
    })
    setdates(dateRangeFormatted)
    return dateRangeFormatted
  }

  const formattedAppointments = (appointments: IAppointment[]) => {
    const result = appointments?.map((appointmentData: IAppointment) => {
      const data = {
        ...appointmentData,
        AppointmentStartDate:
          appointmentData.AppointmentStartDate.split('.')[0],
        AppointmentEndDate: appointmentData.AppointmentEndDate.split('.')[0],
        startDate: appointmentData.AppointmentStartDate,
        endDate: appointmentData.AppointmentEndDate,
      }
      return data
    })
    return result
  }

  const setInitialSlotsState = async (
    dates: IDates[],
    appointments: IAppointment[],
  ) => {
    const selectedDate = dates.filter((date) => {
      return date?.selected
    })
    const onlyDate = moment(selectedDate[0]?.date).format('YYYY-MM-DD')
    const morningSlot = appointments?.some((x: IAppointment) =>
      moment(x.AppointmentStartDate).isSame(moment(`${onlyDate}T08:00:00`)),
    )
    const afternoonSlot = appointments?.some((x: IAppointment) =>
      moment(x.AppointmentStartDate).isSame(moment(`${onlyDate}T13:00:00`)),
    )
    setTimes({
      slot1: { available: morningSlot, selected: false },
      slot2: { available: afternoonSlot, selected: false },
    })
  }
  const getAppointments = async () => {
    try {
      const result: IAppointment[] = await getAppointmentDetails()
      const appointmentsDetails = formattedAppointments(result)
      setAppointments(appointmentsDetails)
      const dateRanges = await setAppointmentsDateRange(appointmentsDetails)
      await setInitialSlotsState(dateRanges, appointmentsDetails)
    } catch {
      dispatch(setOrderModal(OrderPageModals.TechnicalError))
    }
  }

  const getClassForTime = (available: boolean, selected: boolean) => {
    if (!available) {
      return classes.BoxDisabled
    } else if (selected) {
      return classes.timeContentSelected
    }
  }

  const getConfirm = () => {
    const temp: any = { ...times }
    return !Object.keys(times).some((x: string) => temp[x]?.selected)
  }
  const submitAppointment = async (selectedAppointment: IAppointment) => {
    if (ticketType === TICKET_NUMBER) {
      DTMClient.triggerEvent(
        {
          events: 'event46, event14',
          eVar52: `TTS|updated appointment for ticket ${ticketNumber}`,
          eVar14: `${HELP_CENTER}/order-ticket-status:edit-appointment`,
        },
        'tl_o',
      )
    } else {
      DTMClient.triggerEvent(
        {
          events: 'event47, event14',
          eVar52: `OS|updated appointment for ticket ${ticketNumber}`,
          eVar14: `${HELP_CENTER}/order-ticket-status:edit-appointment`,
        },
        'tl_o',
      )
    }
    try {
      const payload = {
        ticketType,
        ticketNumber,
        startDate: selectedAppointment.startDate,
        endDate: selectedAppointment.endDate,
        scheduledCode: selectedAppointment.scheduleCode,
        appointmentCode: selectedAppointment.appointmentCode,
        action: 'Confirm',
      }
      setIsBusy(true)
      await APIClient.updateOrderTicketAppointment(payload, uuid)
      const updateOrders = orders.map((orderData: any) => {
        const order = { ...orderData }
        if (ticketNumber === order?.ticketNumber) {
          const badge =
            ticketType === TICKET_NUMBER
              ? ticketStatusBadgeMapping(`We've created your ticket`, 'BOBUPD')
              : orderStatusBadgeMapping(`We've created your order`, 'BOBUPD')
          order.badge = {
            ...badge,
          }
          order.appointment = {
            ...appointment,
            START_LOCAL: selectedAppointment.AppointmentStartDate,
            start: selectedAppointment.AppointmentStartDate,
            END_LOCAL: selectedAppointment.AppointmentEndDate,
            end: selectedAppointment.AppointmentEndDate,
          }
          order.isMissedAppointment = false
          order.appointmentFormatted = formatSchedule(order.appointment)
          dispatch(setOrderData(order))
        }
        return order
      })
      dispatch(
        setOrders({
          type: 'Success',
          data: updateOrders,
        }),
      )
      setIsBusy(false)
      dispatch(setOrderModal(OrderPageModals.EditAppointmentConfirmation))
    } catch (error: any) {
      setIsBusy(false)
      dispatch(setOrderModal(OrderPageModals.TechnicalError))
    }
  }
  const submitAppointmentHandler = async () => {
    if (dates.length > 0 && (times.slot1?.selected || times.slot2?.selected)) {
      const selectedDate = dates.find((x: IDates) => x.selected)
      if (selectedDate) {
        const onlyDate = moment(selectedDate.date).format('YYYY-MM-DD')
        let selectedSlot: string | null = null
        if (times.slot1?.selected) selectedSlot = `${onlyDate}T08:00:00`
        else if (times.slot2?.selected) selectedSlot = `${onlyDate}T13:00:00`
        const selectedAppointment = appointments?.find(
          (x: IAppointment) => x?.AppointmentStartDate === selectedSlot,
        )
        if (selectedAppointment) submitAppointment(selectedAppointment)
      }
    }
  }

  useEffect(() => {
    getAppointments()
  }, [])

  const handleKeepCurrentAppointment = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: `${HELP_CENTER}/order-ticket-status:keep-current-appointment`,
      },
      'tl_o',
    )
    dispatch(setOrderModal(OrderPageModals.Init))
  }

  const getSelectedDates = (dates: any) => {
    setdates(dates)
    setInitialSlotsState(dates, appointments)
  }

  const slotsView = () => {
    return (
      <div className={classes.selectTimeWrapper}>
        <Typography
          className={classes.selectTimeTitle}
          styleType="p1"
          fontType="boldFont"
        >
          {selectTimeTitle?.value}
        </Typography>
        <Typography styleType="p1" className={classes.technicianArrival}>
          {technicanArrival?.value}
        </Typography>
        <div className={classes.avaiableTimeWrap}>
          <Typography
            styleType="p1"
            className={clx(
              classes.timeContent,
              getClassForTime(times.slot1?.available, times.slot1?.selected),
            )}
            onClick={() => onSlotClickHandler('slot1')}
          >
            <>
              {times.slot1?.selected && (
                <DoneIcon className={classes.doneIcon} />
              )}
              {mrngSlot?.value}
            </>
          </Typography>
          <Typography
            styleType="p1"
            className={clx(
              classes.timeContent,
              getClassForTime(times.slot2?.available, times.slot2?.selected),
            )}
            onClick={() => onSlotClickHandler('slot2')}
          >
            <>
              {times.slot2?.selected && (
                <DoneIcon className={classes.doneIcon} />
              )}
              {noonSlot?.value}
            </>
          </Typography>
        </div>
      </div>
    )
  }

  const classes = useStyles()
  return (
    <>
      {dates.length > 0 ? (
        <>
          <Calendar
            datesArray={dates}
            TabScrollButton={TabScrollButton}
            selectDateTitle={selectDateTitle?.value}
            getSelectedDates={getSelectedDates}
          />
          {slotsView()}
          <Button
            className={classes.confirmBtn}
            type="button"
            text="Confirm"
            disabled={getConfirm()}
            isBusy={isBusy}
            onClick={submitAppointmentHandler}
          ></Button>
          {!isMissedAppointment && (
            <Typography styleType="p3" className={classes.rescheduleContent}>
              <>
                {rescheduleContent?.value}&nbsp;
                <span>
                  <Button
                    className={classes.keepSameAppointmentLink}
                    type="button"
                    variant="lite"
                    text={keepAppointment?.value}
                    onClick={handleKeepCurrentAppointment}
                  />
                </span>
              </>
            </Typography>
          )}
        </>
      ) : (
        <div className={classes.loader}>
          <Loading className={classes.loading} />
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  selectDateWrapper: {
    margin: '0rem 0 1rem',
  },
  BoxDisabled: {
    cursor: 'not-allowed',
    background: colors.main.newBackgroundGray,
    '& .BoxMonth': {
      color: `${colors.main.borderGrey}`,
    },
    '& .BoxDate': {
      color: `${colors.main.borderGrey}`,
    },
  },

  selectTimeWrapper: {
    margin: '2rem 0',
  },
  selectTimeTitle: {
    marginBottom: 8,
  },
  technicianArrival: {
    marginBottom: 16,
  },
  avaiableTimeWrap: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '0.5em',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      gap: '1rem',
      flexDirection: 'column',
    },
  },
  timeContent: {
    width: '15rem',
    alignItems: 'center',
    borderRadius: '6.25rem',
    height: '48px',
    justifyContent: 'center',
    display: 'flex',
    border: `1px solid  ${colors.main.borderGrey}`,
    cursor: 'pointer',
    gap: '0.625rem',
    '&:hover ': {
      backgroundColor: colors.main.brightRed,
      color: colors.main.white,
    },
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  timeContentSelected: {
    backgroundColor: colors.main.black,
    color: colors.main.blue,
    '&:hover ': {
      backgroundColor: colors.main.black,
      color: colors.main.blue,
    },
  },
  doneIcon: {
    fill: `${colors.main.blue}`,
  },
  confirmBtn: {
    margin: '1rem auto 2.5rem auto',
    [breakpoints.down('sm')]: {
      margin: '1rem auto 1em',
    },
  },
  scrollBtn: {
    minWidth: '3rem',
    padding: 0,
  },
  scrollIcon: {
    width: '1rem',
    height: '2rem',
  },
  loader: {
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
  rescheduleContent: {
    marginBottom: '1rem',
    [breakpoints.down('sm')]: {
      marginBottom: '1rem',
      fontSize: 14,
      lineHeight: '18px',
      '& span': {
        display: 'block',
      },
    },
  },
  keepSameAppointmentLink: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    height: 'unset',
    fontSize: 14,
    lineHeight: '18px',
    textDecoration: 'underline',
    fontFamily: PP_OBJECT_SANS_MEDIUM,
    [breakpoints.down('sm')]: {
      marginTop: 4,
    },
  },
}))

export default UpdateAppointment
