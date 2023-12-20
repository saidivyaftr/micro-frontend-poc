import { useEffect, useMemo, useState } from 'react'
import { setCookie } from 'nookies'
import { Header, Typography } from '@/shared-ui/components'
import { NavAccordionProps } from '@/shared-ui/components/NavAccordion'
import { IUtilityNavProps } from '@/shared-ui/components/UtilityNav'
import { parseCookies } from 'nookies'
import { useAppData } from 'src/hooks'
import { makeStyles } from '@material-ui/core'
import colors from 'src/styles/theme/colors'
import { SearchIconNew } from '@/shared-ui/react-icons'
import YextSnippet from 'src/utils/yext'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAccountDetailsbyUUID } from 'src/redux/slicers/account'
import { State } from 'src/redux/types'
import { locales, TRANSLATIONS_ENABLED_PAGES } from 'src/locales'
import { useRouter } from 'next/router'
//import { AppRoutes, BILLING } from 'src/constants'
import { AppRoutes } from 'src/constants'
import {
  accountDashboardMenuItems,
  accountDashboardActionNavLinks,
  loggedInSites,
} from './sitecore-mock'
import {
  getMenuLinks,
  getSecondaryNavItems,
  getUtilityNavItems,
} from './helper'
import { capitalizeString } from 'src/utils/addressHelpers'
import { decryptPayload } from 'src/utils/secure'

interface TopBarProps {
  headerData?: any
  stickyData?: any
  alertData?: any
  smartBanner?: number
}

