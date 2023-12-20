import React from 'react'
import clx from 'classnames'
import { Button, InjectHTML } from '@/shared-ui/components'
import { FOUR_TILES } from 'src/constants'
import { getFontColor } from '@/shared-ui/theme/colors.helper'
import { IFourTiles, IFourTileItem } from './types'
import css from './FourTiles.module.scss'
import * as ReactDOMServer from 'react-dom/server'
const FourTiles: React.FunctionComponent<IFourTiles> = ({
  tiles = [],
  type = 'light',
  tilesWrapperClassName = '',
  textAlign = 'center',
  mobileOneCol = false,
  tabletTwoCol = false,
  tabletOneCol = false,
  titleClassName = '',
  titleStyleType = 'h6',
  titleTagType = 'h5',
  descriptionStyleType = '',
  descriptionClassName = '',
  cardClassName = '',
  isClickable = true,
  disableHover = false,
  hoverStyle = '',
  roundedBorders = false,
  buttonClassName = '',
  iconClassName = '',
  buttonWrapperClass = '',
  subTitleClassName = '',
  renderData,
}: IFourTiles) => {
  return (
    <div
      className={clx(css.fourTiles, tilesWrapperClassName, {
        [css.threeTiles]: tiles?.length <= 3,
        [css.mobileOneCol]: mobileOneCol,
        [css.tabletTwoCol]: tabletTwoCol,
        [css.tabletOneCol]: tabletOneCol,
      })}
    >
      {tiles.map((tile: IFourTileItem, i: number) => (
        <TileWrapper
          key={i}
          isClickable={isClickable}
          href={tile.href}
          objectID={tile.objectID}
          title={tile.title}
          className={clx(
            css.tile,
            cardClassName,
            css.light,
            {
              [css.roundedBorders]: roundedBorders,
              [css.mobileBorder]: mobileOneCol,
            },
            {
              [css.alignRight]: textAlign === 'right',
              [css.alignLeft]: textAlign === 'left',
              [css.alignCenter]: textAlign !== 'right' && textAlign !== 'left',
              [css.dark]: type === 'dark',
              [css.red]: type === 'red',
              [css.hoverRed]:
                ((tile.href && type === 'light') || hoverStyle === 'red') &&
                !disableHover,
              [css.hoverPrimary]:
                ((tile.href && type === 'dark') || hoverStyle === 'primary') &&
                !disableHover,
            },
          )}
        >
          {tile?.icon && (
            <div className={clx(css.icon, iconClassName, 'tile-icon')}>
              {tile?.icon}
            </div>
          )}
          <div>
            {tile.title && (
              <InjectHTML
                testId="test-title"
                styleType={titleStyleType}
                tagType={titleTagType}
                className={clx(css.title, titleClassName, 'title', {
                  [css.lightFont]: type === 'dark',
                  [getFontColor('primary')]: type === 'red',
                })}
                value={tile.title}
              />
            )}
            {tile.subTitle && (
              <InjectHTML
                testId="test-title"
                styleType={descriptionStyleType}
                className={clx(css.title, subTitleClassName, 'title', {
                  [css.lightFont]: type === 'dark',
                  [getFontColor('primary')]: type === 'red',
                })}
                value={tile.subTitle}
              />
            )}
            {tile.description && (
              <InjectHTML
                styleType={descriptionStyleType}
                testId="test-description"
                color={type === 'red' ? 'default' : 'default'}
                className={clx(css.description, descriptionClassName, {
                  [css.lightFont]: type === 'dark',
                })}
                value={tile.description}
              />
            )}
            {renderData && renderData(i)}
            {tile?.button?.text && (
              <Button
                type="link"
                onClick={tile?.button?.onClick}
                variant={tile?.button?.variant}
                text={tile?.button?.text}
                disabled={Boolean(tile?.button?.onClick)}
                href={tile?.button?.href}
                className={(clx(css.tileButton), buttonClassName)}
                wrapperClass={buttonWrapperClass}
                objectID={tile?.button?.objectID}
                hoverVariant={tile?.button?.buttonHoverVariant}
              />
            )}
          </div>
        </TileWrapper>
      ))}
    </div>
  )
}

const TileWrapper = ({
  isClickable,
  href,
  children,
  className,
  title,
  objectID,
}: any) => {
  const markup = ReactDOMServer.renderToStaticMarkup(children)
  return isClickable ? (
    <InjectHTML
      testId="test-tile-description"
      enableClick
      className={className}
      value={`<a href="${href}" onclick="s_objectID='${
        objectID ? objectID : FOUR_TILES.replace('{NAME}', title.toLowerCase())
      }'"} >${markup}</a>`}
    />
  ) : (
    <div className={className}>{children}</div>
  )
}

export default FourTiles
