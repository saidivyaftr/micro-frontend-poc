import { makeStyles } from '@material-ui/core'
import { WarningIcon } from '@/shared-ui/react-icons'
import { Typography, Button } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import useAppData from '@/shared-ui/hooks/useAppData'

const SessionTimeoutModal = ({ handleClose }: { handleClose: () => void }) => {
  const classes = useStyles()
  const { title, closeButtonText } =
    useAppData('sessionTimeoutModal', true) || {}
  return (
    <div className={classes.root}>
      <div className={classes.warningIcon}>
        <WarningIcon />
      </div>
      <div className={classes.warningMessage}>
        <Typography tagType="h3" styleType="h5" data-tid="modal-title">
          {title?.title}
        </Typography>
      </div>
      <div className={classes.btnWrapper}>
        <Button
          type="button"
          variant="primary"
          hoverVariant="primary"
          text={closeButtonText?.value}
          onClick={handleClose}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '48px 0',
  },
  warningIcon: {
    width: 100,
    margin: '0 auto',
  },
  warningMessage: {
    margin: '20px 48px',
    marginBottom: 0,
    textAlign: 'center',
  },
  btnWrapper: {
    width: 246,
    margin: '2rem auto 0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export default SessionTimeoutModal
