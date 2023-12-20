import { useEffect, useState } from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import TechnicalErrorIcon from '@/shared-ui/react-icons/technical-error-icon'
import { accountPaused } from './sitecore-mock'
import { useActiveAccountId } from 'src/selector-hooks'
import ModalWrapper from './ModalWrapper'
import colors from '@/shared-ui/colors'
import { parseCookies, setCookie } from 'nookies'
import { ONE_DAY } from 'src/constants'
import { useVacationServicesInfo } from 'src/selector-hooks'
import ModalCloseIcon from '@/shared-ui/react-icons/modalClose'
import { useChatState } from 'src/hooks'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { getFormattedDate } from 'src/libs/account/helper'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import {
  VACATION_SERVICES_PAGES,
  UNVERIFIED_SERVICE_AREA,
  VISITOR,
} from 'src/constants'
type IVacationType = '' | 'paused' | 'scheduled'

export const checkVacationDate = (startDate: string, endDate: string) => {
  const today = moment()
  const vacationStart = moment(startDate)
  const vacationEnd = moment(endDate)
  const startDays = moment(vacationStart).diff(today, 'days')
  if (vacationStart.isSameOrBefore(today) && vacationEnd.isAfter(today)) {
    return 'paused'
  } else if (startDays <= 7) {
    return 'scheduled'
  } else return ''
}

const VacationServices = () => {
  const classes = useStyles()
  const [vacationType, setVacationType] = useState<IVacationType>('')
  const { data: vacationServicesInfo } = useVacationServicesInfo()
  const { setChatState, setChatParams } = useChatState()
  const accountId = useActiveAccountId()
  const {
    scheduleTitle,
    pauseTitle,
    scheduledDescription,
    pauseDescription,
    chat,
    close,
    noteText,
    notelink,
  } = accountPaused
  const [description, setDescription] = useState('')

  const openChat = () => {
    setChatParams({ launchOption: 'AccountPage_VacationChange' })
    setChatState(true)
    closeVacationModal()
  }

  useEffect(() => {
    const {
      vacationStatus = '',
      vacationPauseStartDate = '',
      vacationPauseEndDate = '',
      scheduledVacationPauseStartDate = '',
      scheduledVacationPauseEndDate = '',
    } = vacationServicesInfo
    const { vacationservice } = parseCookies()
    const vacationAccountIds = vacationservice ? vacationservice.split('#') : []
    if (
      !vacationAccountIds.includes(accountId) &&
      (vacationStatus === 'On' || vacationStatus === 'Pending')
    ) {
      if (vacationStatus === 'On') {
        const description = pauseDescription?.value
          ?.replace('{startDate}', getFormattedDate(vacationPauseStartDate))
          .replace('{endDate}', getFormattedDate(vacationPauseEndDate))
        setDescription(description)
        DTMClient.triggerEvent({
          pageName: VACATION_SERVICES_PAGES.SERVICE_PAUSED,
          eVar22: VISITOR,
          eVar49: UNVERIFIED_SERVICE_AREA,
        })
        setVacationType('paused')
      }
      if (vacationStatus === 'Pending') {
        const description = scheduledDescription?.value
          ?.replace(
            '{startDate}',
            getFormattedDate(scheduledVacationPauseStartDate),
          )
          .replace('{endDate}', getFormattedDate(scheduledVacationPauseEndDate))
        setDescription(description)
        DTMClient.triggerEvent({
          pageName: VACATION_SERVICES_PAGES.SERVICE_SCHEDULED,
          eVar22: VISITOR,
          eVar49: UNVERIFIED_SERVICE_AREA,
        })
        setVacationType('scheduled')
      }
      const updatedVacationIds = Array.isArray(vacationAccountIds)
        ? [...vacationAccountIds, accountId].join('#')
        : accountId
      setCookie(null, 'vacationservice', updatedVacationIds, {
        maxAge: ONE_DAY,
        path: '/',
      })
    }
  }, [vacationServicesInfo])

  const closeVacationModal = () => {
    setVacationType('')
  }

  if (!vacationType) return null

  return (
    <ModalWrapper
      isOpen={Boolean(vacationType)}
      handleClose={closeVacationModal}
      modalContent={
        <>
          <div className={classes.modalIconWrapper}>
            <ModalCloseIcon
              strokeWidth="4"
              color={colors.main.black}
              onClick={closeVacationModal}
              className={classes.closeIcon}
            />
          </div>
          <div className={classes.container}>
            <TechnicalErrorIcon className={classes.warningIcon} />
            <Typography
              styleType="h4"
              className={classes.title}
              testId="test-title"
            >
              {vacationType === 'paused'
                ? pauseTitle?.value
                : scheduleTitle?.value}
            </Typography>
            <Typography
              className={classes.description}
              styleType="p1"
              testId="test-warning"
            >
              {description}
            </Typography>
            <span tabIndex={0} className={classes.removeModalBtnFocus}>
              &nbsp;
            </span>
            <div className={classes.buttonContainer}>
              <Button type="button" text={chat?.value} onClick={openChat} />
              <Button
                variant="tertiary"
                type="button"
                hoverVariant="secondary"
                text={close?.value}
                onClick={closeVacationModal}
              />
            </div>
            <Button
              className={classes.learnMore}
              type="link"
              variant="lite"
              href={notelink?.value}
              text={noteText?.value}
              target="_blank"
              triggerEvent={true}
              eventObj={{
                events: 'event14',
                eVar14:
                  vacationType === 'paused'
                    ? VACATION_SERVICES_PAGES.PAUSED_LEARNMORE
                    : VACATION_SERVICES_PAGES.SCHEDULED_LEARNMORE,
              }}
            />
          </div>
        </>
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    padding: '5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      padding: '2rem 1rem',
    },
  },
  title: {
    marginTop: '2rem',
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
    margin: '2rem 0',
    flexDirection: 'row',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '100%',
      marginBottom: 16,
    },
  },
  learnMore: {
    height: 'unset',
    textDecoration: 'underline',
    fontFamily: PP_OBJECT_SANS_MEDIUM,
    lineHeight: '26px',
    [breakpoints.down('sm')]: {
      marginTop: 4,
      fontSize: 16,
      lineHeight: '24px',
    },
  },
  modalIconWrapper: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  closeIcon: {
    width: '3rem',
    height: '3rem',
    cursor: 'pointer',
    [breakpoints.down('sm')]: {
      width: '1.5rem',
      height: '1.5rem',
    },
    '&:hover': {
      '& path': {
        fill: colors.main.brightRed,
      },
    },
  },
  removeModalBtnFocus: {
    display: 'hidden',
    height: 0,
    outline: 0,
  },
  warningIcon: {
    height: 80,
    width: 80,
    [breakpoints.down('xs')]: {
      height: 64,
      width: 64,
    },
  },
}))

export default VacationServices
