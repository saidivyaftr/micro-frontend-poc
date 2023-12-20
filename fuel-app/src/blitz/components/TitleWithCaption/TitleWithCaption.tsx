import React from 'react'
import clx from 'classnames'
import { Typography, InjectHTML } from '@/shared-ui/components'
import { ITitleWithCaptionProps } from './index'
import {
  getBackgroundColor,
  getFontColor,
} from '@/shared-ui/theme/colors.helper'
import css from './TitleWithCaption.module.scss'

const TitleWithCaption: React.FunctionComponent<ITitleWithCaptionProps> = (
  props,
) => {
  const {
    disclaimerText = '',
    title,
    backgroundColor,
    fontColor = 'initial',
  } = props
  return (
    <div className={clx(css.root, getBackgroundColor(backgroundColor))}>
      <Typography
        tagType="h3"
        styleType="h3"
        testId="test-title"
        className={clx(getFontColor(fontColor))}
      >
        {title}
      </Typography>
      {disclaimerText && (
        <InjectHTML
          tagType="div"
          styleType="p1"
          className={clx(css.caption, getFontColor(fontColor))}
          testId="test-caption"
          value={disclaimerText}
        />
      )}
    </div>
  )
}

export default TitleWithCaption
