import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER, DOWNLOAD_APP } from 'src/constants'
import colors from '@/shared-ui/colors'
import { ApplePlaystoreIcon, GooglePlayIcon } from '@/shared-ui/react-icons'

const DownloadApp = () => {
  const classes = useStyles()
  const data = useAppData('getdownloadapp', true)

  const onDownloadAppLinkClick = (typeLink: string) => {
    //@ts-ignore
    s_objectID = DOWNLOAD_APP.replace('{NAME}', typeLink)
  }

  if (!Object.keys(data).length) return null

  return (
    <div className={classes.root} data-testid="download-app">
      <div className={classes.container}>
        {data?.title && (
          <Typography
            color="tertiary"
            fontType="boldFont"
            tagType="h3"
            styleType="h3"
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
            className={classes.description}
            data-testid="download-app-subtitle"
          >
            {data?.subTitle?.value}
          </Typography>
          <div className={classes.imageContainer}>
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
                  <GooglePlayIcon />
                </div>
              </a>
            </div>
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
                  <ApplePlaystoreIcon />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: 'auto',
    maxWidth: '1232px',
    padding: '7rem 0',
    [breakpoints.down('xs')]: {
      padding: '3.125rem 0 8.75rem 0',
    },
  },
  title: {
    [breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  container: {
    backgroundColor: colors.main.dark,
    margin: '0 1rem',
    display: 'grid',
    textAlign: 'center',
    padding: '5.625rem',
    borderRadius: '2rem',
    [breakpoints.down('xs')]: {
      padding: '2.5rem 1.5rem 2.5rem 1rem',
    },
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '6.25rem',
    [breakpoints.down('xs')]: {
      gap: 0,
    },
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
  description: {
    fontSize: '1.5rem',
    [breakpoints.down('xs')]: {
      fontSize: '1.125rem',
    },
  },
  codeImage: {
    width: 104,
    marginBottom: '1.5rem',
    [breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },
}))

export default DownloadApp
