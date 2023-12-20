import { Button, InjectHTML } from '@/shared-ui/components'
import {
  IFourTileItem,
  IFourTilesType,
} from '@/shared-ui/components/FourTiles/types'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'
const Tile = ({
  className,
  type = 'light',
  titleClassName = '',
  titleStyleType = 'h6',
  descriptionStyleType = '',
  descriptionClassName = '',
  cardClassName = '',
  buttonClassName = '',
  iconClassName = '',
  buttonWrapperClass = '',
  subTitleClassName = '',
  tile,
}: TileTypes) => {
  const { width } = useWindowDimensions()
  const isMobile = width <= 768

  return (
    <div className={className}>
      <div className={cardClassName}>
        {tile?.icon && <div className={iconClassName}>{tile?.icon}</div>}
        <div>
          {tile.title && (
            <InjectHTML
              testId="test-title"
              styleType={titleStyleType}
              tagType="h5"
              className={titleClassName}
              value={tile.title}
            />
          )}
          {tile.description && (
            <InjectHTML
              styleType={descriptionStyleType}
              testId="test-description"
              color={type === 'red' ? 'default' : 'default'}
              className={descriptionClassName}
              value={tile.description}
            />
          )}
          {tile.subTitle && (
            <InjectHTML
              testId="test-subTitle"
              tagType="h6"
              styleType="h6"
              className={subTitleClassName}
              value={tile.subTitle}
            />
          )}
          {tile?.button?.text && (
            <Button
              type="link"
              onClick={tile?.button?.onClick}
              variant={isMobile ? 'secondary' : 'tertiary'}
              text={tile?.button?.text}
              disabled={Boolean(tile?.button?.onClick)}
              href={tile?.button?.href}
              className={buttonClassName}
              wrapperClass={buttonWrapperClass}
              objectID={tile?.button?.objectID}
              hoverVariant="primary"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Tile
type TileTypes = {
  tile: IFourTileItem
  type: IFourTilesType
  titleClassName?: string
  titleStyleType?: any
  cardClassName?: string
  descriptionStyleType?: any
  descriptionClassName?: string
  buttonClassName?: string
  iconClassName?: string
  buttonWrapperClass?: string
  subTitleClassName?: string
  className?: string
}
