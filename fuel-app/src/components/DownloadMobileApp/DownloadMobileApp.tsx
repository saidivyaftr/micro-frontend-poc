import colors from '@/shared-ui/colors'
import { InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const DownloadMobileApp = () => {
  const classes = useStyles()
  const data = useAppData('payBillMobileApp', true)
  const {
    title,
    subTitle,
    image,
    playStoreButtonUrl,
    playStoreButtonImage,
    appStoreButtonUrl,
    appStoreButtonImage,
  } = data

  if (Object.keys(data).length === 0) return null

  return (
    <div className={classes.wrapper} data-testid="pay-bill-mobile">
      <div
        className={classes.imageContainer}
        style={{
          backgroundColor: colors.main.greenishBlue,
        }}
      >
        {title?.value && (
          <InjectHTML
            tagType="h2"
            styleType="h3"
            value={title?.value}
            className={classes.title}
            data-testid="pay-bill-mobile-title"
          />
        )}
        {subTitle?.value && (
          <InjectHTML
            tagType="p"
            styleType="p1"
            className={classes.subTitle}
            value={subTitle?.value}
            data-testid="pay-bill-mobile-subtitle"
          />
        )}
        <div className={classes.appWrapper}>
          <a href={playStoreButtonUrl?.url}>
            <img
              className={classes.appStoreImage}
              src={playStoreButtonImage?.src}
              alt={playStoreButtonImage?.alt}
            />
          </a>
          <a href={appStoreButtonUrl?.url}>
            <img
              className={classes.appStoreImage}
              src={appStoreButtonImage?.src}
              alt={appStoreButtonImage?.alt}
            />
          </a>
        </div>
        <img className={classes.image} src={image?.src} alt={image?.alt} />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingTop: '5rem',
    [breakpoints.down('sm')]: {
      paddingTop: '2.5rem',
    },
    marginBottom: 0,
  },
  title: {
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
    marginTop: '1rem',
    [breakpoints.down('sm')]: {
      '& br': {
        display: 'none',
      },
    },
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '2rem',
    padding: '4rem 1rem 0',
  },
  appWrapper: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    marginTop: '3.625rem',
    flexDirection: 'row-reverse',
    [breakpoints.down('xs')]: {
      marginTop: '2.5rem',
    },
  },
  appStoreImage: {
    maxWidth: '10rem',
    [breakpoints.down('xs')]: {
      maxWidth: '7.75rem',
    },
  },
  image: {
    maxWidth: '404px',
    [breakpoints.down('sm')]: {
      maxWidth: '224px',
    },
  },
}))

export default DownloadMobileApp
