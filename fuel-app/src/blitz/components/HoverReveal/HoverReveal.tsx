import clx from 'classnames'
import { Typography, InjectHTML } from '@/shared-ui/components'
import { IHoverReveal, IColor } from './types'
import css from './HoverReveal.module.scss'

const HoverReveal = ({
  titleBackground,
  title,
  alignTitle = 'left',
  color = 'secondary',
  imageSrc,
  contentTitle,
  contentIntro,
  contentDescription,
  contentTextColor,
}: IHoverReveal) => {
  const backgroundColor = getBackgroundColor(color)
  return (
    <div className={css.container}>
      <div className={clx(css.titleContainer, backgroundColor)}>
        <div
          style={{ backgroundColor: titleBackground, display: 'inline-block' }}
          className={clx(css.titleWrapper, {
            [css.alignLeft]: alignTitle === 'left',
            [css.alignCenter]: alignTitle === 'center',
            [css.alignRight]: alignTitle === 'right',
          })}
        >
          <InjectHTML
            color={color}
            tagType="h1"
            styleType="h1"
            value={title}
            className={css.title}
          />
        </div>
      </div>
      <div className={clx(css.slideContainer, getBackgroundColor(color))}>
        <img src={imageSrc} alt={title} loading="lazy" />
        <div className={css.slideContent}>
          <Typography tagType="h5" styleType="h1" className={css.slideTitle}>
            {contentTitle}
          </Typography>
          <div className={css.descriptionContainer}>
            <Typography
              fontType="boldFont"
              className={css.mainIntro}
              color={contentTextColor}
            >
              {contentIntro}
            </Typography>
            <Typography color={contentTextColor}>
              {contentDescription}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

const getBackgroundColor = (color: IColor) => {
  return clx({
    [css.primaryBackground]: color === 'primary',
    [css.secondaryBackground]: color === 'secondary',
    [css.tertiaryBackground]: color === 'tertiary',
  })
}

export default HoverReveal