const TopBar: React.FC<TopBarProps> = ({
  headerData,
  stickyData,
  alertData,
  smartBanner = 0,
}: TopBarProps): JSX.Element => {
  // hooks
  // const { sessionValid, services = [] } = useSelector(
  //   (state: State) => state?.session,
  // )
  const { sessionValid } = useSelector((state: State) => state?.session)

  const router = useRouter()
  const classes = useStyles()
  const dispatch = useDispatch()
  const { activeAccount, accountInfoOnLoad } = useSelector(
    (state: State) => state?.account,
  )
  const { action_nav_links = [], main_links = {} } = useAppData(
    'HeaderUpdated',
    true,
    headerData,
  )

  const { banner, button } = useAppData('Alerts', true, alertData)
  const { sites } = useAppData('Sticky Navigation', true, stickyData)
  const { frontieramp = false } = parseCookies()

  // State variables
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // Generic variables
  const isReturningUser = !(!frontieramp || frontieramp != 'true')
  const toggleLocaleItem = locales.find(({ code }) => code !== router.locale)
  const toggleLocaleText = toggleLocaleItem?.name
  const shouldShowTranslations = TRANSLATIONS_ENABLED_PAGES.find(
    (pathname) => pathname === router.pathname || pathname === router.asPath,
  )
  const isAccountDashboard = router.pathname
    ?.toLocaleLowerCase()
    .includes('/account')
  const isWelcomePage = router.pathname
    ?.toLowerCase()
    ?.includes(AppRoutes.WelcomePage)

  const menuLinks = useMemo((): NavAccordionProps[] => {
    if (isWelcomePage) {
      return []
    }
    return getMenuLinks(
      main_links,
      accountDashboardMenuItems,
      isAccountDashboard,
      sessionValid,
      router.query,
    )
  }, [
    isAccountDashboard,
    isWelcomePage,
    main_links,
    accountDashboardMenuItems,
    sessionValid,
    router.query,
  ])

  const secondaryNav = useMemo(
    (): any =>
      getSecondaryNavItems(
        isAccountDashboard ? accountDashboardActionNavLinks : action_nav_links,
        sessionValid,
        isAccountDashboard,
        capitalizeString(firstName) ?? '',
      ),
    [
      accountDashboardActionNavLinks,
      sessionValid,
      isAccountDashboard,
      firstName,
      action_nav_links,
    ],
  )

  const utilityNav = useMemo(
    (): IUtilityNavProps =>
      getUtilityNavItems(
        action_nav_links,
        isAccountDashboard ? loggedInSites : sites,
        isAccountDashboard,
      ),
    [action_nav_links, sites, isAccountDashboard, loggedInSites],
  )

  const getProfileName = async (accountUuid: string) => {
    try {
      if (
        accountUuid.length > 0 &&
        accountUuid !== accountInfoOnLoad.data.uuid
      ) {
        dispatch(fetchAccountDetailsbyUUID(accountUuid))
      }
    } catch {}
  }

  useEffect(() => {
    setFirstName(accountInfoOnLoad.data.accountHolderFirstName)
    setLastName(accountInfoOnLoad.data.accountHolderLastName ?? '')
  }, [
    accountInfoOnLoad.data.accountHolderFirstName,
    accountInfoOnLoad.data.accountHolderLastName,
  ])

  useEffect(() => {
    const userUUID =
      activeAccount.uuid || decryptPayload(sessionStorage.getItem('uuid'))
    getProfileName(userUUID)
  }, [activeAccount.uuid])

  const toggleLocale = () => {
    setCookie(null, 'website#lang', toggleLocaleItem?.code || 'en', {
      path: '/',
      domain: 'frontier.com',
    })
    let pathname = router.asPath
    if (pathname && pathname[0] !== '/') {
      pathname = '/' + pathname
    }
    const newLocation =
      toggleLocaleItem?.code === 'es' ? `/es${pathname}` : pathname
    window.location.href = newLocation
  }

  const getSearch = () => {
    return (
      <div className={classes.searchRoot}>
        <div className="yext-search-container"></div>
        {/* Dynamically load YextSnippet */}
        <YextSnippet />
        <span className={classes.searchIcon}>
          <SearchIconNew />
        </span>
      </div>
    )
  }

  const getProfileIcon = () => {
    if ((!firstName && !lastName) || !isAccountDashboard) {
      return null
    }
    const name = [firstName?.[0] ?? '', lastName?.[0] ?? '']
    return (
      <Typography
        fontType="regularBandwidthFont"
        tagType="span"
        styleType="legal"
        className={classes.userIcon}
      >
        {name.join('')}
      </Typography>
    )
  }

  return (
    <div className={classes.root}>
      <Header
        userIcon={getProfileIcon()}
        secondaryNav={secondaryNav}
        utilityNav={utilityNav}
        menu={menuLinks}
        isReturningUser={isReturningUser}
        search={getSearch()}
        notificationBannerText={banner?.value || ''}
        showBanner={Boolean(banner?.value)}
        buttonLink={button?.href || ''}
        buttonName={button?.name || ''}
        toggleLocaleText={shouldShowTranslations ? toggleLocaleText : undefined}
        toggleLocale={shouldShowTranslations ? toggleLocale : undefined}
        smartBanner={smartBanner}
        isAccountDashboard={isAccountDashboard}
        isWelcomePage={isWelcomePage}
        cartDetails={
          sessionValid &&
          !isWelcomePage && {
            href:
              accountDashboardActionNavLinks?.Links?.[1]?.path?.url ||
              '/services/cart',
            title: '',
          }
        }
      />
    </div>
  )
}

export default TopBar

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    '& .accordionTitle': {
      [breakpoints.down('xs')]: {
        marginRight: 0,
      },
    },
  },
  searchRoot: {
    '& .yxt-SearchBar': {
      height: 56,
    },
    '& .yxt-SearchBar-container': {
      border: '0px',
      borderBottom: `1px solid ${colors.main.borderGrey}`,
      borderRadius: '0px',
      '& input::placeholder': {
        color: colors.main.midnightExpress,
      },
    },
    '& .yxt-SearchBar-input': {
      padding: 16,
      color: colors.main.midnightExpress,
    },
    '& .yxt-SearchBar-clear': {
      fontSize: 24,
    },
    '& .Icon--magnifying_glass': {
      transform: 'rotate(275deg)',
      '& svg': {
        visibility: 'hidden',
      },
    },
  },
  searchIcon: {
    position: 'absolute',
    top: '16px',
    zIndex: 99,
    right: '16px',
  },
  userIcon: {
    background: colors.main.white,
    height: 30,
    width: 30,
    borderRadius: 16,
    padding: 6,
    marginRight: 8,
    lineHeight: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
  },
}))
