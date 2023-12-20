import React from 'react'
import {
  LinksAccordion,
  Typography,
  InjectHTML,
  SocialMediaLinks,
} from '@/shared-ui/components'
import css from './DarkFooter.module.scss'
import { IFooter } from './types'
import Logo from '@/shared-ui/react-icons/logo'
import LanguageSelector from './LanguageSelector'
import clx from 'classnames'

const Footer: React.FC<IFooter> = (props) => {
  const {
    links,
    copyRights,
    bottomLinks,
    socialMediaLinks,
    onClickCallback,
    shouldShowTranslations = false,
    toggleLocale,
    selectedLanguage = '',
    miniFooter,
  } = props

  if (miniFooter) {
    return (
      <footer className={css.miniFooter}>
        <div>
          {copyRights && (
            <Typography
              testId="test-copyRights"
              className={css.noMarginCopyRights}
            >
              {copyRights}
            </Typography>
          )}
        </div>
        <div className={css.noMarginBottomWrapper}>
          {bottomLinks && (
            <ul
              className={clx(css.footerBottomLinks, {
                [css.alignBottomLinksLeft]: miniFooter,
              })}
            >
              {bottomLinks?.map(({ title, href }) => {
                return (
                  <li
                    key={`footer-bottom-link-${title}`}
                    className={css.footerBottomLinkItem}
                  >
                    <a
                      data-testid="test-bottomLinks"
                      href={href}
                      className={css.footerSubLink}
                      onClick={() => onClickCallback?.(title)}
                    >
                      <InjectHTML
                        tagType="span"
                        styleType="p4"
                        className={css.footerBottomLinkTextSmall}
                        value={title}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </footer>
    )
  }
  return (
    <footer id="footer" className={css.footer}>
      <div className={css.footerWrapper}>
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
                  className={css.linkHeader}
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
        {links && (
          <div className={css.linksAccordion}>
            <LinksAccordion list={links} darkMode />
          </div>
        )}
        <div className={css.bottomWrapper}>
          <ul className={css.logoWrapper}>
            <li>
              <a
                data-testid="test-bottomLinks"
                href={'#'}
                className={css.footerSubLink}
              >
                <Logo />
              </a>
            </li>
          </ul>
          {bottomLinks && (
            <ul className={css.footerBottomLinks}>
              {bottomLinks?.map(({ title, href }) => {
                return (
                  <li
                    key={`footer-bottom-link-${title}`}
                    className={css.footerBottomLinkItem}
                  >
                    <a
                      data-testid="test-bottomLinks"
                      href={href}
                      className={css.footerSubLink}
                      onClick={() => onClickCallback?.(title)}
                    >
                      <InjectHTML
                        tagType="span"
                        styleType="p3"
                        className={css.footerBottomLinkText}
                        value={title}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
          <div className={css.secondaryBottomWrapper}>
            {shouldShowTranslations && (
              <ul className={css.languageWrapper}>
                <li className={css.inputSelect}>
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    toggleLocale={toggleLocale}
                  />
                </li>
              </ul>
            )}
            <SocialMediaLinks
              socialMediaLinks={socialMediaLinks}
              wrapperClassName={css.socialMediaWrapper}
            />
          </div>
        </div>
        <div>
          {copyRights && (
            <Typography testId="test-copyRights" className={css.copyRights}>
              {copyRights}
            </Typography>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
