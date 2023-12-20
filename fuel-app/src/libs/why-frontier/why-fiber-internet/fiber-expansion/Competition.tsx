import { makeStyles } from '@material-ui/core/styles'
import { ComparisonTable, Typography } from '@/shared-ui/components'
import { useMemo } from 'react'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { MAX_WIDTH } from 'src/constants'

const Competition = () => {
  const classes = useStyles()
  const { title, items } = useAppData('comparisonTableUpdated', true)

  const list = useMemo((): any[] => {
    const itemsData: any[] = []
    items?.list?.map((listData: any) => {
      const logo = listData?.logo?.src || ''
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
      itemsData.push({ logo, properties })
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
            tooltipStyles: classes.tooltipStyles,
            hidePreferredRowValue: true,
            textStyleType: 'p1',
          }}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: MAX_WIDTH,
    margin: '80px auto',
    padding: '0 16px',
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
    width: '21%',
    '& img': {
      height: 50,
      [breakpoints.down('xs')]: {
        height: 20,
      },
    },
  },
  rowClassName: {
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
  rowValueClassName: {
    fontWeight: 400,
    [breakpoints.down('xs')]: {
      textAlign: 'center',
      padding: '8px 8px 32px 8px !important',
    },
    [breakpoints.up('xs')]: {
      width: '33% !important',
    },
  },
  blackCloseIcon: {
    color: colors.main.black,
  },
  tooltipStyles: {
    display: 'inline',
    '& svg': {
      height: '13px',
      width: '13px',
    },
  },
}))

export default Competition
