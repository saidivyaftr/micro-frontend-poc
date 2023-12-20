import { useAppData, useWindowDimensions } from 'src/hooks'
import { Typography, Button } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER, SELF_SERVICE } from 'src/constants'
import getFrontierBaseUrl from 'src/utils/api/baseUrl'
import { siteInteractionAnalytics } from '../shared/AnalyticsUtlis'

const PendingOrderInfo = () => {
  const classes = useStyles()
  const {
    pendingOrderTitle,
    pendingOrderInfo,
    viewOrderStatusCta,
    viewOrderStatusLink,
  } = useAppData('PendingOrderAvailableInfo', true)

  const { width } = useWindowDimensions()
  const isMobile = width <= 768

  const replacebaseUrl = (urlString: string) => {
    return urlString.replace('{baseUrl}', `${getFrontierBaseUrl()}`)
  }

  const onGoToAccountClickHandler = () => {
    siteInteractionAnalytics(
      SELF_SERVICE.GO_TO_MY_ACCOUNT,
      SELF_SERVICE.SITE_INTERACTION,
    )
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Typography
          tagType="h3"
          styleType="h3"
          className={classes.noOfferDescription}
        >
          {pendingOrderTitle?.value}
        </Typography>
        <Typography
          tagType={isMobile ? 'h5' : 'h4'}
          styleType={isMobile ? 'h5' : 'h4'}
          fontType="regularFont"
          className={classes.noOfferDescription}
        >
          {pendingOrderInfo?.value}
        </Typography>
        <Button
          type="link"
          variant="primary"
          text={viewOrderStatusCta?.value}
          href={replacebaseUrl(viewOrderStatusLink?.value)}
          className={classes.buttonClassName}
          hoverVariant="primary"
          onClick={onGoToAccountClickHandler}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.grey,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
  },
  container: {
    paddingTop: 81,
    paddingBottom: 91,
    [breakpoints.down('sm')]: {
      paddingTop: 40,
      paddingBottom: 40,
    },
  },
  noOfferDescription: {
    marginBottom: 45,
    width: '43%',
    [breakpoints.down('sm')]: {
      marginBottom: 32,
      width: '100%',
    },
  },
  buttonClassName: {
    marginTop: '16px',
  },
}))

export default PendingOrderInfo
