import { makeStyles } from '@material-ui/core'
import { useMemo } from 'react'
import { Button, ComparisonTable, Typography } from '@/shared-ui/components'
import { InfoIconWhite } from '@/shared-ui/react-icons'
import { IComparison } from '@/shared-ui/components/ComparisonTable/types'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const TechSpecWrapper = () => {
  const classes = useStyles()
  const { title, buttonText, items, buttonURL } = useAppData(
    'comparisonTableUpdated',
    true,
  )
  const list = useMemo((): IComparison[] => {
    if (!items?.list) {
      return []
    }
    const itemsData: IComparison[] = []
    items?.list?.map((listData: any) => {
      const header = listData?.headerDescription?.value || ''
      const properties = listData?.properties?.list?.map(
        ({ name, textValue, value, toolTip }: any) => {
          return {
            name: name?.value || '',
            textValue: textValue?.value,
            value: value?.value,
            toolTip: toolTip?.value,
          }
        },
      )
      itemsData.push({ properties, header })
    })
    return itemsData
  }, [items])
  return (
    <div className={classes.root}>
      {title?.value ? (
        <Typography tagType="h2" styleType="h3" className={classes.title}>
          {title.value}
        </Typography>
      ) : null}
      <div className={classes.comparisonWrapper}>
        <ComparisonTable
          items={list}
          addBorderToHeader
          toolTipIcon={<InfoIconWhite />}
          dropShadowForTooltip
          hideBorderForTooltip
          styleModifier={{
            header: classes.rowHeader,
            textStyleType: 'p1',
            rowValueClassName: classes.rowValue,
            rowHeaderLabel: classes.rowHeaderLabel,
            tableHeaderClassName: classes.headerBorder,
            tooltipStyles: classes.tooltip,
            roundedBorders: true,
            rowClassName: classes.rowClassName,
          }}
        />
      </div>
      {buttonText?.value && (
        <div className={classes.title}>
          <Button
            text={buttonText?.value}
            type="link"
            href={buttonURL?.url}
            className={classes.button}
            data-testid="table-button"
          />
        </div>
      )}
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    maxWidth: 1200,
    padding: `${typography.pxToRem(80)} 0`,
    [breakpoints.down('sm')]: {
      padding: `${typography.pxToRem(64)} ${typography.pxToRem(16)}`,
    },
  },
  title: {
    textAlign: 'center',
  },
  button: {
    textAlign: 'center',
    width: 'fit-content',
  },
  comparisonWrapper: {
    margin: `${typography.pxToRem(48)} 0`,
  },
  rowHeader: {
    width: '25% !important',
    padding: '1rem 0.5rem',
    marginTop: '0.5rem',
    '& div h3': {
      fontSize: `${typography.pxToRem(24)}`,
      lineHeight: `${typography.pxToRem(32)}`,
      textAlign: 'center',
      [breakpoints.down('sm')]: {
        fontSize: '1rem',
        lineHeight: '1.5rem',
      },
    },
    [breakpoints.down('sm')]: {
      width: '33% !important',
    },
  },
  rowValue: {
    width: '24% !important',
    fontWeight: 'normal',
    [breakpoints.down('sm')]: {
      width: '33% !important',
      paddingBottom: '2rem',
    },
  },
  rowHeaderLabel: {
    fontFamily: 'PP Object Sans bold',
    fontSize: '1.125rem',
    padding: '1rem 0.5rem 1rem 1rem',
    [breakpoints.down('sm')]: {
      padding: '1rem 0.5rem 0.75rem 1rem',
    },
  },
  headerBorder: {
    borderTop: `1px solid ${colors.main.gray90}`,
    marginBottom: '0',
  },
  tooltip: {
    display: 'inline',
    marginLeft: '1rem',
    paddingTop: '0.25rem',
    [breakpoints.down('sm')]: {
      paddingTop: '0.625rem',
    },
  },
  rowClassName: {
    borderRadius: '0.5rem',
  },
}))
export default TechSpecWrapper
