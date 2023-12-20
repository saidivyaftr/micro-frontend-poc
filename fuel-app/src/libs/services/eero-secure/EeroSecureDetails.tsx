import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from 'src/styles/theme/colors'
import { productDetails } from 'src/redux/types/selserviceType'
import TileWithImage from './TileWithImage'
//push
const EeroSecureDetails = () => {
  const classes = useStyles()
  const productData = useAppData('SelfServiceProductContent', true)
  const { title, featurelist }: productDetails = productData
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
        <div className={classes.featureGridWrapper}>
          {featurelist?.list?.map((item, i) => (
            <TileWithImage
              key={`${item?.title?.value}-${i}`}
              title={item?.title?.value}
              description={item?.description?.value}
              imgSrc={item?.image?.src}
              reverse={i % 2}
              tileWrapperClassName={classes.tileWithImageWrapper}
              contentSectionClassName={classes.contentSection}
              cardTitleClassName={classes.cardTitle}
              cardDescriptionClassName={classes.cardDescription}
              imageSectionClassName={classes.imageSection}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EeroSecureDetails

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
    [breakpoints.down('xs')]: {
      padding: 0,
      margin: '32px 16px',
    },
  },
  productTitle: {
    marginBottom: 49,
    textAlign: 'center',
    [breakpoints.down('xs')]: {
      margin: 0,
      padding: '32px 0',
    },
  },
  productPrice: {
    marginBottom: 8,
  },
  featureGridWrapper: {
    marginTop: 32,
    [breakpoints.down('xs')]: {
      marginTop: 0,
    },
  },
  tileWithImageWrapper: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    marginBottom: 49,
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      display: 'block',
      gridTemplateColumns: '100% 100%',
      marginBottom: 20,
    },
  },
  imageSection: {
    width: '100%',
    height: 400,
    backgroundColor: '#F3F4F4',
    borderRadius: '20px',
    padding: 0,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    [breakpoints.down('sm')]: {
      height: 'auto',
      padding: '20px 20px 0 20px',
    },
    [breakpoints.down('xs')]: {
      height: 'auto',
    },
    '& img': {
      marginBottom: '-32px',
      [breakpoints.down('sm')]: {
        marginBottom: 0,
        width: '80%',
      },
      [breakpoints.down('xs')]: {
        marginBottom: 0,
        width: '80%',
        padding: '20px 20px 0 20px',
      },
    },
  },
  contentSection: {
    paddingLeft: 64,
    [breakpoints.down('xs')]: {
      padding: '32px 10px',
      textAlign: 'center',
    },
  },
  cardTitle: {
    marginBottom: 32,
    [breakpoints.down('xs')]: {
      marginBottom: 16,
    },
  },
  cardDescription: {
    padding: 0,
    marginRight: 80,
    [breakpoints.down('md')]: {
      padding: 0,
      marginRight: 80,
    },
    [breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
}))
