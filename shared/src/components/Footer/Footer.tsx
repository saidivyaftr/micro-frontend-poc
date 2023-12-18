import React, { useEffect } from 'react'


import Typography from '../Typography'
import css from './Footer.module.scss'
import InjectHTML from '../InjectHTML'
// import SocialMediaLinks from '../SocialMediaLinks'
import { IFooter } from './types'
import clx from 'classnames'

const Footer: React.FC<IFooter> = (props: any) => {
  const {
    links,
    legalText,
    copyRights,
    bottomLinks,
    socialMediaLinks,
    onClickCallback,
    miniFooter,
  } = props
  return (
    <footer
      id="footer"
      className={clx(css.footer, {
        [css.footerBorder]: miniFooter,
      })}
    >
      <div
        className={clx(css.footerWrapper, {
          [css.miniFooterPadding]: miniFooter,
        })}
      >
        <div className={css.footerLinksContainer}>
          {links?.map(({ title, children }, index) => {
            return (
              <div
                key={`footer-column-${index}`}
                className={css.footerLinksColumn}
              >
                <Typography
                  testId="test-mainlink-category"
                  tagType="h6"
                  styleType="h6"
                >
                  {title}
                </Typography>
                <ul className={css.footerSubListContainer}>
                  {children?.map(({ title, href }) => {
                    return (
                      <li key={`footer-column-${index}-${title}`}>
                        <a
                          data-testid={`test-mainlink-item-${index}`}
                          href={href}
                          className={css.footerSubLink}
                          onClick={() => onClickCallback?.(title)}
                        >
                          <Typography tagType="span" styleType="p3">
                            {title}
                          </Typography>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      
        <div>
          {legalText && (
            <InjectHTML
              testId="test-legalText"
              styleType="legal"
              className={css.legalText}
              value={legalText}
            />
          )}
        </div>
        <div>
          {copyRights && (
            <Typography
              testId="test-copyRights"
              className={clx(css.copyRights, {
                [css.noMarginCopyRights]: miniFooter,
              })}
            >
              {copyRights}
            </Typography>
          )}
        </div>
        <div
          className={clx(css.bottomWrapper, {
            [css.noMarginBottomWrapper]: miniFooter,
          })}
        >
          {bottomLinks && (
            <ul
              className={clx(css.footerBottomLinks, {
                [css.alignBottomLinksLeft]: miniFooter,
              })}
            >
              {bottomLinks?.map(({ title, href, onClick }: any) => {
                let handler: any = null
                if (onClick !== '') handler = new Function('event', onClick)

                return (
                  <li
                    key={`footer-bottom-link-${title}`}
                    className={clx(css.footerBottomLinkItem, {
                      [css.footerBottomLinkItemMini]: miniFooter,
                    })}
                  >
                    <a
                      data-testid="test-bottomLinks"
                      href={href}
                      className={css.footerSubLink}
                      onClick={(e) => {
                        if (onClick !== '') {
                          e.preventDefault()
                          handler()
                        }
                        onClickCallback?.(title)
                      }}
                    >
                      <InjectHTML
                        tagType="span"
                        styleType="p4"
                        className={clx(css.footerBottomLinkText, {
                          [css.footerBottomLinkTextSmall]: miniFooter,
                        })}
                        value={title}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
          {/* <SocialMediaLinks socialMediaLinks={socialMediaLinks} /> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
