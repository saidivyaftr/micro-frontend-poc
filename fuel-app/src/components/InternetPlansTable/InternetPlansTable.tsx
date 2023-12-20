import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'
import { Button, ComparisonTable, Typography } from '@/shared-ui/components'
import { IComparison } from '@/shared-ui/components/ComparisonTable/types'
import { useMemo } from 'react'
import { COMPARISON, CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import colors from '@/shared-ui/colors'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'

const InternetPlansTable = ({
  styles = {},
  wrapperClassName = '',
}: {
  wrapperClassName?: string
  styles?: any
}) => {
  const classes = useStyles()
  const data = useAppData('comparisonTableUpdated', true)
  const { title, legal, items, buttonText, buttonURL } = data

  const list = useMemo((): IComparison[] => {
    const itemsData: IComparison[] = []
    items?.list?.map((listData: any) => {
      const header = listData?.headerDescription?.value || ''
      const headerLink = listData?.headerDescriptionLink?.url
      const logo = listData?.logo?.src || ''
      const properties = listData?.properties?.list?.map(
        ({
          name,
          textValue,
          textValueLink,
          value,
          isPrimary,
          toolTip,
        }: any) => {
          return {
            name: name?.value || '',
            textValue: textValue?.value,
            textValueLink: textValueLink?.value,
            value: value?.value,
            isPrimary: !!isPrimary?.value,
            toolTip: toolTip?.value,
          }
        },
      )
      itemsData.push({
        properties,
        header,
        logo,
        headerLink,
      })
    })
    return itemsData
  }, [items])

  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = COMPARISON.replace('{NAME}', buttonText?.value)
  }

  return (
    <div
      id="compare-fibers"
      className={`${classes.root} ${wrapperClassName}`}
      style={styles}
    >
      <Typography tagType="h3" styleType="h3" className={classes.title}>
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
            type="link"
            text={buttonText?.value}
            href={buttonURL?.url}
            onClick={onButtonClick}
            triggerEvent={true}
            eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
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
    margin: '80px auto 80px',
    [breakpoints.down('md')]: {
      padding: '2rem 1rem 1.5rem 1rem',
      margin: '0px auto 0px !important',
    },
  },
  comparisonWrapper: {
    marginTop: 48,
    borderTop: `1px solid ${colors.main.gray90}`,
    [breakpoints.down('md')]: {
      marginTop: 30,
    },
  },
  title: {
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
    '& img': {
      height: 25,
      [breakpoints.down('xs')]: {
        height: 20,
      },
    },
    [breakpoints.up('xs')]: {
      width: '33.33% !important',
    },
    [breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  legal: {
    display: 'block',
  },
  cta: {
    display: 'block',
    textAlign: 'center',
    margin: '48px 0',
    '& a': {
      display: 'inline-block',
      maxWidth: 'max-content',
    },
    [breakpoints.down('sm')]: {
      marginBottom: 40,
    },
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
}))

export default InternetPlansTable
