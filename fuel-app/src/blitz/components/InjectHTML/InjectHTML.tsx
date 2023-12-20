import clx from 'classnames'
// import DOMPurify from 'dompurify'
import { Typography } from '@/shared-ui/components'
import { IInjectHTML } from './types'
import css from './InjectHTML.module.scss'

const InjectHTML = ({
  value,
  pureInjection = false,
  // enableClick = false,
  className,
  addAnchorStyles = false,
  ...restProps
}: IInjectHTML): JSX.Element | null => {
  if (!value) {
    return null
  }
  // const attributes = ['target', 'styleType']
  // if (enableClick) {
  //   attributes.push('onClick')
  // }
  // TODO : Enable sanitization later
  // Reason to disable: Purifying content is taking time to process
  // and it is loading the elements in InjectHTML little late
  // const sanitizedData = DOMPurify?.sanitize?.(value, {
  //   ADD_ATTR: attributes,
  // })
  // if (!sanitizedData) {
  //   return null
  // }
  if (pureInjection) {
    return (
      <span
        className={className}
        {...restProps}
        data-testid={restProps.testId}
        dangerouslySetInnerHTML={{
          __html: value,
        }}
      />
    )
  }
  const { tagType } = restProps
  // Replaced P tag with Div tag as the dangerouslySetInnerHTML
  // is causing several issues in rendering dynamic content inside of p tag
  const elementTagType = tagType === 'p' ? 'div' : tagType
  return (
    <Typography
      className={clx(className, { [css.dynamicText]: addAnchorStyles })}
      {...restProps}
      tagType={elementTagType}
      dangerouslySetInnerHTML={{
        __html: value,
      }}
    />
  )
}

export default InjectHTML
