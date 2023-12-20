import { useAppData } from 'src/hooks'
import { Typography, Button } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import {
  AppRoutes,
  COMPONENT_WRAPPER,
  CUSTOMER,
  RESIDENTIAL_CUSTOMER,
  SELF_SERVICE,
  SELF_SERVICE_PAGES,
  SERVICEABLE,
} from 'src/constants'
import {
  pageViewAnalytics,
  siteInteractionAnalytics,
} from '../shared/AnalyticsUtlis'
import { useEffect } from 'react'

const NoOfferInfo = ({
  sessionState,
  activeAccountData,
  activeAccount,
}: {
  sessionState?: any
  activeAccountData?: any
  activeAccount?: any
}) => {
  const classes = useStyles()
  const { noOffersInfo, goToMyAccountCta } = useAppData(
    'NoOffersAvailableInfo',
    true,
  )

  useEffect(() => {
    if (activeAccountData) {
      const eventData = {
        pageName: SELF_SERVICE_PAGES.NOT_ELIGIBLE,
        eVar21: sessionState?.fidUuid, //fidUuid
        eVar22:
          activeAccountData.accountType === 'Residential'
            ? RESIDENTIAL_CUSTOMER
            : CUSTOMER, //userType
        eVar51: activeAccount?.details?.data?.usi,
        eVar60: '',
        eVar66: activeAccountData.accountType, //CustomerType
        eVar100: activeAccountData.accountUuid, // AccountUUID
        eVar49: SERVICEABLE,
      }
      pageViewAnalytics(eventData)
    }
  }, [])

  const onGoToAccountClickHandler = () => {
    siteInteractionAnalytics(
      SELF_SERVICE.GO_TO_MY_ACCOUNT,
      SELF_SERVICE.SITE_INTERACTION,
    )
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Typography tagType="h3" styleType="h3" className={classes.noOfferInfo}>
          {noOffersInfo?.value}
        </Typography>
        <Button
          type="link"
          variant="primary"
          text={goToMyAccountCta?.value}
          href={AppRoutes.AccountDashboard}
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
    paddingBottom: 166,
    [breakpoints.down('sm')]: {
      paddingTop: 40,
      paddingBottom: 40,
    },
  },
  noOfferInfo: {
    marginBottom: 64,
    width: '50%',
    [breakpoints.down('sm')]: {
      marginBottom: 32,
      width: '100%',
    },
  },
  buttonClassName: {
    marginTop: '16px',
  },
}))

export default NoOfferInfo
