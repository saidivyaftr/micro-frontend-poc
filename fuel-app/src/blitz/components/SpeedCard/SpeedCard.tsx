import React from 'react'
import clx from 'classnames'
import { Typography } from '@/shared-ui/components'
import { ISpeedCardProps } from './index'
import {
  getBackgroundColor,
  getFontColor,
} from '@/shared-ui/theme/colors.helper'
import css from './SpeedCard.module.scss'
import { CheckMarkThin } from '@/shared-ui/react-icons'

const SpeedCard: React.FunctionComponent<ISpeedCardProps> = (props) => {
  const { perks, title, backgroundColor, titleFontColor = 'initial' } = props
  return (
    <div className={clx(getBackgroundColor(backgroundColor))}>
      <div className={css.speedCard}>
        <div className={css.innerWrapper}>
          <Typography tagType="h5" styleType="h5" testId="test-title">
            <span className={clx(getFontColor(titleFontColor))}>{title}</span>
          </Typography>
        </div>
        <div className={css.flexWrapper}>
          {perks?.map((perk: any, index: number) => (
            <div
              key={`${perk?.title}-${index}`}
              className={css.descriptionContainer}
            >
              <div className={css.descriptionWrapper}>
                <Typography
                  tagType="h6"
                  styleType="h6"
                  testId="test-perk-title"
                  className={css.perkTitle}
                >
                  {perk?.title}
                </Typography>
                <Typography
                  tagType="div"
                  styleType="p2"
                  testId="test-perk-subtitle"
                  className={css.perkSubTitle}
                >
                  {perk?.subtitle}
                </Typography>
                <ul>
                  {perk?.targetItems?.map((item: any) => (
                    <li key={`${item?.name}-${index}`}>
                      <div className={css.iconWrapper}>
                        <CheckMarkThin />
                      </div>
                      <Typography
                        className={css.perkDesc}
                        tagType="div"
                        styleType="p2"
                        testId="test-perk-description"
                      >
                        {item?.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpeedCard
