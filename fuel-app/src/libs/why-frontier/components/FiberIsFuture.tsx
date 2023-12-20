import { Button, ImagePerk, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'

const FiberIsFuture = () => {
  const { title, subTitle, primaryButtonText, primaryButtonLink, image } =
    useAppData('fiberIsFuture', true)
  const classes = useStyles()
  if (!title) {
    return null
  }
  return (
    <div id="fiber-2-gig" className={classes.container}>
      <ImagePerk
        backgroundColor="secondary"
        stripeColor="primary"
        contentAlign="right"
        contentClassName={classes.contentClassName}
        content={
          <div className={classes.contentWrapper}>
            <Typography className={classes.heading} tagType="h2" styleType="h3">
              {title?.value}
            </Typography>
            <Typography
              className={classes.subHeading}
              tagType="p"
              styleType="h6"
              fontType="regularFont"
            >
              {subTitle?.value}
            </Typography>
            <Button
              type="link"
              className={classes.link}
              text={primaryButtonText?.value}
              href={primaryButtonLink?.url}
            />
          </div>
        }
        tabletBackgroundImage={{
          src: image?.src,
          alt: image?.alt,
        }}
      />
    </div>
  )
}

export default FiberIsFuture

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    '& .ImagePerk_imageBox__awcLd': {
      alignSelf: 'flex-end',
    },
  },
  heading: {
    marginTop: '0 !important',
    marginBottom: 24,
  },
  subHeading: {
    marginBottom: '32px',
  },
  paragraphStyle: {
    marginBottom: '32px',
  },
  contentWrapper: {
    [breakpoints.up('md')]: {
      maxWidth: '23.125rem',
      margin: 'auto',
    },
    maxWidth: 'unset',
  },
  listItem: {
    marginBottom: 4,
  },
  link: {
    [breakpoints.down('xs')]: {
      paddingRight: '0.5rem',
      paddingLeft: '0.5rem',
    },
  },
  bulletsStyle: {
    margin: '2px 0',
  },
  svgAlign: {
    placeSelf: 'center stretch',
  },
  contentClassName: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))
