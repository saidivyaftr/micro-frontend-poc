import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  createStyles,
  makeStyles,
  withStyles,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import { Typography, InjectHTML } from '@/shared-ui/components'
import clsx from 'classnames'
import colors from 'src/styles/theme/colors'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { ITypographyElement } from '@/shared-ui/components/Typography'
import { useWelcomePageData } from 'src/selector-hooks'
import useAppData from '@/shared-ui/hooks/useAppData'
import { formatBillingDesc } from '../helper'
import { formatAmountInDollar } from 'src/utils/amount'
const BillingSummary = () => {
  const classes = useStyles()
  const [billingSummary, setBillingSummary] = useState<any>(null)
  const { unprovisionedServiceOrder, orderBillingSummary } =
    useWelcomePageData()

  const {
    title,
    totalServiceOrdered,
    totalEstimatedTax,
    description,
    included,
    free,
  } = useAppData('billingSummary', true)
  const formatBillSummary = (data: any) => {
    const {
      servicesOffered: {
        miscellaneousProducts,
        estimatedTotalForServicesOffered,
      },
      estimatedNextBillTotal,
      estimatedTaxOtherCharge: { estimatedFederalTax },
      estimatedMonthlyTotal,
      oneTimeCharge: {
        description: oneTimeChargesLabel,
        oneTimeChargesTotal,
        install = [],
        estimatedProratedCharges,
      },
    } = data
    const { description: monthlyChargesLabel } = estimatedMonthlyTotal[0]
    const oneTimeTaxForInstallation = install?.map((item: any) => {
      const price = Number(item?.price)
      return {
        description: formatBillingDesc(item?.description),
        priceDesc: price <= 0 ? free?.value : formatAmountInDollar(item?.price),
      }
    })
    const oneTimeTaxes = estimatedProratedCharges?.map((item: any) => {
      const price = Number(item?.price)
      return {
        description: formatBillingDesc(item?.description),
        priceDesc: price <= 0 ? free?.value : formatAmountInDollar(item?.price),
      }
    })
    const servicesOffered = miscellaneousProducts?.map((item: any) => {
      const price = Number(item?.price)
      return {
        description: formatBillingDesc(item?.description),
        priceDesc:
          price <= 0 ? included?.value : formatAmountInDollar(item?.price),
      }
    })
    const taxCharges = estimatedFederalTax?.reduce(
      (services: any, item: any) => {
        if (item.description) {
          const price = Number(item?.price)
          services.list.push({
            description: formatBillingDesc(item?.description),
            priceDesc:
              price <= 0 ? included?.value : formatAmountInDollar(item?.price),
          })
        }
        return services
      },
      {
        list: [],
        total: 0,
      },
    )
    const formattedData = {
      monthlyCharges: formatAmountInDollar(estimatedMonthlyTotal?.[0]?.price),
      oneTimeCharges: formatAmountInDollar(oneTimeChargesTotal?.[0]?.price),
      oneTimeChargesList: [...oneTimeTaxForInstallation, ...oneTimeTaxes],
      taxCharges,
      servicesOffered,
      estimatedFirstBill: formatAmountInDollar(estimatedNextBillTotal?.price),
      estimatedFirstBillLabel: formatBillingDesc(
        estimatedNextBillTotal?.description,
      ),
      oneTimeChargesLabel: formatBillingDesc(oneTimeChargesLabel),
      monthlyChargesLabel: formatBillingDesc(monthlyChargesLabel),
      estimatedTotalForServicesOffered,
    }
    setBillingSummary(formattedData)
  }

  useEffect(() => {
    if (orderBillingSummary) {
      formatBillSummary(orderBillingSummary)
    }
  }, [orderBillingSummary, unprovisionedServiceOrder])

  const renderBillingTitle = (title: string, amount: string) => (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="billing-summary-info"
      id={`billing-summary-info`}
      className={classes.accordionSummary}
    >
      <div className={classes.accordionWrapper}>
        <Typography
          className={classes.summaryHeading}
          styleType="p3"
          tagType="h6"
          fontType="boldFont"
        >
          <>
            <span>{title}</span>
            <span>{amount}</span>
          </>
        </Typography>
      </div>
    </AccordionSummary>
  )
  const renderItem = (
    title: string,
    price: string,
    tagType: ITypographyElement,
  ) => (
    <Typography styleType="p3" tagType={tagType}>
      <>
        <span>{title}</span>
        <span>{price}</span>
      </>
    </Typography>
  )
  const renderFirstBill = () => (
    <div className={classes.estimatedBill}>
      <Typography styleType="p2" tagType="h6" fontType="boldFont">
        <>
          <span>{billingSummary?.estimatedFirstBillLabel}</span>
          <span>{billingSummary?.estimatedFirstBill}</span>
        </>
      </Typography>
    </div>
  )
  const renderOneTimeCharges = () => (
    <AccordionDetails className={classes.accordionDetails}>
      {billingSummary?.oneTimeChargesList?.map(
        (oneTimeCharge: any, i: number) => {
          return (
            <div
              key={`${i}-${oneTimeCharge.description}`}
              className={clsx(classes.sectionRow, {
                [classes.lastRow]: oneTimeCharge.items?.length !== i + 1,
              })}
            >
              <Typography styleType="p3" tagType="h6">
                {oneTimeCharge?.description}
              </Typography>
              <Typography
                className={classes.strikeDescription}
                styleType="p3"
                tagType="h6"
              >
                {oneTimeCharge.priceDesc}
              </Typography>
            </div>
          )
        },
      )}
    </AccordionDetails>
  )
  const renderMonthCharges = () => (
    <AccordionDetails className={classes.accordionDetails}>
      {billingSummary?.servicesOffered?.map((service: any, i: number) => {
        return (
          <div
            key={`${i}-${service.description}`}
            className={classes.sectionRow}
          >
            {renderItem(service?.description, service.priceDesc, 'div')}
          </div>
        )
      })}
      <div className={classes.line} />
      <div className={classes.sectionRow}>
        {renderItem(
          totalServiceOrdered?.value,
          formatAmountInDollar(
            billingSummary?.estimatedTotalForServicesOffered,
          ),
          'div',
        )}
      </div>
      {billingSummary?.taxCharges?.list?.length > 0 && (
        <>
          {billingSummary?.taxCharges?.list?.map((service: any, i: number) => {
            return (
              <div
                key={`${i}-${service.description}`}
                className={classes.sectionRow}
              >
                {renderItem(service?.description, service.priceDesc, 'div')}
              </div>
            )
          })}
          <div className={classes.line} />
          <div className={classes.sectionRow}>
            {renderItem(
              totalEstimatedTax?.value,
              billingSummary?.taxCharges.total,
              'div',
            )}
          </div>
        </>
      )}
    </AccordionDetails>
  )

  if (!orderBillingSummary) {
    return null
  }

  return (
    <CardWithTitle className={clsx(classes.cardContainer)}>
      <>
        <Typography tagType="h4" styleType="h5">
          {title?.value}
        </Typography>
        <InjectHTML
          className={classes.description}
          tagType="p"
          styleType="p2"
          value={description?.value}
        ></InjectHTML>
        <Accordion className={classes.root}>
          {renderBillingTitle(
            billingSummary?.monthlyChargesLabel,
            billingSummary?.monthlyCharges,
          )}
          {renderMonthCharges()}
        </Accordion>
        <Accordion className={classes.root}>
          {renderBillingTitle(
            billingSummary?.oneTimeChargesLabel,
            billingSummary?.oneTimeCharges,
          )}
          {renderOneTimeCharges()}
        </Accordion>
        {renderFirstBill()}
      </>
    </CardWithTitle>
  )
}

