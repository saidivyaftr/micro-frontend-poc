import React, { useState, useEffect, useRef, useMemo } from 'react'
import clx from 'classnames'
import {
  UtilityNav,
  NavAccordion,
  Typography,
  NotificationBanner,
  Hamburger,
} from '@/shared-ui/components'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import APIClient from 'src/api-client'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import {
  Search,
  Cart,
  LogoNew,
  ChevronUpWhite,
  ChevronDownWhiteNew,
  CloseBlack,
} from '@/shared-ui/react-icons'
import { SIGN_IN_TOP_NAV } from 'src/constants'
import { IHeaderProps } from './types'
import css from './Header.module.scss'

const UTILITY_NAV_HEIGHT = 39
const Header: React.FunctionComponent<IHeaderProps> = (data) => {
  const {
    utilityNav,
    menu,
    secondaryNav,
    toggleLocale,
    toggleLocaleText,
    smartBanner,
    userIcon = null,
    isAccountDashboard,
    cartDetails,
    isWelcomePage,
  } = data

  const [isOpen, setIsOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const isLoggedIn = secondaryNav?.logIn?.isLoggedIn
  const { width } = useWindowDimensions()
  const isMobileOrTablet = width <= 1023
  const isUpperTablet = width >= 1024 && width <= 1124
  const [fromTop, setFromTop] = useState(UTILITY_NAV_HEIGHT)
  const [headerHeight, setHeaderHeight] = useState<number>(99)
  const bannerRef = useRef<HTMLDivElement>(null)
  const username = useMemo(() => {
    return secondaryNav?.logIn?.username?.length > 15
      ? `${secondaryNav?.logIn?.username.substring(0, 15)}...`
      : secondaryNav?.logIn?.username
  }, [secondaryNav?.logIn?.username])

  useEffect(() => {
    if (isMobileOrTablet) {
      setIsOpen(false)
    }
    setIsProfileDropdownOpen(false)
  }, [isMobileOrTablet])

  function toggleNav() {
    setIsProfileDropdownOpen(false)
    setIsOpen(!isOpen)
  }

  let closeTimeout: any = null
  function toggleProfileDropdown(value?: boolean) {
    const newValue = value !== undefined ? value : !isProfileDropdownOpen
    if (newValue && closeTimeout) {
      clearTimeout(closeTimeout)
    }
    setIsOpen(false)
    setIsProfileDropdownOpen(newValue)
  }

  const handleSignOut = async () => {
    try {
      await APIClient.logout()
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar50: 'logout',
        },
        't1_0',
        'service check',
      )
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = '/'
    } catch (error) {
      DTMClient.triggerEvent(
        {
          events: 'event28',
          prop31: error,
        },
        't1_0',
        'logout failed',
      )
    }
  }
  const renderProfileOptions = (hide = false) => {
    if (hide) {
      return null
    }
    return (
      <div
        className={clx(css.profileDropdown, {
          [css.profileDropdownOpen]: isProfileDropdownOpen,
        })}
      >
        <div className={css.profileDropdownContainer}>
          <span
            className={css.profileCloseIcon}
            onClick={() => setIsProfileDropdownOpen(false)}
          >
            <CloseBlack width={24} height={24} />
          </span>
          <ul>
            {secondaryNav?.profileNav?.title && (
              <li>
                <a href={secondaryNav?.profileNav?.href}>
                  <Typography
                    tagType="span"
                    styleType="p2"
                    fontType="boldFont"
                    className={css.profileDropDownlist}
                  >
                    {secondaryNav?.profileNav?.title}
                  </Typography>
                </a>
              </li>
            )}
            {secondaryNav?.profileNav?.items?.map((data) => {
              return data?.href?.toLowerCase() != '/logout' ? (
                <li key={`${data?.title} - nav item`}>
                  <a href={data?.href}>
                    <Typography
                      tagType="span"
                      styleType="p2"
                      className={clx(css.profileDropDownlist, {
                        [css.profileDropdownItemAccountDashboard]:
                          isAccountDashboard,
                      })}
                    >
                      {data?.title}
                    </Typography>
                  </a>
                </li>
              ) : (
                <li
                  onClick={() => handleSignOut()}
                  key={`${data?.title} - nav item`}
                >
                  <Typography
                    tagType="span"
                    styleType="p2"
                    className={clx(css.profileDropDownlist, {
                      [css.profileDropdownItemAccountDashboard]:
                        isAccountDashboard,
                    })}
                  >
                    {data?.title}
                  </Typography>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (isMobileOrTablet) {
      setFromTop(smartBanner)
    } else {
      setFromTop(UTILITY_NAV_HEIGHT)
    }
  }, [isMobileOrTablet, smartBanner])

  const handleScroll = () => {
    if (isMobileOrTablet) {
      const top = window?.pageYOffset <= 0 ? smartBanner : 0
      setFromTop(top)
      window.removeEventListener('scroll', () => handleScroll)
    } else {
      const top =
        UTILITY_NAV_HEIGHT - window?.pageYOffset < 0
          ? 0
          : UTILITY_NAV_HEIGHT - window?.pageYOffset
      setFromTop(top)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return window.removeEventListener('scroll', () => handleScroll)
  }, [isMobileOrTablet, smartBanner])

  useEffect(() => {
    new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target == (bannerRef?.current as Element)) {
          const headerHeight =
            bannerRef?.current?.getBoundingClientRect().height
          setHeaderHeight(headerHeight || 99)
        }
      }
    }).observe(bannerRef?.current as Element)
  }, [bannerRef])

  const SignInAnalytics = () => {
    //@ts-ignore
    s_objectID = SIGN_IN_TOP_NAV
  }

  return (
    <header id="header" className={css.header} style={{ height: headerHeight }}>
      <UtilityNav
        className={css.hideUtilityNavMobile}
        {...utilityNav}
        showCartLanguageBanner={isMobileOrTablet}
        isReturningUser={data?.isReturningUser}
        toggleLocale={toggleLocale}
        toggleLocaleText={toggleLocaleText}
      />
      <nav className={css.headerNav} style={{ top: fromTop }} ref={bannerRef}>
        <div className={css.headerNavContainer}>
          {/* Desktop logo */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" aria-label="Frontier Logo">
            <LogoNew className={clx(css.headerLogo, css.hideLogoMobile)} />
          </a>

          {/* Mobile menu button */}
          <div className={css.headerHamburgerButtonContainer}>
            <button
              className={clx(
                css.headerHamburgerButton,
                css.hideHamburgerButton,
              )}
              aria-label="Header Nav"
              onClick={toggleNav}
            >
              <Hamburger isActive={isOpen} />
            </button>
          </div>

          {/* Desktop menu items (Ex: Shop, internet) */}
          <div className={clx(css.accordionContainer, css.hideMainNavMobile)}>
            <NavAccordion menu={menu} isAccountDashboard={isAccountDashboard} />
          </div>

          {/* Mobile header logo */}
          <div className={clx(css.headerMobileLogo, css.hideLogoTablet)}>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" aria-label="Frontier Logo">
              <LogoNew className={css.headerLogo} />
            </a>
          </div>

          {/* Cart icon on mobile nav when in account dashboard */}
          {cartDetails && isAccountDashboard && (
            <a
              className={clx(
                css.navSecondaryAnchor,
                css.hideMainNavTablet,
                css.accountDashboardMobileCartContainer,
              )}
              href={cartDetails?.href}
            >
              <Typography
                className={clx(css.navSecondaryTitle, {
                  [css.hide]: isUpperTablet,
                })}
                styleType="p2"
                color="tertiary"
                fontType="boldFont"
              >
                {cartDetails?.title}
              </Typography>
              <Cart height="24" width="24" />
            </a>
          )}

          {/* Mobile logged in vs logged out button */}
          {!isLoggedIn ? (
            <a
              href={secondaryNav?.signIn?.href}
              className={clx(css.signInMobile, {
                [css.signInTextAccountDashboard]:
                  isAccountDashboard && !!cartDetails,
              })}
              onClick={SignInAnalytics}
              data-testid="profile-sign-in-link"
            >
              <Typography styleType="h5" color="tertiary" fontType="boldFont">
                Sign In
              </Typography>
            </a>
          ) : (
            <div
              className={clx(css.signInMobile, {
                [css.signInTextAccountDashboard]:
                  isAccountDashboard && !!cartDetails,
              })}
              onClick={() => toggleProfileDropdown()}
            >
              <Typography
                className={clx(css.profileTitle, {
                  [css.profileTitleAccountDashboard]: isAccountDashboard,
                })}
                styleType="p2"
                color="tertiary"
                fontType="boldFont"
              >
                {secondaryNav?.logIn.username}
              </Typography>
            </div>
          )}

          {/* Mobile profile options */}
          <div>{isLoggedIn && renderProfileOptions(!isMobileOrTablet)}</div>

          <div className={css.navSecondary}>
            {/* Desktop search nav icon */}
            <a
              className={css.navSecondaryAnchor}
              href={secondaryNav?.search.href}
            >
              <Typography
                className={clx(css.navSecondaryTitle, {
                  [css.hide]: isUpperTablet,
                })}
                styleType="p2"
                color="tertiary"
                fontType="boldFont"
              >
                {secondaryNav?.search.title}
              </Typography>
              <Search />
            </a>

            {/* Desktop buy nav icon */}
            {!isWelcomePage && (
              <div className={css.buyLinkContainer}>
                {(!data?.isReturningUser || isAccountDashboard) && (
                  <a
                    className={css.navSecondaryAnchor}
                    href={secondaryNav?.cart?.href}
                  >
                    <Typography
                      className={clx(css.navSecondaryTitle, {
                        [css.hide]: isUpperTablet,
                      })}
                      styleType="p2"
                      color="tertiary"
                      fontType="boldFont"
                    >
                      {secondaryNav?.cart?.title}
                    </Typography>
                    <Cart />
                  </a>
                )}
              </div>
            )}

            {/* Desktop logged in vs logged out button */}
            {!isLoggedIn ? (
              <a
                className={css.navSecondaryAnchor}
                href={`${secondaryNav?.signIn?.href}`}
                data-testid="secondary-profile-sign-in-link"
              >
                <Typography
                  className={css.navSecondaryTitle}
                  styleType="p2"
                  color="tertiary"
                  fontType="boldFont"
                >
                  {secondaryNav?.signIn?.title}
                </Typography>
              </a>
            ) : (
              <div
                className={css.loggedInUserNameWrapper}
                onMouseEnter={() => toggleProfileDropdown(true)}
                onMouseLeave={() => {
                  closeTimeout = setTimeout(() => {
                    toggleProfileDropdown(false)
                  }, 150)
                }}
              >
                <Typography
                  className={clx(css.navSecondaryTitle, css.loggedInText)}
                  styleType="p2"
                  color="tertiary"
                  fontType="boldFont"
                >
                  <>
                    {userIcon}
                    {username}
                  </>
                </Typography>
                {isProfileDropdownOpen ? (
                  <ChevronUpWhite />
                ) : (
                  <ChevronDownWhiteNew />
                )}
                {renderProfileOptions()}
              </div>
            )}
          </div>
        </div>
        {/* Mobile hover menu items */}
        <div
          className={clx(css.navContainer, css.hideMainNavTablet, {
            [css.toggleNavOpen]: isOpen,
            [css.toggleNavClose]: !isOpen,
          })}
        >
          {data?.search && (
            <span
              className={clx({
                [css.showSearch]: isOpen,
                [css.hideSearch]: !isOpen,
              })}
            >
              {data?.search}
            </span>
          )}
          {isOpen && (
            <>
              <div
                className={clx(css.accordionContainer, {
                  [css.accordionContainerAccountDashboardMobile]:
                    isAccountDashboard,
                })}
              >
                <NavAccordion
                  menu={menu}
                  isAccountDashboard={isAccountDashboard}
                />
              </div>
              <UtilityNav
                {...data.utilityNav}
                showCartLanguageBanner={isMobileOrTablet}
                isReturningUser={data?.isReturningUser}
                className={css.mobileUtilityNav}
                toggleLocale={toggleLocale}
                toggleLocaleText={toggleLocaleText}
              />
            </>
          )}
        </div>
        <NotificationBanner
          showBanner={data?.showBanner}
          notificationBannerText={data?.notificationBannerText}
          buttonLink={data?.buttonLink}
          buttonName={data?.buttonName}
        />
      </nav>
    </header>
  )
}

export default Header
