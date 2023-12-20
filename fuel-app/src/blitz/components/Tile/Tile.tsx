import React from 'react'
import clx from 'classnames'
import { ITile } from './types'
import css from './Tile.module.scss'
import { getBackgroundColor } from '@/shared-ui/theme/colors.helper'
import { Typography, InjectHTML, Button } from '@/shared-ui/components'

const Tile: React.FC<ITile> = ({
  className,
  title,
  description,
  descriptionClassName = '',
  ctas,
  backgroundColor = 'white',
  links,
}) => {
  return (
    <div
      className={clx(css.tile, getBackgroundColor(backgroundColor), className)}
    >
      {title && (
        <Typography styleType="h4" {...title}>
          {title?.children}
        </Typography>
      )}
      {description && (
        <InjectHTML
          className={clx(descriptionClassName)}
          styleType="p1"
          {...description}
        />
      )}
      {links &&
        links.map((link, i) => (
          <a
            key={`${link?.text?.children}-${i}`}
            {...link}
            className={clx(css.link, link?.className)}
          >
            <Typography {...link.text}>{link?.text?.children}</Typography>
          </a>
        ))}
      {ctas && (
        <div className={css.ctas}>
          {ctas.map((cta, i) => (
            <Button key={`${cta.label}-${i}`} text={cta.label} {...cta} />
          ))}
        </div>
      )}
    </div>
  )
}
export default Tile
