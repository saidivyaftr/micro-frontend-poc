import { useAppData } from 'src/hooks'
import {
  Button,
  Typography,
  InjectHTML,
  TwoColumnLayout,
  Stripes,
} from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
const DirectKick = () => {
  const compData = useAppData('MLSDirectKick', true) || {}
  const classes = useStyles()
  const renderContent = () => {
    return (
      <div className={classes.contentBlock}>
        <Typography tagType="h3" styleType="h4">
          {compData?.heading?.value}
        </Typography>
        <InjectHTML
          className={classes.paragraphStyle}
          tagType="p"
          styleType="p1"
          value={compData?.content?.value}
        />
        <Button
          type="link"
          text={compData?.butontText?.value}
          href={compData?.buttonUrl?.url}
          className={classes.callBtn}
          triggerEvent={true}
          eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
          interactionType={SITE_INTERACTION}
        />
      </div>
    )
  }
  return (
    <div id="direct-kick" className={classes.root}>
      <div className={classes.redContainer}></div>
      <Stripes stripeColor="secondary" className={classes.stripes} />
      <TwoColumnLayout
        image={compData?.imageContentBox?.src}
        webpImage={compData?.imageContentBox?.webp}
        mobileImage={compData?.mobileImage?.src}
        mobileWebpImage={compData?.mobileWebpImage?.src}
        tabletImage={compData?.imageContentBox?.src}
        tabletWebpImage={compData?.imageContentBox?.src}
        title={compData?.imageContentBox?.alt}
        content={renderContent()}
        reverse={true}
        className={classes.container}
        innerWrapperClassName={classes.innerWrapper}
        gridClassName={classes.containerWrapper}
        imageWrapperClassName={classes.imageWrapper}
        mobileReverse={true}
        imageClassName={classes.imageClassName}
      />
    </div>
  )
}

export default DirectKick

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    position: 'relative',
    height: '550px',
    [breakpoints.down('md')]: {
      height: 'auto',
    },
  },
  innerWrapper: {
    maxWidth: '100%',
    padding: '0',
  },
  contentBlock: {
    maxWidth: '610px',
    padding: '6rem 1rem 2rem 4rem',
    alignSelf: 'center',
    [breakpoints.down('md')]: {
      paddingLeft: '2rem',
    },
    [breakpoints.down('sm')]: {
      padding: '2rem 1rem 6rem 1rem',
    },
  },
  redContainer: {
    position: 'absolute',
    zIndex: 0,
    width: '50vw',
    height: '100%',
    backgroundColor: colors.main.brightRed,
    [breakpoints.down('xs')]: {
      display: 'none',
    },
    [breakpoints.between('xs', 'sm')]: {
      width: '100vw',
      height: '69vw',
    },
  },
  stripes: {
    '& div': {
      width: '50vw',
      left: 0,
      bottom: 'unset',

      [breakpoints.down('xs')]: {
        display: 'none',
      },
      [breakpoints.between('xs', 'sm')]: {
        width: '100vw',
      },
    },
    '& div:nth-of-type(1)': {
      top: '220px',
    },
    '& div:nth-of-type(2)': {
      top: `265px`,
    },
    '& div:nth-of-type(3)': {
      top: `310px`,
    },
  },
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
    height: 'auto',
    [breakpoints.down('sm')]: {
      margin: '0',
      padding: '0',
    },
  },
  boxText: {
    [breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },
  heading: {
    marginTop: '0 !important',
  },
  containerWrapper: {
    alignItems: 'stretch',
    '& .gridItemContent': {
      justifyContent: 'flex-start',
    },
    '& .gridItemImage': {
      maxWidth: '710px',
      [breakpoints.down('sm')]: {
        maxWidth: '100%',
        flexBasis: '69vw',
      },

      [breakpoints.down('xs')]: {
        flexBasis: '110vw',
      },
    },
  },
  callBtn: {
    [breakpoints.down('sm')]: {
      paddingLeft: '.75rem',
      paddingRight: '.75rem',
    },
  },
  imageWrapper: {
    backgroundColor: 'transparent',
    paddingRight: '3rem',
    [breakpoints.down('xs')]: {
      paddingRight: 0,
    },
  },
  imageClassName: {
    objectFit: 'unset',
    height: 'auto',
  },
  paragraphStyle: {
    margin: '0.825rem 0rem 1rem 0rem',
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    '& strong': {
      marginBottom: '32px',
      fontSize: '1.5rem',
      lineHeight: '2rem',
      display: 'block',
      [breakpoints.down('sm')]: {
        fontSize: '1.125rem',
        lineHeight: '1.625rem',
      },
    },
    '& p': {
      marginBottom: '4px',
    },
  },
}))
