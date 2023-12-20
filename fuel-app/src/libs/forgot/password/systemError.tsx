import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
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
  const closeDailog = () => {
    setOpenModal(!openModal)
  }

  useEffect(() => {
    if (hasDTMLLoaded) {
      DTMClient.triggerEvent(
        { events: 'event88', eVar88: systemErrorContent?.description?.value },
        'tl_o',
        SITE_ERROR,
      )
    }
  }, [hasDTMLLoaded])

  return (
    <Dialog
      open={showSystemErrorModal && openModal}
      PaperProps={{ style: { borderRadius: 32, margin: 16 } }}
    >
      <div>
        <IconButton
          aria-label="close"
          className={classes.closeIcon}
          onClick={closeDailog}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.pageContainer}>
        <div className={classes.errorIcon}>
          <WarningIcon />
        </div>

        <div className={classes.topSection}>
          <Typography tagType="h5" styleType="h3">
            {systemErrorContent?.title?.value}
          </Typography>

          <Typography tagType="p" styleType="p2">
            {systemErrorContent?.description?.value}
          </Typography>
        </div>
      </div>
    </Dialog>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  pageContainer: {
    width: '100%',
    textAlign: 'center',
    margin: '0 auto',
    padding: 32,
  },
  pageContent: {
    width: 776,
    [breakpoints.up('sm')]: {
      width: 776,
      padding: '40px 80px',
    },
  },

  topSection: {
    padding: '32px 0',
  },
  bottomSection: {
    width: '90%',
    textAlign: 'center',
  },
  errorIcon: {
    textAlign: 'center',
    '& svg': {
      width: 100,
      height: 100,
    },
    [breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: 40,
    },
  },
  closeIcon: {
    display: 'block',
    right: 20,
    top: 20,
    margin: '0 0 0 auto',
    [breakpoints.up('sm')]: {
      position: 'absolute',
      right: 40,
      top: 40,
    },
  },
}))

export default SystemError
