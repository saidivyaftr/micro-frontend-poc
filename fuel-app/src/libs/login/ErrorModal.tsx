import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import WarningIcon from '@/shared-ui/react-icons/warning'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { useAppData } from 'src/hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { SITE_ERROR } from 'src/constants'

const SystemError = ({ showSystemErrorModal }: any) => {
  const systemErrorContent = useAppData('SystemErrorContent', true) || {}
  const classes = useStyles()
  const [openModal, setOpenModal] = useState(true)
  const hasDTMLLoaded = useSelector(
    (state: any) => state?.appConfig?.configs?.['DTM'],
  )

  useEffect(() => {
    if (hasDTMLLoaded) {
      DTMClient.triggerEvent(
        { events: 'event88', eVar88: systemErrorContent?.description?.value },
        'tl_o',
        SITE_ERROR,
      )
    }
  }, [hasDTMLLoaded])

  const closeDailog = () => {
    setOpenModal(false)
  }
  return (
    <Dialog
      open={showSystemErrorModal && openModal}
      PaperProps={{ style: { borderRadius: 32, margin: 16 } }}
    >
      <IconButton
        aria-label="close"
        className={classes.closeIcon}
        onClick={closeDailog}
      >
        <CloseIcon />
      </IconButton>

      <div className={classes.container}>
        <div className={classes.errorIcon}>
          <WarningIcon />
        </div>

        <Typography tagType="h5" styleType="h5">
          {systemErrorContent?.title?.value}
        </Typography>

        <Typography tagType="p" styleType="p2">
          {systemErrorContent.description.value}
        </Typography>

        <div className={classes.closeBtn}>
          <Button
            type="button"
            variant="primary"
            hoverVariant="primary"
            text="Close"
            onClick={closeDailog}
          />
        </div>
      </div>
    </Dialog>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    width: '100%',
    textAlign: 'center',
    margin: '0 auto',
    padding: 32,
    [breakpoints.up('sm')]: {
      padding: 48,
      width: 552,
    },
  },

  errorIcon: {
    textAlign: 'center',
    marginBottom: 32,
    '& svg': {
      width: 100,
      height: 100,
    },
    [breakpoints.up('sm')]: {
      textAlign: 'center',
      marginBottom: 32,
    },
  },
  closeIcon: {
    right: 20,
    top: 20,
    margin: '0 0 0 auto',
    [breakpoints.up('sm')]: {
      position: 'absolute',
      right: 40,
      top: 40,
    },
  },

  closeBtn: {
    width: '100%',
    margin: '32px auto',
    [breakpoints.up('sm')]: {
      width: 246,
      margin: '32px auto',
      '& button': {
        width: '100%',
      },
    },
  },
}))

export default SystemError
