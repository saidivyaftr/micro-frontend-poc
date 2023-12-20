import { makeStyles } from '@material-ui/core/styles'
import { ComparisonTable, Typography } from '@/shared-ui/components'
import { useMemo } from 'react'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const FrontierFiberPlan = () => {
  const classes = useStyles()
  const { title, items } = useAppData('frontierFiberPlans', true)

  const list = useMemo((): any[] => {
    const itemsData: any[] = []
    items?.list?.map((listData: any) => {
      const header = listData?.headerDescription?.value || ''
      const properties = listData?.properties?.list?.map(
        ({ name, textValue, value, toolTip, isPrimary }: any) => {
          return {
            name: name?.value || '',
            textValue: textValue?.value,
            value: value?.value,
            toolTip: toolTip?.value,
            isPrimary: isPrimary?.value,
          }
        },
      )
      itemsData.push({ header, properties })
    })
    return itemsData
  }, [items])

  return (
    <div className={classes.root}>
      {title?.value && (
        <Typography tagType="h2" styleType="h4" className={classes.title}>
          {title?.value}
        </Typography>
      )}
      <div className={classes.comparisonWrapper}>
        <ComparisonTable
          items={list}
          addBorderToHeader
          styleModifier={{
            header: classes.header,
            textAlignCenter: false,
            rowClassName: classes.rowClassName,
            rowHeaderLabel: classes.rowHeaderLabel,
            rowValueClassName: classes.rowValueClassName,
            firstColumnStyles: classes.firstColumnStyles,
            showRedCheckMarks: true,
            tooltipStyles: classes.tooltipStyles,
            hidePreferredRowValue: true,
            blackCloseIcon: classes.blackCloseIcon,
          }}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: 1300,
    margin: '80px auto',
    padding: '0 50px',
    [breakpoints.down('xs')]: {
      margin: '64px 0',
      padding: '0 16px',
    },
    [breakpoints.down('sm')]: {
      padding: '0 30px',
    },
    [breakpoints.down('xs')]: {
      margin: '64px 0',
      padding: '0 16px',
    },
  },
  comparisonWrapper: {
    marginTop: 10,
    [breakpoints.down('xs')]: {
      marginTop: 20,
    },
  },
  title: {
    textAlign: 'center',
    [breakpoints.down('xs')]: {
      margin: 'auto',
    },
    borderBottom: '3px solid',
    borderBottomColor: colors.main.gray90,
    paddingBottom: '40px',
  },
  header: {
    width: '35% !important',
    [breakpoints.down('xs')]: {
      width: '33.33% !important',
    },
  },
  rowClassName: {
    borderRadius: '8px',
    [breakpoints.down('xs')]: {
      paddingBottom: 32,
    },
  },
  rowHeaderLabel: {
    fontSize: '18px',
    fontFamily: 'PP Object Sans Bold',
    [breakpoints.down('xs')]: {
      fontSize: '16px',
    },
  },
  firstColumnStyles: {
    width: '35% !important',
    [breakpoints.down('xs')]: {
      width: '100% !important',
    },
  },
  rowValueClassName: {
    minWidth: '25% !important',
    textAlign: 'center',
    [breakpoints.down('xs')]: {
      width: '100% !important',
    },
  },
  tooltipStyles: {
    display: 'inline',
    marginLeft: '1rem',
    '& svg': {
      display: 'flex',
      width: '14px',
    },
  },
  blackCloseIcon: { color: colors.main.black },
}))

export default FrontierFiberPlan
