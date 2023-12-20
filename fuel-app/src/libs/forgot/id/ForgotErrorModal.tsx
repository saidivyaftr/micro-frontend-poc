/* eslint-disable @typescript-eslint/indent */
// eslint-disable-next-line
// @ts-no

import { useState } from 'react'
import colors from '@/shared-ui/colors'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@/shared-ui/react-icons/warning'
import Dialog from '@material-ui/core/Dialog'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { formatUrl } from 'src/utils/urlHelpers'
import { makeStyles } from '@material-ui/core'
import { Typography, Button } from '@/shared-ui/components'
import { FORGOT_ID } from 'src/constants'
import { useChatState, usePageLoadEvents } from 'src/hooks'
import { stateConstant, siteInteractionConstant } from 'src/constants/forgotId'
import { FORGOT_ID_PAGES } from 'src/constants'
import { useAppData } from 'src/hooks'

const ForgotErrorModal = ({ errorModal, setForgotIdResponse }: any) => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName:
        errorModal === stateConstant.EMAIL_NOT_AVAILABLE
          ? FORGOT_ID_PAGES.EMAIL_NOT_FOUND
          : FORGOT_ID_PAGES.NOTFOUND_NAME_ADDRESS,
    },
  })
  const classes = useStyles()
  const forgotIdErrorContent = useAppData('forgotIdErrorContent', true) || {}
  const [openModal, setOpenModal] = useState(true)
  const { setChatState, setChatParams } = useChatState()

  const closeDailog = () => {
    setOpenModal(!openModal)
    setForgotIdResponse(stateConstant.EMAIL_FORGOT_FORM)
  }
  const submitButton = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14:
          errorModal === stateConstant.EMAIL_NOT_AVAILABLE
            ? siteInteractionConstant.EMAIL_NOT_FOUND_REGISTER
            : siteInteractionConstant.TRY_AGAIN,
      },
      'tl_o',
      errorModal === stateConstant.EMAIL_NOT_AVAILABLE
        ? siteInteractionConstant.EMAIL_NOT_FOUND_REGISTER
        : siteInteractionConstant.TRY_AGAIN,
    )
    closeDailog()
    if (errorModal === stateConstant.EMAIL_NOT_AVAILABLE) {
      window.location.href = formatUrl(
        forgotIdErrorContent.noEmailInfo?.content?.registerPath?.value,
      )
    }
  }
  const chatWithUs = () => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: siteInteractionConstant.CHAT_WITH_US,
      },
      'tl_o',
      siteInteractionConstant.CHAT_WITH_US,
    )
    setChatParams({ launchOption: FORGOT_ID.CHAT_EVENT })
    setChatState(true)
    closeDailog()
  }
  return (
    <Dialog
      open={errorModal && openModal}
      fullWidth={true}
      maxWidth={'sm'}
      PaperProps={{ style: { borderRadius: 32 } }}
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
        <Typography tagType="p" styleType="h3">
          {errorModal === stateConstant.NAME_ADDRESS_NOT_AVAILABLE
            ? forgotIdErrorContent.noNameAndAddressInfo?.content?.title?.value
            : forgotIdErrorContent.noEmailInfo?.content?.title?.value}
        </Typography>

        {errorModal === stateConstant.EMAIL_NOT_AVAILABLE && (
          <div className={classes.chatWithUsSection}>
            <Typography fontType="regularFont" styleType="p1" tagType="span">
              {forgotIdErrorContent.noEmailInfo?.content?.description?.value}
            </Typography>
          </div>
        )}
        <div className={classes.tryAgainBtn}>
          <Button
            type="button"
            variant="primary"
            hoverVariant="primary"
            text={
              errorModal === stateConstant.NAME_ADDRESS_NOT_AVAILABLE
                ? forgotIdErrorContent.noNameAndAddressInfo?.content?.tryAgain
                    ?.value
                : forgotIdErrorContent.noEmailInfo?.content?.registerBtn?.value
            }
            onClick={submitButton}
          />
        </div>

        {errorModal === stateConstant.NAME_ADDRESS_NOT_AVAILABLE && (
          <div className={classes.chatWithUsSection}>
            <Typography fontType="mediumFont" styleType="p1" tagType="span">
              {
                forgotIdErrorContent.noNameAndAddressInfo?.content?.needHelpText
                  ?.value
              }
            </Typography>
            <Typography
              className={classes.footerChatWithUs}
              fontType="mediumFont"
              styleType="p1"
              tagType="span"
              onClick={chatWithUs}
            >
              {
                forgotIdErrorContent.noNameAndAddressInfo?.content?.chatWithUs
                  ?.value
              }
            </Typography>
          </div>
        )}
      </div>
    </Dialog>
  )
}

export default ForgotErrorModal

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    backgroundColor: colors.main.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    textAlign: 'center',
    [breakpoints.up('xs')]: {
      padding: 48,
    },
  },
  description: {
    margin: '16px 0 32px 0',
  },
  errorIcon: {
    textAlign: 'center',
    marginBottom: 32,
  },
  closeIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    [breakpoints.up('xs')]: {
      right: 40,
      top: 40,
    },
  },
  chatWithUsSection: {
    margin: '16px 0',
  },
  footerChatWithUs: {
    cursor: 'pointer',
    paddingLeft: 10,
    textDecoration: 'underline',
  },
  tryAgainBtn: {
    marginTop: 32,
  },
}))
