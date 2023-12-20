import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, ComparisonTable, InjectHTML } from '@/shared-ui/components'
import { IComparison } from '@/shared-ui/components/ComparisonTable/types'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { InfoIconWhite, MessageIcon } from '@/shared-ui/react-icons'
const ACPSaveComparison = () => {
  const classes = useStyles()
  const { title, items, legal, headerNameTitle, btnText, btnUrl } = useAppData(
    'ACPSaveComparison',
    true,
  )

  const cohesionHandler = () => {
    const payload = {
      '@type': 'redventures.usertracking.v3.ElementClicked',
      webElement: {
        elementType: 'BUTTON',
        location: 'ACP',
        position: 'Module',
        htmlId: null,
        text: 'Chat Now',
      },
      actionOutcome: 'EXTERNALLINK',
      outboundUrl: null,
    }
    // @ts-ignore: Unreachable code error
    tagular('beam', payload, true, false)
  }
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

  return (
    <div id="fiber-offering" className={classes.root}>
      <InjectHTML
        tagType="h2"
        styleType="h3"
        className={classes.title}
        value={title?.value || ''}
      />

      <div className={classes.comparisonWrapper}>
        <ComparisonTable
          items={list}
          addBorderToHeader
          toolTipIcon={<InfoIconWhite />}
          dropShadowForTooltip
          hideBorderForTooltip
          headerNameTitle={headerNameTitle?.value}
          styleModifier={{
            header: classes.rowHeader,
            textStyleType: 'p1',
            showRedCheckMarks: true,
            backgroundEvenRow: false,
            roundedBorders: true,
            valueTextCSS: classes.valueClass,
            rowHeaderLabel: classes.rowHeader,
            rowClassName: classes.rowClass,
            tableHeaderClassName: classes.tableHeaderClass,
            backgroundColor: colors.main.newBackgroundGray,
            headerNameTitleStyle: classes.headerNameTitleStyle,
            tooltipStyles: classes.tooltipStyles,
            firstColumnStyles: classes.firstColumnStyles,
          }}
        />
      </div>
      <InjectHTML
        className={classes.legal}
        tagType="p"
        styleType="legal"
        value={legal?.value}
      />
      {btnText?.value && (
        <Button
          type="link"
          target="_blank"
          text={
            <span className={classes.messageBtnText}>
              <MessageIcon /> {btnText?.value}
            </span>
          }
          href={btnUrl.url}
          className={classes.messageBtn}
          onClick={cohesionHandler}
        />
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: 1200,
    margin: '60px auto',
    [breakpoints.down('md')]: {
      padding: '0 16px',
    },
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  comparisonWrapper: {
    marginTop: 50,
    borderTop: `1px solid ${colors.main.gray90}`,
    [breakpoints.down('md')]: {
      marginTop: 30,
    },
  },
  title: {
    textAlign: 'left',
    [breakpoints.down('md')]: {
      '& br': { display: 'none' },
    },
  },
  legal: {
    display: 'block',
    '& a': {
      fontFamily: 'PP Object Sans Bold',
      textDecoration: 'underline',
    },
  },
  cta: {
    display: 'block',
    textAlign: 'center',
    margin: '40px 0',
  },
  valueClass: {
    fontWeight: 400,
  },
  rowClass: {
    justifyContent: 'space-around',
    '& div:nth-of-type(4) div': {
      fontFamily: 'PP Object Sans Bold',
    },
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    '& div div span': {
      [breakpoints.down('sm')]: {
        fontSize: '1rem',
        lineHeight: '1.5rem',
      },
    },
    '& div:nth-of-type(1) > span > div:nth-of-type(1)': {
      fontWeight: 400,
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
      textAlign: 'left',
      marginLeft: '2.85rem',
      [breakpoints.down('md')]: {
        marginLeft: '0',
      },

      [breakpoints.down('xs')]: {
        fontFamily: 'PP Object Sans Bold',
      },
    },
  },
  rowHeader: {
    [breakpoints.down('sm')]: {
      padding: '0.5rem 0',
    },
    '& div': {
      marginBottom: 0,
    },
    '& div h3': {
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
      [breakpoints.down('sm')]: {
        fontSize: '1rem',
        lineHeight: '1.5rem',
      },
    },
  },
  messageBtnText: { display: 'flex', justifyContent: 'center', gap: '1rem' },
  messageBtn: {
    textTransform: 'uppercase',
    width: 'fit-content',
    [breakpoints.down('sm')]: {
      padding: '0.625rem',
      width: '100%',
    },
    margin: '1rem auto 0 auto',
  },
  tableHeaderClass: {
    justifyContent: 'space-between',
    padding: '2rem 1.5rem 2rem',
    [breakpoints.down('sm')]: {
      padding: '1.5rem 0',
    },
  },
  headerNameTitleStyle: {
    marginTop: '1rem',
    padding: '.5rem',
  },
  tooltipStyles: {
    display: 'inline',
  },
  firstColumnStyles: {
    '& > div': {
      [breakpoints.up('sm')]: {
        marginLeft: '25px',
      },
      [breakpoints.up('md')]: {
        marginLeft: '42px',
      },
    },
  },
}))

export default ACPSaveComparison
