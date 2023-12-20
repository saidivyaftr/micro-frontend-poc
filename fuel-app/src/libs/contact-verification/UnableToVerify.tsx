/* eslint-disable @typescript-eslint/indent */
// eslint-disable-next-line
// @ts-no

import { makeStyles } from '@material-ui/core'
import { Typography, Button } from '@/shared-ui/components'
import Dialog from '@material-ui/core/Dialog'
import colors from '@/shared-ui/colors'
import WarningIcon from '@/shared-ui/react-icons/warning'
import { useSelector } from 'react-redux'
import {
  handlePageViewAnalytics,
  handleSiteInteractionAnalytics,
} from './AnalyticUtilsMTN'
import {
  getPageNameForAnalytics,
  siteInteractionConstant,
  stateConstant,
} from 'src/constants/contact'
import { useEffect } from 'react'

interface PageProps {
  unableToVerify?: any
}
const UnableToVerify = ({ unableToVerify }: PageProps) => {
  const classes = useStyles()

  const hasDTMLLoaded = useSelector(
    (state: any) => state?.appConfig?.configs?.['DTM'],
  )
  useEffect(() => {
    if (hasDTMLLoaded) {
      handlePageViewAnalytics(
        getPageNameForAnalytics(stateConstant.UNABLE_TO_VERIFY),
        '',
      )
    }
  }, [hasDTMLLoaded])

  return (
    <Dialog
      open={true}
      fullWidth={true}
      maxWidth={'sm'}
      PaperProps={{ style: { borderRadius: 32, maxWidth: 503 } }}
    >
      <div className={classes.container}>
        <div className={classes.errorIcon}>
          <WarningIcon />
        </div>
        <Typography tagType="h5" styleType="h5">
          {unableToVerify?.title?.value}
        </Typography>
        <Typography className={classes.description} tagType="p" styleType="p1">
          {unableToVerify?.description?.value}
        </Typography>
        <Button
          type="button"
          variant="primary"
          hoverVariant="primary"
          text={unableToVerify?.continueCta?.value}
          onClick={() => {
            handleSiteInteractionAnalytics(
              siteInteractionConstant.CONTINUE,
              siteInteractionConstant.CONTINUE_TLO,
            )
            window.location.href = unableToVerify?.continueLink?.value
          }}
        />
      </div>
    </Dialog>
  )
}

export default UnableToVerify

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
  description: {
    margin: '16px 0 32px 0',
  },
  errorIcon: {
    textAlign: 'center',
    marginBottom: 32,
  },
}))
