import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  ComparisonTable,
  Typography,
  InjectHTML,
  TooltipPopover,
} from '@/shared-ui/components'
import { IComparison } from '@/shared-ui/components/ComparisonTable/types'
import { useAppData } from 'src/hooks'
import { CTA_BUTTON, FIBER_OFFERINGS, SITE_INTERACTION } from 'src/constants'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'

const FiberOfferings = () => {
  const classes = useStyles()
  const {
    title,
    items,
    buttonText,
    buttonURL,
    legal,
    toolTipText,
    tooltipDirection,
  } = useAppData('comparisonTableUpdated', true)
  const list = useMemo((): IComparison[] => {
    const itemsData: IComparison[] = items?.list?.map((listData: any) => {
      const header = listData?.headerDescription?.value || ''
      const properties = listData?.properties?.list?.map(
        ({ name, textValue, value, isPrimary, toolTip, header }: any) => {
          return {
            name: name?.value || '',
            textValue: textValue?.value,
            value: value?.value,
            isPrimary: !!isPrimary?.value,
            toolTip: toolTip?.value,
            header: header?.value,
          }
        },
      )
      return { properties, header }
    })
    return itemsData
  }, [items])

  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = FIBER_OFFERINGS.replace('{NAME}', buttonText?.value)
  }

  return (
    <div id="fiber-offering" className={classes.root}>
      <Typography tagType="h2" styleType="h3" className={classes.title}>
        {title?.value || ''}
      </Typography>
      {toolTipText?.value && (
        <TooltipPopover
          tooltipDirection={tooltipDirection?.value}
          tooltipContent={toolTipText?.value}
          tooltipClassName={classes.tooltip}
          tooltipIcon={<InfoIconWhite />}
        />
      )}
      <div className={classes.comparisonWrapper} data-testid="comparison-table">
        <ComparisonTable
          items={list}
          toolTipIcon={<InfoIconWhite />}
          styleModifier={{
            rowHeaderLabel: classes.rowHeaderStles,
            header: classes.header,
            textStyleType: 'p1',
            showRedCheckMarks: true,
            headerClassName: classes.headerStyles,
            tableHeaderClassName: classes.tableHeader,
            rowValueClassName: classes.tableRowClass,
            primaryCellClassName: classes.primaryCell,
            valueTextCSS: classes.tableLabelStyles,
            rowClassName: classes.tableRowStyles,
            tooltipStyles: classes.tooltipStyles,
            hidePreferredRowValue: true,
          }}
        />
      </div>
      {legal?.value && (
        <InjectHTML
          className={classes.legalText}
          tagType="p"
          data-testid="caption"
          styleType="legal"
          value={legal?.value}
        />
      )}
      <div className={classes.cta}>
        <Button
          type="link"
          text={buttonText?.value}
          href={buttonURL?.url}
          onClick={onButtonClick}
          className={classes.btnStyle}
          triggerEvent={true}
          eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
          interactionType={SITE_INTERACTION}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    marginTop: 80,
    marginBottom: 100,
    textAlign: 'center',
    [breakpoints.down('md')]: {
      padding: '0 16px',
    },
    [breakpoints.down('sm')]: {
      marginBottom: 76,
    },
  },
  comparisonWrapper: {
    marginTop: 65,
    [breakpoints.down('md')]: {
      marginTop: 30,
    },
  },
  title: {
    display: 'inline',
    fontSize: '42px',
    lineHeight: '50px',
    [breakpoints.down('md')]: {
      padding: '20px 0',
    },
    [breakpoints.down('xs')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
      padding: 0,
    },
  },
  tooltip: {
    display: 'inline',
    borderColor: colors.main.lightGray,
  },
  btnStyle: {
    [breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  rowHeaderStles: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    padding: '1rem',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  header: {
    fontSize: '30px',
    lineHeight: '38px',
    [breakpoints.down('xs')]: {
      fontSize: '16px',
      lineHeight: '24px',
      paddingBottom: 0,
    },
    [breakpoints.up('xs')]: {
      width: '33.33% !important',
    },
    '& img': {
      height: 25,
      [breakpoints.down('xs')]: {
        height: 20,
      },
    },
  },
  cta: {
    display: 'block',
    textAlign: 'center',
    margin: '48px 0',
    [breakpoints.down('xs')]: {
      marginTop: 20,
    },
  },
  headerStyles: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    [breakpoints.down('xs')]: {
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
      textAlign: 'center',
    },
  },
  tableHeader: {
    borderTop: `1px solid ${colors.main.borderGrey}`,
    borderBottom: `1px solid ${colors.main.borderGrey}`,
  },
  tableRowClass: {
    fontWeight: 400,
    [breakpoints.down('xs')]: {
      padding: 0,
      '& svg': {
        marginBottom: '38px',
      },
    },
    [breakpoints.up('xs')]: {
      width: '33.33% !important',
    },
  },
  primaryCell: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    fontWeight: 700,
    padding: 8,
    [breakpoints.down('xs')]: {
      padding: 16,
      marginBottom: '0 !important',
    },
  },
  tableLabelStyles: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      marginBottom: 32,
      marginRight: '.1875rem',
    },
  },
  tableRowStyles: {
    borderRadius: 8,
  },
  tooltipStyles: {
    display: 'inline',
  },
  legalText: {
    textAlign: 'left',
    display: 'block',
  },
}))

export default FiberOfferings
