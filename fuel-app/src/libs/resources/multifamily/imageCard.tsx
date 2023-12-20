import { Button, InjectHTML, Picture } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'

const ImageCard = (sliderData: any) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.root}>
        <div
          className={
            sliderData?.slideToggle.value
              ? classes.contentBlockImage
              : classes.contentBlock
          }
        >
          <div className={classes.imageBlock}>
            <Picture
              testId={'image-card'}
              desktop={{
                image: sliderData?.image?.src,
                webp: sliderData?.webpImage?.src,
              }}
              className={
                sliderData?.slideToggle.value
                  ? classes.imageClassShift
                  : classes.imageClass
              }
              altText={sliderData?.image?.alt}
            />
          </div>
          <div
            className={
              sliderData?.slideToggle.value
                ? classes.contentWrapperImage
                : classes.contentWrapper
            }
          >
            {sliderData?.heading?.value && (
              <InjectHTML
                value={sliderData?.heading?.value}
                tagType="h3"
                styleType="h3"
                className={classes.headingStyles}
              />
            )}
            {sliderData?.description?.value && (
              <InjectHTML
                value={sliderData?.description?.value}
                tagType="p"
                styleType="p1"
                className={classes.descriptionStyles}
              />
            )}
            {sliderData?.disclaimerContent?.value && (
              <InjectHTML
                value={sliderData?.disclaimerContent?.value}
                tagType="p"
                styleType="legal"
                className={classes.disclaimerTextStyles}
              />
            )}
            {sliderData?.buttonText?.value && (
              <div className={classes.buttonWapper}>
                <Button
                  type="link"
                  text={sliderData?.buttonText?.value}
                  href={sliderData?.buttonURL?.value}
                  variant="tertiary"
                  className={classes.buttonStyles}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    marginTop: 16,
    marginBottom: 16,
    padding: 0,
  },
  imageBlock: {
    width: '57%',
    '& picture': {
      display: 'flex',
    },
    [breakpoints.down('md')]: {
      width: '100%',
    },
    [breakpoints.down('xs')]: {
      borderTopRightRadius: 32,
      borderTopLeftRadius: 32,
    },
  },
  contentBlock: {
    borderRadius: 32,
    display: 'flex',
    [breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  imageClass: {
    width: '100%',
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    [breakpoints.down('md')]: {
      borderTopRightRadius: 32,
      borderBottomLeftRadius: 0,
    },
  },
  imageClassShift: {
    width: '100%',
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    [breakpoints.down('md')]: {
      borderTopLeftRadius: 32,
      borderBottomRightRadius: 0,
    },
  },
  headingStyles: {
    color: colors.main.greenishBlue,
  },
  contentWrapper: {
    background: colors.main.midnightExpress,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    padding: '30px 64px',
    width: '43%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    [breakpoints.down('md')]: {
      width: '100%',
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 32,
      padding: 16,
    },
  },
  contentWrapperImage: {
    background: colors.main.newBackgroundGray,
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    padding: '30px 64px',
    width: '43%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    [breakpoints.down('md')]: {
      width: '100%',
      borderTopLeftRadius: 0,
      borderBottomRightRadius: 32,
      padding: 16,
    },
  },
  disclaimerTextStyles: {
    display: 'block',
    marginTop: 16,
    marginBottom: 0,
    [breakpoints.down('xs')]: {
      fontSize: 10,
      lineHeight: '12px',
    },
  },
  buttonStyles: {
    paddingLeft: 31,
    paddingRight: 31,
    [breakpoints.down('md')]: {
      display: 'block',
    },
  },
  buttonWapper: {
    marginTop: 42,
    [breakpoints.down('xs')]: {
      marginTop: 32,
    },
  },
  descriptionStyles: {
    maxWidth: 372,
    marginBottom: 0,
    marginTop: '2rem',
    [breakpoints.down('md')]: { maxWidth: '100%' },
    [breakpoints.down('xs')]: { marginTop: '0.5rem' },
    '& ul': {
      listStyle: 'disc',
      marginTop: 0,
      color: colors.main.white,
      paddingLeft: 26,
      [breakpoints.down('md')]: {
        paddingLeft: 22,
      },
      '& li': {
        color: colors.main.white,
        marginBottom: 16,
      },
    },
  },
  contentBlockImage: {
    flexDirection: 'row-reverse',
    display: 'flex',
    [breakpoints.down('xs')]: {
      display: 'block',
    },
  },
}))

export default ImageCard
