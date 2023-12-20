import colors from '@/shared-ui/colors'
import {
  useSelectedUnprovisionedService,
  useWelcomePageData,
} from 'src/selector-hooks'
import DoneIcon from '@material-ui/icons/Done'
import { Loading } from '@/shared-ui/components'
import { IAppointment, IDates, ITimes, WelcomePageModals } from '../types'
import { Button, Typography } from '@/shared-ui/components'
import { makeStyles, Tabs, Button as MaterialButton } from '@material-ui/core'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { getDates, sortFunction } from '../helper'
import clx from 'classnames'
import APIClient from 'src/api-client'
import { ChevronLeft, ChevronRight } from '@/shared-ui/react-icons/index'
import useAppData from '@/shared-ui/hooks/useAppData'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import {
  WELCOME_EDIT_APPOINTMENT_CONFIRM,
  WELCOME_EDIT_APPOINTMENT_KEEP_CURRENT,
  SITE_INTERACTION,
  SITE_ERROR,
  FORM_ERROR,
  WELCOME_EDIT_APPOINTMENT_MODAL,
} from 'src/constants'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { welcomeSlice } from 'src/redux/slicers'
import { useDispatch } from 'react-redux'

const UpdateAppointment = () => {
  const classes = useStyles()
  const {
    selectDateTitle,
    selectTimeTitle,
    reschuduleContent,
    keepAppointment,
    technicanArrival,
    mrngSlot,
    noonSlot,
  } = useAppData('EditAppointmentModal', true) || {}
  const dispatch = useDispatch()
  const { unprovisionedServiceOrder } = useWelcomePageData()
  const unprovisionedServiceId = useSelectedUnprovisionedService()?.id

  const [dates, setdates] = useState<IDates[]>([])
  const [times, setTimes] = useState<ITimes>({
    slot1: { available: false, selected: false },
    slot2: { available: false, selected: false },
  })
  const [appointment, setAppointments] = useState<IAppointment[]>([])
  const [isBusy, setIsBusy] = useState<boolean>(false)

  useEffect(() => {
    getAppointments()
  }, [])

  if (!unprovisionedServiceOrder) {
    return null
  }

  const setModal = (value: WelcomePageModals) =>
    dispatch(welcomeSlice.actions.setModal(value))

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

  const onDateClickHandler = (item: IDates) => {
    const temp = dates.map((x: IDates) => {
      if (x.date === item.date) {
        x.selected = true
      } else {
        x.selected = false
      }
      return x
    })

    setdates(temp)
    const onlyDate = moment(new Date(item?.date)).format('YYYY-MM-DD')
    const getTime = appointment.filter((x: IAppointment) =>
      x.startDate.startsWith(onlyDate),
    )
    const morningSlot = getTime?.some((x: IAppointment) =>
      moment(x.startDate).isSame(`${onlyDate}T08:00:00`),
    )
    const afternoonSlot = getTime?.some((x: IAppointment) =>
      moment(x.startDate).isSame(`${onlyDate}T13:00:00`),
    )
    setTimes({
      slot1: { available: morningSlot, selected: false },
      slot2: { available: afternoonSlot, selected: false },
    })
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
      const availableAppointmentDetails = await APIClient.getAppointmentDetails(
        unprovisionedServiceId,
        unprovisionedServiceOrder?.id,
        moment().format('YYYY-MM-DD'),
      )
      setAppointments(availableAppointmentDetails?.data || [])
      return availableAppointmentDetails?.data || []
    } catch (e) {
      setModal(WelcomePageModals.TechnicalError)
    }
  }

  const setAppointmentsDateRange = async (
    appointmentDetails: IAppointment[],
  ) => {
    const sortDates = appointmentDetails.sort(
      (x: IAppointment, y: IAppointment) => sortFunction(x, y),
    )

    const startDate = sortDates[0]?.startDate || new Date()
    const endDate = sortDates.slice(-1)[0]?.startDate
    const dateRange = getDates(startDate, endDate)
    const dateRangeFormatted = dateRange.map((x, index) => {
      const onlyDate = moment(new Date(x)).format('YYYY-MM-DD')
      let available = false
      if (
        sortDates.find((y: { startDate: string }) =>
          y.startDate.startsWith(onlyDate),
        )
      ) {
        available = true
      }
      return {
        date: x,
        available,
        selected: index === 0,
      }
    })
    setdates(dateRangeFormatted)
    return dateRangeFormatted
  }

  const setInitialSlotsState = async (
    appointmentDetails: IAppointment[],
    dateRangeFormatted: IDates[],
  ) => {
    const onlyDate = moment(new Date(dateRangeFormatted[0]?.date)).format(
      'YYYY-MM-DD',
    )
    const morningSlot = appointmentDetails.some((x: IAppointment) =>
      moment(x.startDate).isSame(`${onlyDate}T08:00:00`),
    )
    const afternoonSlot = appointmentDetails.some((x: IAppointment) =>
      moment(x.startDate).isSame(`${onlyDate}T13:00:00`),
    )
    setTimes({
      slot1: { available: morningSlot, selected: false },
      slot2: { available: afternoonSlot, selected: false },
    })
  }
  const getAppointments = async () => {
    try {
      const appointmentsDetails = await getAppointmentDetails()
      const dateRangeFormatted = await setAppointmentsDateRange(
        appointmentsDetails,
      )
      await setInitialSlotsState(appointmentsDetails, dateRangeFormatted)
    } catch (error) {
      console.error(error)
    }
  }

  const getClassForDate = (available: boolean, selected: boolean) => {
    if (!available) {
      return classes.BoxDisabled
    } else if (selected) {
      return classes.BoxSelected
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
    try {
      const payload = {
        serviceId: unprovisionedServiceId,
        id: unprovisionedServiceOrder.id,
        appointment: selectedAppointment,
      }
      setIsBusy(true)
      const submitData = await APIClient.editAppointmentDetails(payload)
      const updatedOrderDetailsData = {
        ...unprovisionedServiceOrder,
        appointment: { ...unprovisionedServiceOrder.appointment },
      }
      updatedOrderDetailsData.appointment.startDate =
        selectedAppointment.startDate
      updatedOrderDetailsData.appointment.endDate = selectedAppointment.endDate
      dispatch(welcomeSlice.actions.updateServiceOrder(updatedOrderDetailsData))
      setIsBusy(false)
      DTMClient.triggerEvent(
        {
          events: 'event14,event23',
          eVar14: WELCOME_EDIT_APPOINTMENT_CONFIRM,
        },
        'tl_o',
        SITE_INTERACTION,
      )
      setModal(WelcomePageModals.AppointmentConfirmation)
      return submitData.data
    } catch (error: any) {
      setIsBusy(false)
      const isInternalServerError = /^5\d{2}$/.test(
        `${error?.response?.status}`,
      )
      if (isInternalServerError) {
        setModal(WelcomePageModals.TechnicalError)
        DTMClient.triggerEvent(
          {
            pageName: WELCOME_EDIT_APPOINTMENT_MODAL,
            events: 'event88',
            eVar88:
              error?.response?.data ||
              'Something went wrong on our end. Please try again in a few minutes',
          },
          'tl_o',
          SITE_ERROR,
        )
      } else {
        setModal(WelcomePageModals.AppointmentError)
        DTMClient.triggerEvent(
          {
            pageName: WELCOME_EDIT_APPOINTMENT_MODAL,
            events: 'event48',
            eVar48: 'Welcome:Please select a valid date',
          },
          'tl_o',
          FORM_ERROR,
        )
      }
    }
  }
  const submitAppointmentHandler = () => {
    if (dates.length > 0 && (times.slot1?.selected || times.slot2?.selected)) {
      const selectedDate = dates.find((x: IDates) => x.selected)
      if (selectedDate) {
        const onlyDate = moment(new Date(selectedDate.date)).format(
          'YYYY-MM-DD',
        )
        let selectedSlot: string | null = null
        if (times.slot1?.selected) selectedSlot = `${onlyDate}T08:00:00`
        else if (times.slot2?.selected) selectedSlot = `${onlyDate}T13:00:00`

        const selectedAppointment = appointment.find(
          (x: IAppointment) => x.startDate === selectedSlot,
        )
        if (selectedAppointment) submitAppointment(selectedAppointment)
      }
    }
  }

  const handleKeepCurrentAppointment = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: WELCOME_EDIT_APPOINTMENT_KEEP_CURRENT,
      },
      'tl_o',
      SITE_INTERACTION,
    )
    setModal(WelcomePageModals.Init)
  }

  const dateSelectorView = () => {
    return (
      <div className={classes.selectDateWrapper}>
        <Typography styleType="p1" fontType="boldFont">
          {selectDateTitle?.value}
        </Typography>
        <Tabs
          className={classes.tabContianer}
          variant={'scrollable'}
          scrollButtons={'auto'}
          ScrollButtonComponent={TabScrollButton}
          value={false}
        >
          {dates?.length > 0 && (
            <>
              {dates?.map((item: IDates, index: number) => (
                <div
                  tabIndex={index}
                  key={index}
                  role="tab"
                  className={clx(
                    classes.Box,
                    getClassForDate(item?.available, item?.selected),
                  )}
                  onClick={() => onDateClickHandler(item)}
                >
                  <Typography className={'BoxMonth'} fontType="boldFont">
                    {moment(new Date(item?.date)).format('MMM')}
                  </Typography>
                  <Typography className={'BoxDate'} fontType="boldFont">
                    {moment(new Date(item?.date)).format('DD')}
                  </Typography>
                  <Typography className={'BoxMonth'}>
                    {moment(new Date(item?.date)).format('ddd')}
                  </Typography>
                </div>
              ))}
            </>
          )}
        </Tabs>
      </div>
    )
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
  return (
    <>
      {dates.length > 0 ? (
        <>
          {dateSelectorView()}
          {slotsView()}
          <Button
            className={classes.confirmBtn}
            type="button"
            text="Confirm"
            disabled={getConfirm()}
            isBusy={isBusy}
            onClick={submitAppointmentHandler}
          ></Button>
          <Typography styleType="p3" className={classes.reschuduleContent}>
            <>
              {reschuduleContent?.value}&nbsp;
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
    margin: '1rem 0',
  },
  tabContianer: {
    height: '80px',
    margin: '0.5rem 2rem 0',
    [breakpoints.down('sm')]: {
      margin: '0.5rem 0.5rem 0',
    },
    '& .MuiTabs-flexContainer': {
      gap: '0.5rem',
    },
    '& .MuiTabs-scrollButtons': {
      minWidth: 'fit-content',
      padding: '6px',
      '&:hover ': {
        backgroundColor: colors.main.white,
        '& svg *': {
          stroke: colors.main.brightRed,
        },
      },
    },
  },
  Box: {
    minWidth: '5rem',
    height: '5rem',
    borderRadius: '.5rem',
    padding: '10px',
    border: `1px solid ${colors.main.borderGrey}`,
    cursor: 'pointer',
    '& .BoxMonth': {
      fontWeight: 900,
      fontSize: '0.75rem',
      lineHeight: '14px',
    },
    '& .BoxDate': {
      fontWeight: 900,
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
    [breakpoints.down('xs')]: {
      height: '4.5rem',
      minWidth: '4rem',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  BoxSelected: {
    background: 'black',
    color: 'white',
    '& .BoxMonth': {
      color: `${colors.main.blue} `,
    },
    '& .BoxDate': {
      color: `${colors.main.blue}`,
    },
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
    margin: '2rem 0 2rem',
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
    margin: '1rem auto',
    [breakpoints.down('sm')]: {
      margin: '1rem auto 1em',
    },
  },
  scrollBtn: {
    minWidth: '3rem',
    padding: 0,
  },
  scrollIcon: {
    width: '2rem',
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
  reschuduleContent: {
    marginBottom: '3rem',
    [breakpoints.down('sm')]: {
      marginBottom: '2rem',
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
