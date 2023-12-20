import { useState } from 'react'
import clx from 'classnames'
import { Typography } from '@/shared-ui/components'
import {
  Add,
  Collapse,
  ChevronDownWhite,
  ChevronUpWhite,
} from '@/shared-ui/react-icons'
import { ILinksAccordion } from './types'
import css from './LinksAccordion.module.scss'

const LinksAccordion = (props: ILinksAccordion) => {
  const {
    list = [],
    titleClassName,
    childrenClassName,
    darkMode = false,
    ...args
  } = props

  const [showChild, setShowChild] = useState(-1)

  function onChildToggle(index: number) {
    if (showChild == index) {
      setShowChild(-1)
    } else {
      setShowChild(index)
    }
  }

  return (
    <div {...args}>
      {list?.map((item, index) => (
        <LinksAccordionItem
          key={`links-accordion-${item?.title}-${index}`}
          isExpanded={index == showChild}
          {...item}
          titleClassName={titleClassName}
          childrenClassName={childrenClassName}
          darkMode={darkMode}
          onToggle={() => onChildToggle(index)}
        />
      ))}
    </div>
  )
}
const LinksAccordionItem = ({
  title,
  children,
  titleClassName,
  childrenClassName,
  isExpanded,
  onToggle,
  darkMode,
}: any): JSX.Element => {
  return (
    <div className={css.accordionItem}>
      <div
        role="button"
        onClick={onToggle}
        className={clx(css.rowTitle, titleClassName)}
      >
        <Typography
          tagType="h6"
          styleType="h6"
          color={darkMode ? 'tertiary' : 'default'}
        >
          {title}
        </Typography>
        {isExpanded ? (
          darkMode ? (
            <ChevronDownWhite
              width={16}
              height={16}
              className={clx(css.icon, { [css.spinIcon]: onToggle })}
            />
          ) : (
            <Collapse
              width={16}
              height={16}
              className={clx(css.icon, { [css.spinIcon]: onToggle })}
            />
          )
        ) : darkMode ? (
          <ChevronUpWhite
            width={16}
            height={16}
            className={clx(css.icon, { [css.spinIcon]: onToggle })}
          />
        ) : (
          <Add
            width={16}
            height={16}
            className={clx(css.icon, { [css.spinIcon]: onToggle })}
          />
        )}
      </div>
      <div
        className={clx(css.rowDescription, childrenClassName, {
          [css.showChildren]: isExpanded,
        })}
      >
        <ul>
          {children?.map(({ title, href }: any, index: number) => (
            <li key={`links-${title}-${index}`}>
              <a href={href}>
                <Typography
                  tagType="span"
                  styleType="p2"
                  color={darkMode ? 'tertiary' : 'default'}
                >
                  {title}
                </Typography>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default LinksAccordion
