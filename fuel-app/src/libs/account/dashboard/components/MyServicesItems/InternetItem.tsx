import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML, Button } from 'src/blitz'
import { InternetAccountIcon } from 'src/blitz/assets/react-icons'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import { useProductDetails } from 'src/selector-hooks'
import colors from 'src/styles/theme/colors'
import { myServicesData } from '../../mockData'

export type PromotionalCardProps = {
  icon: string
  title: string
  labelLink: string
  url: string
}

// TODO: Replace with API response
const equipment = 'eero 6E system'
const devices = '11'
const internetUsage = '5.43 Gb'
const limit = 'unlimited'
const upgradeValue = '2 Gig for $69.99/mo'

const InternetItem = () => {
  const classes = useStyles()
  const {
    devicesLabel,
    devicesConnectedLabel,
    usageLabel,
    usageOutOfLabel,
    upgradeTodayLabel,
    internetUpgradeBannerIcon,
    internetUpgradeBannerButtonText,
    internetUpgradeBannerButtonHref,
    pricingLabel,
    pricingPeriod,
    equipmentLabel,
  } = myServicesData

  const productDetails = useProductDetails()
  const productItems = productDetails?.data?.map?.['internet']?.items || []
  const getPricingPeriodValue = (price = 'month') =>
    pricingPeriod?.value?.replace('{{period}}', price)

  const usageLimit = usageOutOfLabel?.value?.replace('{{limit}}', limit)

  return (
    <>
      {productItems?.map((productItem: any) => (
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
                  {getPricingPeriodValue(`month`)}
                </Typography>
              </div>
            </CardWithTitle>
            <CardWithTitle
              title={equipmentLabel?.value}
              size="rectangle"
              styleType="p3"
              fontType="boldFont"
            >
              <div className={classes.cardContent}>
                <div className={classes.inline}>
                  <InternetAccountIcon fill={colors.main.brightRed} />
                  <Typography styleType="h6" tagType="span">
                    {equipment}
                  </Typography>
                </div>
              </div>
            </CardWithTitle>
            <CardWithTitle
              title={devicesLabel?.value}
              size="rectangle"
              styleType="p3"
              fontType="boldFont"
            >
              <div className={classes.cardContent}>
                <div className={classes.inline}>
                  <Typography styleType="h6" tagType="span">
                    {devices}
                  </Typography>
                </div>
                <Typography tagType="div" styleType="p4">
                  {devicesConnectedLabel?.value}
                </Typography>
              </div>
            </CardWithTitle>
            <CardWithTitle
              title={usageLabel?.value}
              size="rectangle"
              styleType="p3"
              fontType="boldFont"
            >
              <div className={classes.cardContent}>
                <Typography styleType="h6" tagType="span">
                  {internetUsage}
                </Typography>
                <Typography tagType="div" styleType="p4">
                  {usageLimit}
                </Typography>
              </div>
            </CardWithTitle>
            <div className={classes.upgradeBanner}>
              <CardWithTitle
                title={upgradeTodayLabel?.value}
                size="square"
                styleType="p3"
                fontType="boldFont"
                backgroundColor="secondary"
                className={classes.card}
              >
                <div className={classes.cardContent}>
                  <div className={classes.inline}>
                    <InjectHTML
                      addAnchorStyles
                      value={internetUpgradeBannerIcon?.value}
                      className={classes.icon}
                    />
                    <Typography styleType="h6" tagType="span">
                      {upgradeValue}
                    </Typography>
                  </div>
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
        </div>
      ))}
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
  inline: {
    display: 'flex',
    gap: '.562rem',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  upgradeBanner: {
    gridColumn: '1 / 3',
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

export default InternetItem
