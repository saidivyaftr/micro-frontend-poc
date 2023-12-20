import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import { TickCircle } from '@/shared-ui/react-icons'
import { useAppData } from 'src/hooks'
import { VacationServiceModals } from './types'
const CancelSuccessContent = ({ setModal }: any) => {
  const classes = useStyles()
  const { cancelled, cancelledNote, close } = useAppData(
    'vacationPauseModal',
    true,
  )
  return (
    <div className={classes.container}>
      <TickCircle />
      <div className={classes.description}>
        <Typography styleType="h5" tagType="h5" testId="test-title">
          {cancelled?.value}
        </Typography>
        <Typography styleType="p1" testId="test-note">
          {cancelledNote?.value}
        </Typography>
      </div>
      <div className={classes.btnWrapper}>
        <Button
          type="button"
          text={close?.value}
          variant="primary"
          onClick={() => {
            setModal(VacationServiceModals.Init)
          }}
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
      padding: '0',
      gap: '1rem',
    },
  },
  description: {
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
    '& h5': {
      margin: 0,
    },
  },
  btnWrapper: {
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default CancelSuccessContent
