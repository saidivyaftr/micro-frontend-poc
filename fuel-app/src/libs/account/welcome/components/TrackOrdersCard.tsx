import { Typography, InjectHTML, Button } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import {
  AppStoreQRCode,
  PlaystoreDownload,
  PlaystoreQRCode,
} from '@/shared-ui/react-icons/index'
import AppStoreDownload from '@/shared-ui/react-icons/AppStoreDownload'
import colors from '@/shared-ui/colors'
import useAppData from '@/shared-ui/hooks/useAppData'
import {
  SITE_INTERACTION,
  WELCOME_APP_STORE_CLICK,
  WELCOME_PLAY_STORE_CLICK,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useMemo } from 'react'
import { useWelcomePageData } from 'src/selector-hooks'

const urlMap = {
  'appstore-link': 'https://apps.apple.com/us/app/myfrontier/id978439794',
  'playstore-link':
    'https://play.google.com/store/apps/details?id=com.frontier.selfserve&hl=en_US&gl=US',
}

const TrackOrdersCard = () => {
  const classes = useStyles()
  const {
    isTechInstallationOrder,
    isSelfInstallationOrder,
    isNoInstallationOrder,
  } = useWelcomePageData()

  const { techInstall, noInstall, selfInstall } = useAppData(
    'TrackYourOrders',
    true,
  )
  console.log(useWelcomePageData())
  const dataToRender = useMemo(() => {
    if (isTechInstallationOrder) return techInstall?.targetItem
    else if (isSelfInstallationOrder) return selfInstall?.targetItem
    else if (isNoInstallationOrder) return noInstall?.targetItem
    else return null
  }, [isTechInstallationOrder, isSelfInstallationOrder, isNoInstallationOrder])

  const onDownloadAppLinkClick = (
    typeLink: 'appstore-link' | 'playstore-link',
  ) => {
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14:
          typeLink === 'appstore-link'
            ? WELCOME_APP_STORE_CLICK
            : WELCOME_PLAY_STORE_CLICK,
      },
      'tl_o',
      SITE_INTERACTION,
    )
    window.open(urlMap[typeLink], '_blank')
  }

  return (
    <div className={classes.cardContainer} id="myfrontier-app">
      <div className={classes.leftContainer}>
        <Typography styleType="h4">{dataToRender?.title?.value}</Typography>
        <div className={classes.message}>
          <InjectHTML styleType="p1" value={dataToRender?.description?.value} />
        </div>
        {isSelfInstallationOrder ? (
          <Button
            type="link"
            text={dataToRender?.frontierApp?.value}
            variant="secondary"
            href={dataToRender?.frontierAppUrl?.value}
          />
        ) : (
          <div className={classes.appQRwrapper}>
            <div className={classes.QRCode}>
              <AppStoreQRCode />
              <button
                aria-label="App Store"
                className={classes.storeBtn}
                onClick={() => onDownloadAppLinkClick('appstore-link')}
              >
                <AppStoreDownload className={classes.storeBtnContent} />
              </button>
            </div>
            <div className={classes.QRCode}>
              <PlaystoreQRCode />
              <button
                aria-label="Google Play Store"
                className={classes.storeBtn}
                onClick={() => onDownloadAppLinkClick('playstore-link')}
              >
                <PlaystoreDownload className={classes.storeBtnContent} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={classes.rightContainer}>
        <img src={dataToRender?.imgUrl?.src} alt={dataToRender?.imgUrl?.alt} />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  cardContainer: {
    background: `${colors.main.greenishBlue}`,
    padding: '2rem 1rem 0',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    [breakpoints.up('xs')]: {
      padding: '2rem 1rem 0',
    },
    [breakpoints.up('sm')]: {
      padding: '3rem 2rem 0',
      flexDirection: 'row',
      alignItems: 'unset',
      gap: '2rem',
    },
    [breakpoints.up('md')]: {
      padding: '3rem 3rem 0',
      gap: '3rem',
    },
  },
  message: {
    '& a': {
      textDecoration: 'underline',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  appQRwrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: '2rem',
    gap: '1rem',
    [breakpoints.up('xs')]: {
      justifyContent: 'center',
      flexDirection: 'row',
      gap: '1rem',
    },
    [breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
      gap: '2rem',
    },
    [breakpoints.up('md')]: {
      justifyContent: 'flex-start',
      gap: '4rem',
    },
  },
  QRCode: {
    textAlign: 'center',
  },
  storeBtn: {
    display: 'block',
    background: colors.main.dark,
    borderRadius: '0.5rem',
    border: 0,
    margin: '0 auto',
    marginTop: 16,
    cursor: 'pointer',
    '&:hover': {
      background: colors.main.primaryRed,
    },
    [breakpoints.up('sm')]: {
      width: '160px',
    },
  },
  rightContainer: {
    display: 'flex',
    '& img': {
      maxWidth: '11.375rem',
    },
    justifyContent: 'center',
    [breakpoints.up('sm')]: {
      marginTop: '3rem',
      '& img': {
        maxWidth: '280px',
      },
    },
    [breakpoints.up('md')]: {
      marginTop: '0px',
    },
  },
  leftContainer: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  phoneImg: {
    width: '200px',
    [breakpoints.up('sm')]: {
      width: '296px',
    },
  },
  storeBtnContent: {
    width: '125px',
    display: 'block',
    [breakpoints.up('sm')]: {
      width: '9.375rem',
    },
  },
}))

export default TrackOrdersCard
