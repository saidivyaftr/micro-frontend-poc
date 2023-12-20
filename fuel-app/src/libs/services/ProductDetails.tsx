import { makeStyles } from '@material-ui/core/styles'
import { COMPONENT_WRAPPER } from 'src/constants'
import { Typography } from '@/shared-ui/components'
import { productDetails } from 'src/redux/types/selserviceType'
import FeatureListItem from './shared/FeatureListItem'
import { useAppData } from '../../hooks'
import colors from 'src/styles/theme/colors'

const ProductDetails = () => {
  const classes = useStyles()
  const productData = useAppData('SelfServiceProductContent', true)
  const { title, price, description, featurelist }: productDetails = productData
  return (
    <div className={classes.wrapper}>
      <div className={classes.container} id="more">
        <Typography
          styleType="h3"
          tagType="h3"
          className={classes.productTitle}
        >
          {title?.value}
        </Typography>
        <Typography
          styleType="h5"
          tagType="h5"
          className={classes.productPrice}
        >
          {price?.value}
        </Typography>
        <Typography styleType="p1" tagType="div">
          {description?.value}
        </Typography>
        <div className={classes.featureGridWrapper}>
          {featurelist?.list?.map((feature, i) => (
            <FeatureListItem
              key={`${feature.title.value}-${i}`}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    background: colors.main.white,
  },
  container: {
    ...COMPONENT_WRAPPER,
    paddingTop: 80,
    paddingBottom: 48,
    [breakpoints.down('md')]: {
      padding: '32px 16px',
      margin: '32px 16px 16px 16px',
    },
  },
  productTitle: {
    marginBottom: 32,
    textAlign: 'center',
  },
  productPrice: {
    marginBottom: 8,
  },
  featureGridWrapper: {
    marginTop: 32,
    display: 'inline-grid',
    gridTemplateColumns: 'auto auto',
    gridGap: 32,
    [breakpoints.down('xs')]: {
      gridTemplateColumns: 'auto',
    },
  },
}))
