import { useEffect, useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography, Button } from 'src/blitz'
import { useVacationServicesInfo } from 'src/selector-hooks'
import clx from 'classnames'
import { useAppData } from 'src/hooks'
import useChatState from '@/shared-ui/hooks/useChatState'
import colors from '@/shared-ui/colors'
import VacationTimeLine from './VacationTimeLine'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import VacationServiceModal from './VacationServiceModal'
import { VacationServiceModals } from './types'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'
export const SCHEDULED = 'scheduled'
export const PAUSED = 'paused'
const VacationServicesInfo = () => {
  const {
    servicePaused,
    scheduledNote,
    pausedNote,
    turnOff,
    turnOffVacationService,
    cancelVacationService,
    cancelVacation,
    chatWithUs,
    changeEndDate,
    servicePausedScheduled,
  } = useAppData('vacationPause', true)
  const classes = useStyles()
  const { setChatState } = useChatState()
  const [modal, setModal] = useState(VacationServiceModals.Init)
  const [vacationType, setVacationType] = useState('')
  const { data: vacationServicesInfo } = useVacationServicesInfo()
  const { width } = useWindowDimensions()
  useEffect(() => {
    const { vacationStatus = '' } = vacationServicesInfo
    if (vacationStatus === 'On') {
      setVacationType(PAUSED)
    } else if (vacationStatus === 'Pending') {
      setVacationType(SCHEDULED)
    }
  }, [vacationServicesInfo])
  const handleTurnOff = () => {
    setModal(
      vacationType === SCHEDULED
        ? VacationServiceModals.CancelConfirmation
        : VacationServiceModals.Confirmation,
    )
  }
  const buttonName = useMemo(() => {
    const isMobile = width < 768
    if (vacationType === SCHEDULED)
      return isMobile ? cancelVacation?.value : cancelVacationService?.value
    else return isMobile ? turnOff?.value : turnOffVacationService?.value
  }, [width, vacationType])
  if (![PAUSED, SCHEDULED].includes(vacationType)) return null
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.startWrapper}>
          <Typography styleType="h5" tagType="h4">
            {vacationType === SCHEDULED
              ? servicePausedScheduled?.value
              : servicePaused?.value}
          </Typography>
          <InjectHTML
            styleType="p2"
            tagType="p"
            value={
              vacationType === SCHEDULED
                ? scheduledNote?.value
                : pausedNote?.value
            }
            className={clx(classes.description)}
          />
        </div>
        <div className={classes.centerWrapper}>
          <VacationTimeLine />
        </div>
        <div className={classes.endWrapper}>
          {vacationType === PAUSED && (
            <Button
              type="button"
              text={buttonName}
              onClick={handleTurnOff}
              className={classes.pauseBtn}
            />
          )}
          <Typography
            tagType="p"
            styleType="p2"
            className={clx(classes.description, classes.chatDescription)}
          >
            <>
              {changeEndDate?.value}&nbsp;
              <a onClick={() => setChatState(true)}>{chatWithUs?.value}</a>.
            </>
          </Typography>
        </div>
      </div>
      <VacationServiceModal
        modal={modal}
        setModal={setModal}
        setVacationType={setVacationType}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    padding: '2rem',
    borderRadius: '1rem',
    backgroundColor: colors.main.white,
    marginBottom: '1rem',
    [breakpoints.down('xs')]: {
      padding: '2rem 1rem',
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  startWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  description: {
    margin: 0,
    '& a': {
      textDecoration: 'underline',
      cursor: 'pointer',
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  chatDescription: {
    marginTop: '1rem',
  },
  centerWrapper: {},
  endWrapper: {},
  pauseBtn: {
    marginTop: '2rem',
  },
}))

export default VacationServicesInfo
