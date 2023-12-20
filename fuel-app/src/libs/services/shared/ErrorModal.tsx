import { makeStyles } from '@material-ui/core'
import { Typography, Button } from '@/shared-ui/components'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import colors from '@/shared-ui/colors'
import { useSelector, useDispatch } from 'react-redux'
import { appErrorsSlice } from 'src/redux/slicers'
import useAppData from '@/shared-ui/hooks/useAppData'

const SystemError = () => {
  const isServicesError = useSelector((state: any) => state?.appErrors.isError)
  const SystemErrorContent = useAppData('SystemErrorContent', true)
  const classes = useStyles()
  const dispatch = useDispatch()

  const closeErrorDailog = () => {
    dispatch(appErrorsSlice.actions.clearError())
  }

  return (
    <Dialog open={isServicesError} fullWidth={true} maxWidth={'sm'}>
      <div className={classes.container}>
        <div>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={closeErrorDailog}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Typography tagType="h5" styleType="h5">
          {SystemErrorContent.title?.value}
        </Typography>
        <Typography className={classes.description} tagType="p" styleType="p1">
          {SystemErrorContent.description?.value}
        </Typography>
        <Button
          type="button"
          variant="primary"
          hoverVariant="primary"
          onClick={closeErrorDailog}
          text={SystemErrorContent.closeButton?.value}
        />
      </div>
    </Dialog>
  )
}

export default SystemError

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    backgroundColor: colors.main.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px 80px',
    [breakpoints.down('xs')]: {
      padding: 32,
    },
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  description: {
    margin: '16px 0 32px 0',
  },
}))
