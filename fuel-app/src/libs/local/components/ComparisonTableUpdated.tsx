import { makeStyles } from '@material-ui/core/styles'
import { Button, ComparisonTable, Typography } from '@/shared-ui/components'
import { IComparison } from '@/shared-ui/components/ComparisonTable/types'
import { useMemo } from 'react'
import colors from '@/shared-ui/colors'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
import { SITE_INTERACTION } from 'src/constants'
import { useRouter } from 'next/router'
const ComparisonTableUpdated = ({ data }: any) => {
  const classes = useStyles()
  const { title, items, legal, buttonText, buttonURL } = data

  const router = useRouter()
  const pageName = useMemo(() => {
    return router.asPath.split('/').splice(1, 3).join('/')
  }, [router])
  const list = useMemo((): IComparison[] => {
    const itemsData: IComparison[] = []
    items?.list?.map((listData: any) => {
      const header = listData?.headerDescription?.value || ''
      const headerLink = listData?.headerDescriptionLink?.url
      const logo = listData?.logo?.src || ''
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
      itemsData.push({ properties, header, headerLink, logo })
    })
    return itemsData
  }, [items])

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div id="compare-fibers" className={classes.root}>
      <Typography tagType="h2" styleType="h3" className={classes.title}>
        {title?.value || ''}
      </Typography>
      <div className={classes.comparisonWrapper}>
        <ComparisonTable
          items={list}
          addBorderToHeader
          toolTipIcon={<InfoIconWhite />}
          hideBorderForTooltip={true}
          dropShadowForTooltip={true}
          rowHeaderstyleType="h6"
          styleModifier={{
            header: classes.header,
            textStyleType: 'p1',
            showRedCheckMarks: true,
            hidePreferredRowValue: true,
            tooltipStyles: classes.tooltipStyles,
            rowValueClassName: classes.tableRowClass,
            firstColumnStyles: classes.firstColumnStyles,
            valueTextCSS: classes.valueTextCSS,
          }}
        />
      </div>
      <Typography className={classes.legal} tagType="p" styleType="legal">
        {legal?.value || ''}
      </Typography>
      {buttonText?.value && (
        <div className={classes.cta}>
          <Button
            type="link"
            text={buttonText?.value}
            href={buttonURL?.url}
            triggerEvent={true}
            eventObj={{
              events: 'event14',
              eVar14: `${pageName}:${buttonText?.value?.toLowerCase()}`,
            }}
            interactionType={SITE_INTERACTION}
          />
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: 1200,
    margin: '84px auto 67px',
    [breakpoints.down('md')]: {
      padding: '0 16px',
    },
  },
  valueTextCSS: {
    fontSize: '1.125rem',
    [breakpoints.down('xs')]: {
      fontSize: '0.875rem',
      lineHeight: '1.125rem',
    },
  },
  comparisonWrapper: {
    marginTop: 64,
    borderTop: `1px solid ${colors.main.gray90}`,
    [breakpoints.down('md')]: {
      marginTop: 30,
    },
  },
  title: {
    textAlign: 'center',
  },
  header: {
    marginTop: '8px',
    '& img': {
      height: 25,
      [breakpoints.down('xs')]: {
        height: 20,
      },
    },
    [breakpoints.up('xs')]: {
      width: '33.33% !important',
      padding: '8px 16px',
    },
  },
  legal: {
    display: 'block',
  },
  cta: {
    display: 'flex',
    margin: '48px 0',
    marginBottom: '-12px',
    justifyContent: 'center',
  },
  tooltipStyles: {
    display: 'inline',
  },
  tableRowClass: {
    fontWeight: 400,
    [breakpoints.down('xs')]: {
      textAlign: 'center',
      padding: '8px 8px 32px 8px !important',
    },
    [breakpoints.up('xs')]: {
      width: '33.33% !important',
    },
  },
  firstColumnStyles: {
    width: '37%',
    [breakpoints.down('xs')]: {
      width: '100%',
      '& div': {
        padding: '1rem 0',
      },
    },
  },
}))

export default ComparisonTableUpdated
