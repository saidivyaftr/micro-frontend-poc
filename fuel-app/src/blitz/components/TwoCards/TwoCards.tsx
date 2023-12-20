import React from 'react'
import clx from 'classnames'
import { Typography, InjectHTML } from '@/shared-ui/components'
import { ITwoCardsProps } from './types'
import css from './TwoCards.module.scss'

const TwoCards: React.FunctionComponent<ITwoCardsProps> = (data) => {
  return (
    <div className={css.root}>
      <div className={css.twoCardsContainer}>
        <InjectHTML
          testId="test-heading"
          className={css.heading}
          tagType="h2"
          styleType="h3"
          value={data.heading}
        />
        <InjectHTML
          testId="test-copy"
          className={css.copy}
          tagType="p"
          styleType="p1"
          value={data.copy}
        />
        <div className={css.gridContainer}>
          {data.cards.map((item) => (
            <div className={css.card} key={item.heading}>
              <img
                data-testid="image-content"
                src={item.image?.srcMobile}
                alt={item.image?.altText}
                className={clx(css.cardImage, css.hideTablet)}
                loading="lazy"
              />
              <img
                src={item.image?.srcTablet}
                alt={item.image?.altText}
                className={clx(css.cardImage, css.hideMobile)}
                loading="lazy"
              />
              <div className={css.cardCopyLockup}>
                <Typography
                  testId="test-card-heading"
                  className={css.cardHeading}
                  tagType="p"
                  styleType="h5"
                  color="tertiary"
                >
                  {item.heading}
                </Typography>
                <Typography
                  testId="test-card-eyebrow"
                  className={css.cardEyebrow}
                  tagType="span"
                  styleType="p1"
                  color="secondary"
                >
                  {item.eyebrow}
                </Typography>
                <Typography
                  testId="test-card-multiplier"
                  className={css.cardMultiplier}
                  tagType="span"
                  styleType="h3"
                  color="primary"
                >
                  {item.multiplier}
                </Typography>
                <InjectHTML
                  testId="test-card-copy"
                  className={css.cardCopy}
                  tagType="span"
                  styleType="p2"
                  color="secondary"
                  value={item.copy}
                />
              </div>
            </div>
          ))}
        </div>
        <Typography
          testId="test-disclaimer"
          className={css.disclaimer}
          tagType="p"
          styleType="legal"
        >
          {data.disclaimer}
        </Typography>
      </div>
    </div>
  )
}

export default TwoCards
