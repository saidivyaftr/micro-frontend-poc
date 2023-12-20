import { makeStyles } from '@material-ui/core'
import { TwoColumnLayout, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER, DOWNLOAD_APP } from 'src/constants'
import colors from '@/shared-ui/colors'
import { AppStoreDownload, PlaystoreDownload } from '@/shared-ui/react-icons'
import { useAppData } from 'src/hooks'
const DownloadApp = () => {
  const classes = useStyles()
  const data = useAppData('downloadFrontier', true)

  const onDownloadAppLinkClick = (typeLink: string) => {
    //@ts-ignore
    s_objectID = DOWNLOAD_APP.replace('{NAME}', typeLink)
  }

  if (!Object.keys(data).length) return null

  return (
    <div className={classes.root} data-testid="download-app">
      <TwoColumnLayout
        image={data.deviceImage?.src}
        title={data.deviceImage?.alt}
        reverse
        roundedBorders
        className={classes.twoColumnLayout}
        imageWrapperClassName={classes.image}
        mobileImage={data.mobileImage?.src}
        gridItemClassName={classes.gridItemClassName}
        imageClassName={classes.imageClassName}
        gridItemImageClassName={classes.gridItemImageClassName}
        content={
          <div className={classes.container}>
            {data?.title && (
              <Typography
                color="tertiary"
                fontType="boldFont"
                tagType="h4"
                styleType="h4"
                className={classes.title}
                data-testid="download-app-title"
              >
                {data?.title?.value}
              </Typography>
            )}
            <div id="download-app">
              <Typography
                tagType="p"
                styleType="p1"
                color="tertiary"
                data-testid="download-app-subtitle"
                className={classes.subTitle}
              >
                {data?.subTitle?.value}
              </Typography>
              <div className={classes.imageContainer}>
                <div>
                  <img
                    src={data?.imageQRcodeAppStore?.src}
                    alt={data?.imageQRcodeAppStore?.alt}
                    className={classes.codeImage}
                  />
                  <a
                    href={data?.appStoreLink?.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      className={classes.storeImage}
                      onClick={() => onDownloadAppLinkClick('appstore-link')}
                      data-testid="download-app-store-link"
                    >
                      <AppStoreDownload />
                    </div>
                  </a>
                </div>
                <div>
                  <img
                    src={data?.imageQRcodePlayStore?.src}
                    alt={data?.imageQRcodePlayStore?.alt}
                    className={classes.codeImage}
                  />
                  <a
                    href={data?.playStoreLink?.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      className={classes.storeImage}
                      onClick={() => onDownloadAppLinkClick('playstore-link')}
                      data-testid="download-app-store-link"
                    >
                      <PlaystoreDownload />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: 'auto',
    maxWidth: '1232px',
    padding: '5rem 0',
    [breakpoints.down('xs')]: {
      padding: '2.5rem 1rem 2.5rem 1rem',
    },
    [breakpoints.down('md')]: {
      padding: '1rem',
    },
  },
  title: {
    textAlign: 'left',
  },
  subTitle: {
    textAlign: 'left',
  },
  gridItemImageClassName: {
    maxHeight: '25rem',
    [breakpoints.down('sm')]: {
      maxHeight: '18rem',
    },
  },
  gridItemClassName: {
    justifyContent: 'start',
    padding: '2.75rem 0 1rem',
    [breakpoints.down('md')]: {
      justifyContent: 'center',
      padding: 0,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: 0,
    maxWidth: '26rem',
    [breakpoints.down('md')]: {
      padding: '2rem 2rem 0',
    },
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '4rem',
    margin: '3rem auto 0',
    [breakpoints.down('xs')]: {
      gap: '2rem',
      margin: '1.5rem auto',
    },
  },
  imageClassName: {
    width: 'unset',
    height: 'unset',
    maxHeight: 'unset',
    maxWidth: '26.5rem',
  },
  storeImage: {
    color: 'white',
    maxWidth: '185px',
    [breakpoints.down('xs')]: {
      '& svg': {
        width: 130,
        height: 'auto',
      },
    },
  },
  codeImage: {
    width: 104,
    marginBottom: '1.5rem',
    [breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },
  twoColumnLayout: {
    background: colors.main.dark,
    borderRadius: '2rem',
    [breakpoints.down('xs')]: {
      borderRadius: '1rem',
      paddingTop: 0,
    },
  },
  image: {
    backgroundColor: colors.main.dark,
    display: 'flex',
    justifyContent: 'center',
  },
}))

export default DownloadApp
