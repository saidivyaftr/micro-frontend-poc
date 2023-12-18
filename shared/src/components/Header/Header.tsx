import React, { useState, useEffect, useRef, useMemo } from 'react'
import clx from 'classnames'

import UtilityNav from '../UtilityNav'
import NavAccordion from "../NavAccordion"
import Typography from '../Typography'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import {
  Cart,
  LogoNew,
  ChevronUpWhite,
  ChevronDownWhite,
  Close,
} from '../../react-icons'
import { IHeaderProps } from './types'
import css from './Header.module.scss'

const UTILITY_NAV_HEIGHT = 39
const Header: React.FunctionComponent<IHeaderProps> = (data) => {
  const {
    utilityNav,
    secondaryNav,
    menu
  } = data

  console.log(data)
  const { width } = useWindowDimensions()
  const isMobileOrTablet = width <= 1023
  const isUpperTablet = width >= 1024 && width <= 1124
  const [fromTop, setFromTop] = useState(UTILITY_NAV_HEIGHT)
  const [headerHeight, setHeaderHeight] = useState<number>(99)
  return (
    <header id="header" className={css.header} style={{ height: headerHeight }}>
      <UtilityNav
        className={css.hideUtilityNavMobile}
        {...utilityNav}
        showCartLanguageBanner={isMobileOrTablet}
      />
      <nav className={css.headerNav} style={{ top: fromTop }}>
        <div className={css.headerNavContainer}>
          {/* Desktop logo */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" aria-label="Frontier Logo">
            <LogoNew className={clx(css.headerLogo, css.hideLogoMobile)} />
          </a>

          <div className={clx(css.accordionContainer, css.hideMainNavMobile)}>
            <NavAccordion menu={menu} />
          </div>

          {/* Mobile header logo */}
          <div className={clx(css.headerMobileLogo, css.hideLogoTablet)}>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" aria-label="Frontier Logo">
              <LogoNew className={css.headerLogo} />
            </a>
          </div>

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
            </a>
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
         
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
