import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER, DOWNLOAD_APP } from 'src/constants'
import { ApplePlaystoreIcon, GooglePlayIcon } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'

const DownloadAppQR = () => {
  const classes = useStyles()
  const data = useAppData('getdownloadapp', true)

  const onDownloadAppLinkClick = (typeLink: string) => {
    //@ts-ignore
    s_objectID = DOWNLOAD_APP.replace('{NAME}', typeLink)
  }

  if (!Object.keys(data).length) return null

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div id="download-app">
          <div className={classes.imageContainer}>
            <div className={classes.qrLinkContainer}>
              <img
                src={data?.imageQRcodePlayStore?.src}
                alt={data?.imageQRcodePlayStore?.alt}
                className={classes.codeImage}
              />
              <a
                href={data?.playStoreLink?.url}
                target="_blank"
                onClick={() => onDownloadAppLinkClick('playstore-link')}
                rel="noreferrer"
                className={classes.storeImage}
              >
                <GooglePlayIcon />
              </a>
            </div>
            <div className={classes.qrLinkContainer}>
              <img
                src={data?.imageQRcodeAppStore?.src}
                alt={data?.imageQRcodeAppStore?.alt}
                className={classes.codeImage}
              />
              <a
                href={data?.appStoreLink?.url}
                target="_blank"
                rel="noreferrer"
                className={classes.storeImage}
                onClick={() => onDownloadAppLinkClick('appstore-link')}
              >
                <ApplePlaystoreIcon />
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
  },
  title: {
    [breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  container: {
    maxWidth: 600,
    margin: '0 1rem',
    textAlign: 'center',
    padding: '1.625rem 0 160px 0',
    borderRadius: '2rem',
    [breakpoints.down('sm')]: {
      padding: '4.5rem 1rem 0 1rem',
    },
    [breakpoints.down('xs')]: {
      padding: '10.5rem 1rem 0 1rem',
    },
  },
  qrLinkContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '6.25rem',
    [breakpoints.down('xs')]: {
      gap: '1.5rem',
    },
  },
  storeImage: {
    color: colors.main.white,
    maxWidth: '185px',
    [breakpoints.down('xs')]: {
      '& svg': {
        width: 130,
        // height: 'auto',
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

export default DownloadAppQR
