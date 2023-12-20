import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Loading, Typography } from '@/shared-ui/components'
import useAppData from '@/shared-ui/hooks/useAppData'
import moment from 'moment'
import { registerSlice } from 'src/redux/slicers/register'

const TimeoutMessage = ({ timeout }: { timeout: string }) => {
  const classes = useStyles()
  const securityTimeout = useAppData('securityTimeout', true)
  const [displayTime, setDisplayTime] = useState<null | {
    time: number
    unit: string
  }>(getDisplayTime(timeout)[0])
  const dispatch = useDispatch()

  useEffect(() => {
    const newInterval = setInterval(() => {
      const [updatedUnit, seconds] = getDisplayTime(timeout)
      setDisplayTime(updatedUnit)
      if (seconds <= 0 || !seconds) {
        dispatch(registerSlice.actions.resetRegistrationFlow())
        clearNewInterval()
      }
    }, 1000)

    const clearNewInterval = () => {
      clearInterval(newInterval)
    }
    if (!timeout) {
      clearNewInterval()
    }
    window.addEventListener('beforeunload', clearNewInterval)
    return () => {
      clearNewInterval()
      window.removeEventListener('beforeunload', clearNewInterval)
    }
  }, [timeout])

  return (
    <div>
      <Typography styleType="p2">{securityTimeout?.info1?.value}</Typography>
      <div className={classes.timeOutInfo}>
        {displayTime ? (
          <>
            <Typography styleType="h4">{`${displayTime.time}`}</Typography>
            <Typography styleType="h4">{displayTime.unit}</Typography>
          </>
        ) : (
          <Loading className={classes.loader} />
        )}
      </div>
    </div>
  )
}

const getDisplayTime = (
  timeout: string,
): [{ time: number; unit: string }, number] => {
  const currentTime = moment().toLocaleString() // Get current time
  const targetTime = moment(timeout, 'M/D/YYYY, hh:mm:ss A') // Parse the new time
  const duration = moment.duration(targetTime.diff(currentTime)) // Calculate the difference in duration
  const hours = duration.asHours()
  const minutes = duration.asMinutes()
  const seconds = duration.asSeconds()
  if (hours > 1) {
    return [
      {
        time: parseInt(`${Math.ceil(hours)}`),
        unit: 'Hours',
      },
      seconds,
    ]
  } else {
    return [
      {
        time: parseInt(`${Math.ceil(minutes)}`),
        unit: Math.ceil(minutes) === 1 ? 'Minute' : 'Minutes',
      },
      seconds,
    ]
  }
}

const useStyles = makeStyles(() => ({
  timeOutInfo: {
    marginTop: 32,
  },
  loader: {
    marginTop: 40,
  },
}))

export default TimeoutMessage
