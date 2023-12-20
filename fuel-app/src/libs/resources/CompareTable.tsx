import { makeStyles } from '@material-ui/core/styles'
import { Button, ComparisonTable, Typography } from '@/shared-ui/components'
import { IComparison } from '@/shared-ui/components/ComparisonTable/types'
import { useMemo } from 'react'
import { COMPARISON } from 'src/constants'
import colors from '@/shared-ui/colors'
import { InfoIconWhite } from '@/shared-ui/react-icons'

type CompareTableData = {
  data?: any
}
const CompareTable = ({ data }: CompareTableData) => {
  const {
    title,
    items,
    legal,
    buttonText,
    buttonURL,
    buttonType,
    hoverType,
    rowHeaderFlag,
  } = data
  const maxWidthOfEachCell = rowHeaderFlag?.value
    ? 100 / (items?.list?.length + 1)
    : 100 / items?.list?.length
  const maxWidthOfEachMobileCell = 100 / items?.list?.length
  const fontWeightForFirstColumn = rowHeaderFlag?.value ? '' : 400
  const firstColumnWidth = rowHeaderFlag?.value ? maxWidthOfEachCell : 0
  const classes = useStyles({
    maxWidthOfEachCell,
    fontWeightForFirstColumn,
    firstColumnWidth,
    maxWidthOfEachMobileCell,
  })()

  const list = useMemo((): IComparison[] => {
    const itemsData: IComparison[] = []
    items?.list?.map((listData: any) => {
      const header = listData?.headerDescription?.value || ''
      const properties = listData?.properties?.list?.map(
        ({ name, textValue, value, isPrimary, toolTip }: any) => {
          return {
            name: name?.value || '',
            textValue: textValue?.value,
            value: value?.value,
            isPrimary: !!isPrimary?.value,
            toolTip: toolTip?.value,
          }
        },
      )
      itemsData.push({ properties, header })
    })
    return itemsData
  }, [items])
  if (Object.keys(data)?.length === 0) {
    return null
  }
  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = COMPARISON.replace('{NAME}', buttonText?.value)
  }

  return (
    <div
      id="compare-dynamic-table"
      data-testid="compare-dynamic-table"
      className={classes.root}
    >
      <Typography tagType="h2" styleType="h3" className={classes.title}>
        {title?.value || ''}
      </Typography>
      <div className={classes.comparisonWrapper}>
        <ComparisonTable
          items={list}
          rowHeaderLabelVisibleFlag={rowHeaderFlag?.value}
          addBorderToHeader={true}
          toolTipIcon={<InfoIconWhite />}
          rowHeaderTagType={'h3'}
          rowHeaderstyleType={'h6'}
          styleModifier={{
            roundedBorders: true,
            firstColumnStyles: classes.firstColumnWidth,
            headerClassName: classes.headerTitles,
            header: classes.header,
            textStyleType: 'p1',
            rowClassName: classes.rowStyles,
            showRedCheckMarks: true,
            rowHeaderLabel: classes.rowHeaderStyles,
            valueTextCSS: classes.tableValuesStyles,
            rowValueClassName: classes.tableValuesCellStyles,
            tooltipStyles: classes.toolTipStyles,
          }}
        />
      </div>
      {legal?.value && (
        <Typography className={classes.legal} tagType="p" styleType="legal">
          {legal?.value || ''}
        </Typography>
      )}
      {buttonText?.value && (
        <div className={classes.cta}>
          <Button
            type={buttonType?.value}
            text={buttonText?.value}
            href={buttonURL?.url}
            hoverVariant={hoverType?.value}
            onClick={onButtonClick}
            className={classes.buttonStyles}
          />
        </div>
      )}
    </div>
  )
}

const useStyles = ({
  maxWidthOfEachCell,
  fontWeightForFirstColumn,
  firstColumnWidth,
  maxWidthOfEachMobileCell,
}: any) =>
  makeStyles(({ breakpoints }) => ({
    root: {
      maxWidth: 1140,
      margin: '80px auto',
      [breakpoints.down('md')]: {
        padding: '0 16px',
      },
      [breakpoints.down('sm')]: {
        margin: '64px auto',
      },
    },
    comparisonWrapper: {
      marginTop: 48,
      borderTop: `1px solid ${colors.main.gray90}`,
      [breakpoints.down('md')]: {
        marginTop: 32,
      },
    },
    rowStyles: {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    tableValuesCellStyles: {
      width: `${maxWidthOfEachCell}% !important`,
      [breakpoints.down('sm')]: {
        width: `${maxWidthOfEachMobileCell}% !important`,
        maxWidth: '100% !important',
      },
    },
    tableValuesStyles: {
      fontWeight: 400,
      [breakpoints.down('xs')]: {
        fontSize: 16,
        lineHeight: '1.5rem',
        fontWeight: 400,
      },
    },
    headerTitles: {
      color: colors.main.midnightExpress,
    },
    title: {
      textAlign: 'center',
    },
    firstColumnWidth: {
      width: `${firstColumnWidth}% !important`,
      [breakpoints.down('xs')]: {
        width: `100% !important`,
      },
    },
    toolTipStyles: {
      left: -10,
      top: 1,
      '& svg': {
        width: 13,
        height: 13,
      },
    },
    header: {
      paddingTop: 24,
      paddingBottom: 16,
      width: `${maxWidthOfEachCell}% !important`,
      '& img': {
        height: 25,
        [breakpoints.down('xs')]: {
          height: 20,
        },
      },
      [breakpoints.down('xs')]: {
        paddingTop: 12,
        width: `100% !important`,
        paddingBottom: 4,
      },
    },
    legal: {
      display: 'block',
    },
    buttonStyles: {
      width: 'auto',
      [breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    cta: {
      display: 'block',
      textAlign: 'center',
      margin: '32px 0',
      marginBottom: '-12px',
    },
    rowHeaderStyles: {
      fontSize: 18,
      lineHeight: 1.625,
      paddingTop: 14,
      paddingBottom: 14,
      fontWeight: fontWeightForFirstColumn,
      [breakpoints.down('xs')]: {
        fontSize: 16,
        lineHeight: '1.5rem',
      },
    },
  }))

export default CompareTable
