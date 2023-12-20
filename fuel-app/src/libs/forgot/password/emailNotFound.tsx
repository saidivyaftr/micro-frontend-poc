import { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, Button } from '@/shared-ui/components'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@/shared-ui/react-icons/warning'
import { formatUrl } from 'src/utils/urlHelpers'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import { FORGOT_PAGES, CUSTOMER, SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const EmailNotFound = ({ showEmailNotFoundModal }: any) => {
  const emailNotFoundContent = useAppData('emailNotFoundContent', true) || {}
  const [openModal, setOpenModal] = useState(true)
  const classes = useStyles()
  const forgotIdUrl = { value: '/forgot-id' } //TODO add this value to sitecore

  const closeDialog = () => {
    setOpenModal(!openModal)
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'CLOSE DIALOG',
      },
      'tl_o',
      SITE_INTERACTION,
    )
  }

  const tryAgain = () => {
    setOpenModal(!openModal)
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'TRY AGAIN',
      },
      'tl_o',
      SITE_INTERACTION,
    )
  }

  const forgotEmail = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: 'FORGOT EMAIL',
      },
      'tl_o',
      SITE_INTERACTION,
    )
    setOpenModal(!openModal)
    window.location.href = formatUrl(forgotIdUrl.value)
  }

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: FORGOT_PAGES.EMAIL_NOT_FOUND,
      eVar22: CUSTOMER,
    },
  })

  return (
    <Dialog
      open={showEmailNotFoundModal && openModal}
      PaperProps={{ style: { borderRadius: 32, margin: 16 } }}
    >
      <IconButton
        aria-label="close"
        className={classes.closeIcon}
        onClick={closeDialog}
      >
        <CloseIcon />
      </IconButton>

      <div className={classes.emailNotFoundContainer}>
        <div className={classes.errorIcon}>
          <WarningIcon />
        </div>

        <Typography tagType="h5" styleType="h5">
          {emailNotFoundContent?.title?.value}
        </Typography>

        <Typography tagType="p" styleType="p2">
          {emailNotFoundContent?.description?.value}
        </Typography>

        <div className={classes.tryAgainBtn}>
          <Button
            type="button"
            variant="primary"
            hoverVariant="primary"
            text={emailNotFoundContent?.tryAgainCTA?.value}
            onClick={tryAgain}
          />
        </div>

        <div className={classes.tryAgainBtn}>
          <Button
            type="button"
            variant="secondary"
            hoverVariant="secondary"
            text={emailNotFoundContent?.forgotEmailCTA?.value}
            onClick={forgotEmail}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default EmailNotFound

const useStyles = makeStyles(({ breakpoints }) => ({
  emailNotFoundContainer: {
    width: '100%',
    textAlign: 'center',
    margin: '0 auto',
    padding: 32,
    [breakpoints.up('sm')]: {
      padding: 48,
      width: 552,
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
  chatWithUsSection: {
    margin: 0,
    [breakpoints.up('sm')]: {
      margin: '16px 0',
    },
  },
  footerchatwithus: {
    fontSize: 18,
    textDecoration: 'underline',
    marginLeft: 10,
  },
  tryAgainBtn: {
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
