import { makeStyles } from '@material-ui/core/styles'
import { InjectHTML, TwoColumnLayout, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from '../../hooks'
import { SecureProductsType } from 'src/redux/types/selserviceType'
import colors from 'src/styles/theme/colors'

const IncludedDetails = () => {
  const data: SecureProductsType = useAppData('FrontierSecureProduct', true)
  const classes = useStyles()

  const NonImageContent = () => (
    <div className={classes.detailsContainer}>
      <Typography styleType="h5" tagType="h5">
        {data.title?.value}
      </Typography>
      <Typography className={classes.description} styleType="p1" tagType="div">
        {data.description?.value}
      </Typography>
      <div className={classes.listContainer}>
        {data.featurelist?.list.map(({ description }) => (
          <div key={`${description?.value}`} className={classes.listItem}>
            <InjectHTML value={data.icon?.rendered} />
            <Typography styleType="p1" tagType="div">
              {description?.value}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className={classes.wrapper}>
      <TwoColumnLayout
        className={classes.columnRoot}
        image={data.Image?.src}
        webpImage={data.Image?.src}
        title={data.title?.value}
        imageWrapperClassName={classes.imageContainer}
        innerWrapperClassName={classes.innerWrapper}
        content={<NonImageContent />}
        reverse={true}
        mobileReverse={true}
      />
    </div>
  )
}

export default IncludedDetails

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    margin: '16px auto 80px auto',
    maxWidth: 1200,
    background: colors.main.white,
    borderRadius: 16,
    display: 'flex',
    padding: 0,
    [breakpoints.down('md')]: {
      flexDirection: 'column',
      margin: '16px 16px 32px 16px',
    },
  },
  columnRoot: {
    borderRadius: 16,
  },
  innerWrapper: {
    padding: 0,
  },
  imageContainer: {
    borderTopLeftRadius: '16px',
    borderBottomLeftRadius: '16px',
    overflow: 'hidden',
    [breakpoints.down('sm')]: {
      borderBottomLeftRadius: 0,
      borderTopRightRadius: '16px',
    },
  },
  detailsContainer: {
    flex: 1,
    padding: '78px 64px',
    [breakpoints.down('sm')]: {
      padding: '32px 16px',
    },
  },
  description: {
    margin: '16px 0',
  },
  listContainer: {
    margin: '16px 0',
  },
  listItem: {
    gap: 10,
    display: 'flex',
    marginBottom: 8,
    [breakpoints.down('sm')]: {
      gap: 16,
    },
  },
}))
