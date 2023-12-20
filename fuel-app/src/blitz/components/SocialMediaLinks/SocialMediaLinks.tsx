import React from 'react'
import css from './SocialMediaLinks.module.scss'
import clx from 'clsx'
import { ISocialMediaLinks } from './types'
const SocialMediaLinks: React.FC<ISocialMediaLinks> = (props) => {
  const { socialMediaLinks, wrapperClassName = '' } = props

  return socialMediaLinks ? (
    <ul className={clx(css.socialMediaLinks, wrapperClassName)}>
      {socialMediaLinks?.map(({ icon, href, title }, index) => {
        return (
          <li key={`social-media-${index}`}>
            <a data-testid="test-socialMediaLinks" href={href} title={title}>
              {icon}
            </a>
          </li>
        )
      })}
    </ul>
  ) : null
}

export default SocialMediaLinks
