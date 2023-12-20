/* eslint-disable prettier/prettier */
import { useVacationServicesInfo } from 'src/selector-hooks'
import { WifiCircle, WifiCropCircle } from '@/shared-ui/react-icons'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { getFormattedDate } from 'src/libs/account/welcome/helper'
import { Typography } from '@/shared-ui/components'
import clsx from 'classnames'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { useRef } from 'react'

function clampNumber(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max)
}

const VacationTimeLine = () => {
  const classes = useStyles()
  const { startDate, endDate, servicePause, serviceResume } = useAppData(
    'vacationPause',
    true,
  )
  const { width } = useWindowDimensions()
  const isMobile = width < 768
  const [barWidth, setBarWidth] = useState(0)
  const [bannerWidth, setBannerWidth] = useState(0)
  const barRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const progressBar = barRef?.current
    const banner = bannerRef?.current
    let progressBarObserver: any
    let bannerObserver: any
    if (progressBar) {
      progressBarObserver = new ResizeObserver((entries) => {
        setBarWidth(entries[0].contentRect.width)
      })
      progressBarObserver.observe(progressBar)
    }
    if (banner) {
      bannerObserver = new ResizeObserver(() => {
        setBannerWidth(banner?.offsetWidth ?? 0)
      })
      bannerObserver.observe(banner)
    }
    return () => {
      progressBarObserver.disconnect()
      bannerObserver.disconnect()
    }
  }, [])
  const { data: vacationServicesInfo } = useVacationServicesInfo()
  const [serviceDate, setServiceDate] = useState({
    start: '',
    end: '',
    totalDays: 0,
    daysCompleted: 0,
  })
  const dynamicStyles = useMemo(() => {
    const actualLineWidth = barWidth - 22
    if (vacationServicesInfo.vacationStatus === 'On') {
      const { totalDays, daysCompleted } = serviceDate
      const daysPercentage = actualLineWidth / totalDays
      const markerPosition = daysPercentage * daysCompleted
      const clampedMarkerPosition = clampNumber(markerPosition, 2, barWidth)
      const clampedBannerPosition = clampNumber((clampedMarkerPosition - (bannerWidth / 2.5)), -11, barWidth - (bannerWidth - 10))
      return {
        markerPosition: { left: `${clampedMarkerPosition}px` },
        bannerPosition: { left: `${clampedBannerPosition}px` },
        infoPosition: { left: `${clampedMarkerPosition}px` },
        carotPosition: {
          ...(daysCompleted > 0 && totalDays === daysCompleted
            ? {
              right: 14,
            }
            : {
              left: 14,
            }),
        },
        bar: {
          background: `linear-gradient(to right, ${colors.main.midnightExpress} ${clampedMarkerPosition}px, ${colors.main.midnightExpress} 0, ${colors.main.borderGrey} 0, ${colors.main.borderGrey} 100%)`,
        },
      }
    } else {
      return {
        markerPosition: { left: `${actualLineWidth / 2}px` },
        bannerPosition: {
          left: '50%',
          transform: 'translateX(-50%)',
        },
      }
    }
  }, [serviceDate, bannerWidth, barWidth, vacationServicesInfo.vacationStatus, isMobile])
  useEffect(() => {
    const {
      vacationStatus = '',
      vacationPauseStartDate = '',
      vacationPauseEndDate = '',
      scheduledVacationPauseStartDate = '',
      scheduledVacationPauseEndDate = '',
    } = vacationServicesInfo
    const totalDays = moment(
      vacationStatus === 'On'
        ? vacationPauseEndDate
        : scheduledVacationPauseEndDate,
    ).diff(
      vacationStatus === 'On'
        ? vacationPauseStartDate
        : scheduledVacationPauseStartDate,
      'days',
    )
    if (vacationStatus === 'On') {
      const daysCompleted = moment().diff(
        vacationServicesInfo?.vacationPauseStartDate,
        'days',
      )
      setServiceDate({
        start: getFormattedDate(vacationPauseStartDate),
        end: getFormattedDate(vacationPauseEndDate),
        totalDays,
        daysCompleted,
      })
    } else {
      setServiceDate({
        totalDays,
        daysCompleted: 0,
        start: getFormattedDate(scheduledVacationPauseStartDate),
        end: getFormattedDate(scheduledVacationPauseEndDate),
      })
    }
  }, [vacationServicesInfo])
  return (
    <div>
      <div className={classes.timeLineWrapper}>
        <WifiCropCircle />
        <div
          className={classes.horizontalLine}
          ref={barRef}
          style={dynamicStyles.bar}
        >
          {['Pending', 'On'].includes(vacationServicesInfo?.vacationStatus) && (
            <div
              className={classes.infoWrapper}
              ref={bannerRef}
              style={dynamicStyles.bannerPosition}
            >
              <Typography styleType="p4" fontType="boldFont">
                {vacationServicesInfo?.vacationStatus === 'On'
                  ? `Day ${serviceDate?.daysCompleted} of ${serviceDate?.totalDays}`
                  : `${serviceDate?.totalDays} days`}
              </Typography>
            </div>
          )}
          {vacationServicesInfo?.vacationStatus === 'On' && (
            <div
              className={classes.marker}
              style={dynamicStyles.markerPosition}
            >
              <div
                className={classes.infoCarrot}
              />
            </div>
          )}
        </div>
        <WifiCircle />
      </div>
      <div className={classes.legendContainer}>
        <div className={classes.legendWrapper}>
          <Typography tagType="h6" styleType="p2" fontType="mediumFont">
            {startDate?.value}
          </Typography>
          <Typography tagType="p" styleType="p3">
            {servicePause?.value}
          </Typography>
          <Typography tagType="p" styleType="p3">
            {serviceDate?.start}
          </Typography>
        </div>
        <div className={clsx(classes.legendWrapper, classes.legendRight)}>
          <Typography tagType="h6" styleType="p2" fontType="mediumFont">
            {endDate?.value}
          </Typography>
          <Typography tagType="p" styleType="p3">
            {serviceResume?.value}
          </Typography>
          <Typography tagType="p" styleType="p3">
            {serviceDate?.end}
          </Typography>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  timeLineWrapper: {
    marginTop: 70,
    display: 'flex',
    alignItems: 'center',
  },
  legendContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
  },
  legendWrapper: {
    display: 'flex',
    gap: '0.25rem',
    flexDirection: 'column',
    maxWidth: 182,
    '& h6, & p': {
      margin: 0,
    },
    [breakpoints.down('xs')]: {
      maxWidth: 100,
      '& p': {
        lineHeight: '0.875rem',
      },
    },
  },
  horizontalLine: {
    display: 'flex',
    height: 2,
    backgroundColor: colors.main.borderGrey,
    width: '100%',
    margin: '0 -2px',
    position: 'relative',
  },
  marker: {
    backgroundColor: colors.main.midnightExpress,
    width: 20,
    height: 20,
    borderRadius: '50%',
    position: 'absolute',
    top: -9,
  },
  infoWrapper: {
    height: 46,
    padding: '0 1rem',
    border: `1px solid ${colors.main.borderGrey}`,
    borderRadius: '0.5rem',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-flex',
    position: 'relative',
    margin: '1rem 0',
    left: 14,
    bottom: 88,
    background: colors.main.white,
    [breakpoints.down('xs')]: {
      padding: '0 0.75rem',
      height: 28,
      bottom: 71,
    },
  },
  infoCarrot: {
    width: 14,
    height: 14,
    position: 'absolute',
    bottom: 31,
    transform: 'rotate(45deg)',
    borderRight: `1px solid ${colors.main.borderGrey}`,
    borderBottom: `1px solid ${colors.main.borderGrey}`,
    left: 3,
    background: colors.main.white,
  },
  legendRight: {
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  tooltipContent: {
    width: 'fit-content',
  },
  tooltip: {
    '& svg': {
      opacity: 0,
    },
  },
}))

export default VacationTimeLine
