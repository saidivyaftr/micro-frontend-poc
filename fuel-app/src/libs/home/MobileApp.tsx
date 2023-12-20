import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Typography, InjectHTML, ImagePerk } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { MOBILE_APP } from 'src/constants'

const MobileApp = () => {
  const classes = useStyles()
  const data = useAppData('getMobileAppV2', true)
  const onMobileAppLinkClick = (typeLink: string) => {
    //@ts-ignore
    s_objectID = MOBILE_APP.replace('{NAME}', typeLink)
  }
  const renderContent = () => {
    return (
      <div id="mobile-app" className={classes.details}>
        <Typography
          tagType="h2"
          styleType="h3"
          className={classes.ftrMobileAppCardTitle}
        >
          {data?.title?.value}
        </Typography>
        <InjectHTML
          className={classes.ftrMobileAppDescription}
          value={data?.subTitle?.value || ''}
          styleType="p1"
          tagType="p"
          fontType="regularFont"
        />
        <div className={classes.Stores}>
          <a
            href={data?.playStoreLink?.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => onMobileAppLinkClick('playstore-link')}
          >
            <img
              src={data?.playStoreImage?.src}
              alt={data?.playStoreImage?.alt}
              className={classes.bannerImage}
              loading="lazy"
            />
          </a>
          <a
            href={data?.appStoreLink?.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => onMobileAppLinkClick('appstore-link')}
          >
            <img
              src={data?.appStoreImage?.src}
              alt={data?.appStoreImage?.alt}
              className={classes.bannerImage}
              loading="lazy"
            />
          </a>
        </div>
        {data?.legalText?.value && (
          <InjectHTML
            className={classes.legalText}
            tagType="p"
            data-testid="caption"
            styleType="legal"
            value={data?.legalText?.value}
          />
        )}
      </div>
    )
  }
  return (
    <ImagePerk
      backgroundColor="white"
      stripeColor="primary"
      contentBoxBorderRadius={false}
      contentClassName={classes.contentBoxStyles}
      imageStyleClassName={classes.imageStyles}
      className={classes.imagePerk}
      content={renderContent()}
      tabletBackgroundImage={data?.image || {}}
      linesBgColorsClass={classes.stripesStyles}
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  details: {
    backgroundColor: colors.main.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 'auto',
    width: '100%',
  },
  bannerImage: {
    objectFit: 'cover',
    [breakpoints.down('sm')]: {
      width: '7.75rem',
      height: '2.1875rem',
    },
  },
  ftrMobileAppCardTitle: {
    marginBottom: '1rem',
  },
  ftrMobileAppDescription: {
    marginBottom: '1rem',
    [breakpoints.down('sm')]: {
      fontSize: '1.125rem',
      lineHeight: '1.625rem',
    },
    '& sup': {
      fontSize: '10px',
      lineHeight: 0,
      verticalAlign: 'super',
    },
  },
  Stores: {
    display: 'flex',
    gap: '1rem',
    '& a': { minWidth: 'unset' },
  },
  contentBoxStyles: {
    margin: 'auto 0',
    minHeight: 'auto',
    [breakpoints.up('sm')]: {
      width: '27.5rem',
      padding: '0 2.5rem 0 0',
    },
    [breakpoints.down('sm')]: {
      margin: '2rem 0',
      padding: 0,
    },
    [breakpoints.down('xs')]: {
      marginBottom: '0',
    },
  },
  imagePerk: {
    maxWidth: 1232,
    alignItems: 'end',
    margin: 'auto',
    padding: '1.75rem 0 5rem 1rem',
    [breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingBottom: '3rem',
      maxWidth: '90%',
    },
  },
  imageStyles: {
    padding: '0 !important',
    [breakpoints.down('xs')]: {
      maxWidth: '90%',
      marginTop: '1.5rem',
    },
  },
  stripesStyles: {
    [breakpoints.down('xs')]: {
      '& div': {
        height: '14px',
        bottom: 'calc(15% + 21px)',
        '&:first-of-type': {
          bottom: '15%',
        },
        '&:last-of-type': {
          bottom: 'calc(15% + 42px)',
        },
      },
    },
  },
  legalText: {
    marginBottom: '0',
  },
}))

export default MobileApp
