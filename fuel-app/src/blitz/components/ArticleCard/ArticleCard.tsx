import React, { useState, useMemo, useEffect } from 'react'
import clx from 'classnames'
import { InjectHTML, Button } from '@/shared-ui/components'
import { IArticleCardProps } from './index'
import { getBackgroundColor } from '@/shared-ui/theme/colors.helper'
import { RightArrowIcon, Magnify } from '@/shared-ui/react-icons'
import css from './ArticleCard.module.scss'

const ITEMS_PER_VIEW = 6

const ArticleCard: React.FunctionComponent<IArticleCardProps> = (props) => {
  const {
    cards,
    title,
    subtext,
    backgroundColor,
    shouldTruncate = false,
    showLessText = 'Show Less',
    showMoreText = 'Show More',
    maxCap = 30,
    cardsPerRow = 3,
    itemsPerView = ITEMS_PER_VIEW,
    cardsContainerClassName = '',
  } = props
  const [currentRenderedItems, setCurrentRenderedItems] = useState(itemsPerView)

  const filteredList = useMemo(() => {
    return shouldTruncate ? cards.slice(0, currentRenderedItems) : cards
  }, [currentRenderedItems, shouldTruncate, maxCap, cards])

  const onShowMoreClick = () => {
    setCurrentRenderedItems(currentRenderedItems + itemsPerView)
  }

  const onShowLessClick = () => {
    setCurrentRenderedItems(itemsPerView)
  }

  useEffect(() => {
    setCurrentRenderedItems(itemsPerView)
  }, [itemsPerView])

  return (
    <div className={clx(getBackgroundColor(backgroundColor))}>
      <div className={css.wrappers}>
        {title && (
          <InjectHTML
            tagType="h2"
            styleType="h4"
            testId="test-title"
            value={title}
          />
        )}
        {subtext && (
          <InjectHTML
            tagType="p"
            styleType="p1"
            testId="sub-text"
            value={subtext}
          />
        )}
        <div className={clx(css.flexWrapper, cardsContainerClassName)}>
          {filteredList?.map((card: any, index: number) => (
            <div
              key={`${card?.title}-${index}`}
              className={clx(css.supportArticle, 'supportArticle', {
                [css.searchBackground]: card?.type === 'search',
                [css.twoCardsPerRow]: cardsPerRow === 2,
              })}
            >
              <a href={card?.href} className={css.articleContent}>
                {card?.title ? (
                  <InjectHTML
                    tagType="span"
                    styleType="h6"
                    testId="test-article-category"
                    className={clx(css.articleCategory, {
                      [css.searchArticleTitle]: card?.type === 'search',
                    })}
                    value={card?.title}
                  />
                ) : (
                  <Magnify className={css.cardIcon} />
                )}

                <InjectHTML
                  tagType="span"
                  styleType="h5"
                  testId="test-article-title"
                  className={clx(css.articleTitle, {
                    [css.searchArticleTitle]: card?.type === 'search',
                  })}
                  value={card?.subtitle}
                />
                <i
                  className={clx(css.iconWrapper, {
                    [css.searchIconWrapper]: card?.type === 'search',
                  })}
                >
                  <RightArrowIcon />
                </i>
              </a>
            </div>
          ))}
        </div>
        {shouldTruncate && cards?.length > itemsPerView && (
          <div className={css.showMoreButtonWrapper}>
            <Button
              type="button"
              text={
                filteredList?.length >= maxCap ||
                filteredList?.length === cards?.length
                  ? showLessText
                  : showMoreText
              }
              variant="tertiary"
              onClick={
                filteredList?.length >= maxCap ||
                filteredList?.length === cards?.length
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

export default ArticleCard
