/* eslint-disable @typescript-eslint/indent */
import ArrowLink from '../ArrowLink'
import Typography from '../Typography'
import clx from 'classnames'
import css from './Card.module.scss'
import { CardProps, CardWithTitleProps, TitleProps } from './types'

export const Title = ({
  title,
  labelLink,
  url,
  arrowColor,
  hoverColor,
  className,
  dataTestId = 'card-title',
  ...props
}: TitleProps) => {
  return (
    <>
      <div className={clx(css.title, className)}>
        <Typography
          styleType="p2"
          fontType="boldFont"
          {...props}
          testId={dataTestId}
        >
          {title}
        </Typography>
        {!!labelLink && !!url && (
          <ArrowLink
            fontType="boldFont"
            label={labelLink}
            url={url}
            arrowColor={arrowColor}
            hoverColor={hoverColor}
            {...props}
            styleType="p2"
          />
        )}
      </div>
    </>
  )
}

export const CardWithTitle = ({
  title,
  labelLink,
  url,
  children,
  classNameTitle = '',
  dataTestId = 'card',
  styleType,
  ...props
}: CardWithTitleProps) => {
  return (
    <Card {...props} dataTestId={dataTestId}>
      <>
        {title && (
          <Title
            title={title}
            labelLink={labelLink}
            url={url}
            styleType={styleType}
            {...props}
            dataTestId={`${dataTestId}-title`}
            className={classNameTitle}
          />
        )}
        {children}
      </>
    </Card>
  )
}

const Card = ({
  children,
  backgroundColor = 'default',
  size = 'big-square',
  className,
  dataTestId = 'card',
}: CardProps) => (
  <div
    className={clx(
      css.container,
      className,
      css[`background-${backgroundColor}`],
      css[`padding-${size}`],
    )}
    data-testid={dataTestId}
  >
    {children}
  </div>
)

export default Card
