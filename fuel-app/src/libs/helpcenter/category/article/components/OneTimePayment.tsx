import { InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'

const OneTimePayment = ({ data }: any) => {
  const styles = useStyles()
  if (Object.keys(data || {}).length == 0) {
    return null
  }
  const {
    title,
    description,
    appStoreLink,
    playStoreLink,
    playStoreImage,
    appStoreImage,
    id,
  } = data || {}

  return (
    <div className={styles.root} id={id?.value}>
      <InjectHTML
        addAnchorStyles
        tagType="h2"
        styleType="h4"
        value={title?.value}
      />
      <InjectHTML
        addAnchorStyles
        tagType="p"
        data-testid="description"
        styleType="p1"
        value={description?.value as string}
      />
      <div className={styles.storeLinksContainer}>
        <a href={playStoreLink?.url} target="_blank" rel="noreferrer">
          <img
            src={playStoreImage?.src}
            alt={playStoreImage?.alt}
            className={styles.bannerImage}
            loading="lazy"
          />
        </a>
        <a href={appStoreLink?.url} target="_blank" rel="noreferrer">
          <img
            src={appStoreImage?.src}
            alt={appStoreImage?.alt}
            className={styles.bannerImage}
            loading="lazy"
          />
        </a>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    marginBottom: 80,
    [breakpoints.down('sm')]: {
      marginBottom: 32,
    },
  },
  storeLinksContainer: {
    display: 'flex',
    gap: 32,
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: 16,
    },
  },
  ftrMobileAppDescription: {
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '26px',
    letterSpacing: '0.01em',
    marginBottom: '32px',
    maxWidth: 450,
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
    '& sup': {
      fontSize: '10px',
      lineHeight: 0,
      verticalAlign: 'super',
    },
  },
  bannerImage: {
    width: '180px',
    height: '52px',
    objectFit: 'cover',
  },
}))

export default OneTimePayment
