import React, { useState, useEffect } from 'react'
import clx from 'classnames'
import Typography from './../Typography'
import { ChevronDownWhiteNew, ChevronDownNew } from './../react-icons'
import { NavAccordionProps, NavMenuProps } from './index'
import css from './NavAccordion.module.scss'

const NavMenu: React.FunctionComponent<NavMenuProps> = (props) => {
  const { menu } = props
  const [currentActiveAccordion, setCurrentActiveAccordion] = useState<{
    [title: string]: boolean
  }>({})
  const onAccorodionDropdownClick = (title: string, isOpen: boolean) => {
    setCurrentActiveAccordion((prev) => ({ ...prev, [title]: isOpen }))
  }
  return (
    <React.Fragment>
      {menu?.map((items: any, index: number) => {
        return (
          <NavAccordion
            {...items}
            isMobileOrTablet={false}
            key={`menu-accordion-${index}`}
            index={index}
            onDropdownClick={onAccorodionDropdownClick}
            currentActiveAccordion={currentActiveAccordion}
            isAccountDashboard={props.isAccountDashboard}
          />
        )
      })}
    </React.Fragment>
  )
}

const NavAccordion: React.FunctionComponent<NavAccordionProps> = (props) => {
  const {
    title,
    href,
    subItems = [],
    badge,
    isMobileOrTablet,
    currentActiveAccordion,
    onDropdownClick,
  } = props
  const isOpen = (title && currentActiveAccordion?.[title]) || false
  let closeTimeout: any = null

  const toggleSubItems = () => {
    onDropdownClick && onDropdownClick(title || '', !isOpen)
  }

  const handleNavigate = () => {
    if (window?.location?.href) {
      //@ts-ignore
      window.location.href = href
    }
  }
  const setMenuOpen = (value: boolean) => {
    onDropdownClick && onDropdownClick(title || '', value)
  }

  const onMouseEnter = () => {
    if (!isMobileOrTablet && subItems?.length > 0) {
      onDropdownClick && onDropdownClick(title || '', true)
      if (closeTimeout) {
        clearTimeout(closeTimeout)
      }
    }
  }

  const onMouseLeave = () => {
    if (!isMobileOrTablet && subItems?.length > 0 && onDropdownClick) {
      closeTimeout = setTimeout(() => {
        onDropdownClick(title || '', false)
      }, 150)
    }
  }

  return (
    <div
      className={clx(css.accordion, {
        [css.accordionAccountDashboard]: props.isAccountDashboard,
      })}
    >
      <div
        className={clx('accordionTitle', css.accordionTitle)}
        onClick={subItems?.length > 0 ? toggleSubItems : handleNavigate}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {
          <div className={clx(css.accordionLinkTitle, { [css.red]: isOpen })}>
            <Typography
              styleType="p1"
              color={!isMobileOrTablet ? 'tertiary' : 'primary'}
              fontType="boldFont"
              className={clx(css.accordionLinkTitle, {
                [css.red]: isOpen,
              })}
            >
              {title ?? ''}
            </Typography>
            {badge && <div className={css.badge}>{badge}</div>}
          </div>
        }
        {subItems?.length > 0 && (
          <div>
            {!isMobileOrTablet ? (
              <ChevronDownWhiteNew
                className={clx(css.chevronIcon, { [css.spinIcon]: isOpen })}
              />
            ) : (
              <ChevronDownNew
                className={clx(css.chevronIcon, css.addOpacity, {
                  [css.spinIcon]: isOpen,
                })}
              />
            )}
          </div>
        )}
      </div>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={clx(css.menuContainer, { [css.toggleMenuOpen]: isOpen })}
      >
        <Menu
          subItems={subItems}
          setOpen={setMenuOpen}
          isMobileOrTablet={isMobileOrTablet}
          isAccountDashboard={props.isAccountDashboard}
        />
      </div>
    </div>
  )
}

const Menu: React.FunctionComponent<NavAccordionProps> = (props) => {
  const { subItems } = props
  return (
    <ul className={css.accordionNavList}>
      {subItems?.map((item, index) => (
        <a
          href={item.href}
          id={`anchor-${item.title.replace(/ /g, '')}-${index}`}
          key={`nav-${item.title}`}
        >
          <li
            className={css.accordionNavListItem}
            id={`anchor-li-${item.title.replace(/ /g, '')}-${index}`}
            key={item.title}
          >
            <Typography
              styleType="p3"
              className={clx(css.navItemTitle, {
                [css.navItemTitleAccountDashboard]: props.isAccountDashboard,
              })}
            >
              {item.title}
            </Typography>
            {Boolean(item.subItems?.length) && <Menu {...item} />}
          </li>
        </a>
      ))}
    </ul>
  )
}

export default NavMenu
