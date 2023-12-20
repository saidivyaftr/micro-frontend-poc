import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'
import colors from 'src/styles/theme/colors'
import classNames from 'classnames'
import { useAppData } from 'src/hooks'
import { CartLineItem } from '../shared/types'
import { priceFormatterWithoutDecimal } from '../shared/miscUtlis'
import InjectHTML from 'src/blitz/components/InjectHTML'
import { SELF_SERVICE } from 'src/constants'

const OrderSummary = ({
  newServices,
  oneTimeChargesList,
  monthlyRecurringCharges,
  newServicesTotal,
  oneTimeChargesTotal,
  existingServicesTotal,
}: {
  newServices: CartLineItem[]
  oneTimeChargesList?: CartLineItem[]
  monthlyRecurringCharges: number
  newServicesTotal: number
  oneTimeChargesTotal: number
  existingServicesTotal: number
}) => {
  const classes = useStyles()
  const {
    newService,
    monthlyTotalText,
    totalOneTimeChargeText,
    oneTimeChargesText,
    currentServices,
    estimatedMonthlyRecurringCharges,
    specialSavingsText,
    meshExtenders,
  } = useAppData('confirmationPageSummary', true) || {}
  return (
    <>
      <div className={classes.orderSummaryWrapper}>
        <Typography styleType="h5" tagType="h5" className={classes.space20}>
          {newService?.value}
        </Typography>
        <hr className={classes.margin32} />
        {newServices?.map((item: any, index: number) => {
          return (
            <div key={`serviceList${index}`} className={classes.space20}>
              <div className={classes.grid}>
                <Typography styleType="p1" tagType="label">
                  {item?.Category === SELF_SERVICE.EXTENDERS
                    ? `${meshExtenders.value}(${item?.Quantity})`
                    : item?.Description}
                </Typography>

                <div className={classes.rightAlign} />
                <div className={classes.textAlignRight}>
                  <Typography
                    styleType="p1"
                    tagType="span"
                    className={item?.Price < 0 ? classes.strikeThrough : ''}
                  >
                    {priceFormatterWithoutDecimal(item?.Price, item?.Recurring)}
                  </Typography>
                </div>
              </div>
              {item.ItemCode === SELF_SERVICE.PRODUCT_YTTVE_PAGE_CODE && (
                <div className={classes.grid}>
                  <div className={classes.rightAlign} />
                  <div className={classes.textAlignRight}>
                    <InjectHTML
                      styleType="p3"
                      value={specialSavingsText.value}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
        <div className={classNames([classes.grid, classes.space20])}>
          <Typography styleType="h6" tagType="label">
            {monthlyTotalText?.value}
          </Typography>
          <div className={classes.rightAlign} />
          <div className={classes.textAlignRight}>
            <Typography styleType="h6" tagType="span">
              {priceFormatterWithoutDecimal(newServicesTotal, true)}
            </Typography>
          </div>
        </div>
        <hr className={classes.margin32} />
        <div className={classes.space20}>
          <div className={classes.grid}>
            <Typography styleType="p1" tagType="label">
              {currentServices?.value}
            </Typography>
            <div className={classes.rightAlign} />
            <div className={classes.textAlignRight}>
              <Typography styleType="p1" tagType="span">
                {priceFormatterWithoutDecimal(existingServicesTotal, true)}
              </Typography>
            </div>
          </div>
        </div>
        <div className={classNames([classes.grid, classes.space20])}>
          <Typography styleType="h6" tagType="label">
            {estimatedMonthlyRecurringCharges?.value}
          </Typography>
          <div className={classes.rightAlign} />
          <div className={classes.textAlignRight}>
            <Typography styleType="h6" tagType="span">
              {priceFormatterWithoutDecimal(monthlyRecurringCharges, true)}
            </Typography>
          </div>
        </div>
      </div>

      {oneTimeChargesList && oneTimeChargesList?.length > 0 && (
        <div className={classes.onTimeChargesWrapper}>
          <div className={classNames([classes.grid, classes.space20])}>
            <Typography styleType="h5" tagType="label">
              {oneTimeChargesText?.value}
            </Typography>
          </div>
          <hr className={classes.margin32} />
          {oneTimeChargesList.map((item: any, index: number) => {
            return (
              <div
                key={`oneTimeChargesList${index}`}
                className={classes.space20}
              >
                <div className={classes.grid}>
                  <Typography styleType="p1" tagType="label">
                    {item?.Description}
                  </Typography>
                  <div className={classes.rightAlign} />
                  <div className={classes.textAlignRight}>
                    <Typography styleType="p1" tagType="span">
                      {priceFormatterWithoutDecimal(item?.Price)}
                    </Typography>
                  </div>
                </div>
              </div>
            )
          })}

          <div className={classNames([classes.grid, classes.space20])}>
            <Typography styleType="h6" tagType="label">
              {totalOneTimeChargeText?.value}
            </Typography>
            <div className={classes.rightAlign} />
            <div className={classes.textAlignRight}>
              <Typography styleType="h6" tagType="span">
                {priceFormatterWithoutDecimal(oneTimeChargesTotal)}
              </Typography>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  orderSummaryWrapper: {
    backgroundColor: colors.main.white,
    borderRadius: '1rem',
    padding: '2.5rem 4rem',
    marginBottom: 16,
    [breakpoints.down('md')]: {
      padding: '2.5rem 2rem',
    },
    [breakpoints.down('sm')]: {
      padding: '2.5rem 2rem',
    },
    [breakpoints.down('xs')]: {
      padding: '1.5rem 1rem',
    },
  },
  onTimeChargesWrapper: {
    backgroundColor: colors.main.white,
    borderRadius: '1rem',
    padding: '2.5rem 4rem',
    marginTop: 16,
    marginBottom: 16,
    [breakpoints.down('md')]: {
      padding: '2.5rem 2rem',
    },
    [breakpoints.down('sm')]: {
      padding: '2.5rem 2rem',
    },
    [breakpoints.down('xs')]: {
      padding: '1.5rem 1rem',
    },
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    gap: 42,
    [breakpoints.down('xs')]: {
      display: 'grid',
      gridTemplateColumns: '58% auto 1fr',
      gridColumnGap: '10px',
    },
  },
  rightAlign: {
    flex: '1 1 auto',
  },
  space20: {
    margin: '20px 0',
    [breakpoints.down('xs')]: {
      margin: '20px 0 0 0',
    },
  },
  strikeThrough: {
    textDecoration: 'line-through',
  },
  margin32: {
    margin: '32px 0px',
  },
  textAlignRight: {
    textAlign: 'right',
  },
}))

export default OrderSummary
