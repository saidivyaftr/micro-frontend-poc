import { useState, useMemo, useEffect } from 'react'
import clx from 'classnames'
import { InjectHTML, Button, BlockTable } from '@/shared-ui/components'
import { ChevronDown } from '@/shared-ui/react-icons'
import css from './Accordion.module.scss'
import { IAccordion } from './types'
import colors from '@/shared-ui/colors'

const ITEMS_PER_VIEW = 5

const Accordion = (props: IAccordion) => {
  console.log(props)
  const {
    list = [],
    titleClassName,
    descriptionClassName,
    borderUnderDescription = true,
    accordionClickHandler,
    isSingleItemOpen = true,
    shouldTruncate = false,
    maxCap = 25,
    showMoreText = 'Show More',
    showLessText = 'Show Less',
    openFirstItemOnLoad = false,
    headerNameTitle = '',
    roundedBorders = true,
    ...args
  } = props
  const [currentRenderedItems, setCurrentRenderedItems] =
    useState(ITEMS_PER_VIEW)
  const [openItems, setOpenItems] = useState(new Array<boolean>())

  const filteredList = useMemo(() => {
    return shouldTruncate ? list.slice(0, currentRenderedItems) : list
  }, [currentRenderedItems, shouldTruncate, maxCap, list])

  function toggleItem(itemIndex: number) {
    const items: boolean[] = isSingleItemOpen ? [] : openItems
    items[itemIndex] = !openItems[itemIndex]
    setOpenItems([...items])
    if (accordionClickHandler) {
      accordionClickHandler(items[itemIndex], filteredList[itemIndex]?.title)
    }
  }

  const onShowMoreClick = () => {
    setCurrentRenderedItems(currentRenderedItems + ITEMS_PER_VIEW)
  }

  const onShowLessClick = () => {
    setCurrentRenderedItems(ITEMS_PER_VIEW)
  }

  useEffect(() => {
    if (openFirstItemOnLoad) {
      toggleItem(0)
    }
  }, [openFirstItemOnLoad])

  return (
    <div {...args}>
      {filteredList?.map((item, index) => (
        <AccordionItem
          borderUnderDescription={borderUnderDescription}
          key={`accordion-${item.title}-${index}`}
          {...item}
          titleClassName={titleClassName}
          isOpen={openItems[index]}
          toggleAccordionHandler={() => toggleItem(index)}
          descriptionClassName={descriptionClassName}
          headerNameTitle={headerNameTitle}
          roundedBorders={roundedBorders}
        />
      ))}
      {shouldTruncate && list?.length > ITEMS_PER_VIEW && (
        <div className={css.showMoreButtonWrapper}>
          <Button
            type="button"
            text={
              filteredList?.length >= maxCap ||
              filteredList?.length === list?.length
                ? showLessText
                : showMoreText
            }
            variant="tertiary"
            onClick={
              filteredList?.length >= maxCap ||
              filteredList?.length === list?.length
                ? onShowLessClick
                : onShowMoreClick
            }
            className={css.showMoreButton}
          />
        </div>
      )}
    </div>
  )
}

const AccordionItem = ({
  title,
  description,
  titleClassName,
  descriptionClassName,
  borderUnderDescription,
  isOpen,
  toggleAccordionHandler,
  tableList,
  headerNameTitle,
  roundedBorders,
}: any): JSX.Element => {
  const toggleDescription = () => {
    toggleAccordionHandler()
  }

  return (
    <div>
      <div
        role="button"
        onClick={() => toggleDescription()}
        className={clx(css.rowTitle, titleClassName, {
          [css.borderUnderTitle]: isOpen && borderUnderDescription,
        })}
      >
        <InjectHTML
          testId="test-title"
          tagType="h3"
          styleType="h6"
          value={title}
        />
        <div className={css.chevronContainer}>
          <ChevronDown
            color={colors.main.midnightExpress}
            width={16}
            height={16}
            className={clx(css.icon, { [css.spinIcon]: isOpen })}
          />
        </div>
      </div>
      <div
        className={clx(
          css.rowDescription,
          descriptionClassName,
          {
            [css.showDescription]: isOpen,
          },
          {
            [css.borderUnderDescription]: isOpen && borderUnderDescription,
          },
        )}
      >
        {!!tableList?.length ? (
          <BlockTable
            items={tableList}
            addBorderToHeader
            hideBorderForTooltip={true}
            dropShadowForTooltip={true}
            rowHeaderstyleType="h6"
            headerNameTitle={headerNameTitle}
            styleModifier={{
              header: css.rowHeader,
              tableHeaderClassName: css.tableHeader,
              textStyleType: 'p1',
              showRedCheckMarks: true,
              hidePreferredRowValue: true,
              rowValueClassName: css.tableRowClass,
              headerNameTitleStyle: css.headerNameTitleStyle,
              rowHeaderLabel: css.rowHeader,
              roundedBorders,
            }}
          />
        ) : (
          <InjectHTML
            testId="test-description"
            styleType="p1"
            value={description}
          />
        )}
      </div>
    </div>
  )
}

export default Accordion
