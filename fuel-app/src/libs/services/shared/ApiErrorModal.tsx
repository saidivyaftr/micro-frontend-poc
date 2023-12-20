/* eslint-disable @typescript-eslint/indent */
// eslint-disable-next-line
// @ts-no

import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, Button } from '@/shared-ui/components'
import Dialog from '@material-ui/core/Dialog'
import colors from '@/shared-ui/colors'
import { useSelector, useDispatch } from 'react-redux'
import { clearApiError, apiErrorsState } from 'src/redux/slicers/apiErrors'
import { apiErrorModalAnalytics } from 'src/libs/services/shared/AnalyticsUtlis'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@/shared-ui/react-icons/warning'
import { AppRoutes, SELF_SERVICE, SESSION_STORAGE } from 'src/constants'
import { useAppData, useChatState } from 'src/hooks'
import { formatUrl } from 'src/utils/urlHelpers'

const ApiErrorModal = ({ hideFor403 = false, showCloseBtn = false }) => {
  type errorsCodeType = {
    ErrorCode: {
      value: string
    }
  }
  type apiErrorCollectionsType = {
    method: {
      value: string
    }
  }

  type analyticsErrorsType = {
    events: string
    prop31: string
  }

  const isServicesError = useSelector(
    (state: { apiErrors: apiErrorsState }) => state?.apiErrors?.isError,
  )
  const errorContent = useSelector(
    (state: { apiErrors: apiErrorsState }) => state?.apiErrors?.apiErrorContent,
  )

  const apiErrorSitecoreData = useAppData('ApiErrorContent', true) || {}
  const apiErrorCollections = apiErrorSitecoreData.Collections
  const apiErrorModule = apiErrorCollections?.list?.find(
    (er: apiErrorCollectionsType) => er.method.value === errorContent?.module,
  )
  const errorDetail = apiErrorModule?.ErrorMessages?.list?.find(
    (er: errorsCodeType) =>
      er.ErrorCode.value === errorContent?.errorCode?.toString() ||
      er.ErrorCode.value === 'Default',
  )

  const { setChatState, setChatParams } = useChatState()
  const classes = useStyles()
  const dispatch = useDispatch()

  const closeErrorDailog = () => {
    dispatch(clearApiError())
  }

  const eventsData: analyticsErrorsType = {
    events: 'event28',
    prop31: `${errorContent?.errorCode} + ${errorDetail?.description?.value}`,
  }

  useEffect(() => {
    if (errorDetail?.description?.value) {
      apiErrorModalAnalytics(eventsData)
    }
  }, [isServicesError])

  const openModal = hideFor403
    ? isServicesError && errorContent.errorCode !== 403
    : isServicesError
  return (
    <Dialog
      open={openModal}
      fullWidth={true}
      maxWidth={'sm'}
      PaperProps={{ style: { borderRadius: 32 } }}
    >
      <IconButton
        aria-label="close"
        className={classes.closeIcon}
        onClick={() => {
          showCloseBtn
            ? (window.location.href = formatUrl(AppRoutes.AccountDashboard))
            : closeErrorDailog()
        }}
      >
        <CloseIcon />
      </IconButton>

      <div className={classes.container}>
        <div className={classes.errorIcon}>
          <WarningIcon />
        </div>
        <Typography tagType="h5" styleType="h5">
          {errorDetail?.title?.value}
        </Typography>
        <Typography className={classes.description} tagType="p" styleType="p1">
          {errorDetail?.description?.value}
        </Typography>
        {errorContent.errorCode === 403 ||
        errorContent.errorCode === 504 ||
        showCloseBtn ? (
          <Button
            type="button"
            variant="primary"
            hoverVariant="primary"
            text={apiErrorSitecoreData.closeButton?.value}
            onClick={() =>
              (window.location.href = showCloseBtn
                ? formatUrl(AppRoutes.AccountDashboard)
                : formatUrl('/login'))
            }
          />
        ) : (
          <Button
            type="button"
            variant="primary"
            hoverVariant="primary"
            text={apiErrorSitecoreData?.chatWithUs?.value}
            onClick={() => {
              setChatParams({
                launchOption: SELF_SERVICE.TECHNICAL_ERROR_MODAL_LAUNCH_OPTION,
                iCaseId: sessionStorage.getItem(SESSION_STORAGE.ICID) as string,
                sCaseID: JSON.parse(
                  sessionStorage.getItem(SESSION_STORAGE.CART_DATA) || 'null',
                )?.sCaseID,
                btn: sessionStorage.getItem(SESSION_STORAGE.VALID) as string,
                errorCode: errorContent.errorCode?.toString(),
                pageUrl: window.location.href,
              })
              setChatState(true)
              dispatch(clearApiError())
            }}
          />
        )}
      </div>
    </Dialog>
  )
}

export default ApiErrorModal

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    backgroundColor: colors.main.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    textAlign: 'center',
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
  errorIcon: {
    textAlign: 'center',
    marginBottom: 32,
  },
  closeIcon: {
    position: 'absolute',
    right: 40,
    top: 40,
    [breakpoints.down('xs')]: {
      right: 20,
      top: 20,
    },
  },
}))
