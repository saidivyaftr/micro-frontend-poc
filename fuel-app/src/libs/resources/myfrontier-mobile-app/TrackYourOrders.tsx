import { makeStyles } from '@material-ui/core'
import { Picture, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const TrackYourOrders = () => {
  const classes = useStyles()

  const { title, description, stripesColor, image, backgroundColor } =
    useAppData('TrackYOurOrders', true)

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.container}
        style={{ backgroundColor: backgroundColor?.Color?.field?.value }}
      >
        <div className={classes.content}>
          {title?.value && (
            <Typography tagType="h1" styleType="h3">
              {title?.value}
            </Typography>
          )}
          {description?.value && (
            <Typography
              tagType="p"
              styleType="p1"
              className={classes.description}
            >
              {description?.value}
            </Typography>
          )}
        </div>

        <Picture
          testId="cardImage"
          className={classes.image}
          desktop={{
            image: image?.src,
          }}
          mobile={{
            image:
              'https://ihpcoimages.s3.ap-south-1.amazonaws.com/track-your-order2x.png',
          }}
          altText={image?.alt}
        />
        <div className={classes.stripes}>
          <div
            className={classes.stripe}
            style={{ backgroundColor: stripesColor?.Color?.field?.value }}
          ></div>
          <div
            className={classes.stripe}
            style={{ backgroundColor: stripesColor?.Color?.field?.value }}
          ></div>
          <div
            className={classes.stripe}
            style={{ backgroundColor: stripesColor?.Color?.field?.value }}
          ></div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    margin: '5rem auto',
    [breakpoints.down('xs')]: {
      margin: '2rem auto',
    },
  },
  reverseContainer: {
    flexDirection: 'row-reverse',
  },
  root: { margin: 0 },
  content: {
    margin: '3.5rem 4.5rem 0 4.5rem',
    textAlign: 'center',
    zIndex: 2,
    [breakpoints.down('sm')]: {
      margin: '1.625rem 1.25rem',
    },
  },
  description: {
    padding: '1rem 3.75rem',
    margin: 0,
    [breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
    },
  },
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '2rem',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    position: 'relative',
    display: 'block',
    maxWidth: '100%',
    marginBottom: '0px',
    zIndex: 2,
    [breakpoints.down(360)]: {
      display: 'block',
      maxWidth: '100%',
      margin: 'auto',
      marginBottom: '0px',
    },
  },

  stripes: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    top: '70%',

    transform: 'translateY(-50%)',
    [breakpoints.down('sm')]: {
      transform: 'unset',
      bottom: '4.5rem',
      top: '65%',
    },
    [breakpoints.down('xs')]: {
      transform: 'unset',
      bottom: '4.5rem',
      top: '65%',
    },
  },
  stripe: {
    marginBottom: '1.125rem',
    height: '2.375rem',
    [breakpoints.down('sm')]: {
      marginBottom: '.625rem',
      height: '1.25rem',
    },
  },
}))

export default TrackYourOrders
