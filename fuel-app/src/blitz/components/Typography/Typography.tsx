import css from './Typography.module.scss'
import { ITypography, ITypographyFontType } from './types'
import { ITypographyStyleType } from './types'
import clx from 'classnames'

const Typography = ({
  tagType = 'div',
  styleType = 'p2',
  className = '',
  children,
  color = 'default',
  testId = undefined,
  fontType = '',
  ...rest
}: ITypography) => {
  const styleClassName = clx(
    getElementTag(styleType, color, fontType),
    className,
  )
  switch (tagType) {
    case 'h1':
      return (
        <h1 className={styleClassName} data-testid={testId} {...rest}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={styleClassName} data-testid={testId} {...rest}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 className={styleClassName} data-testid={testId} {...rest}>
          {children}
        </h3>
      )
    case 'h4':
      return (
        <h4 className={styleClassName} data-testid={testId} {...rest}>
          {children}
        </h4>
      )
    case 'h5':
      return (
        <h5 className={styleClassName} data-testid={testId} {...rest}>
          {children}
        </h5>
      )
    case 'h6':
      return (
        <h6 className={styleClassName} data-testid={testId} {...rest}>
          {children}
        </h6>
      )
    case 'span':
      return (
        <span className={styleClassName} data-testid={testId} {...rest}>
          {children}
        </span>
      )
    case 'label':
      return (
        <label className={styleClassName} data-testid={testId} {...rest}>
          {children}
        </label>
      )
    case 'p':
      return (
        <p className={styleClassName} data-testid={testId} {...rest}>
          {children}
        </p>
      )
    default:
      return (
        <div className={styleClassName} data-testid={testId} {...rest}>
          {children}
        </div>
      )
  }
}

function getElementTag(
  styleType: ITypographyStyleType,
  color: 'primary' | 'secondary' | 'tertiary' | 'default',
  fontType: ITypographyFontType,
) {
  return clx(
    css?.[styleType] || css.p2,
    // @ts-ignore
    css?.[color.toLowerCase() + 'TextColor'] || css.defaultTextColor,
    // @ts-ignore
    css?.[fontType] || '',
  )
}

export default Typography
