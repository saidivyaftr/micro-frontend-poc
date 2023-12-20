import { makeStyles } from '@material-ui/core'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { TickCircle } from '@/shared-ui/react-icons'
import { VacationServiceModals } from './types'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
const VacationServieOffConfirmation = ({ setModal }: any) => {
  const classes = useStyles()
  const { vacationServiceOff, disclaimer, note, close } = useAppData(
    'vacationPauseModal',
    true,
  )
  return (
    <div className={classes.container}>
      <TickCircle />
      <div className={classes.description}>
        <Typography styleType="h5" tagType="h5" testId="test-title">
          {vacationServiceOff?.value}
        </Typography>
        <Typography styleType="p1" testId="test-note">
          {note?.value}
        </Typography>
        <InjectHTML
          styleType="p1"
          testId="test-disclaimer"
          value={disclaimer?.value}
        />
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
    '& a': {
      textDecoration: 'underline',
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  btnWrapper: {
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default VacationServieOffConfirmation
