import colors from '@/shared-ui/colors'
import { InjectHTML, Picture, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const OrderSection = () => {
  const classes = useStyles()
  const { title, content, image, mobileImage } = useAppData('howToOrder', true)

  if (!title?.value) return null

  return (
    <div
      id="how-to-order"
      data-testid="how-to-order"
      className={classes.container}
    >
      <div className={classes.content}>
        <Typography tagType="h2" styleType="h3" className={classes.title}>
          {title?.value}
        </Typography>
        <InjectHTML tagType="p" styleType="p1" value={content?.value} />
      </div>

      <div className={classes.orderImg}>
        <Picture
          altText={image?.alt}
          desktop={{
            image: `${image?.src}`,
          }}
          tablet={{
            image: `${image?.src}`,
          }}
          mobile={{
            image: `${mobileImage?.src}`,
          }}
          className={classes.w100}
        />
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints, typography }) => ({
  container: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: ` ${typography.pxToRem(80)} 0`,
    [breakpoints.down('sm')]: {
      padding: ` ${typography.pxToRem(48)} ${typography.pxToRem(16)}`,
      flexDirection: 'column',
    },
  },
  content: {
    flexBasis: '40%',
    padding: `${typography.pxToRem(64)}`,
    background: `${colors.main.newBackgroundGray}`,
    borderRadius: '0 32px 32px 0',
    [breakpoints.down('sm')]: {
      padding: `${typography.pxToRem(32)}`,
      borderRadius: '32px 32px 0 0',
    },
  },
  title: {
    marginBottom: `${typography.pxToRem(16)}`,
  },
  orderImg: {
    flexBasis: '60%',
    width: '100%',
    [breakpoints.down('sm')]: {
      flexBasis: '100%',
    },
  },
  w100: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '32px 0 0 32px',
    [breakpoints.down('sm')]: {
      borderRadius: '0 0 32px 32px',
    },
  },
}))
export default OrderSection
