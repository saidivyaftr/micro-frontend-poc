import React, { useMemo } from 'react'
import clx from 'classnames'
import { TooltipPopover, InjectHTML, Typography } from '@/shared-ui/components'
import {
  InfoIcon,
  CheckMarkRedCell,
  CheckMarkBlackCell,
  DashGray,
  Close,
} from '@/shared-ui/react-icons'
import { IComparisonTableProps } from './types'
import css from './ComparisonTable.module.scss'
import colors from '@/shared-ui/colors'
import Image from 'next/future/image'

const ComparisonTable: React.FunctionComponent<IComparisonTableProps> = (
  props: IComparisonTableProps,
) => {
  const {
    items,
    rowHeaderLabelVisibleFlag = true,
    addBorderToHeader,
    headerNameTitle = '',
    toolTipIcon = <InfoIcon />,
    dropShadowForTooltip,
    hideBorderForTooltip,
    rowHeaderTagType = 'div',
    rowHeaderstyleType = 'p2',
  } = props
  const styleModifier = Object.assign(
    {
      header: '',
      textAlignCenter: true,
      hidePreferredRowValue: false,
      valueTextCSS: '',
      textStyleType: 'p1',
      rowHeaderLabel: '',
      backgroundEvenRow: true,
      roundedBorders: true,
      rowClassName: '',
      rowValueClassName: '',
      tableHeaderClassName: '',
      backgroundColor: colors.main.lightBorderGrey,
      headerClassName: '',
      primaryCellClassName: '',
      tooltipStyles: '',
      firstColumnStyles: '',
      showRedCheckMarks: true,
      headerNameTitleStyle: '',
      tableLeftHeader: '',
    },
    props.styleModifier,
  )

  const NoItemIcon = styleModifier.blackCloseIcon ? (
    <Close width={20} height={20} className={styleModifier.blackCloseIcon} />
  ) : (
    <DashGray width={20} height={20} />
  )

  const tableRows = useMemo(() => {
    return (
      items?.[0]?.properties?.map(({ name, isPrimary, toolTip }: any) => ({
        name,
        isPrimary,
        toolTip,
      })) || []
    )
  }, [items])

  const totalItems = items?.length || 0

  const renderPropertyValue = (
    item: any,
    rowColumn: number,
    isPrimary: boolean,
  ) => {
    if (item?.iconSource) {
      return <InjectHTML value={item?.iconSource} color={'default'} />
    }
    const textValue = item?.textValue
    if (textValue) {
      if (item?.textValueLink) {
        return (
          <a href={item?.textValueLink} className={css.textValueLink}>
            <InjectHTML
              testId="test-textValue"
              styleType={styleModifier?.textStyleType}
              color={isPrimary ? 'primary' : 'default'}
              className={clx(styleModifier.valueTextCSS, {
                [css.textAlignCenter]: !(
                  styleModifier.textAlignCenter === false
                ),
                [styleModifier.primaryCellClassName]: isPrimary,
              })}
              value={textValue}
            />
          </a>
        )
      } else {
        return (
          <InjectHTML
            testId="test-textValue"
            styleType={styleModifier?.textStyleType}
            color={isPrimary ? 'primary' : 'default'}
            className={clx(styleModifier.valueTextCSS, {
              [css.textAlignCenter]: !(styleModifier.textAlignCenter === false),
              [styleModifier.primaryCellClassName]: isPrimary,
            })}
            value={textValue}
          />
        )
      }
    }
    if (item?.value) {
      if (styleModifier?.showRedCheckMarks) {
        return <CheckMarkRedCell width={25} height={20} />
      }
      return <CheckMarkBlackCell width={25} height={20} />
    }
    return NoItemIcon
  }

  const renderHeader = (content: string) => {
    return (
      <Typography
        tagType="h3"
        styleType="h5"
        color="primary"
        className={clx(css.headerName, styleModifier.headerClassName)}
      >
        {content}
      </Typography>
    )
  }

  return (
    <div className={css.tableWrapper}>
      <div
        className={clx(
          css.table,
          { [css.oneColumnLayout]: items?.length === 1 },
          { [css.twoColumnsLayout]: items?.length === 2 },
          { [css.threeColumnsLayout]: items?.length === 3 },
        )}
      >
        <div
          className={clx(
            css.tableHeader,
            {
              [css.headerBorder]: addBorderToHeader,
            },
            styleModifier?.tableHeaderClassName,
          )}
        >
          <div
            className={clx(
              css.tableHeaderDif,
              css.firstColumn,
              'first-column',
              styleModifier.firstColumnStyles,
            )}
          >
            {headerNameTitle && (
              <Typography
                tagType="h3"
                styleType="h6"
                color="primary"
                className={clx(
                  css.headerNameTitle,
                  styleModifier.headerNameTitleStyle,
                )}
              >
                {headerNameTitle}
              </Typography>
            )}
          </div>
          {items?.map(
            (
              {
                logo,
                alt = 'table header',
                headerDescription = '',
                headerDescriptionLink = '',
                header,
                headerLink,
              }: any,
              index: number,
            ) => {
              return (
                <div
                  key={`competition-table-header-${index}`}
                  style={{ maxWidth: `${100 / totalItems}%` }}
                  className={clx(
                    css.tableHeaderDif,
                    css.valuesColumn,
                    styleModifier.header,
                  )}
                >
                  <div
                    className={clx(css.center, styleModifier.tableLeftHeader)}
                  >
                    {logo && (
                      <Image
                        loader={() => logo}
                        data-testid="test-logo"
                        className={css.headerLogo}
                        src={logo}
                        alt={alt}
                        loading="lazy"
                      />
                    )}
                    {header &&
                      (headerLink ? (
                        <a href={headerLink} className={css.headerLink}>
                          {renderHeader(header)}
                        </a>
                      ) : (
                        renderHeader(header)
                      ))}
                    {headerDescription && headerDescriptionLink && (
                      <a
                        data-testid="test-headerDescription"
                        href={headerDescriptionLink}
                        className={clx(
                          css.headerDesc,
                          styleModifier.rowHeaderLabel,
                        )}
                      >
                        {headerDescription}
                      </a>
                    )}
                  </div>
                </div>
              )
            },
          )}
        </div>
        <div>
          {tableRows?.map((row: any, index: number) => {
            return (
              <div
                key={`competition-table-row-${index}`}
                className={clx(
                  css.tableRow,
                  {
                    [css.backgroundOddRow]:
                      styleModifier.backgroundEvenRow === true ||
                      styleModifier.backgroundEvenRow === undefined,
                  },
                  {
                    [css.backgroundEvenRow]:
                      styleModifier.backgroundEvenRow === false,
                  },
                  {
                    [css.roundedBorders]: styleModifier.roundedBorders === true,
                  },
                  styleModifier?.rowClassName,
                )}
                style={{
                  backgroundColor: styleModifier.backgroundColor,
                }}
              >
                {rowHeaderLabelVisibleFlag && (
                  <Typography
                    className={clx(
                      css.firstColumn,
                      styleModifier.firstColumnStyles,
                    )}
                    styleType="p1"
                  >
                    {row.name && (
                      <div>
                        {rowHeaderstyleType && (
                          <InjectHTML
                            testId="test-name"
                            tagType={rowHeaderTagType}
                            styleType={rowHeaderstyleType}
                            className={clx(
                              css.rowLabel,
                              styleModifier.rowHeaderLabel,
                            )}
                            value={row?.name}
                          />
                        )}
                        {row?.toolTip && (
                          <TooltipPopover
                            tooltipIcon={toolTipIcon}
                            dropShadow={dropShadowForTooltip}
                            hideBorder={hideBorderForTooltip}
                            tooltipClassName={styleModifier.tooltipStyles}
                            tooltipContent={row?.toolTip}
                          />
                        )}
                      </div>
                    )}
                  </Typography>
                )}
                {items?.map((_: any, rowColumn: number) => {
                  return (
                    <div
                      style={{ maxWidth: `${100 / totalItems}%` }}
                      className={clx(
                        css.rowValue,
                        css.valuesColumn,
                        {
                          [css.preferredRowValue]:
                            rowColumn === 0 &&
                            !styleModifier.hidePreferredRowValue,
                        },
                        styleModifier.rowValueClassName,
                      )}
                      key={`competition-table-row-${index}-column-${rowColumn}`}
                    >
                      {renderPropertyValue(
                        items?.[rowColumn]?.properties?.[index],
                        rowColumn,
                        !!row?.isPrimary,
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ComparisonTable
