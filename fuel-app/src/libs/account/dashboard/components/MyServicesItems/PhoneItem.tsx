import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import { useProductDetails } from 'src/selector-hooks'
import { myServicesData } from '../../mockData'

export type PromotionalCardProps = {
  icon: string
  title: string
  labelLink: string
  url: string
}

// TODO : Update with API response
const noOfLines = '1'

const PhoneItem = () => {
  const classes = useStyles()
  const { pricingLabel, pricingPeriod, numberOfLines } = myServicesData

  const pricingPeriodValue = pricingPeriod?.value?.replace(
    '{{period}}',
    'month',
  )

  const productDetails = useProductDetails()
  const productItems = productDetails?.data?.map?.['phone']?.items || []

  return (
    <>
      {productItems?.map((productItem: any) => {
        return (
          <div key={`product-${productItem?.sku}`}>
            <Typography color="tertiary" className={classes.productDescription}>
              {productItem?.description}
            </Typography>
            <div className={classes.wrapper}>
              <CardWithTitle
                title={pricingLabel?.value}
                size="rectangle"
                styleType="p3"
                fontType="boldFont"
              >
                <div className={classes.cardContent}>
                  <Typography styleType="h6" tagType="span">
                    {`$${productItem?.price}`}
                  </Typography>
                  <Typography tagType="div" styleType="p4">
                    {pricingPeriodValue}
                  </Typography>
                </div>
              </CardWithTitle>
              <CardWithTitle
                title={numberOfLines?.value}
                size="rectangle"
                styleType="p3"
                fontType="boldFont"
              >
                <div className={classes.cardContent}>
                  <Typography styleType="h6" tagType="span">
                    {noOfLines}
                  </Typography>
                </div>
              </CardWithTitle>
            </div>
          </div>
        )
      })}
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    columnGap: '.5rem',
    rowGap: '.5rem',
    paddingTop: '1rem',

    [breakpoints.down('xs')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  productDescription: {
    width: '100%',
  },
  cardContent: {
    marginTop: '.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '.5rem',
    minHeight: '4.25rem',

    '& span': {
      [breakpoints.down('xs')]: {
        fontSize: '1rem',
      },
    },
  },
  card: {
    [breakpoints.down('xs')]: { paddingTop: '8px' },
  },
  button: {
    width: 'max-content',
    marginTop: 8,
  },
}))

export default PhoneItem
