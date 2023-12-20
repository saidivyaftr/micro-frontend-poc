import { Typography } from '@/shared-ui/components'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'
const TileWithImage = ({
  title,
  description,
  imgSrc,
  reverse,
  tileWrapperClassName = '',
  contentSectionClassName = '',
  cardTitleClassName = '',
  cardDescriptionClassName = '',
  imageSectionClassName = '',
}: TileWithImageType) => {
  const { width } = useWindowDimensions()
  const isMobile = width < 768
  return (
    <div className={tileWrapperClassName}>
      {reverse && !isMobile ? (
        <>
          <div className={contentSectionClassName}>
            <Typography
              styleType="h4"
              tagType="h4"
              fontType="regularFont"
              className={cardTitleClassName}
            >
              {title}
            </Typography>
            <Typography
              testId="test-tile-description"
              className={cardDescriptionClassName}
              tagType="p"
              styleType="p3"
            >
              {description}
            </Typography>
          </div>
          <div className={imageSectionClassName}>
            <img src={imgSrc} alt={title} />
          </div>
        </>
      ) : (
        <>
          <div className={imageSectionClassName}>
            <img src={imgSrc} alt={title} />
          </div>
          <div className={contentSectionClassName}>
            <Typography
              styleType="h4"
              tagType="h4"
              fontType="regularFont"
              className={cardTitleClassName}
            >
              {title}
            </Typography>
            <Typography
              testId="test-tile-description"
              className={cardDescriptionClassName}
              tagType="p"
              styleType="p3"
            >
              {description}
            </Typography>
          </div>
        </>
      )}
    </div>
  )
}

export default TileWithImage

type TileWithImageType = {
  title: string
  description: string
  imgSrc: string
  reverse: number
  tileWrapperClassName: string
  contentSectionClassName: string
  cardTitleClassName: string
  cardDescriptionClassName: string
  imageSectionClassName: string
}
