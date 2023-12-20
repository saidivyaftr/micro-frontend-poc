import React from 'react'
import clx from 'classnames'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { ProsIcon, ConsIcon } from '@/shared-ui/react-icons'
import { IProsAndConsTableProps } from './types'
import css from './ProsAndConsTable.module.scss'
const getBackgroundColor = (color: any = 'initial') => {
  switch (color) {
    case 'light-gray':
      return css.lightGrey
    default:
      return css.white
  }
}
const ProsAndConsTable: React.FunctionComponent<IProsAndConsTableProps> = (
  props: IProsAndConsTableProps,
) => {
  const { backgroundColor = '', headers = [], columns = [] } = props

  return (
    <div className={css.tableWrapper}>
      <div className={clx(css.table, getBackgroundColor(backgroundColor))}>
        <div className={clx(css.tableHeader)}>
          <div className={clx(css.firstColumn, 'first-column')}>&nbsp;</div>
          {headers?.map((header: string, index: number) => {
            return (
              <div
                key={`pros-cons-table-header-${index}`}
                className={clx(css.headerColumn, {
                  [css.prosIcon]: index === 0,
                })}
              >
                {index === 0 ? <ProsIcon /> : <ConsIcon />}
                {header && (
                  <Typography
                    tagType="span"
                    styleType="h5"
                    className={css.headerName}
                  >
                    {header}
                  </Typography>
                )}
              </div>
            )
          })}
        </div>
        <div className={css.tableBody}>
          {columns?.map((row: any, index: number) => {
            return (
              <>
                <Typography className={css.rowHeader} styleType="h6">
                  <InjectHTML
                    testId="test-row-title"
                    styleType="p1"
                    fontType="boldFont"
                    className={clx(css.rowLabel)}
                    value={row?.title || '-'}
                  />
                </Typography>
                <div
                  key={`competition-table-row-${index}`}
                  className={clx(css.tableRow)}
                >
                  <Typography className={css.firstColumn} styleType="h6">
                    <InjectHTML
                      testId="test-row-title"
                      styleType="p1"
                      fontType="boldFont"
                      className={clx(css.rowLabel)}
                      value={row?.title || '-'}
                    />
                  </Typography>
                  <ul className={css.listColumn}>
                    {row?.pros?.map((property: any, rowColumn: number) => {
                      return (
                        <li
                          className={clx(css.rowValue)}
                          key={`competition-table-row-${index}-column-${rowColumn}`}
                        >
                          <span>
                            <InjectHTML
                              styleType="p2"
                              testId="test-row-label"
                              value={property}
                              className={clx(css.rowValueTypo)}
                            />
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                  <ul className={css.listColumn}>
                    {row?.cons?.map((property: any, rowColumn: number) => {
                      return (
                        <li
                          className={clx(css.rowValue)}
                          key={`competition-table-row-${index}-column-${rowColumn}`}
                        >
                          <InjectHTML
                            styleType="p2"
                            testId="test-row-label"
                            pureInjection
                            value={property}
                            className={clx(css.rowValueTypo)}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProsAndConsTable
