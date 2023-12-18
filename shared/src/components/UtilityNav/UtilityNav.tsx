import React from 'react'
import clx from 'classnames'
import Typography from './../Typography'
import css from './UtilityNav.module.scss'
import { IUtilityNavProps } from './index'
// import { ChevronLeft } from '@/shared-ui/react-icons'

const UtilityNav: React.FunctionComponent<IUtilityNavProps> = ({
  sites,
  className,
  showCartLanguageBanner,
  cart,
  isReturningUser = false,
}) => {
  const shouldRenderBuyItem =
    showCartLanguageBanner &&
    cart?.href &&
    (!isReturningUser)
  return (
    <nav className={clx(css.utilityNav, className)}>
      {shouldRenderBuyItem && (
        <div className={css.utilityNavRow}>
          <ul className={css.utilityNavList}>
            {!isReturningUser ? (
              <li
                className={clx(css.utilityNavListItem)}
                key={'cartHref' + cart?.href}
              >
                <a href={cart?.href} data-testid="card-link">
                  <Typography
                    styleType="p2"
                    color="tertiary"
                    fontType="boldFont"
                  >
                    {cart?.title || ''}
                  </Typography>
                </a>
              </li>
            ) : (
              <li>&nbsp;</li>
            )}
          
          </ul>
        </div>
      )}
      <div className={css.utilityNavRow}>
        {sites?.length === 1 ? (
          <ul className={css.utilityNavList}>
            <li className={clx(css.utilityNavListItem)} key={sites[0].site}>
              <a
                href={sites[0].href}
                data-testid="nav-link"
                className={css.backLink}
              >
                {/* <ChevronLeft /> */}
                <Typography
                  styleType="p3"
                  color="tertiary"
                  className={clx(css.utilityNavListItems)}
                >
                  {sites[0].site}
                </Typography>
              </a>
            </li>
          </ul>
        ) : (
          <ul
            className={clx(css.utilityNavList, css.utilityNavListBorder, {
              [css.utilityNavListBorderPosition]: !shouldRenderBuyItem,
            })}
          >
            {sites?.map((item: any, i: number) => {
              const { href, site } = item
              return (
                <li
                  className={clx(css.utilityNavListItem, {
                    [css.linkActive]: i === 0,
                  })}
                  key={site + i}
                >
                  <a href={href} data-testid="nav-link">
                    <Typography
                      styleType="p3"
                      color="tertiary"
                      className={clx(css.utilityNavListItems, {
                        [css.linkActive]: i === 0,
                      })}
                    >
                      {site}
                    </Typography>
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      
      </div>
    </nav>
  )
}

export default UtilityNav
