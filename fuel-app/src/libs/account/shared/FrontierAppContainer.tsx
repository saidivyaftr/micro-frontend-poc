import colors from '@/shared-ui/colors'
import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import { makeStyles } from '@material-ui/core'
import { InjectHTML, TwoColumnLayout, Typography } from 'src/blitz'
import ApplePlaystoreIcon from '@/shared-ui/react-icons/apple-playstore'
import GooglePlayIcon from '@/shared-ui/react-icons/google-play'
export const frontierApp = {
  image: {
    alt: 'No bill due',
    src: '/pages/images/Payments/app-image.png',
  },
  title: {
    value: 'Manage your account on the go with the MyFrontier app',
  },
  description: {
    value:
      '<p>Get billing notifications and make payments right from your phone. Plus, view your current bill or payment history when it’s convenient for you. <a href="https://tinyurl.com/6y2xh93b">Learn more .</a></p>',
  },
  appStoreLink: {
    url: 'https://apps.apple.com/us/app/myfrontier/id978439794',
  },
  playStoreLink: {
    url: 'https://play.google.com/store/apps/details?id=com.frontier.selfserve&hl=en_US&gl=US',
  },
  imageQRcodePlayStore: {
    src: 'https://content-qat.frontier.com/-/jssmedia/Project/Frontier/Dotcom/Images/myfrontier-mobile-app-page/Google.png?rev=d8b8e6be826e44b8a1d8f51a9a8f1846',
    alt: 'QR code Google Play',
  },
  imageQRcodeAppStore: {
    src: 'https://content-qat.frontier.com/-/jssmedia/Project/Frontier/Dotcom/Images/myfrontier-mobile-app-page/Apple.png?rev=9eceb9fad2a74a698821675236a15f7c',
    alt: 'QR code App Store',
  },
}

const FrontierAppContainer = () => {
  const styles = useStyles()
  const {
    title,
    description,
    image,
    appStoreLink,
    imageQRcodeAppStore,
    imageQRcodePlayStore,
    playStoreLink,
  } = frontierApp

  const onDownloadAppLinkClick = (typeLink: string) => {
    //@ts-ignore
    s_objectID = DOWNLOAD_APP.replace('{NAME}', typeLink)
  }

  return (
    <CardWithTitle
      title={''}
      className={styles.card}
      classNameTitle={styles.classNameTitle}
    >
      <TwoColumnLayout
        image={image?.src}
        webpImage={image?.src}
        title={title?.value}
        className={styles.twoColumnLayout}
        imageWrapperClassName={styles.image}
        mobileImage={image?.src}
        mobileWebpImage={image?.src}
        innerWrapperClassName={styles.innerWrapper}
        gridItemClassName={styles.gridItem}
        gridItemImageClassName={styles.gridItemImage}
        gridClassName={styles.gridContainer}
        content={
          <>
            <div className={styles.gridItemContent}>
              <Typography
                tagType="h4"
                styleType="h4"
                dangerouslySetInnerHTML={{
                  __html: title?.value,
                }}
              />
              <InjectHTML
                addAnchorStyles
                tagType="p"
                styleType="p2"
                value={description?.value}
              />
              <div className={styles.imageContainer}>
                <div className={styles.qrContainer}>
                  <img
                    src={imageQRcodePlayStore?.src}
                    alt={imageQRcodePlayStore?.alt}
                    className={styles.codeImage}
                  />
                  <a href={playStoreLink?.url} target="_blank" rel="noreferrer">
                    <div
                      className={styles.storeImage}
                      onClick={() => onDownloadAppLinkClick('playstore-link')}
                      data-testid="download-app-store-link"
                    >
                      <GooglePlayIcon />
                    </div>
                  </a>
                </div>
                <div className={styles.qrContainer}>
                  <img
                    src={imageQRcodeAppStore?.src}
                    alt={imageQRcodeAppStore?.alt}
                    className={styles.codeImage}
                  />
                  <a href={appStoreLink?.url} target="_blank" rel="noreferrer">
                    <div
                      className={styles.storeImage}
                      onClick={() => onDownloadAppLinkClick('appstore-link')}
                      data-testid="download-app-store-link"
                    >
                      <ApplePlaystoreIcon />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </>
        }
      />
    </CardWithTitle>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  card: {
    width: '100%',
    backgroundColor: colors.main.greenishBlue,
    paddingBottom: 0,
  },
  classNameTitle: {
    marginBottom: 32,
  },
  gridItemContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '28rem',
    [breakpoints.down('xs')]: {
      height: '24rem',
      padding: 0,
    },
  },
  twoColumnLayout: {
    borderRadius: '2rem',
    backgroundColor: colors.main.greenishBlue,
    [breakpoints.down('xs')]: {
      borderRadius: '1rem',
    },
  },
  image: {
    backgroundColor: colors.main.greenishBlue,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '6.25rem',
    margin: '1rem 0',
    [breakpoints.down('xs')]: {
      gap: '3rem',
    },
  },
  codeImage: {
    width: 104,
    marginBottom: '1.5rem',
    [breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },
  storeImage: {
    color: colors.main.white,
    maxWidth: '185px',
    [breakpoints.down('xs')]: {
      '& svg': {
        width: 130,
        height: 'auto',
      },
    },
  },
  qrContainer: {
    textAlign: 'center',
  },
  innerWrapper: {
    padding: 0,
  },
  gridItem: {
    flex: 2,
    maxWidth: '100%',
    [breakpoints.down('xs')]: {
      flex: '0 0 100%',
    },
  },
  gridItemImage: {
    flex: 1,
    [breakpoints.down('xs')]: {
      flex: '0 0 100%',
      maxWidth: '90%',
    },
  },
  gridContainer: {
    gap: '2rem',
    [breakpoints.down('xs')]: {
      gap: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}))

export default FrontierAppContainer
