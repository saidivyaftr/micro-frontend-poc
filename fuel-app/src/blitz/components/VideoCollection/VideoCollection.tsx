import React, { useState, useMemo } from 'react'
import { Typography, Button, VideoModal } from '@/shared-ui/components'
import { IVideoCollectionProps } from './index'
import css from './VideoCollection.module.scss'

const ITEMS_PER_VIEW = 2

const VideoCollection: React.FunctionComponent<IVideoCollectionProps> = ({
  videos,
  title,
  subtext,
  shouldTruncate = false,
  showLessText = 'Show Less',
  showMoreText = 'Show More',
  maxCap = 1000,
}) => {
  const [currentRenderedItems, setCurrentRenderedItems] =
    useState(ITEMS_PER_VIEW)

  const filteredList = useMemo(() => {
    return shouldTruncate ? videos.slice(0, currentRenderedItems) : videos
  }, [currentRenderedItems, shouldTruncate, maxCap, videos])

  const onShowMoreClick = () => {
    setCurrentRenderedItems(currentRenderedItems + ITEMS_PER_VIEW)
  }

  const onShowLessClick = () => {
    setCurrentRenderedItems(ITEMS_PER_VIEW)
  }

  return (
    <div>
      <div className={css.wrappers}>
        <Typography tagType="h2" styleType="h4" testId="test-title">
          <span>{title}</span>
        </Typography>
        {subtext && (
          <Typography tagType="p" styleType="p1" testId="sub-text">
            <span>{subtext}</span>
          </Typography>
        )}
        <div className={css.flexWrapper}>
          {filteredList?.map((video: any, index: number) => (
            <div key={`${video?.title}-${index}`} className={css.videoItem}>
              <VideoModal
                {...video}
                videoCardClassName={css.videoCardClassName}
              />
            </div>
          ))}
        </div>
        {shouldTruncate && videos?.length > ITEMS_PER_VIEW && (
          <div className={css.showMoreButtonWrapper}>
            <Button
              type="button"
              text={
                filteredList?.length >= maxCap ||
                filteredList?.length === videos?.length
                  ? showLessText
                  : showMoreText
              }
              variant="tertiary"
              onClick={
                filteredList?.length >= maxCap ||
                filteredList?.length === videos?.length
                  ? onShowLessClick
                  : onShowMoreClick
              }
              className={css.showMoreButton}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoCollection
