import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { QuestionMarkCircle } from '@/shared-ui/react-icons'
import { VacationServiceModals } from './types'
import { Button } from '@/shared-ui/components'
import APIClient from 'src/api-client'
import { useActiveAccountUuid } from 'src/selector-hooks'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAccountVacationServicesbyUUID } from 'src/redux/slicers/account'
import { useAppData } from 'src/hooks'
import { SITE_ERROR } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const VacationServieOffConfirmation = ({ setModal, setVacationType }: any) => {
  const classes = useStyles()
  const { cancelTitle, cancelNote, cancel, keepOn } = useAppData(
    'vacationPauseModal',
    true,
  )
  const [loading, setLoading] = useState(false)
  const activeAccountUuid = useActiveAccountUuid()
  const dispatch = useDispatch()
  const turnOffVacation = async () => {
    try {
      setLoading(true)
      await APIClient.updateVacationServices(activeAccountUuid, {
        enable: false,
      })
      setVacationType('')
      dispatch(fetchAccountVacationServicesbyUUID(activeAccountUuid))
      setModal(VacationServiceModals.CancelSuccess)
    } catch {
      setModal(VacationServiceModals.TechnicalError)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'account access:vacation service',
          eVar88: 'Failed to fetch account vacation services',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    setLoading(false)
  }
  return (
    <div className={classes.container}>
      <QuestionMarkCircle />
      <div>
        <Typography
          styleType="h4"
          tagType="h3"
          className={classes.title}
          testId="test-title"
        >
          {cancelTitle?.value}
        </Typography>
        <Typography
          styleType="p1"
          testId="test-description"
          className={classes.description}
        >
          {cancelNote?.value}
        </Typography>
      </div>
      <div className={classes.btnWrapper}>
        <Button
          type="button"
          text={cancel?.value}
          variant="primary"
          onClick={turnOffVacation}
          isBusy={loading}
        />
        <Button
          type="button"
          text={keepOn?.value}
          variant="tertiary"
          onClick={() => {
            setModal(VacationServiceModals.Init)
          }}
          disabled={loading}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    padding: '1.5rem 3rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '2rem',
    [breakpoints.down('xs')]: {
      padding: '.5rem',
      gap: '1rem',
    },
  },
  title: {
    margin: '0',
  },
  description: {
    marginTop: '1rem',
  },
  btnWrapper: {
    display: 'flex',
    gap: '2rem',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: '1rem',
      width: '100%',
    },
  },
}))

export default VacationServieOffConfirmation
