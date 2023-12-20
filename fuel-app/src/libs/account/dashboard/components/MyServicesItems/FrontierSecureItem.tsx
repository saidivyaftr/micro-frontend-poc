import { makeStyles } from '@material-ui/core'
import { Typography, Button } from 'src/blitz'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import { useProductDetails } from 'src/selector-hooks'
import { myServicesData } from '../../mockData'

export type PromotionalCardProps = {
  icon: string
  title: string
  labelLink: string
  url: string
}

// TODO: Replace with API response
const updateProduct = 'HomeSheild Elite'

const FrontierSecureItem = () => {
  const classes = useStyles()
  const {
    pricingLabel,
    pricingPeriod,
    upgradeTodayLabel,
    internetUpgradeBannerButtonText,
    internetUpgradeBannerButtonHref,
  } = myServicesData

  const productDetails = useProductDetails()
  const productItems = productDetails?.data?.map?.['fsecure']?.items || []

  const pricingPeriodValue = pricingPeriod?.value?.replace(
    '{{period}}',
    'month',
  )

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
                title={upgradeTodayLabel?.value}
                size="square"
                styleType="p3"
                fontType="boldFont"
                backgroundColor="secondary"
                className={classes.card}
              >
                <div className={classes.cardContent}>
                  <Typography fontType="boldFont" className={classes.icon}>
                    {updateProduct}
                  </Typography>
                  <Button
                    type="link"
                    text={internetUpgradeBannerButtonText?.value}
                    href={internetUpgradeBannerButtonHref?.value}
                    variant="tertiary"
                    className={classes.button}
                  />
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
  icon: {
    '& svg': {
      width: '22.56px',
      height: '19.5px',
    },
    [breakpoints.down('xs')]: {
      '& svg': {
        width: '15px',
        height: '13px',
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

export default FrontierSecureItem