const AccordionSummary = withStyles({
  root: {
    minHeight: '1rem',
    marginBottom: '1rem',
  },
  content: {
    '& $expanded': {
      marginTop: '.5rem',
      minHeight: '1rem',
    },
  },
  expanded: { minHeight: '1rem!important' },
  expandIcon: {
    margin: '0px -0.25rem 0 0.5rem',
    padding: 0,
  },
})(MuiAccordionSummary)
const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    estimatedBill: {
      display: 'flex',
      marginTop: '1rem',
      padding: '16px 24px 16px 8px',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: colors.main.secondaryLight,
      borderRadius: '1rem',
      '& h6': {
        margin: '0',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        '& span': {
          textTransform: 'none',
          '&:first-child': {
            width: 'calc(100%-42px)',
          },
        },
      },
    },
    strikeDescription: {
      textAlign: 'right',
    },
    line: {
      height: '1px',
      background: colors.main.grayOpacity50,
      marginBottom: '.5rem',
    },
    cardContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: '3rem 1rem',
      [breakpoints.up('xs')]: {
        padding: '2rem 1rem',
      },
      [breakpoints.up('md')]: {
        padding: '3rem',
      },
      [breakpoints.up('lg')]: {
        padding: '3rem 1rem',
      },
    },
    root: {
      '& h6': {
        margin: '0',
      },
      boxShadow: 'none',
      border: 'none',
      borderRadius: 0,
      '&::before': {
        display: 'none',
      },
      '&:last-child': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      '&.Mui-expanded': {
        margin: 0,
      },
    },
    loaderContainer: {
      margin: '20px 0 0 0',
    },
    totalAmount: {
      paddingRight: '28px',
    },
    accordionSummary: {
      height: '18px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      textAlign: 'left',
      padding: 0,
      borderTop: 'none',
      '& svg': {
        fill: colors.main.midnightExpress,
        '&:hover': {
          fill: colors.main.brightRed,
        },
      },
      '& .MuiAccordionSummary-content': {
        margin: '0',
        width: '100%',
      },
    },
    accordionDetails: {
      display: 'flex',
      flexDirection: 'column',
      background: colors.main.newBackgroundGray,
      borderRadius: '1rem',
      marginBottom: '1rem',
      padding: '2rem 1.5rem 2rem .5rem',
    },
    accordionDesc: {
      '& a': {
        textDecoration: 'underline',
        fontFamily: PP_OBJECT_SANS_MEDIUM,
        cursor: 'pointer',
        '&:hover': {
          color: colors.main.brightRed,
        },
      },
    },
    sectionRow: {
      marginBottom: '0.5rem',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      '& div': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'left',
      },
    },
    lastRow: {},
    accordionWrapper: {
      width: '100%',
    },
    summaryHeading: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      '& span': {
        textTransform: 'none',
        '&:first-child': {
          width: 'calc(100% - 60px)',
        },
      },
    },
    billSection: {
      padding: '2rem 0 1rem 0',
      [breakpoints.down('xs')]: {
        padding: '1rem 0 1rem 0',
      },
    },
    description: {
      margin: '.5rem 0 2rem 0',
      '& a': {
        textDecoration: 'underline',
        fontFamily: 'PP Object Sans Medium',
      },
    },
  }),
)
export default BillingSummary
