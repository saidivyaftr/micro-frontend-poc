import { makeStyles } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const DownloadApp = () => {
  const classes = useStyles()
  const data = useAppData('downloadApp', true)
  const {
    title,
    subTitle,
    image,
    playStoreButtonUrl,
    playStoreImage,
    appStoreButtonUrl,
    appStoreImage,
  } = data

  if (Object.keys(data).length === 0) return null

  return (
    <div className={classes.wrapper} data-testid="download-app">
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
            data-testid="download-app-title"
          />
        )}
        {subTitle?.value && (
          <InjectHTML
            tagType="p"
            styleType="p1"
            className={classes.subTitle}
            value={subTitle?.value}
            data-testid="download-app-subtitle"
          />
        )}
        <div className={classes.appWrapper}>
          <a href={appStoreButtonUrl?.url}>
            <img
              className={classes.appStoreImage}
              src={appStoreImage?.src}
              alt={appStoreImage?.alt}
            />
          </a>
          <a href={playStoreButtonUrl?.url}>
            <img
              className={classes.appStoreImage}
              src={playStoreImage?.src}
              alt={playStoreImage?.alt}
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
    [breakpoints.down('sm')]: {
      marginBottom: 40,
    },
    marginBottom: 80,
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  subTitle: {
    textAlign: 'center',
    marginBottom: '2rem',
    [breakpoints.down('sm')]: {
      fontSize: 18,
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

export default DownloadApp
