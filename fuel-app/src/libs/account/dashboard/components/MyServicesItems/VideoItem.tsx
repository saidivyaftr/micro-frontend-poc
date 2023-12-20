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

// TODO : Update with API response
const channelsCount = '81'

const VideoItem = () => {
  const classes = useStyles()
  const {
    pricingLabel,
    pricingPeriod,
    channelLineupLabel,
    noOfChannels,
    internetUpgradeBannerButtonText,
    internetUpgradeBannerButtonHref,
  } = myServicesData

  const productDetails = useProductDetails()
  const productItems = productDetails?.data?.map?.['tv']?.items || []

  const pricingPeriodValue = pricingPeriod?.value?.replace(
    '{{period}}',
    'month',
  )

  const totalChannels = noOfChannels?.value?.replace('{{count}}', channelsCount)

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
                title={channelLineupLabel?.value}
                size="rectangle"
                styleType="p3"
                fontType="boldFont"
              >
                <div className={classes.cardContent}>
                  <Typography styleType="h6" tagType="span">
                    {totalChannels}
                  </Typography>
                  <Button
                    type="link"
                    className={classes.button}
                    href={internetUpgradeBannerButtonHref?.value}
                    text={internetUpgradeBannerButtonText?.value}
                    variant="tertiary"
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
  upgradeBanner: {
    gridColumn: '1 / 3',
  },
  card: {
    [breakpoints.down('xs')]: { paddingTop: '8px' },
  },
  button: {
    width: 'max-content',
    marginTop: 8,
  },
}))

export default VideoItem
